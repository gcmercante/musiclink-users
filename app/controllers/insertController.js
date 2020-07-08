const Promise = require('bluebird');
const insert = require(__base + 'app/lib/insert')

const insertController = {
    insertIntoMongo: (req, res) =>  {
        if(!req.params.type) {
            return res.send(500, 'missing params');
        }
        if(req.params.type == 'user' && (!req.params.name || !req.params.email || !req.params.password || !req.params.birthday || !req.params.role || !req.params.phone)) {
            return res.send(500, 'missing params');
        }
        if(req.params.type == 'producer' && (!req.params.name || !req.params.email || !req.params.password || !req.params.location || !req.params.phone)) {
            return res.send(500, 'missing params');
        }
        let type = req.params.type;
        type = type[0].toUpperCase() + type.substr(1);
        type = 'insertNew' + type + 'Async';

        if(!insert[type]) {
            return res.send(500, 'invalid task');
        }

        insert[type](req.params).then(() => {
            return res.send(200, 'ok');
        }).catch(e => {
            return res.send(500, e.message);
        });
    }
}
Promise.promisifyAll(insertController);
module.exports = insertController;