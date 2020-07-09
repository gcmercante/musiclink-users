const Promise = require('bluebird');
const update = require(__base + 'app/lib/update');

const updateController = {
    updateUser: (req, res) => {
        if(!req.params.type) {
            return res.send(500, 'missing params');
        }

        if(!req.params.email || !req.params.password || !req.params.update) {
            return res.send(500, 'missing params');
        }
        // FAZER VALIDAÇÃO DE SENHA DEPOIS
        
        update.updateUserProducer(req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        })
    }
}

Promise.promisifyAll(updateController);
module.exports = updateController;