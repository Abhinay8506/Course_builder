import React, { useState } from 'react';
import Resource from './Resource';
import ResourceUploader from './ResourceUploader';
import LinkAdder from './LinkAdder';
import { useDrop } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';

const Module = ({ module, setModules, modules }) => {
  const [resources, setResources] = useState(module.resources);
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const [, drop] = useDrop({
    accept: 'resource',
    drop: (item) => moveResource(item.id, module.id),
  });

  const moveResource = (resourceId, targetModuleId) => {
    const sourceModule = modules.find((m) => m.resources.find((r) => r.id === resourceId));
    const resource = sourceModule.resources.find((r) => r.id === resourceId);
    sourceModule.resources = sourceModule.resources.filter((r) => r.id !== resourceId);
    const targetModule = modules.find((m) => m.id === targetModuleId);
    targetModule.resources.push(resource);
    setModules([...modules]);
  };

  const deleteModule = () => {
    setModules(modules.filter((m) => m.id !== module.id));
  };

  const addResource = (newResource) => {
    setResources([...resources, newResource]);
    module.resources.push(newResource);
    setModules([...modules]);
  };

  const deleteResource = (resourceId) => {
    const updatedResources = resources.filter((resource) => resource.id !== resourceId);
    setResources(updatedResources);
    module.resources = updatedResources;
    setModules([...modules]);
  };

  const renameResource = (resourceId, newName) => {
    const updatedResources = resources.map((resource) =>
      resource.id === resourceId ? { ...resource, name: newName } : resource
    );
    setResources(updatedResources);
    module.resources = updatedResources;
    setModules([...modules]);
  };

  return (
    <div className="module" ref={drop}>
      <div className="module-header">
        {isEditing ? (
          <input
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              module.name = moduleName;
              setModules([...modules]);
            }}
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{module.name}</h2>
        )}
        <button onClick={() => addResource({ id: Date.now(), name: 'New Resource', type: 'link' })}>
          Add Resource
        </button>
        <ResourceUploader addResource={addResource} />
        <LinkAdder addResource={addResource} />
        <FaTrash onClick={deleteModule} />
      </div>
      <div className="resources">
        {resources.map((resource) => (
          <Resource
            key={resource.id}
            resource={resource}
            deleteResource={deleteResource}
            renameResource={renameResource}
          />
        ))}
      </div>
    </div>
  );
};

export default Module;
