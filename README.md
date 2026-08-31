# Site LOTUS MED Genève

Site statique condensé et responsive, sans dépendance externe. Le contenu principal et le contact sont réunis sur l’accueil, tandis que les tarifs et les pages juridiques restent séparés. Les photos et la vidéo d’introduction sont servies localement.

## Prévisualiser

```powershell
npm run dev
```

Ouvrir ensuite `http://127.0.0.1:4173`.

## Vérifier

```powershell
npm run check
```

Ce contrôle vérifie les pages, les ressources locales, les identifiants dupliqués et les textes alternatifs des images.

## Avant publication

- Confirmer la graphie officielle de la marque (`LOTUS MED` dans les textes fournis, `LOTUSMED` sur le logo et les annuaires).
- Confirmer impérativement l’adresse. Le site reprend l’adresse fournie, `Rue Moillebeau 42`, mais les annuaires [RME](https://emr.ch/fr/therapeute/narangarav.rosselet) et [LPG](https://www.lpg-group.com/fr/nos-centres/lotusmed-geneve-2003740997) consultés le 10 août 2026 indiquent `rue de l’Orangerie 6`.
- Ajouter l’hébergeur et, si nécessaire, les données d’identification de l’entreprise.
- Finaliser les deux pages juridiques. Elles sont volontairement en `noindex` tant que les mentions signalées « à compléter avant publication » ne sont pas renseignées.
- Relier le formulaire à un service d’envoi sécurisé si l’on souhaite un envoi direct. Dans cette version, il prépare un e-mail dans la messagerie du visiteur.
- Confirmer les horaires, la zone couverte à domicile, les modalités de paiement et d’annulation.
- Confirmer le périmètre exact des méthodes reconnues par ASCA/RME, ainsi que les indications du modèle Cellu M6 installé.
- Définir les conditions et la période de validité de l’offre « 10 séances au prix de 9 ».
- Une fois le domaine connu, ajouter les URL canoniques, les URL sociales absolues, le sitemap et la politique `robots.txt` définitive.

Les contenus médicaux restent informatifs et les prises en charge éventuelles sont formulées sous réserve d’évaluation, de prescription ou du contrat d’assurance concerné.

# lotusmed
