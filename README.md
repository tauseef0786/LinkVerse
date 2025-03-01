# LinkVerse


    linkverse/
    ├── config/
    │   ├── db.js                # MongoDB connection setup
    │   └── constants.js         # Constants like JWT secret, API routes, etc.
    ├── controllers/
    │   ├── authController.js    # Handles login, signup, and authentication
    │   ├── postController.js    # Handles post creation, editing, deletion, likes, comments
    │   ├── userController.js    # Handles user profile, chat, and user-related actions
    │   └── chatController.js    # Handles real-time chat functionality
    ├── middleware/
    │   ├── authMiddleware.js    # Authentication and authorization middleware
    │   └── errorHandler.js      # Global error handling middleware
    ├── models/
    │   ├── User.js              # User schema
    │   ├── Post.js              # Post schema
    │   ├── Comment.js           # Comment schema
    │   └── Chat.js              # Chat schema
    ├── routes/
    │   ├── authRoutes.js        # Routes for authentication (login, signup)
    │   ├── postRoutes.js        # Routes for posts (create, edit, delete, like, comment)
    │   ├── userRoutes.js        # Routes for user profile and chat
    │   └── chatRoutes.js        # Routes for real-time chat
    ├── utils/
    │   ├── jwtUtils.js          # JWT token generation and verification
    │   ├── upload.js            # File upload utility (for images/videos)
    │   └── socketUtils.js       # Socket.io utility for real-time chat
    ├── .env                     # Environment variables (DB URL, JWT secret, etc.)
    ├── .gitignore               # Git ignore file
    ├── app.js                   # Main application file
    ├── server.js                # Server setup and start
    └── package.json             # Node.js dependencies and scripts
