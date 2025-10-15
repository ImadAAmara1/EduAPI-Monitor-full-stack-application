# 🔥 Déploiement Firebase - EduAPI Monitor

## 🎯 Architecture Firebase

```
┌─────────────────────────────────────────┐
│          UTILISATEURS                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│      Firebase Hosting (CDN Global)       │
│         React App (Frontend)             │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│    Cloud Functions (Backend API)         │
│    - POST /metrics                       │
│    - GET /metrics                        │
│    - GET /stats                          │
└──────────────┬───────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────┐
│      Firestore Database (NoSQL)          │
│      Collection: search_metrics          │
└──────────────────────────────────────────┘
```

---

## ✨ Avantages Firebase

- ✅ **Gratuit** (Spark Plan)
- ✅ **Déploiement en 5 minutes**
- ✅ **CDN mondial automatique**
- ✅ **HTTPS automatique**
- ✅ **Pas de serveur à gérer**
- ✅ **Scaling automatique**
- ✅ **Google Cloud** (reconnu professionnellement)

---

## 📋 Étapes de Déploiement

### 1️⃣ Créer un Projet Firebase

1. **Aller sur [Firebase Console](https://console.firebase.google.com)**
2. **Créer un projet**
   - Nom: `eduapi-monitor`
   - Analytics: Optionnel
3. **Activer Firestore**
   - Build → Firestore Database → Create database
   - Mode: Production
   - Location: europe-west (le plus proche)

---

### 2️⃣ Installer Firebase CLI

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Vérifier
firebase projects:list
```

---

### 3️⃣ Initialiser Firebase dans le Projet

```bash
cd edu-api-monitor

# Initialiser
firebase init
```

**Sélectionner :**
- ✅ Firestore
- ✅ Functions
- ✅ Hosting

**Configuration :**
```
? Use existing project: eduapi-monitor
? Firestore rules: firestore.rules
? Firestore indexes: firestore.indexes.json
? Functions language: JavaScript
? ESLint: No
? Install dependencies: Yes
? Public directory: dist
? Single-page app: Yes
? GitHub deploys: No
```

---

### 4️⃣ Configurer Firestore (Base de données)

**Créer `firestore.rules` :**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /search_metrics/{document=**} {
      allow read, write: if true; // Public pour démo
      // En production: ajouter authentification
    }
  }
}
```

**Créer `firestore.indexes.json` :**

```json
{
  "indexes": [
    {
      "collectionGroup": "search_metrics",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    }
  ]
}
```

---

### 5️⃣ Créer les Cloud Functions (Backend)

**Remplacer `functions/index.js` :**

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// POST /metrics - Sauvegarder une métrique
exports.saveMetric = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { query, category, responseTime, resultsCount } = req.body;

      const docRef = await db.collection('search_metrics').add({
        query,
        category,
        responseTime,
        resultsCount,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      res.status(201).json({
        success: true,
        id: docRef.id
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// GET /metrics - Récupérer toutes les métriques
exports.getMetrics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const limit = parseInt(req.query.limit) || 50;

      const snapshot = await db.collection('search_metrics')
        .orderBy('timestamp', 'desc')
        .limit(limit)
        .get();

      const metrics = [];
      snapshot.forEach(doc => {
        metrics.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate()
        });
      });

      res.json({
        success: true,
        count: metrics.length,
        data: metrics
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// GET /stats - Statistiques par catégorie
exports.getStats = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('search_metrics').get();

      const categoryStats = {};
      snapshot.forEach(doc => {
        const data = doc.data();
        if (!categoryStats[data.category]) {
          categoryStats[data.category] = {
            count: 0,
            totalTime: 0
          };
        }
        categoryStats[data.category].count++;
        categoryStats[data.category].totalTime += data.responseTime;
      });

      const stats = Object.keys(categoryStats).map(category => ({
        category,
        count: categoryStats[category].count,
        avgTime: (categoryStats[category].totalTime / categoryStats[category].count).toFixed(2)
      }));

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// DELETE /metrics - Supprimer toutes les métriques
exports.clearMetrics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const snapshot = await db.collection('search_metrics').get();
      const batch = db.batch();

      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      res.json({
        success: true,
        message: 'Toutes les métriques ont été supprimées'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});

// GET /global - Statistiques globales
exports.getGlobalStats = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('search_metrics').get();

      let totalSearches = 0;
      let totalTime = 0;
      let minTime = Infinity;
      let maxTime = 0;
      const categories = new Set();

      snapshot.forEach(doc => {
        const data = doc.data();
        totalSearches++;
        totalTime += data.responseTime;
        minTime = Math.min(minTime, data.responseTime);
        maxTime = Math.max(maxTime, data.responseTime);
        categories.add(data.category);
      });

      res.json({
        success: true,
        data: {
          totalSearches,
          avgTime: totalSearches > 0 ? (totalTime / totalSearches).toFixed(2) : 0,
          minTime: minTime === Infinity ? 0 : minTime,
          maxTime,
          totalCategories: categories.size
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  });
});
```

**Installer dépendances Functions :**

```bash
cd functions
npm install cors
cd ..
```

---

### 6️⃣ Modifier le Frontend pour Firebase

**Créer `.env` :**

```env
VITE_FIREBASE_SAVE_URL=https://us-central1-eduapi-monitor.cloudfunctions.net/saveMetric
VITE_FIREBASE_GET_URL=https://us-central1-eduapi-monitor.cloudfunctions.net/getMetrics
VITE_FIREBASE_DELETE_URL=https://us-central1-eduapi-monitor.cloudfunctions.net/clearMetrics
```

**Modifier `src/hooks/useApiMonitor.js` :**

```javascript
const BACKEND_SAVE = import.meta.env.VITE_FIREBASE_SAVE_URL || 'http://localhost:3001/api/metrics';
const BACKEND_GET = import.meta.env.VITE_FIREBASE_GET_URL || 'http://localhost:3001/api/metrics';
const BACKEND_DELETE = import.meta.env.VITE_FIREBASE_DELETE_URL || 'http://localhost:3001/api/metrics';

// Dans performSearch
await axios.post(BACKEND_SAVE, { ... });

// Dans loadHistory
const response = await axios.get(BACKEND_GET);

// Dans clearMetrics
await axios.delete(BACKEND_DELETE);
```

---

### 7️⃣ Déployer sur Firebase

```bash
# Build le frontend
npm run build

# Déployer tout (Functions + Hosting + Firestore)
firebase deploy

# Ou déployer séparément
firebase deploy --only functions
firebase deploy --only hosting
firebase deploy --only firestore
```

**Résultat :**
```
✔ Deploy complete!

Hosting URL: https://eduapi-monitor.web.app
Functions:
  - saveMetric: https://us-central1-eduapi-monitor.cloudfunctions.net/saveMetric
  - getMetrics: https://us-central1-eduapi-monitor.cloudfunctions.net/getMetrics
  - getStats: https://us-central1-eduapi-monitor.cloudfunctions.net/getStats
  - clearMetrics: https://us-central1-eduapi-monitor.cloudfunctions.net/clearMetrics
  - getGlobalStats: https://us-central1-eduapi-monitor.cloudfunctions.net/getGlobalStats
```

---

## 🧪 Tester le Déploiement

```bash
# Tester une function
curl https://us-central1-eduapi-monitor.cloudfunctions.net/getMetrics

# Tester le frontend
# Ouvrir https://eduapi-monitor.web.app
```

---

## 💰 Limites Gratuites (Spark Plan)

| Service | Limite Gratuite |
|---------|----------------|
| Firestore | 1 GB stockage, 50K lectures/jour |
| Functions | 2M invocations/mois |
| Hosting | 10 GB/mois, 360 MB/jour |

**Largement suffisant pour votre projet !**

---

## 📊 Monitoring

**Firebase Console → Analytics**
- Nombre de visiteurs
- Temps de chargement
- Erreurs

**Firestore → Data**
- Voir toutes les métriques en temps réel

---

## 🔒 Sécurité (Production)

**Ajouter authentification :**

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /search_metrics/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // Seulement utilisateurs authentifiés
    }
  }
}
```

---

## 📈 Pour votre CV

```
Déploiement Firebase (Google Cloud):
• Frontend: Firebase Hosting avec CDN mondial
• Backend: Cloud Functions (Serverless)
• Database: Firestore (NoSQL temps réel)
• 5 endpoints API REST
• HTTPS automatique
• Scaling automatique
• Technologies: Firebase, Cloud Functions, Firestore, React
```

---

## 🆚 Firebase vs PostgreSQL

| Aspect | Firebase | PostgreSQL |
|--------|----------|------------|
| Type | NoSQL | SQL |
| Setup | 5 min | 1-2h |
| Coût | Gratuit | Gratuit (limité) |
| Scaling | Auto | Manuel |
| Requêtes | Simple | Complexe |
| CV | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**Recommandation :** Firebase pour rapidité, PostgreSQL pour apprentissage SQL

---

## 🚀 Commandes Utiles

```bash
# Voir les logs
firebase functions:log

# Tester localement
firebase emulators:start

# Mettre à jour
firebase deploy --only functions:saveMetric

# Supprimer une function
firebase functions:delete saveMetric
```

---

## 🔗 Ressources

- [Firebase Console](https://console.firebase.google.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Cloud Functions Guide](https://firebase.google.com/docs/functions)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

---

**Temps de déploiement : 30 minutes**

**Niveau : Débutant-Intermédiaire**

**Valeur CV : ⭐⭐⭐⭐**
