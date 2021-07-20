const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

app = express();

// Serve only the static files form the dist directory
app.use(serveStatic(path.join('./dist/gomito-frontend-project')));

app.get(/.*/,function (req, res) {
    res.sendFile(__dirname + 'dist/gomito-frontend-project/index.html');
  });

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
app.listen(port);

console.log("Serve started..." + port);
