import { useState } from 'react'
import { Paperclip, ArrowUp } from "lucide-react"
import logo from './imgs/logo.png'
import jitoka from './imgs/jitoka.jpeg'
import lowpoly from './imgs/lowpoly.jpg'
import pixel from './imgs/pixel.jpeg'
import TreeModel from './components/TreeModel.jsx'
import Main from "./Main.jsx";

export default function HomePage() {
  const [showTreeModel, setShowTreeModel] = useState(false);
  const [showMain, setShowMain] = useState(false); 
  // 1. 上传附件功能函数
  const handleUploadAttachment =  (event) => {
    // 创建一个隐藏的文件输入框
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // 这里可以处理文件上传逻辑
        alert(`已选择文件: ${file.name}`);
        // 例如：上传到服务器、显示预览等
      }
    };
    input.click();
  }

  // 2. 输入指令功能函数
  // 这里可以获取输入框的内容并处理
  // 例如：发送到后端、执行某个操作等
  // alert('指令已发送');
  const handleSendCommand =  () => {
   setShowTreeModel(true)
  }

 if (showMain) {
    return <Main />;
  }
  if (showTreeModel) {
    return <TreeModel />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
        <div className="flex items-center gap-4 mb-4">
  <img src={logo} alt="XVideo Logo" className="w-20 h-20" />
  <h1 className="text-6xl font-bold text-gray-900">AI-generated long videos</h1>
</div>
          <p className="text-xl text-gray-600 mb-12">Your stories deserve more than just words</p>

          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <input
                  placeholder="Input your article for AI video creation"
                  className="input flex-1 input-ghost focus:outline-none focus:ring-0"
                  type="text"
                />
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost border-0"
                    size="sm"
                    onClick={handleUploadAttachment}
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                      className="btn btn-ghost border-0"
                      size="sm"
                      onClick={handleSendCommand}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Pixel Art Style */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 p-4">
              <img
                src={pixel}
                alt="Pixel Art Style"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">pixel art style</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>42</span>
                </div>
              </div>
            </div>
          </div>

          {/* Retro Style */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-red-50 p-4">
              <img src={jitoka} alt="Retro Style" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">retro style</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>38</span>
                </div>
              </div>
            </div>
          </div>

          {/* Low Poly Style */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-teal-50 p-4">
              <img src={lowpoly} alt="Low Poly Style" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">low poly style</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>56</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
