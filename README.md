# 🔥 EduAPI Monitor - Full Stack Firebase

> Tableau de bord de monitoring d'API en temps réel avec React, D3.js et Firebase

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://eduapi-monitor.web.app)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

## 🌐 Démo Live

**🚀 Application :** https://eduapi-monitor.web.app

---

## 📊 Aperçu

Application full-stack qui surveille et visualise les performances de l'API Wikipedia en temps réel.

### ✨ Fonctionnalités

- 🔍 Recherche en temps réel sur Wikipedia
- 📊 3 visualisations D3.js interactives (Line, Bar, Donut)
- ⏱️ Mesure précise des temps de réponse
- 💾 Sauvegarde persistante dans Firestore
- 📈 Historique des 12 dernières recherches
- 🎨 Design responsive (mobile-first)
- 🔥 Backend serverless (Cloud Functions)

---

## 🏗️ Architecture

```
Frontend (React + D3.js)
        ↓
Firebase Hosting (CDN Global)
        ↓
Cloud Functions (Backend Serverless)
        ↓
Firestore (Base de données NoSQL)
```

---

## 🛠️ Technologies

### Frontend
- **React 19** - Framework UI avec hooks
- **D3.js 7.9** - Visualisations de données
- **Tailwind CSS 4.1** - Styling moderne
- **Axios** - Client HTTP
- **Vite 7.1** - Build tool

### Backend
- **Firebase Cloud Functions** - Backend serverless
- **Firestore** - Base de données NoSQL
- **Node.js 22** - Runtime JavaScript

### Déploiement
- **Firebase Hosting** - CDN mondial
- **Firebase CLI** - Outils de déploiement

---

## 🚀 Installation Locale

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Firebase

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/ImadAAmara1/edu-api-monitor.git
cd edu-api-monitor

# 2. Installer les dépendances frontend
npm install

# 3. Installer les dépendances backend
cd functions
npm install
cd ..

# 4. Configurer Firebase
firebase login
firebase use --add

# 5. Créer .env avec vos URLs Firebase
echo "VITE_FIREBASE_URL=https://us-central1-VOTRE-PROJET.cloudfunctions.net" > .env

# 6. Lancer en local
npm run dev
```

---

## 📡 API Endpoints

### Cloud Functions

**Base URL :** `https://us-central1-eduapi-monitor.cloudfunctions.net`

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/saveMetric` | POST | Sauvegarder une recherche |
| `/getMetrics` | GET | Récupérer l'historique |
| `/clearMetrics` | DELETE | Supprimer toutes les données |

---

## 📦 Structure du Projet

```
edu-api-monitor/
├── functions/              # Backend (Cloud Functions)
│   └── index.js           # API endpoints
├── src/
│   ├── components/        # Composants React
│   │   ├── LineChart.jsx  # Graphique temporel
│   │   ├── BarChart.jsx   # Graphique par catégorie
│   │   ├── DonutChart.jsx # Répartition performances
│   │   ├── SearchPanel.jsx
│   │   └── StatsCard.jsx
│   ├── hooks/
│   │   └── useApiMonitor.js  # Hook personnalisé
│   ├── services/
│   │   ├── wikiApi.js        # Service Wikipedia
│   │   └── firebaseApi.js    # Service Firebase
│   ├── App.jsx
│   └── main.jsx
├── firebase.json          # Configuration Firebase
├── firestore.rules        # Règles de sécurité
└── package.json
```

---

## 🗄️ Base de Données

### Firestore Collection : `search_metrics`

```javascript
{
  query: "React",           // Terme recherché
  category: "Technology",   // Catégorie
  responseTime: 245,        // Temps en ms
  resultsCount: 10,         // Nombre de résultats
  timestamp: Date           // Date/heure
}
```

---

## 🎨 Visualisations D3.js

### 1. LineChart - Évolution Temporelle
Affiche les temps de réponse au fil du temps avec axes dynamiques et tooltips.

### 2. BarChart - Volume par Catégorie
Compare le nombre de recherches par catégorie avec :
- ✨ Couleurs différentes pour chaque catégorie
- 📊 Légende interactive en bas du graphique
- 🎯 Animation hover fluide

### 3. DonutChart - Répartition des Performances
Visualise la distribution rapide/moyen/lent avec :
- 🎨 Couleurs sémantiques (vert/orange/rouge)
- 📈 Pourcentages affichés sur chaque segment
- 💫 Animations interactives

---

## 🚀 Déploiement

### Méthode Rapide (Windows)

```bash
# Script automatique
deploy.bat
```

### Méthode Manuelle

```bash
# Build le frontend
npm run build

# Déployer tout (Functions + Hosting + Firestore)
firebase deploy

# Push vers GitHub
git add .
git commit -m "🚀 Déploiement version 1.2.0"
git push origin main
```

📖 **Guide complet** : Voir [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 🎓 Compétences Démontrées

### Frontend
✅ React (Hooks, State Management, Components)  
✅ D3.js (Scales, Axes, Interactivity)  
✅ Tailwind CSS (Utility-first, Responsive)  
✅ JavaScript ES6+ (Async/Await, Modules)

### Backend
✅ Firebase Cloud Functions (Serverless)  
✅ Firestore (NoSQL Database)  
✅ REST API Design  
✅ CORS & Security

### DevOps
✅ Firebase Hosting (CDN)  
✅ CI/CD avec Firebase CLI  
✅ Environment Variables  
✅ Production Deployment

---

## 📚 Documentation

- 📖 [Guide d'Apprentissage](GUIDE_APPRENTISSAGE.md) - Comprendre le projet
- 🔥 [Firebase Deployment](FIREBASE_DEPLOYMENT.md) - Guide de déploiement
- 📝 [Changelog](CHANGELOG.md) - Historique des versions
- 🔒 [Security](SECURITY.md) - Politique de sécurité

---

## 💡 Améliorations Futures

- [ ] Authentification utilisateur (Firebase Auth)
- [ ] Export des données (CSV/PDF)
- [ ] Filtres temporels (jour/semaine/mois)
- [ ] Mode sombre
- [ ] Tests unitaires (Jest)
- [ ] Notifications en temps réel
- [ ] Dashboard administrateur
- [ ] Multi-langues (i18n)

---

## 📈 Métriques

- **Composants React :** 6
- **Cloud Functions :** 3
- **Graphiques D3.js :** 3 (avec couleurs et pourcentages)
- **Lignes de code :** ~1500
- **Performance :** < 2s temps de chargement
- **Uptime :** 99.9% (Firebase SLA)
- **Version :** 1.2.0

---

## 🤝 Contribution

Les contributions sont bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE)

---

## 👤 Auteur

**Imad Amara**

- 🌐 Live Demo: [eduapi-monitor.web.app](https://eduapi-monitor.web.app)
- 💼 GitHub: [@ImadAAmara1](https://github.com/ImadAAmara1)
- 📧 Email: imadamara14@gmail.com

---

## 🙏 Remerciements

- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) pour les données
- [Firebase](https://firebase.google.com) pour l'infrastructure
- [D3.js](https://d3js.org/) pour les visualisations
- [React](https://reactjs.org/) pour le framework
- [UM6P](https://um6p.ma) pour l'inspiration

---

⭐ **Si ce projet vous est utile, donnez-lui une étoile sur GitHub !**

**Développé avec ❤️ pour UM6P**
