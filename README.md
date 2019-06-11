# Reborn

[![Netlify Status](https://api.netlify.com/api/v1/badges/0d653835-4a73-4e6e-8c14-3c9ee1f9a76a/deploy-status)](https://app.netlify.com/sites/reborn-game/deploys)

A simulation game in WebGL 

# Install

Install concurrently
```
npm install -g concurrently
```

Install dependencies on server and client
```
npm run install
```

Run server
```
npm run dev
```

Build
```
npm run build
```

## Publish

- Change `localhost:3001` with `https://reborn-game.herokuapp.com` in `client/plugins/Socket.js`
- Check server is enabled in `client/config/index.js`
- Check GUI is hide in `client/config/index.js`

