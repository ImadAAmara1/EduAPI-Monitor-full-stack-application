import axios from 'axios';

// 🔥 URLs Firebase Functions
// IMPORTANT: Remplacer après déploiement avec vos vraies URLs
const BASE_URL = import.meta.env.VITE_FIREBASE_URL || 'https://us-central1-eduapi-monitor.cloudfunctions.net';

export const firebaseApi = {
  // Sauvegarder une métrique
  saveMetric: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/saveMetric`, data);
      return response.data;
    } catch (error) {
      console.error('Erreur saveMetric:', error.message);
      throw error;
    }
  },

  // Récupérer les métriques
  getMetrics: async (limit = 50) => {
    try {
      const response = await axios.get(`${BASE_URL}/getMetrics?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getMetrics:', error.message);
      throw error;
    }
  },

  // Supprimer toutes les métriques
  clearMetrics: async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/clearMetrics`);
      return response.data;
    } catch (error) {
      console.error('Erreur clearMetrics:', error.message);
      throw error;
    }
  }
};
