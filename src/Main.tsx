import React, { useState } from 'react';
import SceneBar from './components/SceneBar';
import VideoPreview from './components/VideoPreview';
import ScriptInput from './components/ScriptInput';
import PromptInput from './components/PromptInput';

interface Scene {
  id: string;
  title: string;
  thumbnail: string;
  script: string;
}

function App() {
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: '1',
      title: 'Introduction',
      thumbnail: 'https://via.placeholder.com/120x68/212528/FFFFFF?text=Intro',
      script: 'Welcome to our AI technology overview...'
    },
    {
      id: '2',
      title: 'Key Features',
      thumbnail: 'https://via.placeholder.com/120x68/212528/FFFFFF?text=Features',
      script: 'The key features of our new AI system include...'
    },
    {
      id: '3',
      title: 'Use Cases',
      thumbnail: 'https://via.placeholder.com/120x68/212528/FFFFFF?text=UseCases',
      script: 'Our AI can be applied in various domains such as...'
    },
  ]);
  
  const [currentSceneId, setCurrentSceneId] = useState<string>('1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  
  // Find current scene
  const currentScene = scenes.find(scene => scene.id === currentSceneId) || scenes[0];
  
  // Handlers
  const handleSceneSelect = (sceneId: string) => {
    setCurrentSceneId(sceneId);
  };
  
  const handleAddScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      title: `Scene ${scenes.length + 1}`,
      thumbnail: `https://via.placeholder.com/120x68/212528/FFFFFF?text=Scene${scenes.length + 1}`,
      script: ''
    };
    setScenes([...scenes, newScene]);
  };
  
  const handleRemoveScene = (sceneId: string) => {
    const newScenes = scenes.filter(scene => scene.id !== sceneId);
    setScenes(newScenes);
    if (currentSceneId === sceneId && newScenes.length > 0) {
      setCurrentSceneId(newScenes[0].id);
    }
  };
  
  const handleScriptChange = (script: string) => {
    const updatedScenes = scenes.map(scene => 
      scene.id === currentSceneId ? {...scene, script} : scene
    );
    setScenes(updatedScenes);
  };
  
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your AI video generation API
    console.log(`Generating video with prompt: ${prompt}`);
    // Reset prompt after submission
    setPrompt('');
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Drag and drop reordering
  const handleReorderScenes = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(scenes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setScenes(items);
  };
  
  return (
    <div className="app" style={{backgroundColor: '#182b3e'}}>
      <div className="app-container">
        <SceneBar 
          scenes={scenes}
          currentSceneId={currentSceneId}
          onSceneSelect={handleSceneSelect}
          onAddScene={handleAddScene}
          onRemoveScene={handleRemoveScene}
          onReorderScenes={handleReorderScenes}
        />
        <div className="main-content">
          <VideoPreview 
            currentScene={currentScene}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
          <PromptInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handlePromptSubmit}
          />
        </div>
        <ScriptInput 
          script={currentScene.script}
          onScriptChange={handleScriptChange}
        />
      </div>
    </div>
  );
}

export default App;
