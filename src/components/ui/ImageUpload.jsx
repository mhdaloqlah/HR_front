import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

function ImageUpload({ control }) {
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <Controller
        name="image"
        control={control}
        render={({ field: { ref, name, onBlur, onChange } }) => (
          <div>
            <input
              type="file"
              ref={ref}
              name={name}
              onBlur={onBlur}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);

                // Generate image preview
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setPreview(null); // Reset preview if no file is selected
                }
              }}
            />
          </div>
        )}
      />

      {/* Display image preview */}
      {preview && (
        <div>
          <h4>Image Preview:</h4>
          <img src={preview} alt="Selected" style={{ maxWidth: '300px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
