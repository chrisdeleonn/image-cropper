import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { readFile, saveCroppedImage } from '../../helpers/images';

const Photos = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, SetCrop] = useState({ x: 0, y: 0 });
  const [zoom, SetZoom] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
    setCroppedAreaPixels(_croppedAreaPixels);
  }, []);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.path);
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const handleSave = () => {
    // save cropped image
    // reset our imageSrc = null
    // new func that takes croppedAreaPixels, fileName, imageSrc
    saveCroppedImage(fileName, imageSrc, croppedAreaPixels);
    setImageSrc(null);
    SetZoom(1);
    SetCrop({ x: 0, y: 0 });
  };

  if (!imageSrc) {
    return (
      <>
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }

  return (
    <div className="crop-area">
      <Cropper
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={SetCrop}
        onZoomChange={SetZoom}
        onCropComplete={onCropComplete}
        image={imageSrc}
      />
      <button type="button" className="save-btn" onClick={handleSave}>
        SAVE
      </button>
    </div>
  );
};

export default Photos;
