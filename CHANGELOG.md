# 📝 Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

---

## [1.2.0] - 2024-01-XX

### ✨ Ajouté
- **BarChart** : Couleurs différentes pour chaque catégorie
- **BarChart** : Légende interactive en bas du graphique
- **DonutChart** : Affichage des pourcentages sur chaque segment
- Guide de déploiement complet (DEPLOYMENT_GUIDE.md)

### 🐛 Corrigé
- Problème de chargement des données Firebase au refresh
- BarChart vide après actualisation de la page
- DonutChart affichant tout en rouge
- Reconstruction du categoryData depuis l'historique Firebase

### 🔧 Amélioré
- Augmentation de la limite de métriques à 50
- Meilleure gestion des données manquantes (responseTime)
- Validation des données avant filtrage
- Animation hover sur BarChart (opacité au lieu de couleur)

---

## [1.1.0] - 2024-01-XX

### ✨ Ajouté
- Statistiques détaillées dans la sidebar
- Meilleur/Pire temps de réponse
- Compteur de performances (Rapide/Moyen/Lent)
- Footer avec informations du projet

### 🔧 Amélioré
- Design responsive amélioré
- Interface utilisateur plus intuitive
- Gestion des erreurs Firebase

---

## [1.0.0] - 2024-01-XX

### 🎉 Version Initiale

#### Frontend
- Interface React 19 avec hooks
- 3 visualisations D3.js interactives
- Design Tailwind CSS responsive
- Recherche Wikipedia en temps réel

#### Backend
- Firebase Cloud Functions
- Firestore pour persistance
- 3 endpoints API (save, get, clear)

#### Fonctionnalités
- Mesure des temps de réponse
- Historique des 12 dernières recherches
- Catégorisation des requêtes
- Statistiques en temps réel

---

## 🔮 À Venir

### Version 1.3.0
- [ ] Authentification Firebase Auth
- [ ] Export des données (CSV/PDF)
- [ ] Filtres temporels (jour/semaine/mois)
- [ ] Mode sombre

### Version 1.4.0
- [ ] Tests unitaires (Vitest)
- [ ] Notifications temps réel
- [ ] Dashboard administrateur
- [ ] Multi-langues (i18n)

---

**Format** : [Majeur.Mineur.Patch]
- **Majeur** : Changements incompatibles
- **Mineur** : Nouvelles fonctionnalités compatibles
- **Patch** : Corrections de bugs
