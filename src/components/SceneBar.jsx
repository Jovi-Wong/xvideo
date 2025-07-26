import { useState } from "react";

import PropTypes, { object } from "prop-types";

SceneBar.propTypes = {
  sceneData: PropTypes.arrayOf(object).isRequired,
  setSceneData: PropTypes.func.isRequired,
  selectedSceneId: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onReorder: PropTypes.func,
};

export default function SceneBar({
  sceneData,
  setSceneData,
  selectedSceneId,
  onSelect,
  onAdd,
  onDelete,
  onReorder,
}) {
  const [draggedId, setDraggedId] = useState(null);

  const handleAdd = () => {
    const newId = sceneData.length
      ? Math.max(...sceneData.map((s) => s.id)) + 1
      : 1;
    const newScene = {
      id: newId,
      name: `Scene ${newId}`,
      thumbnail: sceneData[0]?.thumbnail,
    };
    setSceneData([...sceneData, newScene]);
    onAdd && onAdd(newScene);
  };

  const handleDelete = (id) => {
    setSceneData(sceneData.filter((s) => s.id !== id));
    onDelete && onDelete(id);
  };

  const handleDragStart = (id) => setDraggedId(id);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (id) => {
    if (draggedId === null || draggedId === id) return;
    const fromIdx = sceneData.findIndex((s) => s.id === draggedId);
    const toIdx = sceneData.findIndex((s) => s.id === id);
    const reordered = [...sceneData];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setSceneData(reordered);
    setDraggedId(null);
    onReorder && onReorder(reordered);
  };

  return (
    <aside className="w-full hide-scrollbar flex flex-col gap-y-3 p-6 bg-white overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-[#070b11]">Scenes</h3>
        <button
          onClick={handleAdd}
          className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#212528]"
        >
          <i className="fas fa-plus text-white" />
        </button>
      </div>
      {sceneData.map((scene) => (
        <div
          key={scene.id}
          className={`scene-thumbnail flex flex-col gap-y-1.5 p-3 rounded-lg bg-white cursor-pointer ${selectedSceneId === scene.id ? "active" : ""}`}
          style={
            selectedSceneId === scene.id ? { border: "2px solid #212528" } : {}
          }
          onClick={() => onSelect && onSelect(scene.id)}
          draggable
          onDragStart={() => handleDragStart(scene.id)}
          onDragOver={(e) => handleDragOver(e, scene.id)}
          onDrop={() => handleDrop(scene.id)}
        >
          <img
            src={scene.thumbnail}
            alt={scene.name}
            className="w-full h-[120px] object-cover rounded"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-[#070b11]">
              {scene.name}
            </span>
            <div className="flex gap-x-1.5">
              <div className="flex justify-center items-center w-6 h-6 cursor-move">
                <i className="fas fa-up-down-left-right text-xs text-[#888a8b]" />
              </div>
              <button
                className="flex justify-center items-center w-6 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(scene.id);
                }}
              >
                <i className="fas fa-trash text-xs text-[#888a8b]" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
