const config = require('./config.json');
const bcryptSecret = process.env.BCRYPT_SECRET | config.BCRYPT_SECRET;
const jwtSecret = process.env.JWT_SECRET | config.JWT_SECRET;
const mongodbURI = process.env.MONGODB_URI |  config.MONGODB_URI;
const port = process.env.PORT | config.PORT;

module.exports = {
    'PORT': port,
    'BCRYPT_SECRET': bcryptSecret,
    'JWT_SECRET': jwtSecret,
    'MONGODB_URL': mongodbURI 
}