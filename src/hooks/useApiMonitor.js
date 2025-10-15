import { useState, useCallback } from 'react';
import { searchWikipedia, getPageInfo } from '../services/wikiApi';
import { firebaseApi } from '../services/firebaseApi';

export const useApiMonitor = () => {
  const [metrics, setMetrics] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSearches, setTotalSearches] = useState(0);

  // Charger l'historique au démarrage
  const loadHistory = useCallback(async () => {
    try {
      const response = await firebaseApi.getMetrics(12);
      if (response.success) {
        const history = response.data.map(item => ({
          time: new Date(item.timestamp),
          responseTime: item.response_time,
          query: item.query
        }));
        setMetrics(history.reverse());
        setTotalSearches(response.count);
      }
    } catch (error) {
      console.error('Erreur chargement historique:', error.message);
    }
  }, []);

  const performSearch = useCallback(async (query, category = 'General') => {
    setLoading(true);
    try {
      const result = await searchWikipedia(query);
      
      if (!result) return;
      
      // Ajouter aux métriques locales
      setMetrics(prev => [...prev, {
        time: result.timestamp,
        responseTime: result.responseTime,
        query: result.query
      }]);

      // Sauvegarder dans Firebase
      try {
        await firebaseApi.saveMetric({
          query: result.query,
          category: category,
          responseTime: Math.round(result.responseTime),
          resultsCount: result.data?.length || 0
        });
      } catch (error) {
        console.error('Erreur sauvegarde Firebase:', error.message);
      }

      // Mettre à jour les données par catégorie
      setCategoryData(prev => {
        const existing = prev.find(item => item.category === category);
        if (existing) {
          return prev.map(item => 
            item.category === category 
              ? { ...item, count: item.count + 1 }
              : item
          );
        }
        return [...prev, { category, count: 1 }];
      });

      // Ajouter des données scatter
      if (result.success && result.data?.length > 0) {
        const pagePromises = result.data.slice(0, 5).map(page => 
          getPageInfo(page.pageid)
        );
        const pageInfos = await Promise.all(pagePromises);
        
        const newScatterPoints = pageInfos
          .filter(info => info?.success)
          .map(info => ({
            size: info.size,
            responseTime: info.responseTime,
            title: info.title
          }));
        
        setScatterData(prev => [...prev, ...newScatterPoints].slice(-30));
      }

      return result;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMetrics = useCallback(async () => {
    try {
      await firebaseApi.clearMetrics();
      setMetrics([]);
      setCategoryData([]);
      setScatterData([]);
      setTotalSearches(0);
    } catch (error) {
      console.error('Erreur suppression:', error.message);
    }
  }, []);

  return {
    metrics,
    categoryData,
    scatterData,
    loading,
    totalSearches,
    performSearch,
    clearMetrics,
    loadHistory
  };
};
