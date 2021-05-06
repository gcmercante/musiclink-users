const user = require(__base + '/app/lib/user');
const util = require(__base + 'app/lib/util');

const userController = {
    validateToInsertIntoMongo: (req, res) =>  {
        try{
            if(req.params?.type == 'user' && (!req.params.name || !req.params.email || !req.params.password || !req.params.phone)) {
                return res.send(400, 'missing params');
            }
    
            user.insertNewUser(req.params)
            .then((result) => {
                return res.send(200, JSON.stringify(result));
            })
            .catch(e => {
                return res.send(500, e.message);
            });
        } catch(e) {
            return res.send(500, e);
        }
    },

    validateToUpdateUser: (req, res) => {
        try{
            if(!req.params.type) {
                return res.send(400, 'missing params [type]');
            }
    
            if(!req.params.email || !req.params.password || !req.params.update) {
                return res.send(400, 'missing params');
            }
            
            user.updateUserAsync(req.params)
            .then(() => {
                return res.send(200, 'ok');
            })
            .catch(e => {
                return res.send(500, e.message);
            })
        } catch(e) {
            return res.send(500, e);
        }
    },

    validateToDisableUser: (req, res) => {
        try {
            if(!req.params.type) {
                return res.send(400, 'missing params [type]');
            }
    
            if(!req.params.email || !req.params.password || !req.params.update) {
                return res.send(400, 'missing params');
            }
    
            user.disableUserAsync(req.params)
            .then(() => {
                return res.send(200, 'ok');
            })
            .catch(e => {
                return res.send(500, e.message);
            })
        } catch(e) {
            return res.send(500, e);
        }
    },

    validateUser: (req, res) => {
        try {
            if(!req.params.email) {
                return res.send(400, 'missing params [email]');
            }
            if(!req.params.password) {
                return res.send(400, 'missing params [password]');
            }

            user.validateUser(req.params)
            .then(result => res.send(200, result))
            .catch(e => res.send(500, e.message));
            
        } catch(e) {
            return res.send(500, e);
        }
    },

    validateEmail: (req, res) => {
        try {
            if(!req.params.email) {
                return res.send(400, 'missing params [email]');
            }

            util.validateEmail(req.params.email)
            .then(result => res.send(200, result))
            .catch(err => res.send(500, err));
            
        } catch(e) {
            return res.send(500, e);
        }
    }
}

module.exports = userController;