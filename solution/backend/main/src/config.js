module.exports = {
    hostSpring: 'http://localhost:8082',
    hostExpress: 'http://localhost:3001',
    port: 3000,
    
    // Cors origin for frontend hosting on other host
    corsOrigin: 'http://localhost:4200',

    // Save all chat messages every x seconds
    // Double interval seconds on failure server response for not poll too much
    intervalSavingChat: 10,
    maxInterval: 320,
    chats: {}
}