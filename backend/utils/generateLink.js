const { customAlphabet } = require('nanoid');
const nano = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
module.exports = () => nano();
