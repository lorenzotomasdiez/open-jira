# NEXT.JS OPEN JIRA APP
Para correr localmente, se necesita la base de datos
...

docker-compose up -d
...
* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno 
Renombrar el archivo __.env.template__ a __.env__


## Llenar la base de datos con informacion de pruebas

Call de el endpoint:
...
    http://localhost:3000/api/seed
...
