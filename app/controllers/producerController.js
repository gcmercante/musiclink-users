const producer = require(__base + '/app/lib/producer');

const producerController = {
    validateToInsertIntoMongo: (req, res) =>  {
        try {
            if(!req.params.type) {
                return res.send(500, 'missing params [type]');
            }
            if(req.params.type == 'producer' && (!req.params.name || !req.params.email || !req.params.password || !req.params.location || !req.params.phone)) {
                return res.send(500, 'missing params');
            }
    
            producer.insertNewProducer(req.params)
            .then(() => {
                return res.send(200, 'ok');
            })
            .catch(e => {
                return res.send(500, e.message);
            });
        } catch(e) {
            throw e;
        }
    },

    validateToUpdateProducer: (req, res) => {
        try {
            if(!req.params.type) {
                return res.send(500, 'missing params [type]');
            }
    
            if(!req.params.email || !req.params.password || !req.params.update) {
                return res.send(500, 'missing params');
            }
            // FAZER VALIDAÇÃO DE SENHA DEPOIS
            
            producer.updateProducer(req.params)
            .then(() => {
                return res.send(200, 'ok');
            })
            .catch(e => {
                return res.send(500, e.message);
            })
        } catch(e) {
            throw e;
        }
    },

    validateToDisableProducer: (req, res) => {
        try{
            if(!req.params.type) {
                return res.send(500, 'missing params [type]');
            }
    
            if(!req.params.email || !req.params.password || !req.params.update) {
                return res.send(500, 'missing params');
            }
    
            producer.disableProducer(req.params)
            .then(() => {
                return res.send(200, 'ok');
            })
            .catch(e => {
                return res.send(500, e.message);
            })
        } catch(e) {
            throw e;
        }
    }
}

module.exports = producerController;