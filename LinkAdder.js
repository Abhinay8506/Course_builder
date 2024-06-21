import React, { useState } from 'react';

const LinkAdder = ({ addResource }) => {
  const [link, setLink] = useState('');

  const handleAddLink = () => {
    if (link) {
      const newResource = { id: Date.now(), name: link, type: 'link', url: link };
      addResource(newResource);
      setLink('');
    }
  };

  return (
    <div class="link">
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Add a link"
      />
      <button onClick={handleAddLink}>Add Link</button>
    </div>
  );
};

export default LinkAdder;
