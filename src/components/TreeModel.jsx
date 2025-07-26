"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"
import { ChevronRight, RotateCcw } from "lucide-react"
import Main from "../Main.jsx";


const treeData = [
  {
    id: "1",
    label: "《青春校园》剧本分镜转换",
    type: "topic",
  },
  {
    id: "2",
    label: "分镜大纲",
    type: "toc",
    children: [
      { id: "2-1", label: "1. 开场序幕 - 校园晨光", type: "content" },
      { id: "2-2", label: "2. 主角登场 - 教室相遇", type: "content" },
      { id: "2-3", label: "3. 冲突升级 - 走廊争执", type: "content" },
      { id: "2-4", label: "4. 情感转折 - 天台对话", type: "content" },
      { id: "2-5", label: "5. 结局升华 - 毕业典礼", type: "content" },
    ],
  },
]

const TreeItem = ({ node, level = 0 }) => {
  const [isLabelEditing, setIsLabelEditing] = useState(false)
  const [editLabel, setEditLabel] = useState(node.label || "")

  const getTypeColor = (type) => {
    switch (type) {
      case "topic":
        return "bg-blue-100 text-blue-700"
      case "toc":
        return "bg-blue-100 text-blue-700"
      case "shot":
        return "bg-green-100 text-green-700"
      case "scene":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "topic":
        return "主题"
      case "toc":
        return "目录"
      case "shot":
        return "分镜头"
      case "scene":
        return "镜号"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3" style={{ paddingLeft: `${level * 24}px` }}>
        {level > 0 && (
          <div className="flex items-center mt-2">
            <div className="w-4 h-px bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 -ml-1"></div>
          </div>
        )}

        <div className="flex items-start gap-2 flex-1">
          {node.type !== "content" && (
            <Badge variant="outline" className={`text-xs px-2 py-1 mt-1 ${getTypeColor(node.type)}`}>
              {getTypeLabel(node.type)}
            </Badge>
          )}

          <div className="flex-1 mt-1">
            <div className="text-sm font-medium text-gray-900 leading-relaxed">
              {isLabelEditing ? (
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="w-full p-1 rounded text-sm h-auto border-none outline-none bg-gray-50"
                  autoFocus
                  onBlur={() => setIsLabelEditing(false)}
                />
              ) : (
                <div onClick={() => setIsLabelEditing(true)} className="cursor-pointer hover:bg-gray-50 p-1 rounded">
                  {node.label}
                </div>
              )}
            </div>
            {(node.content || node.type === "content") && (
              <div className="text-sm text-gray-600 mt-1 leading-relaxed">{node.content}</div>
            )}
          </div>
        </div>
      </div>

      {node.children && (
        <div className="space-y-2">
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Component() {
  const [open, setOpen] = useState(true)
  const [showMain, setShowMain] = useState(false); 
 if (showMain) {
    return <Main />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-lg font-medium text-gray-700">您可以在下方随意编辑大纲内容</DialogTitle>
          </DialogHeader>

          <div className="px-6">
            <ScrollArea className="h-[500px] w-full rounded-lg bg-white p-6">
              <div className="space-y-6">
                {treeData.map((node) => (
                  <TreeItem key={node.id} node={node} />
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center justify-between p-6 pt-4 bg-gray-50">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              重新解析剧本
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setShowMain(true)}>
              生成分镜脚本
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
