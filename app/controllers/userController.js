const user = require(__base + '/app/lib/user');

const userController = {
    validateToInsertIntoMongo: (req, res) =>  {
        try{
            if(!req.params.type) {
                return res.send(500, 'missing params [type]');
            }
            if(req.params.type == 'user' && (!req.params.name || !req.params.email || !req.params.password || !req.params.birthday || !req.params.role || !req.params.phone)) {
                return res.send(500, 'missing params');
            }
    
            user.insertNewUser(req.params)
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

    validateToUpdateUser: (req, res) => {
        try{
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
        } catch(e) {
            throw e;
        }
    },

    validateToDisableUser: (req, res) => {
        try {
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
        } catch(e) {
            throw e;
        }
    }
}

module.exports = userController;