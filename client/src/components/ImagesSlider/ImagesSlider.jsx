import { useState, useRef, useEffect, memo } from 'react';
import './ImagesSlider.scss';

const ImagesSlider = ({images, setImages, currentIndex, setCurrentIndex}) => {
    const BASE_URL = 'http://localhost:3000/products/';

    const fileInputRef = useRef(null);

    const currentImage = images[currentIndex];
    const isServerImage = currentImage?.image_url;
    const isNewImage = currentImage?.preview;

    const goToPrevious = () => {
        if (!images.length) return;

        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (!images.length) return;

        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };


    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setImages(prev => {
            const updated = [...prev, ...files];
            setCurrentIndex(updated.length - 1);
            return updated;
        });
    };


    // const handleDelete = () => {
    //     if (!images.length) return;

    //     const imageToRemove = images[currentIndex];

    //     if (imageToRemove?.preview) {
    //         URL.revokeObjectURL(imageToRemove.preview);
    //     }

    //     setImages(prev => {
    //         const updated = prev.filter((_, i) => i !== currentIndex);

    //         setCurrentIndex(prevIndex => {
    //             if (updated.length === 0) return 0;
    //             if (prevIndex >= updated.length) return updated.length - 1;
    //             return prevIndex;
    //         });

    //         return updated;
    //     });
    // };

    const handleDelete = () => {
        const img = images[currentIndex];

        if (img?.preview) {
            URL.revokeObjectURL(img.preview);
        }

        const updated = images.filter((_, i) => i !== currentIndex);

        setImages(updated);

        setCurrentIndex(prev =>
            updated.length === 0
                ? 0
                : prev >= updated.length
                ? updated.length - 1
                : prev
        );
    };


    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.preview) {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, []);


    return (

        <>
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

            {
                images?.length > 0?
                    <div className="imagesSliderContainer">
                        <div className="imagesSlides">
                            <div className="leftArrow" onClick={goToPrevious}>&#8249;</div>
                            {/* <div
                                className="imagesSlide"
                                style={{
                                    backgroundImage: currentImage?.preview
                                        ? `url(${currentImage.preview})`
                                        : currentImage?.image_url
                                        ? `url(${BASE_URL}${currentImage.image_url})`
                                        : 'none'
                                }}
                            /> */}
                            <div
                                className="imagesSlide"
                                style={{
                                    backgroundImage: isNewImage
                                        ? `url(${currentImage.preview})`
                                        : isServerImage
                                        ? `url(${BASE_URL}${currentImage.image_url})`
                                        : 'none'
                                }}
                            />
                            <button className='deleteImg' onClick={handleDelete}>
                                &#x2716;
                            </button>
                            {console.log('RERENDER ImageSLIDER')}
                            <div className="rightArrow" onClick={goToNext}>&#8250;</div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
};

export default memo(ImagesSlider);