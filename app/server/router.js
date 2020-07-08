const insert = require(__base + '/app/controllers/insertController');

const router = (server) => {
    server.get('/ping', (req, res) => res.send(200, 'pong'));
    server.post('/insert/:type', insert.insertIntoMongo);
};

module.exports = router;