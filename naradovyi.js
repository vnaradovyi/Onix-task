const http = require('http');
const url = require('url');
const axios = require('axios');

const PORT = 3000;

const server = http.createServer((userRequest, serverResponse) => { 
    
    const USER_PATH = url.parse(userRequest.url, true);

    if (USER_PATH.pathname == '/rates') {

        const CURRENCY = USER_PATH.query.currency;

        if (CURRENCY != undefined) {

            axios
            .get('https://api.coincap.io/v2/assets/'+ CURRENCY)
            .then(result => {

                serverResponse.writeHead(result.status, { 'Content-Type': 'application/json' });

                serverResponse.end(JSON.stringify({
                    usd: `${result.data.data.priceUsd}`
                }));

            }) 
            .catch(error => {

                serverResponse.writeHead(404, { 'Content-Type': 'application/json' });
                    
                serverResponse.end(JSON.stringify({
                    'Error': `${error.message}: Invalid name of crypto currency. See https://docs.coincap.io/`
                }));
            });

        } else {

            serverResponse.writeHead(404, { 'Content-Type': 'application/json' });
                
            serverResponse.end(JSON.stringify({
                'Invalid key of search': 'Must be: /rates?currency=cur_name, where cur_name is the name of crypto currency (bitcoin or other)',            
            }));

        }

    } else {

        serverResponse.writeHead(404, { 'Content-Type': 'application/json' });
                
        serverResponse.end(JSON.stringify({
            'Invalid path': 'Must be: http://localhost:3000/rates?currency=cur_name, where cur_name is the name of crypto currency (bitcoin or other)',            
        }));
    }
});

server.listen(PORT);
