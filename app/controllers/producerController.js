const Promise = require('bluebird');
const producer = require(__base + '/app/lib/producer');

const producerController = {
    validateToInsertIntoMongo: (req, res) =>  {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }
        if(req.params.type == 'producer' && (!req.params.name || !req.params.email || !req.params.password || !req.params.location || !req.params.phone)) {
            return res.send(500, 'missing params');
        }
        let type = req.params.type;
        type = type[0].toUpperCase() + type.substr(1);
        type = 'insertNew' + type + 'Async';

        if(!producer[type]) {
            return res.send(500, 'invalid task');
        }

        producer[type](req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        });
    },

    validateToUpdateProducer: (req, res) => {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }

        if(!req.params.email || !req.params.password || !req.params.update) {
            return res.send(500, 'missing params');
        }
        // FAZER VALIDAÇÃO DE SENHA DEPOIS
        
        producer.updateProducerAsync(req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        })
    },

    validateToDisableProducer: (req, res) => {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }

        if(!req.params.email || !req.params.password || !req.params.update) {
            return res.send(500, 'missing params');
        }

        producer.disableProducerAsync(req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        })
    }
}

Promise.promisifyAll(producerController);
module.exports = producerController;