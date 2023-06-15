# Documentation



## Résumé

Le  but de ce widget est de fournir une interface permettant d'afficher une liste de service TMS. Ce widget a été concu pour s'interfacer avec la plateforme Altia via un feature service reference Esri, cepandant si les specifications du service de reference sont respecté n'importe quel TMS peut etre affiché.

## configuration

La configuration de ce widget ce fait directement via l'interface du web app builder.

### Structure générale

    {
    "moveImageryToBackgroung": true,
    "alteiaConnectService": "https://.../FeatureServer/0",
    "backgroundIndex": 1
    }

### Paramètres


|Clef                |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|alteiaConnectService|string|Url du service de reference d'imagerie|
|moveImageryToBackgroung|boolean|Definit si les services tuilé doivent etre envoyer ver le background|
|backgroundIndex|integer|Definit l'index du background|



## Spécifications du service de reference d'imagerie

Le service de reference d'imagerie est un feature service, les geometries doivent correspondre a la zone d'interet des TMS.- Il doit comprendre au minimum les colones suivante avec les noms suivant :

|objectid [ObjectID]|project [string]|mission [string]|date [date]|url [string]|id [string]|
|------------------|--------------------|--------------|---------------|-----------|-------------|
|0|France|Ile-de-France|8/26/2020 6:31 PM|https://.../{level}/{col}/{row}.png|5f2daa59de48750007e63956|




