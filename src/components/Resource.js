import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Resource = ({ resource, deleteResource, renameResource }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [resourceName, setResourceName] = useState(resource.name);

  const [, drag] = useDrag({
    type: 'resource',
    item: { id: resource.id },
  });

  return (
    <div className="resource" ref={drag}>
      {isEditing ? (
        <input
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            renameResource(resource.id, resourceName);
          }}
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>{resource.name}</p>
      )}
      <div className="resource-actions">
        <FaEdit onClick={() => setIsEditing(true)} />
        <FaTrash onClick={() => deleteResource(resource.id)} />
      </div>
    </div>
  );
};

export default Resource;
