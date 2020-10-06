# good-mad-library
*Este side project está en constante construcción*

La idea principal es poder recoger los libros marcados como pendientes en goodreads y poder comprobar rápidamente si están en la biblioteca de Madrid.

# Arquitectura
El proyecto esta divido en dos partes, backend, ubicado en el directorio raíz, que sirve de API para recoger los datos de Goodreads y el frontend que pinta estos datos, ubicado en el directorio /goodmadlib-cover.

## Backend

### Setup
#### Configuración
Para poder obtener datos desde el servidor es necesario obtener un API KEY y un API SECRET de Goodreads, se puede obtener desde [aquí](https://www.goodreads.com/api/keys). Una vez obtenidos, son necesarias las siguientes variables de entorno, o cambiar las líneas donde se obtengan las variables (process.env['Nombre de variable']):

```
"KEY": Goodreads api key
"SECRET": Goodreads secret
"URL": URL de tu servidor a la que va a hacer callback el API de Goodreads una vez logado
"PORT": Puerto en el que va a arrancar el servidor
```

La URL tiene que ser pública para que Goodreads pueda acceder. Yo uso [ngrok](https://ngrok.com/).

#### Ejecución del servidor

Para ejecutar el servidor primero es necesario instalar las dependencias:
```sh
cd good-mad-library
npm install
```

Una vez instaladas se puede ejecutar el servidor de la siguiente manera:
```sh
npm run start
```

### Métodos
*En construcción*

## Frontend

Toda la información relacionada con el front se encuentra en su readme [aquí](/goodmadlib-cover/README.md)
