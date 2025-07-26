"use client";
import { renderToString } from 'react-dom/server'

import React, { ReactDOM, useEffect, useState, useContext } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { ChevronRight, RotateCcw } from "lucide-react";
import Main from "../Main.jsx";
import { ConnContext } from "../context/ConnProvider.jsx";
import { ScriptContext } from "../context/ScriptProvider.jsx";

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
];

const TreeItem = ({ node, level = 0 }) => {
  const [isLabelEditing, setIsLabelEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(node.label || "");

  const getTypeColor = (type) => {
    switch (type) {
      case "topic":
        return "bg-blue-100 text-blue-700";
      case "toc":
        return "bg-blue-100 text-blue-700";
      case "shot":
        return "bg-green-100 text-green-700";
      case "scene":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "topic":
        return "主题";
      case "toc":
        return "目录";
      case "shot":
        return "分镜头";
      case "scene":
        return "镜号";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="flex items-start gap-3"
        style={{ paddingLeft: `${level * 24}px` }}
      >
        {level > 0 && (
          <div className="flex items-center mt-2">
            <div className="w-4 h-px bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 -ml-1"></div>
          </div>
        )}

        <div className="flex items-start gap-2 flex-1">
          {node.type !== "content" && (
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 mt-1 ${getTypeColor(node.type)}`}
            >
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
                <div
                  onClick={() => setIsLabelEditing(true)}
                  className="cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  {node.label}
                </div>
              )}
            </div>
            {(node.content || node.type === "content") && (
              <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                {node.content}
              </div>
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
  );
};

function recurScript(target) {
  if (target.type === "root") {
    const subNodes = [];
    for (const child of target.children) {
      subNodes.push(recurScript(child));
    }
    return React.createElement("div", { className: "pl-4" }, ...subNodes);
  } else if (target.type === "heading") {
    const value = recurScript(target.children);
    return React.createElement("div", {
      className: "text-lg font-bold text-gray-800 mt-4",
    }, value);
  } else if (target.type === "paragraph") {
    let childrenValues = [];
    for (const key of Object.keys(target)) {
      const value = recurScript(target[key]);
      childrenValues.push(React.createElement("div", { className: "pl-8" }, value));
    }
    return React.createElement("div", { className: "pl-8" }, ...childrenValues);
  } else if (target.type === "text") {
    console.log("Text node found:", target.value);
    return target.value;
  }
}

export default function Component() {
  const [open, setOpen] = useState(true);
  const [showMain, setShowMain] = useState(false);
  // const [editableScript, setEditableScript] = useState(<div>1234</div>);
  const { setWs } = useContext(ConnContext);
  const [outlineStream, setOutlineStream] = useState("");
  const { story, script, setScript } = useContext(ScriptContext);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      setWs(socket);
      // socket.send(
      //   JSON.stringify({ action: "generateOutline", content: story })
      // );
      setScript(`
# 赌命的阴谋

## 场景 1: 荒山的召唤

张三在二大爷的茶厂接到开荒任务，梦想着未来，信心满满。

## 场景 2: 村民的冷漠

张三抵达南方，试图召集村民开荒，却遭遇冷遇，情绪低落。

## 场景 3: 意外的金子

在开荒过程中，村民们挖到金子，改变了气氛，张三急忙介入争抢。

## 场景 4: 村民的贪婪

村民们为了金子互相争执，变得更加积极，纷纷上山开采。

## 场景 5: 张三的算计

张三用金子的诱惑驱使村民们，再次回到山中，暗怀阴谋。

## 场景 6: 纵火的夜晚

村民们晚上聚集山头疯狂挖掘，张三孤身一人感到无能为力。

## 场景 7: 疾病与阴谋

张三因劳累生病，村民们开采更加疯狂，他暗中观察局势。

## 场景 8: 捕获的陷阱

张三回到官府，向师爷报告金子的事，企图把村民推向深渊。

## 场景 9: 人性的扭曲

村民们因为矛盾相互揭发，张三悄然坐收渔翁之利，心中得意。

## 场景 10: 结局的冤屈

村民们被判刑，张三的阴谋终于得逞，然而代价是他们的无辜。
        `);
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.action === "generateText") {
        if (!message.data.isFinished) {
          setOutlineStream((stream) => {
            return stream + message.data.content;
          });
        } else {
          setOutlineStream((stream) => {
            console.log("Outline generation completed:", stream);
            setScript(stream);
            return stream;
          });
        }
      }
    };
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setWs(null);
    };
  }, []);

  useEffect(() => {
    console.log("Script changed:", script);
    if (script) {
      console.log("Script updated:", script);
      const scriptJson = unified().use(remarkParse).parse(script);
      console.log("Parsed script JSON:", scriptJson);
      
      // setEditableScript(recurScript(scriptJson));
    }
  }, [script]);

  if (showMain) {
    return <Main />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-lg font-medium text-gray-700">
              您可以在下方随意编辑大纲内容
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 h-full overflow-y-auto">
            <ScrollArea className="h-[500px] w-full rounded-lg bg-white p-6">
              <div className="space-y-6">
                {treeData.map((node) => (
                  <TreeItem key={node.id} node={node} />
                ))}
              </div>
            </ScrollArea>
            {/* {<Markdown>{outlineStream}</Markdown>} */}
            {/* {editableScript} */}
          </div>

          <div className="flex items-center justify-between p-6 pt-4 bg-gray-50">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
              重新解析剧本
            </Button>
            <Button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowMain(true)}
            >
              生成分镜脚本
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
