

const isJSON = (o) => typeof o !== 'undefined' && o != null && ({}).constructor.prototype === o.constructor.prototype;

const isMultipartyFile = (o) => isJSON(o) && o.originalFilename && o.size && o.path && o.headers && o.headers['content-type'];

module.exports = { isJSON, isMultipartyFile };

