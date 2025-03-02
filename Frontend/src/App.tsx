import React, { useState } from 'react';
import { 
  Home, 
  Bell, 
  MessageSquare, 
  Bookmark, 
  ListTodo, 
  Users, 
  Ticket, 
  PlusCircle, 
  User, 
  MoreHorizontal,
  ChevronLeft,
  Edit,
  Trash2,
  Search,
  Send,
  Heart,
  Share2,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';

// Define types
type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followedDaysAgo: number;
};

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
};

type Notification = {
  id: string;
  type: 'like' | 'follow' | 'mention' | 'comment';
  actorName: string;
  actorAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
};

type Bookmark = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  excerpt: string;
  timestamp: string;
  likes: number;
  comments: number;
};

type Group = {
  id: string;
  name: string;
  avatar: string;
  members: number;
  description: string;
};

type Subscription = {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  price: string;
  renewalDate: string;
};

type ListType = 'following' | 'followers' | 'fans' | 'likes' | 'closeFriends' | 'restricted' | 'blocked';

type SectionType = 'home' | 'notifications' | 'messages' | 'bookmarks' | 'lists' | 'groups' | 'subscriptions' | 'addCard' | 'profile' | 'more' | 'following';

function App() {
  // State for active section
  const [activeSection, setActiveSection] = useState<SectionType>('following');
  const [activeList, setActiveList] = useState<ListType>('following');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [messageInput, setMessageInput] = useState('');

  // Mock users data
  const users: User[] = [
    {
      id: '1',
      name: 'Jada Jackson',
      username: '@jadajackson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      verified: true,
      followedDaysAgo: 335
    },
    {
      id: '2',
      name: 'Craig Saris',
      username: '@craigsaris',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      verified: true,
      followedDaysAgo: 335
    },
    {
      id: '3',
      name: 'Jaxson Lipshutz',
      username: '@jaxsonjackson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      verified: true,
      followedDaysAgo: 335
    },
    {
      id: '4',
      name: 'Abram Denim',
      username: '@abramdenim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      verified: true,
      followedDaysAgo: 335
    },
    {
      id: '5',
      name: 'Cheyenne Botosh',
      username: '@cheyennebotosh',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      verified: true,
      followedDaysAgo: 335
    }
  ];

  // Mock messages data
  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      senderName: 'Jada Jackson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'Hey, how are you doing? I saw your latest post about the design project.',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'Craig Saris',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'Are we still meeting tomorrow to discuss the collaboration project?',
      timestamp: '5 hours ago',
      read: true
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Jaxson Lipshutz',
      senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'Thanks for sharing those resources! They were really helpful for my project.',
      timestamp: 'Yesterday',
      read: true
    }
  ];

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      actorName: 'Jada Jackson',
      actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'liked your post about design principles',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'follow',
      actorName: 'Craig Saris',
      actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'started following you',
      timestamp: '5 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'mention',
      actorName: 'Jaxson Lipshutz',
      actorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'mentioned you in a comment: "Thanks @user for the recommendation!"',
      timestamp: 'Yesterday',
      read: true
    },
    {
      id: '4',
      type: 'comment',
      actorName: 'Abram Denim',
      actorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content: 'commented on your post: "Great insights! Would love to hear more about this."',
      timestamp: '2 days ago',
      read: true
    }
  ];

  // Mock bookmarks data
  const bookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'How to Improve Your Design Skills in 2025',
      author: 'Jada Jackson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      excerpt: 'Learn the latest design trends and techniques to stay ahead in the industry...',
      timestamp: '2 days ago',
      likes: 245,
      comments: 37
    },
    {
      id: '2',
      title: 'The Future of Remote Collaboration Tools',
      author: 'Craig Saris',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      excerpt: 'Discover how new technologies are reshaping the way teams collaborate remotely...',
      timestamp: '1 week ago',
      likes: 189,
      comments: 24
    },
    {
      id: '3',
      title: '10 Essential Skills Every Developer Should Master',
      author: 'Jaxson Lipshutz',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      excerpt: 'From technical skills to soft skills, here are the must-haves for developers in today\'s market...',
      timestamp: '2 weeks ago',
      likes: 312,
      comments: 56
    }
  ];

  // Mock groups data
  const groups: Group[] = [
    {
      id: '1',
      name: 'UX/UI Designers',
      avatar: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      members: 1243,
      description: 'A community for UX/UI designers to share work, get feedback, and discuss trends.'
    },
    {
      id: '2',
      name: 'Frontend Developers',
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      members: 2567,
      description: 'Discuss the latest in frontend development, frameworks, and best practices.'
    },
    {
      id: '3',
      name: 'Digital Nomads',
      avatar: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      members: 987,
      description: 'Connect with professionals who work remotely while traveling the world.'
    }
  ];

  // Mock subscriptions data
  const subscriptions: Subscription[] = [
    {
      id: '1',
      name: 'Design Masterclass',
      avatar: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      tier: 'Pro',
      price: '$15/month',
      renewalDate: 'May 15, 2025'
    },
    {
      id: '2',
      name: 'Code Academy',
      avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      tier: 'Premium',
      price: '$20/month',
      renewalDate: 'June 3, 2025'
    },
    {
      id: '3',
      name: 'Creative Cloud',
      avatar: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      tier: 'All Apps',
      price: '$52.99/month',
      renewalDate: 'April 22, 2025'
    }
  ];

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, userId: string) => {
    e.preventDefault();
    setDropdownPosition({ top: e.clientY, left: e.clientX });
    setShowDropdown(true);
  };

  // Handle list change
  const handleListChange = (list: ListType) => {
    setActiveList(list);
  };

  // Handle section change
  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  // Handle message send
  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      alert(`Message sent: ${messageInput}`);
      setMessageInput('');
    }
  };

  // Render sidebar
  const renderSidebar = () => (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <nav className="flex-1 px-2 space-y-1">
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('home')}
        >
          <Home className="mr-3 h-5 w-5" />
          Home
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'notifications' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('notifications')}
        >
          <Bell className="mr-3 h-5 w-5" />
          Notifications
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">2</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'messages' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('messages')}
        >
          <MessageSquare className="mr-3 h-5 w-5" />
          Messages
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">1</span>
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'bookmarks' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('bookmarks')}
        >
          <Bookmark className="mr-3 h-5 w-5" />
          Bookmarks
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'lists' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('lists')}
        >
          <ListTodo className="mr-3 h-5 w-5" />
          Lists
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'groups' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('groups')}
        >
          <Users className="mr-3 h-5 w-5" />
          Groups
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'subscriptions' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('subscriptions')}
        >
          <Ticket className="mr-3 h-5 w-5" />
          Subscriptions
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'addCard' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('addCard')}
        >
          <PlusCircle className="mr-3 h-5 w-5" />
          Add Card
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'profile' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('profile')}
        >
          <User className="mr-3 h-5 w-5" />
          My Profile
        </button>
        
        <button 
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-md w-full ${activeSection === 'more' ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
          onClick={() => handleSectionChange('more')}
        >
          <MoreHorizontal className="mr-3 h-5 w-5" />
          More
        </button>
      </nav>
      
      <div className="p-4">
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <span className="mr-1">+</span> New Post
        </button>
      </div>
    </div>
  );

  // Render lists sidebar
  const renderListsSidebar = () => (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 flex items-center">
        <button 
          onClick={() => handleSectionChange('following')}
          className="flex items-center"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-medium">Lists</h2>
        </button>
      </div>
      
      <div className="border-t border-gray-200">
        <button className="w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 bg-blue-50">
          Custom Order
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'following' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('following');
            handleSectionChange('following');
          }}
        >
          Following
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'followers' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('followers');
            handleSectionChange('following');
          }}
        >
          Followers
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'fans' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('fans');
            handleSectionChange('following');
          }}
        >
          Fans
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'likes' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('likes');
            handleSectionChange('following');
          }}
        >
          Likes
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'closeFriends' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('closeFriends');
            handleSectionChange('following');
          }}
        >
          Close Friends
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'restricted' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('restricted');
            handleSectionChange('following');
          }}
        >
          Restricted
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
        
        <button 
          className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-gray-200 ${activeList === 'blocked' ? 'bg-blue-50' : ''}`}
          onClick={() => {
            handleListChange('blocked');
            handleSectionChange('following');
          }}
        >
          Blocked
          <span className="text-xs text-gray-500 ml-2">Empty</span>
        </button>
      </div>
    </div>
  );

  // Render notifications content
  const renderNotificationsContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {notifications.map(notification => (
            <li 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={notification.actorAvatar} 
                    alt={notification.actorName} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{notification.actorName}</span> {notification.content}
                    </p>
                    <span className="text-xs text-gray-500">{notification.timestamp}</span>
                  </div>
                  <div className="mt-1 flex items-center">
                    {notification.type === 'like' && <Heart className="h-4 w-4 text-red-500 mr-1" />}
                    {notification.type === 'follow' && <User className="h-4 w-4 text-blue-500 mr-1" />}
                    {notification.type === 'mention' && <MessageSquare className="h-4 w-4 text-green-500 mr-1" />}
                    {notification.type === 'comment' && <MessageSquare className="h-4 w-4 text-purple-500 mr-1" />}
                    <span className="text-xs text-gray-500 capitalize">{notification.type}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render messages content
  const renderMessagesContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Messages</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {messages.map(message => (
            <li 
              key={message.id} 
              className={`p-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={message.senderAvatar} 
                    alt={message.senderName} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-900">{message.senderName}</p>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{message.content}</p>
                </div>
                {!message.read && (
                  <div className="flex-shrink-0">
                    <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Render bookmarks content
  const renderBookmarksContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Bookmarks</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {bookmarks.map(bookmark => (
            <li key={bookmark.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-medium text-gray-900">{bookmark.title}</h3>
                  <span className="text-xs text-gray-500">{bookmark.timestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img 
                    className="h-6 w-6 rounded-full" 
                    src={bookmark.authorAvatar} 
                    alt={bookmark.author} 
                  />
                  <span className="text-sm text-gray-600">{bookmark.author}</span>
                </div>
                <p className="text-sm text-gray-500">{bookmark.excerpt}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{bookmark.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{bookmark.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render groups content
  const renderGroupsContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Groups</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {groups.map(group => (
            <li key={group.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-lg" 
                    src={group.avatar} 
                    alt={group.name} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">{group.name}</h3>
                    <span className="text-xs text-gray-500">{group.members} members</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                  <div className="mt-2">
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render subscriptions content
  const renderSubscriptionsContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subscriptions</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {subscriptions.map(subscription => (
            <li key={subscription.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-lg" 
                    src={subscription.avatar} 
                    alt={subscription.name} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-900">{subscription.name}</h3>
                    <span className="text-xs font-medium text-blue-600">{subscription.tier}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">{subscription.price}</p>
                    <span className="text-xs text-gray-500">Renews: {subscription.renewalDate}</span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      Manage
                    </button>
                    <button className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render add card content
  const renderAddCardContent = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Payment Method</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Add Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render profile content
  const renderProfileContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-white/30">
            Edit Profile
          </button>
        </div>
      </div>
      
      <div className="mt-16 px-8">
        <h1 className="text-2xl font-bold">Sarah Johnson</h1>
        <p className="text-gray-600">@sarahjohnson</p>
        
        <div className="mt-4 flex space-x-4">
          <div>
            <span className="font-bold">245</span> <span className="text-gray-600">Following</span>
          </div>
          <div>
            <span className="font-bold">12.3K</span> <span className="text-gray-600">Followers</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-700">
          UX/UI Designer | Digital Creator | Sharing design tips and inspiration
        </p>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
              Posts
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
              Media
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
              Likes
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <span className="ml-2 text-gray-500 text-sm">@sarahjohnson</span>
                    <span className="ml-2 text-gray-500 text-sm">· 2h</span>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Just finished working on a new design system for our client. Really proud of how it turned out! #DesignSystem #UX
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                      <span>24</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>3</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500">
                      <Share2 className="h-4 w-4" /> <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <span className="ml-2 text-gray-500 text-sm">@sarahjohnson</span>
                    <span className="ml-2 text-gray-500 text-sm">· 1d</span>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Excited to announce that I'll be speaking at the UX Conference next month! Who else is attending? #UXConf2025
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                      <span>87</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>12</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render more content
  const renderMoreContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">More Options</h1>
      </div>
      
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-500">Account preferences and privacy</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HelpCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Help Center</h3>
                <p className="text-sm text-gray-500">Get support and find answers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Events</h3>
                <p className="text-sm text-gray-500">Discover upcoming events</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium">Creator Studio</h3>
                <p className="text-sm text-gray-500">Manage and analyze your content</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch between light and dark themes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-gray-500">Manage push and email notifications</p>
              </div>
              <button className="text-sm text-blue-600 font-medium">Configure</button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Privacy</h3>
                <p className="text-sm text-gray-500">Control who can see your content</p>
              </div>
              <button className="text-sm text-blue-600 font-medium">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render home content
  const renderHomeContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Home</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create post card */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
                alt="Profile" 
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="What's on your mind?" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-3 flex justify-between">
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feed posts */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
                alt="Jada Jackson" 
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">Jada Jackson</h3>
                  <svg className="h-4 w-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="ml-2 text-gray-500 text-sm">@jadajackson</span>
                  <span className="ml-2 text-gray-500 text-sm">· 3h</span>
                </div>
                <p className="mt-2 text-gray-700">
                  Just launched my new portfolio website! Check it out and let me know what you think. #WebDesign #Portfolio
                </p>
                <img 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
                  alt="Portfolio website" 
                  className="mt-3 rounded-lg w-full h-64 object-cover"
                />
                <div className="mt-3 flex items-center space-x-4 text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                    <span>142</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80" 
                alt="Craig Saris" 
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium">Craig Saris</h3>
                  <svg className="h-4 w-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="ml-2 text-gray-500 text-sm">@craigsaris</span>
                  <span className="ml-2 text-gray-500 text-sm">· 5h</span>
                </div>
                <p className="mt-2 text-gray-700">
                  I'm looking for collaborators on a new open-source project. We're building a design system for React. DM me if you're interested! #OpenSource #React #DesignSystem
                </p>
                <div className="mt-3 flex items-center space-x-4 text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-red-500">
                    <Heart className="h-4 w-4" />
                    <span>89</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500">
                    <MessageSquare className="h-4 w-4" />
                    <span>37</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-500">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render following content
  const renderFollowingContent = () => (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Following</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ul className="divide-y divide-gray-200">
          {users.map(user => (
            <li 
              key={user.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer relative"
              onContextMenu={(e) => handleContextMenu(e, user.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full" 
                    src={user.avatar} 
                    alt={user.name} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    {user.verified && (
                      <span className="ml-1 text-blue-500">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {user.username}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Followed {user.followedDaysAgo} days ago
                  </span>
                  <button className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Unfollow
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Render main content
  const renderMainContent = () => {
    if (activeSection === 'lists') {
      return renderListsSidebar();
    }
    
    if (activeSection === 'following') {
      return renderFollowingContent();
    }
    
    if (activeSection === 'notifications') {
      return renderNotificationsContent();
    }
    
    if (activeSection === 'messages') {
      return renderMessagesContent();
    }
    
    if (activeSection === 'bookmarks') {
      return renderBookmarksContent();
    }
    
    if (activeSection === 'groups') {
      return renderGroupsContent();
    }
    
    if (activeSection === 'subscriptions') {
      return renderSubscriptionsContent();
    }
    
    if (activeSection === 'addCard') {
      return renderAddCardContent();
    }
    
    if (activeSection === 'profile') {
      return renderProfileContent();
    }
    
    if (activeSection === 'more') {
      return renderMoreContent();
    }
    
    return renderHomeContent();
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">LinkVerse</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-blue-700 text-white placeholder-blue-300 rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {renderSidebar()}
        {renderMainContent()}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">About</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Blogs</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Referral</a>
          </div>
        </div>
      </footer>
      
      {/* Context menu dropdown */}
      {showDropdown && (
        <div 
          className="fixed bg-white shadow-lg rounded-md overflow-hidden z-50"
          style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
        >
          <div className="py-1">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      )}
      
      {/* Overlay to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

export default App;