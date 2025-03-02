const http = require('http');
const app = require('./app');
const initSocket = require('./utils/socketUtils');  // Ensure this file exists
require('dotenv').config();
const PORT = process.env.PORT || 3030;
const server = http.createServer(app);

// Initialize Socket.io
if (typeof initSocket === 'function') {
  initSocket(server);  // Ensure it's callable
} else {
  console.error('Error: initSocket is not a function');
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
