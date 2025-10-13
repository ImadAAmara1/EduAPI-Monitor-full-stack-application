# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.0.0] - 2024

### Ajouté
- ✅ Interface de recherche Wikipedia en temps réel
- ✅ 3 visualisations D3.js interactives (Line, Bar, Donut)
- ✅ Mesure précise des temps de réponse avec performance.now()
- ✅ Historique des 12 dernières recherches
- ✅ Système de catégorisation des recherches
- ✅ Statistiques de performance (rapide/moyen/lent)
- ✅ Design responsive avec Tailwind CSS
- ✅ Gestion d'erreurs robuste
- ✅ Validation des données
- ✅ Custom hook useApiMonitor pour la logique métier
- ✅ Service API abstrait et réutilisable

### Améliorations Techniques
- ✅ Gestion d'erreurs avec try/catch dans tous les composants async
- ✅ Validation des données avant manipulation (optional chaining)
- ✅ Vérification des références DOM avant utilisation
- ✅ Optimisation des dépendances useEffect
- ✅ Code propre et maintenable

### Sécurité
- ✅ Validation des entrées utilisateur
- ✅ Gestion sécurisée des erreurs API
- ✅ Protection contre les valeurs nulles/undefined
