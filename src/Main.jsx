import React, { useState } from 'react';
import SceneBar from './components/SceneBar';
import VideoPreview from './components/VideoPreview';
import PromptInput from './components/PromptInput';
import ScriptInput from './components/ScriptInput';

export default function Main() {
  const [selectedSceneId, setSelectedSceneId] = useState(1);

  // 交互 mock
  const handleSelectScene = (id) => setSelectedSceneId(id);
  const handleAddScene = (scene) => alert(`Add scene: ${scene.name}`);
  const handleDeleteScene = (id) => alert(`Delete scene: ${id}`);
  const handleReorderScenes = (scenes) => alert('Scenes reordered');
  const handleExport = () => alert('Export video');
  const handleShare = () => alert('Share video');
  const handleGenerate = (prompt) => alert(`Generate with prompt: ${prompt}`);
  const handleSaveScript = (script) => alert('Script saved!');

  return (
    <div className="flex w-full min-h-screen font-sans bg-[#f4f6f8]" style={{lineHeight:1.4}}>
      <SceneBar
        selectedSceneId={selectedSceneId}
        onSelect={handleSelectScene}
        onAdd={handleAddScene}
        onDelete={handleDeleteScene}
        onReorder={handleReorderScenes}
      />
      <main className="flex flex-col flex-grow gap-y-6 p-6">
        <VideoPreview onExport={handleExport} onShare={handleShare} />
        <PromptInput onGenerate={handleGenerate} />
      </main>
      <ScriptInput sceneId={selectedSceneId} onSave={handleSaveScript} />
    </div>
  );
} 
