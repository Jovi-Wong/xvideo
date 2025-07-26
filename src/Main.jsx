import { useState } from "react";
import SceneBar from "./components/SceneBar";
import VideoPreview from "./components/VideoPreview";
import PromptInput from "./components/PromptInput";
import ScriptInput from "./components/ScriptInput";

import scene1 from "../asset/image/scene-1.jpeg";
import scene2 from "../asset/image/scene-2.jpeg";
import scene3 from "../asset/image/scene-3.jpeg";
import scene4 from "../asset/image/scene-4.jpeg";

import video1 from "../asset/video/scene-1.mp4";
import video2 from "../asset/video/scene-2.mp4";
import video3 from "../asset/video/scene-3.mp4";
import video4 from "../asset/video/scene-4.mp4";

export default function Main() {
  const [selectedSceneId, setSelectedSceneId] = useState(1);
  const [sceneData, setSceneData] = useState([
    { id: 0, name: "外星人入侵地球", thumbnail: scene1, video: video1, aside: "这本来是地球又一个平静的日子，谁知突然来了一群开着银河战舰的外星人" },
    { id: 1, name: "哥哥用篮球反击", thumbnail: scene2, video: video2, aside: "地球人被炸的四散奔逃，坤哥一怒之下把篮球扔向了外星人的银河战舰" },
    { id: 2, name: "篮球击落银河战舰", thumbnail: scene3, video: video3, aside: "篮球势大力沉地击中了飞船，引发了剧烈爆炸" },
    { id: 3, name: "外星人向人类投降", thumbnail: scene4, video: video4, aside: "飞船被击落后落在了满是废墟的城市，外星人走出舱门向人类投降" },
  ]);

  // 交互 mock
  const handleSelectScene = (id) => setSelectedSceneId(id);
  const handleAddScene = (scene) => alert(`Add scene: ${scene.name}`);
  const handleDeleteScene = (id) => alert(`Delete scene: ${id}`);
  const handleReorderScenes = () => alert("Scenes reordered");
  const handleExport = () => alert("Export video");
  const handleShare = () => alert("Share video");
  const handleGenerate = (prompt) => alert(`Generate with prompt: ${prompt}`);
  const handleSaveScript = () => alert("Script saved!");

  return (
    <div className="flex w-full min-h-screen font-mono bg-white">
      <div className="w-96">
        <SceneBar
          sceneData={sceneData}
          setSceneData={setSceneData}
          selectedSceneId={selectedSceneId}
          handleSelectScene={handleSelectScene}
          handleAddScene={handleAddScene}
          handleDeleteScene={handleDeleteScene}
          handleReorderScenes={handleReorderScenes}
        />
      </div>

      <main className="grow flex flex-col gap-y-6 px-1">
        <VideoPreview
          onExport={handleExport}
          onShare={handleShare}
          image={sceneData[selectedSceneId].thumbnail}
          video={sceneData[selectedSceneId].video}
        />
        <PromptInput onGenerate={handleGenerate} />
      </main>
      <div className="w-64 p-6 bg-white">
        <ScriptInput sceneId={selectedSceneId} text={sceneData[selectedSceneId].aside} onSave={handleSaveScript} />
      </div>
    </div>
  );
}
