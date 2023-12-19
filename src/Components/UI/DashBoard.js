import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumb } from '../Redux/Reducers';
import { convertFileToBase64 } from "../../Utils/convertFileToBase64";

const DashBoard = (props) => {
    const PagePath = [{ href: "/", title: 'Trang chủ' }];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBreadcrumb(PagePath));
    }, []);

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = async (event) => {
        const images = await convertFileToBase64(event.target.files);
        setSelectedImages(images);
    };

    const handleUpload = async () => {
        console.log(selectedImages);
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} multiple />
            {selectedImages && <img src={selectedImages[0].base64} alt="Preview" style={{ maxWidth: '100%' }} />}
            <button onClick={handleUpload}>Upload Ảnh</button>
        </div>
    );
}
export default DashBoard;