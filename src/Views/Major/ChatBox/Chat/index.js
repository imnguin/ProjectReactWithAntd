import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../../../Asset/css/ChatForm.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { roomID } = useParams();
    const user = JSON.parse(localStorage.getItem('logininfo')).username;
    useEffect(() => {
        const newSocket = io('http://localhost:8080', { query: { roomID } });
        setSocket(newSocket);

        newSocket.on('message', (data) => {
            const values = Object.entries(data)
            const a = values.map(item => {
                return item[1];
            });
            setMessages((prevMessages) => prevMessages.concat(a));
        }); 

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        socket.emit('message', { text: newMessage, sender: user });
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === user ? 'user-message' : 'other-message'}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;