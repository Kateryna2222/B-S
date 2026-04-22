import './ProductGallery.scss';
import { useState, useRef } from "react";

const ProductGallery = ({ images, setImages }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // setImages((prev) => [...prev, ...files]);
        setImages(prev => {
            const total = prev.length + files.length;

            if (total > 21) {
                alert(`Можна завантажити максимум ${21} фото`);
                return prev;
            }

            return [...prev, ...files];
        });

        if (!selectedImage && files.length > 0) {
            setSelectedImage(files[0]);
        }
    };

    return (
        <div className="ProductGallery">

            <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
            />

            <div className="uploadBox"
                 onClick={() => fileInputRef.current.click()}>
                <span>+ додати зображення</span>
            </div>

            <div className="imgs">
                {selectedImage && (
                    <div className="imgWrapper">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="main"
                            className="img"
                        />
                    </div>
                )}

                <ul>
                    {images.map((file, index) => (
                        <li className="miniImg" key={index}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                onClick={() => setSelectedImage(file)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductGallery;