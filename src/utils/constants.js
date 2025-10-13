/**
 * Constantes de configuration pour EduAPI Monitor
 * Centralise les valeurs réutilisées dans l'application
 */

// Couleurs du thème UM6P
export const COLORS = {
  primary: '#d7492a',        // Orange UM6P
  primaryLight: '#ff6b4a',
  primaryDark: '#b83820',
  
  // Seuils de performance
  success: '#10b981',        // Vert (rapide)
  warning: '#f59e0b',        // Orange (moyen)
  danger: '#ef4444',         // Rouge (lent)
  
  // Couleurs des graphiques
  chartLine: '#d7492a',
  chartBar: '#d7492a',
  chartDonut: {
    fast: '#10b981',
    medium: '#f59e0b',
    slow: '#ef4444'
  }
};

// Seuils de performance (en millisecondes)
export const PERFORMANCE_THRESHOLDS = {
  fast: 150,      // < 150ms = Rapide
  medium: 300     // 150-300ms = Moyen, >300ms = Lent
};

// Configuration de l'historique
export const HISTORY_CONFIG = {
  maxItems: 12,   // Nombre maximum d'éléments affichés dans l'historique
  maxStored: 100  // Nombre maximum d'éléments stockés en mémoire
};

// Catégories éducatives
export const EDUCATION_CATEGORIES = [
  'General',
  'Science',
  'Technology',
  'Mathematics',
  'History',
  'Literature',
  'Geography',
  'Arts'
];

// Recherches rapides prédéfinies
export const QUICK_SEARCHES = [
  { query: 'Artificial Intelligence', category: 'Technology' },
  { query: 'Quantum Physics', category: 'Science' },
  { query: 'Machine Learning', category: 'Technology' },
  { query: 'Renaissance', category: 'History' }
];

// Configuration de l'API Wikipedia
export const WIKI_API_CONFIG = {
  baseURL: 'https://en.wikipedia.org/w/api.php',
  searchLimit: 10,
  timeout: 10000  // 10 secondes
};

// Messages d'interface
export const UI_MESSAGES = {
  noData: 'Aucune donnée disponible',
  noSearches: 'Aucune recherche effectuée',
  loading: 'Chargement...',
  searching: 'Recherche...',
  error: 'Une erreur est survenue'
};

// Dimensions des graphiques
export const CHART_DIMENSIONS = {
  lineChart: {
    width: 800,
    height: 300,
    margin: { top: 20, right: 30, bottom: 50, left: 60 }
  },
  barChart: {
    width: 800,
    height: 300,
    margin: { top: 20, right: 30, bottom: 50, left: 60 }
  },
  donutChart: {
    width: 400,
    height: 300,
    innerRadiusRatio: 0.6
  }
};
