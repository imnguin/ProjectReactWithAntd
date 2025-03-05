import React, { useState } from "react";
import {
    UnorderedListOutlined
} from '@ant-design/icons';
import { Input } from "antd";

const Chats = () => {
    const [width, setWidth] = useState(300); // Kích thước ban đầu của phần 1

    const handleMouseDown = (e) => {
        e.preventDefault();

        const startX = e.clientX;
        const startWidth = width;

        const handleMouseMove = (event) => {
            const newWidth = startWidth + (event.clientX - startX);
            if (newWidth >= 200 && newWidth <= 500) {
                setWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div
                style={{
                    width: `${width}px`,
                    backgroundColor: "white",
                    padding: "20px"
                }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <UnorderedListOutlined />
                    <Input placeholder="Search..." style={{ borderRadius: 20, height: 35 }} />
                </div>
                <div
                    style={{
                    }}
                >
                    aaa
                </div>
            </div>
            <div
                className="resizer"
                onMouseDown={handleMouseDown}
                style={{
                    width: "5px",
                    cursor: "col-resize",
                    backgroundColor: "white",
                }}
            />

            <div style={{ flex: 1, backgroundColor: "lightcoral", padding: "10px" }}>
            </div>
        </div>
    );
}
export default Chats;