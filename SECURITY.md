# Politique de Sécurité

## Versions Supportées

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité dans ce projet, veuillez nous en informer de manière responsable :

1. **Ne pas** créer d'issue publique sur GitHub
2. Envoyez un email à : imadamara14@gmail.com
3. Incluez une description détaillée de la vulnérabilité
4. Si possible, incluez des étapes pour reproduire le problème

Nous nous engageons à :
- Répondre dans les 48 heures
- Fournir une estimation du temps de correction
- Vous tenir informé de l'avancement
- Vous créditer dans les notes de version (si vous le souhaitez)

## Bonnes Pratiques de Sécurité

Ce projet suit les bonnes pratiques suivantes :

- ✅ Validation des entrées utilisateur
- ✅ Gestion sécurisée des erreurs
- ✅ Pas de données sensibles dans le code
- ✅ Dépendances régulièrement mises à jour
- ✅ Utilisation d'API publiques sécurisées (HTTPS)

## Dépendances

Nous utilisons des outils automatisés pour surveiller les vulnérabilités dans nos dépendances :
- GitHub Dependabot
- npm audit

Pour vérifier les vulnérabilités localement :
```bash
npm audit
```
