const Promise = require('bluebird');
const user = require(__base + '/app/lib/user');

const userController = {
    validateToInsertIntoMongo: (req, res) =>  {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }
        if(req.params.type == 'user' && (!req.params.name || !req.params.email || !req.params.password || !req.params.birthday || !req.params.role || !req.params.phone)) {
            return res.send(500, 'missing params');
        }
        let type = req.params.type;
        type = type[0].toUpperCase() + type.substr(1);
        type = 'insertNew' + type + 'Async';

        if(!user[type]) {
            return res.send(500, 'invalid task');
        }

        user[type](req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        });
    },

    validateToUpdateUser: (req, res) => {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }

        if(!req.params.email || !req.params.password || !req.params.update) {
            return res.send(500, 'missing params');
        }
        // FAZER VALIDAÇÃO DE SENHA DEPOIS
        
        user.updateUserAsync(req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        })
    },

    validateToDisableUser: (req, res) => {
        if(!req.params.type) {
            return res.send(500, 'missing params [type]');
        }

        if(!req.params.email || !req.params.password || !req.params.update) {
            return res.send(500, 'missing params');
        }

        user.disableUserAsync(req.params)
        .then(() => {
            return res.send(200, 'ok');
        })
        .catch(e => {
            return res.send(500, e.message);
        })
    }
}

Promise.promisifyAll(userController);
module.exports = userController;