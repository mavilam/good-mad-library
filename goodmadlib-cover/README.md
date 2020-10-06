# goodmadlib-cover

## Project setup
```
npm install
```

### Propiedades

En el fichero src/main.js es necesario cambiar la url del servidor:

```javascript
axios.defaults.baseURL = 'La url de tu servidor'
```

Tiene que ser pública para que Goodreads pueda acceder. [ngrok](https://ngrok.com/).

### Compilar y cambios en caliente para desarrollar
```
npm run serve
```

### Compilar para producción
```
npm run build
```

### Linter
```
npm run lint
```
