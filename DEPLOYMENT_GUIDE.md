# 🚀 Guide de Déploiement - EduAPI Monitor

## 📋 Prérequis

- Node.js 18+ installé
- Compte Firebase actif
- Git installé
- Compte GitHub

---

## 🔥 Déploiement Firebase

### 1. Configuration Initiale

```bash
# Installer Firebase CLI globalement
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Vérifier le projet actif
firebase projects:list
```

### 2. Build du Projet

```bash
# Installer les dépendances
npm install

# Build production
npm run build
```

### 3. Déploiement

```bash
# Déployer tout (Hosting + Functions + Firestore)
firebase deploy

# OU déployer séparément
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore
```

### 4. Vérification

Après le déploiement, Firebase affichera :
- **Hosting URL** : https://eduapi-monitor.web.app
- **Functions URL** : https://us-central1-eduapi-monitor.cloudfunctions.net

---

## 🐙 Push vers GitHub

### 1. Initialiser Git (si nécessaire)

```bash
# Vérifier si Git est initialisé
git status

# Si pas initialisé
git init
```

### 2. Configurer le Remote

```bash
# Ajouter le repository GitHub
git remote add origin https://github.com/ImadAAmara1/edu-api-monitor.git

# Vérifier
git remote -v
```

### 3. Commit et Push

```bash
# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "🎨 Amélioration des visualisations D3.js - Ajout couleurs BarChart et pourcentages DonutChart"

# Push vers GitHub
git push -u origin main

# Si erreur, forcer le push (attention aux conflits)
git push -u origin main --force
```

### 4. Vérifier sur GitHub

Aller sur : https://github.com/ImadAAmara1/edu-api-monitor

---

## 📝 Checklist Avant Déploiement

### Frontend
- [ ] `npm run build` fonctionne sans erreur
- [ ] Fichier `.env` configuré avec les bonnes URLs Firebase
- [ ] Pas de console.log inutiles
- [ ] Toutes les dépendances installées

### Backend (Functions)
- [ ] `cd functions && npm install`
- [ ] Règles Firestore configurées
- [ ] CORS activé dans les functions

### Git
- [ ] `.gitignore` à jour (node_modules, .env, dist)
- [ ] README.md à jour
- [ ] Pas de fichiers sensibles (.env)

---

## 🔧 Commandes Utiles

```bash
# Tester localement
npm run dev

# Preview du build
npm run preview

# Voir les logs Firebase
firebase functions:log

# Rollback si problème
firebase hosting:rollback

# Supprimer le cache
firebase hosting:channel:delete preview
```

---

## 🌐 URLs du Projet

- **Live Demo** : https://eduapi-monitor.web.app
- **GitHub** : https://github.com/ImadAAmara1/edu-api-monitor
- **Functions** : https://us-central1-eduapi-monitor.cloudfunctions.net

---

## 🎓 Présentation Professionnelle

### Points à Mettre en Avant

1. **Architecture Full-Stack**
   - Frontend React moderne
   - Backend serverless Firebase
   - Base de données NoSQL Firestore

2. **Visualisations D3.js**
   - LineChart : Évolution temporelle
   - BarChart : Volume par catégorie (couleurs + légende)
   - DonutChart : Répartition performances (pourcentages)

3. **Technologies Modernes**
   - React 19 avec Hooks
   - D3.js 7.9 pour dataviz
   - Tailwind CSS 4.1 pour le design
   - Vite 7.1 pour le build

4. **Fonctionnalités**
   - Recherche temps réel Wikipedia
   - Sauvegarde persistante Firestore
   - Historique des 50 dernières recherches
   - Statistiques détaillées
   - Design responsive

---

## 📊 Métriques du Projet

- **Composants React** : 6
- **Cloud Functions** : 3
- **Graphiques D3.js** : 3
- **Lignes de code** : ~1500
- **Performance** : < 2s chargement
- **Uptime** : 99.9% (Firebase SLA)

---

## 🐛 Dépannage

### Erreur de déploiement Firebase
```bash
firebase deploy --debug
```

### Erreur Git push
```bash
git pull origin main --rebase
git push origin main
```

### Build échoue
```bash
rm -rf node_modules dist
npm install
npm run build
```

---

**Développé avec ❤️ pour UM6P**
