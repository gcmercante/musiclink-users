const producer = require(__base + '/app/controllers/producerController');
const user = require(__base + '/app/controllers/userController');

const router = (server) => {
    server.get('/ping', (req, res) => res.send(200, 'pong'));

    server.post('/insert/producer', producer.validateToInsertIntoMongo);
    server.post('/update/producer', producer.validateToUpdateProducer);
    server.post('/disable/producer', producer.validateToDisableProducer);

    server.post('/insert/user', user.validateToInsertIntoMongo);
    server.post('/update/user', user.validateToUpdateUser);
    server.post('/disable/user', user.validateToDisableUser);

    server.post('/validate/user', user.validateUser);

    server.post('/validateEmail', user.validateEmail);
};

module.exports = router;