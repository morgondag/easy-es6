// this is just a lazy node file server.
// start with node server.js
var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic(__dirname));
app.listen(5000);

console.log('open browser on this adress:')
console.log('http://localhost:5000')
