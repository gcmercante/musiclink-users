const util = {
    generateHash: (params) => {
        return window.btoa(params.email);
    }
}

module.exports = util;