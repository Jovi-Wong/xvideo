import React, { useState } from 'react';

const initialScenes = [
  {
    id: 1,
    name: 'Scene 1',
    thumbnail: 'https://static.paraflowcontent.com/public/resource/image/730fefd7-26ad-4113-8df7-f8b4f9b08538.jpeg',
  },
  {
    id: 2,
    name: 'Scene 2',
    thumbnail: 'https://static.paraflowcontent.com/public/resource/image/fd6403ec-912c-43f1-9844-142bf31e95a9.jpeg',
  },
  {
    id: 3,
    name: 'Scene 3',
    thumbnail: 'https://static.paraflowcontent.com/public/resource/image/198c55bf-1742-4462-89c4-1d451480118e.jpeg',
  },
  {
    id: 4,
    name: 'Scene 4',
    thumbnail: 'https://static.paraflowcontent.com/public/resource/image/fd154611-fa4a-412f-b420-6fbe3b477b14.jpeg',
  },
];

export default function SceneBar({ selectedSceneId, onSelect, onAdd, onDelete, onReorder }) {
  const [scenes, setScenes] = useState(initialScenes);
  const [draggedId, setDraggedId] = useState(null);

  const handleAdd = () => {
    const newId = scenes.length ? Math.max(...scenes.map(s => s.id)) + 1 : 1;
    const newScene = {
      id: newId,
      name: `Scene ${newId}`,
      thumbnail: scenes[0]?.thumbnail,
    };
    setScenes([...scenes, newScene]);
    onAdd && onAdd(newScene);
  };

  const handleDelete = (id) => {
    setScenes(scenes.filter(s => s.id !== id));
    onDelete && onDelete(id);
  };

  const handleDragStart = (id) => setDraggedId(id);
  const handleDragOver = (e, id) => { e.preventDefault(); };
  const handleDrop = (id) => {
    if (draggedId === null || draggedId === id) return;
    const fromIdx = scenes.findIndex(s => s.id === draggedId);
    const toIdx = scenes.findIndex(s => s.id === id);
    const reordered = [...scenes];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setScenes(reordered);
    setDraggedId(null);
    onReorder && onReorder(reordered);
  };

  return (
    <aside className="border-r flex flex-col gap-y-3 w-60 p-6 bg-[#f4f6f8]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-[#070b11]">Scenes</h3>
        <button onClick={handleAdd} className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#212528]">
          <i className="fas fa-plus text-white" />
        </button>
      </div>
      {scenes.map(scene => (
        <div
          key={scene.id}
          className={`scene-thumbnail flex flex-col gap-y-1.5 p-3 rounded-lg bg-white cursor-pointer ${selectedSceneId === scene.id ? 'active' : ''}`}
          style={selectedSceneId === scene.id ? { border: '2px solid #212528' } : {}}
          onClick={() => onSelect && onSelect(scene.id)}
          draggable
          onDragStart={() => handleDragStart(scene.id)}
          onDragOver={e => handleDragOver(e, scene.id)}
          onDrop={() => handleDrop(scene.id)}
        >
          <img src={scene.thumbnail} alt={scene.name} className="w-full h-[120px] object-cover rounded" />
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#070b11]">{scene.name}</span>
            <div className="flex gap-x-1.5">
              <div className="flex justify-center items-center w-6 h-6 cursor-move"><i className="fas fa-up-down-left-right text-xs text-[#888a8b]" /></div>
              <button className="flex justify-center items-center w-6 h-6" onClick={e => { e.stopPropagation(); handleDelete(scene.id); }}><i className="fas fa-trash text-xs text-[#888a8b]" /></button>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
} 
