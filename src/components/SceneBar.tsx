import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Scene {
  id: string;
  title: string;
  thumbnail: string;
  script: string;
}

interface SceneBarProps {
  scenes: Scene[];
  currentSceneId: string;
  onSceneSelect: (sceneId: string) => void;
  onAddScene: () => void;
  onRemoveScene: (sceneId: string) => void;
  onReorderScenes: (result: any) => void;
}

const SceneBar: React.FC<SceneBarProps> = ({
  scenes,
  currentSceneId,
  onSceneSelect,
  onAddScene,
  onRemoveScene,
  onReorderScenes
}) => {
  return (
    <div className="scene-bar">
      <div className="scene-bar-header">
        <h2>Scenes</h2>
        <button className="add-scene-btn" onClick={onAddScene}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
      <DragDropContext onDragEnd={onReorderScenes}>
        <Droppable droppableId="scenes">
          {(provided) => (
            <div
              className="scene-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {scenes.map((scene, index) => (
                <Draggable key={scene.id} draggableId={scene.id} index={index}>
                  {(provided) => (
                    <div
                      className={`scene-item ${currentSceneId === scene.id ? 'active' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => onSceneSelect(scene.id)}
                    >
                      <div className="scene-thumbnail">
                        <img src={scene.thumbnail} alt={scene.title} />
                      </div>
                      <div className="scene-info">
                        <div className="scene-title">{scene.title}</div>
                      </div>
                      <button 
                        className="remove-scene-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveScene(scene.id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SceneBar;
