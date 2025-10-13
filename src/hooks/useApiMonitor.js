import { useState, useCallback } from 'react';
import { searchWikipedia, getPageInfo } from '../services/wikiApi';

export const useApiMonitor = () => {
  const [metrics, setMetrics] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async (query, category = 'General') => {
    setLoading(true);
    try {
      const result = await searchWikipedia(query);
      
      if (!result) return;
      
      // Ajouter aux métriques de temps de réponse
      setMetrics(prev => [...prev, {
        time: result.timestamp,
        responseTime: result.responseTime,
        query: result.query
      }]);

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

      // Ajouter des données scatter (taille vs temps)
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

  const clearMetrics = useCallback(() => {
    setMetrics([]);
    setCategoryData([]);
    setScatterData([]);
  }, []);

  return {
    metrics,
    categoryData,
    scatterData,
    loading,
    performSearch,
    clearMetrics
  };
};
