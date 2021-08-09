import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { readFile } from '../../helpers/images';

const Photos = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, SetCrop] = useState({ x: 0, y: 0 });
  const [zoom, SetZoom] = useState(1);
  if (!imageSrc) {
    return (
      <>
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" />
      </>
    );
  }

  return (
    <Cropper
      crop={crop}
      zoom={zoom}
      aspect={1 / 1}
      onCropChange={SetCrop}
      onZoomChange={SetZoom}
      image={imageSrc}
    />
  );
};

export default Photos;
