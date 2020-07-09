const insert = require(__base + '/app/controllers/insertController');
const update = require(__base + '/app/controllers/updateController');

const router = (server) => {
    server.get('/ping', (req, res) => res.send(200, 'pong'));

    server.post('/insert/:type', insert.insertIntoMongo);
    server.post('/update/:type', update.updateUser);
};

module.exports = router;