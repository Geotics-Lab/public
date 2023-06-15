# Documentation



## Résumé

Le  but de ce widget est de fournir un outil permettant plusieur choses :

* injection de css personnalisé
* injection de javascript personnalisé
* ajout de wmts depuis le portal
* modifier la visibilité de certaines couches en fonction de la visibilité d'autres

## configuration

La configuration de ce widget ce fait directement via l'interface du web app builder. Les parametre du fichier config.json ne seront donc pas exposé ici.".

### Structure générale

    {
    "filterLayerOnLayerVisibilityChange": [],
    "customScript": [{
        "name": "alert",
        "content": "alert('hello world')"
    }],
    "customCss": [
        {
            "name": "Group Filter",
            "content": ".class{color:whith;}"
        }
    ],
    "trackUser": {
        "enabled": true,
        "jobUrl": "https://.../job",
        "token": null
    },
    "customPortalWmts": []
}

### Paramètres


|Clef                |Type                          |Description                         |
|----------------|-------------------------------|-----------------------------|
|---|---|---|




