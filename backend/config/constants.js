module.exports = {
    API_ROUTES: {
      AUTH: '/api/auth',
      POSTS: '/api/posts',
      USERS: '/api/users',
      CHAT: '/api/chat',
    },
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/linkverse',
  };