import { io } from 'socket.io-client';
import { HOST_LIST, HOSTNAME } from './Constants/SystemVars';

export const socket = io(HOST_LIST[HOSTNAME].hostBaseURL, {
    transports: ['websocket'],
    forceNew: false, // Không tạo kết nối mới liên tục
    reconnection: true, // Tự động kết nối lại khi mất kết nối
    reconnectionAttempts: 5, // Thử kết nối lại tối đa 5 lần
    reconnectionDelay: 2000, // Chờ 2 giây trước khi thử lại
});

// Sự kiện khi socket kết nối thành công
socket.on('connect', () => {
});

// Xử lý lỗi kết nối
socket.on('connect_error', (error) => {
});

// Tự động tham gia phòng chat
export const connectSocket = (roomId) => {
    if (!socket.connected) socket.connect();
    socket.emit('joinRoom', roomId);
};

// Gửi tin nhắn
export const sendMessage = (data) => {
    if (socket.connected) {
        socket.emit('sendMessage', data);
    } else {
    }
};

// Lắng nghe tin nhắn từ server
export const listenForMessages = (callback) => {
    socket.on('receiveMessage', (message) => {
        callback(message);
    });
};

// Xóa lắng nghe khi rời phòng
export const removeMessageListener = () => {
    socket.off('receiveMessage');
};
