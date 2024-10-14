import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import request from '../utils/requestMethods';
import SocketContext from '../context/Socketcontext';
import './Home.css'; // Ensure this file contains the necessary styles
import axios from 'axios';

const Home = () => {
  const { allUsers, selectedUser, setSelectedUser, getUsers, user, messages, setMessages, setUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [userMessageColor, setUserMessageColor] = useState(localStorage.getItem('userMessageColor') || '#daf8e3');

  // Toggle user list visibility
  const toggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  useEffect(() => {
    getUsers();
  },[]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Fetch messages from server
  const fetchMessages = async (receiverId) => {
    try {
      const response = await request.get(`/api/messages/${receiverId}`, { withCredentials: true });
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        console.error('Expected an array of messages but received:', response.data);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle sending messages
  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const res = await request.post(`/api/messages/send/${selectedUser._id}`, { message }, { withCredentials: true });
        const sentMsg = { message: res?.data?.message, senderId: user._id, receiverId: selectedUser._id };

        // Emit message and update state
        socket.emit('sendMessage', sentMsg);
        setMessages([...messages, sentMsg]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Listen for new incoming messages
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser._id && newMessage.receiverId === user._id) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedUser, user._id, messages, setMessages]);

  // Handle color persistence on login
  useEffect(() => {
    const savedColor = localStorage.getItem('userMessageColor');
    if (!savedColor) {
      localStorage.setItem('userMessageColor', '#daf8e3'); // Default green
    }
  }, []);

  const handleLogout = async () => {
    try {
      const res = await request.get('/api/auth/logout', { withCredentials: true });
      if (res.data) {
        localStorage.removeItem('chat-user');
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <button className="burger-button" onClick={toggleUserList} aria-label="Toggle user list">☰</button>
        <h1 className="title">Messaging App</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <main className="main-content">
        <div className={`user-list-container ${isUserListVisible ? 'visible' : ''}`}>
          <ul className="user-list">
            {allUsers.map((user) => (
              <li key={user._id} className="user-item" onClick={() => setSelectedUser(user)}>
                {user.userName}
              </li>
            ))}
          </ul>
        </div>
        <div className="message-container">
          {selectedUser ? (
            <>
              <h3 className="user-chat-header">
                Chat with <span>{selectedUser.userName}</span>
              </h3>
              <div className="message-area">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-bubble ${msg.senderId === user._id ? 'sent' : 'received'}`}
                    style={{ backgroundColor: msg.senderId === user._id ? userMessageColor : '#e3f2fd' }}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>
              <div className="input-area">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <h3>Select a user to start messaging</h3>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
