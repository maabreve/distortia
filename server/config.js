module.exports = {
  AUTH0_DOMAIN: 'distortia.auth0.com', 
  AUTH0_API_AUDIENCE: 'http://localhost:8083/api/',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://distortia_user:macacoveio10@ds063536.mlab.com:63536/distortia',
  NAMESPACE: 'http://myapp.com/roles'
};