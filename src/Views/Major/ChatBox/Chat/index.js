import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../../../../Asset/css/ChatForm.css';
import { Col, Row } from 'antd';

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const roomID = "Nguin_Aaaa";
    
    useEffect(() => {
        const newSocket = io('http://localhost:8081', { query: { roomID } });
        setSocket(newSocket);

        newSocket.on('message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        socket.emit('message', { text: newMessage, sender: 'user' });
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((message, index) => (
                    <div key={index} className={message.sender === 'user' ? 'user-message' : 'other-message'}>
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