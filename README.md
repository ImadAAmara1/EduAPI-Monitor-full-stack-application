# 📊 EduAPI Monitor

> Tableau de bord de monitoring de performance d'API en temps réel

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://imadaamara1.github.io/edu-api-monitor/)
[![GitHub](https://img.shields.io/github/license/ImadAAmara1/edu-api-monitor?style=for-the-badge)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/ImadAAmara1/edu-api-monitor/actions)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&style=flat-square)](https://reactjs.org/)
[![D3.js](https://img.shields.io/badge/D3.js-7.9-F9A03C?logo=d3.js&style=flat-square)](https://d3js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&style=flat-square)](https://vitejs.dev/)

## 🎯 Aperçu du Projet

EduAPI Monitor est un tableau de bord interactif qui surveille et visualise les performances de l'API Wikipedia en temps réel. Conçu dans un contexte éducatif, il permet d'analyser les temps de réponse, de catégoriser les recherches et de visualiser les tendances de performance.

### ✨ Fonctionnalités Principales

- 🔍 **Recherche en temps réel** sur Wikipedia API
- 📊 **3 visualisations D3.js** interactives (Line, Bar, Donut)
- ⏱️ **Mesure précise** des temps de réponse (performance.now())
- 📈 **Historique intelligent** des 12 dernières recherches
- 🎨 **Design professionnel** aux couleurs UM6P
- 📱 **Responsive** et optimisé mobile
- 🚀 **Performance** optimisée avec React hooks

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/ImadAAmara1/edu-api-monitor.git

# Naviguer dans le dossier
cd edu-api-monitor

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

```
src/
├── components/          # Composants React réutilisables
│   ├── LineChart.jsx   # Graphique temporel (D3.js)
│   ├── BarChart.jsx    # Graphique par catégorie (D3.js)
│   ├── DonutChart.jsx  # Répartition des performances (D3.js)
│   ├── SearchPanel.jsx # Interface de recherche
│   └── StatsCard.jsx   # Cartes de statistiques
├── hooks/              # Hooks personnalisés
│   └── useApiMonitor.js # Logique de monitoring
├── services/           # Services API
│   └── wikiApi.js      # Service Wikipedia
├── utils/              # Utilitaires
│   └── constants.js    # Constantes de configuration
├── App.jsx             # Composant principal
└── index.css           # Styles globaux
```

## 🛠️ Technologies Utilisées

### Frontend

- **React 19.1** - Framework UI avec hooks
- **D3.js 7.9** - Visualisations de données
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Axios** - Client HTTP

### Build & Dev Tools

- **Vite 7.1** - Build tool ultra-rapide
- **ESLint** - Linter JavaScript
- **PostCSS** - Transformation CSS

## 📊 Visualisations D3.js

### 1. LineChart - Évolution Temporelle

Affiche les temps de réponse au fil du temps avec :

- Échelle temporelle (scaleTime)
- Axes dynamiques
- Tooltips interactifs
- Ligne orange UM6P

### 2. BarChart - Volume par Catégorie

Compare le nombre de recherches par catégorie :

- Échelle en bandes (scaleBand)
- Barres interactives
- Couleur UM6P cohérente

### 3. DonutChart - Répartition des Performances

Visualise la distribution rapide/moyen/lent :

- Graphique en anneau (pie, arc)
- Couleurs sémantiques (vert/orange/rouge)
- Légende interactive
- Texte central avec total

## 🎨 Design System

### Couleurs

- **Primary** : #d7492a (Orange UM6P)
- **Success** : #10b981 (Vert - Rapide)
- **Warning** : #f59e0b (Orange - Moyen)
- **Danger** : #ef4444 (Rouge - Lent)

### Seuils de Performance

- 🟢 **Rapide** : < 150ms
- 🟠 **Moyen** : 150-300ms
- 🔴 **Lent** : > 300ms

## 💡 Concepts Techniques

### Custom Hook - useApiMonitor

```javascript
const {
  metrics, // Historique des requêtes
  categoryData, // Données par catégorie
  loading, // État de chargement
  performSearch, // Fonction de recherche
  clearMetrics, // Réinitialisation
} = useApiMonitor();
```

### Mesure de Performance

```javascript
const startTime = performance.now();
const response = await axios.get(url);
const responseTime = performance.now() - startTime;
```

### Optimisations React

- `useCallback` pour mémoriser les fonctions
- Rendu conditionnel pour éviter les calculs inutiles
- Nettoyage D3.js avant chaque re-render

## 📚 Documentation

- 📝 [CHANGELOG.md](CHANGELOG.md) - Historique des versions
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Guide de contribution
- 🔒 [SECURITY.md](SECURITY.md) - Politique de sécurité

## 🎓 Compétences Démontrées

### Frontend

✅ React (Hooks, State Management, Component Architecture)  
✅ D3.js (Data Visualization, Scales, Axes, Interactivity)  
✅ Tailwind CSS (Utility-first, Responsive Design)  
✅ JavaScript ES6+ (Async/Await, Destructuring, Modules)

### Architecture

✅ Séparation des préoccupations (Components/Hooks/Services)  
✅ Custom Hooks pour la réutilisabilité  
✅ Service Layer pour l'abstraction API  
✅ Component-based architecture

### Bonnes Pratiques

✅ Code propre et lisible  
✅ Nommage cohérent  
✅ Structure de projet claire  
✅ Performance monitoring  
✅ Responsive design

## 🚀 Améliorations Futures

- [ ] Tests unitaires (Jest, React Testing Library)
- [ ] Tests E2E (Cypress)
- [ ] Export des données en CSV
- [ ] Filtres temporels (heure, jour, semaine)
- [ ] Mode sombre
- [ ] Système de cache (React Query)
- [ ] Alertes pour performances dégradées
- [ ] Backend pour persistance des données
- [ ] Authentification utilisateur
- [ ] Comparaison multi-APIs

## 📈 Métriques du Projet

- **Composants React** : 6 composants
- **Hooks personnalisés** : 1 (useApiMonitor)
- **Services** : 1 (wikiApi)
- **Graphiques D3.js** : 3 visualisations
- **Dépendances** : 4 principales (React, D3.js, Axios, Tailwind)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👤 Auteur

**Imad Amara**

- 🔗 GitHub: [@ImadAAmara1](https://github.com/ImadAAmara1)
- 📧 Email: imadamara14@gmail.com

## 🙏 Remerciements

- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) pour les données
- [D3.js](https://d3js.org/) pour les visualisations
- [React](https://reactjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour le styling

---

⭐ **Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile !**
