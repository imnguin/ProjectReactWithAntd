// import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import Peer from 'simple-peer'; // Thêm thư viện simple-peer
// import { useParams } from 'react-router-dom';
// import '../../../../asset/css/ChatForm.css';

// const Chat = (props) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [socket, setSocket] = useState(null);
//     const [stream, setStream] = useState(null);
//     const [peers, setPeers] = useState([]);
//     const userVideo = useRef(); // Ref cho video của người dùng hiện tại
//     const { UserID } = useParams();
//     const user = JSON.parse(localStorage.getItem('logininfo')).username;

//     useEffect(() => {
//         const roomID = renderRoomID(UserID);
//         const newSocket = io('http://localhost:8080', { query: { roomID } });
//         setSocket(newSocket);

//         // Khởi tạo stream từ webcam
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 setStream(stream);
//                 if (userVideo.current) {
//                     userVideo.current.srcObject = stream;
//                 }

//                 // Lắng nghe sự kiện 'user-connected' khi có người dùng khác tham gia phòng
//                 newSocket.on('user-connected', (userId) => {
//                     connectToNewUser(userId, stream);
//                 });
//             })
//             .catch((error) => console.error('Error accessing media devices: ', error));

//         // Lắng nghe sự kiện khi có người dùng khác tham gia phòng
//         newSocket.on('user-connected', (userId) => {
//             console.log('User connected: ', userId);
//         });

//         // Lắng nghe sự kiện khi có người dùng khác ngắt kết nối
//         newSocket.on('user-disconnected', (userId) => {
//             console.log('User disconnected: ', userId);
//             const peerObj = peers.find((peer) => peer.peerId === userId);
//             if (peerObj) {
//                 peerObj.peer.destroy();
//                 setPeers((prevPeers) => prevPeers.filter((p) => p.peerId !== userId));
//             }
//         });

//         // Lắng nghe sự kiện khi có tin nhắn mới
//         newSocket.on('message', (data) => {
//             const values = Object.entries(data);
//             const a = values.map(item => {
//                 return item[1];
//             });
//             setMessages((prevMessages) => prevMessages.concat(a));
//         });

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     // Hàm kết nối với người dùng mới sử dụng WebRTC
//     const connectToNewUser = (userId, stream) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false,
//             stream: stream,
//         });

//         // Gửi thông tin SDP đến người dùng khác
//         peer.on('signal', (signal) => {
//             socket.emit('send-signal', { userToSignal: userId, callerId: socket.id, signal });
//         });

//         // Thêm peer mới vào danh sách
//         setPeers((prevPeers) => [...prevPeers, { peerId: userId, peer }]);

//         // Lắng nghe sự kiện khi có sự kiện 'return-signal' từ người dùng khác
//         socket.on('return-signal', ({ signal, callerId }) => {
//             const peerObj = peers.find((peer) => peer.peerId === callerId);

//             if (peerObj) {
//                 // Thêm thông tin signal của người dùng khác vào peer
//                 peerObj.peer.signal(signal);
//             }
//         });
//     };

//     const renderRoomID = (userID) => {
//         const sortedUserIDs = [userID, user].sort();
//         const roomID = sortedUserIDs.join('-');
//         return roomID;
//     };

//     const handleSendMessage = () => {
//         if (newMessage.trim() === '') return;
//         socket.emit('message', { text: newMessage, sender: user });
//         setNewMessage('');
//     };

//     return (
//         <>
//         <div className="video-container">
//                 <video ref={userVideo} autoPlay muted />
//                 {peers.map((peer) => (
//                     <Video key={peer.peerId} peer={peer.peer} />
//                 ))}
//             </div>
//         <div className="chat-container">
//             <div className="message-list">
//                 {messages.map((message, index) => (
//                     <div key={index} className={message.sender === user ? 'user-message' : 'other-message'}>
//                         {message.text}
//                     </div>
//                 ))}
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     placeholder="Type your message..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//         </>
//     );
// };

// // Component hiển thị video của người dùng khác
// const Video = (props) => {
//     const ref = useRef();

//     useEffect(() => {
//         props.peer.on('stream', (stream) => {
//             ref.current.srcObject = stream;
//         });
//     }, []);

//     return <video ref={ref} autoPlay />;
// };

// export default Chat;

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessageBox, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import { connectSocket, listenForMessages, removeMessageListener, sendMessage } from '../../../../utils/socket';
import { HOSTNAME } from '../../../../utils/Constants/SystemVars';
import { _fetchData } from '../../../../utils/CallAPI';

const Chat = ({ history }) => {
    const dispatch = useDispatch();
    const info = JSON.parse(localStorage.getItem('logininfo'))
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadChat = async () => {
            setIsLoading(true);
            const response = await dispatch(
                _fetchData(HOSTNAME, "api/chat/loadMessageByChatId", { roomId })
            );
            const data = response.resultObject.map(item => ({
                position: item.senderId === info.username ? 'right' : 'left',
                type: 'text',
                text: item.text,
                date: new Date(item.createdAt),
            }));

            setMessages(data);
            setIsLoading(false);
        };
        loadChat();
        connectSocket(roomId);

        listenForMessages(newMessage => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    position: newMessage.senderId === info.username ? 'right' : 'left',
                    type: 'text',
                    text: newMessage.text,
                    date: new Date(newMessage.createdAt),
                }
            ]);
        });

        return () => {
            removeMessageListener();
        };
    }, [roomId]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const messageData = {
            roomId,
            createdAt: new Date(),
            text: newMessage,
            senderId: info.username,
            isRead: false
        };
        sendMessage(messageData);
        setNewMessage("");
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={() => history.goBack()}>&lt; Back</button>
                <span>Chat Room</span>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <MessageBox key={index} position={msg.position} type={msg.type} text={msg.text} date={msg.date} />
                ))}
            </div>
            <div className="chat-input">
                <Input placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} />
                <Button text="Send" onClick={handleSend} />
            </div>
        </div>
    );
};

export default Chat;

