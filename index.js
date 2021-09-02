// require your server and launch it
const server = require('./api/server')

//Launch
server.listen(4000, () => {
    console.log('Server Listening On 4000')
})