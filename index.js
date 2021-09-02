// require your server and launch it
const server = require('./api/server')


//Launch
const PORT = 5000
server.listen(PORT, () => {
    console.log('Server Listening On', PORT)
})