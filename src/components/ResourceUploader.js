import React from 'react';

const ResourceUploader = ({ addResource }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newResource = { id: Date.now(), name: file.name, type: 'file', file };
      addResource(newResource);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default ResourceUploader;
