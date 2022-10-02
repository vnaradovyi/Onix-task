const http = require('http');
const url = require('url');
const axios = require('axios');

const PORT = 3000;

const server = http.createServer(function (req, res) {
    
    const CURRENCY = url.parse(req.url, true).query.currency;

    axios
        .get('https://api.coincap.io/v2/assets/'+ CURRENCY)
        .then(result => {

            res.writeHead(result.status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                usd: `${result.data.data.priceUsd}`
            }));

        })
        .catch(error => {

            res.writeHead(404, { 'Content-Type': 'text' });
            res.end(error.message);

        });
    
});

server.listen(PORT);
