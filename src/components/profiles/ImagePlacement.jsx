'use client';
import { useState } from 'react';
import { SVGProfile } from '../static/Statics';

export default function ImagePlacement({ setImage }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="file-upload"
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className={`
          w-36 h-36
          lg:w-56 lg:h-56
          border-2 border-gray-300
          profile-glow
          rounded-full
          cursor-pointer
          transition-colors
          flex items-center justify-center
          overflow-hidden
          ${!preview ? 'bg-gray-50' : ''}
        `}
      >
        {preview ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${preview})` }}
          />
        ) : (
          <div className="text-gray-300 text-center">
            <SVGProfile />
          </div>
        )}
      </label>
    </div>
  );
}
