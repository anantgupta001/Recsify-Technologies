import { useMemo, useState } from "react";
import { ReactFlowProvider, useReactFlow } from "reactflow";
import data from "./data/mindmap.json";
import { buildGraph } from "./utils/buildGraph";
import MindMap from "./components/MindMap";
import SidePanel from "./components/SidePanel";
import CustomNode from "./components/CustomNode";
import Toolbar from "./components/Toolbar";

/* ---------- helper ---------- */
const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
};

export default function App() {
  const [mindmapData, setMindmapData] = useState(data);
  const [selected, setSelected] = useState(null);
  const [collapsed, setCollapsed] = useState(new Set());

  /* ---------- build full graph ---------- */
  const { nodes, edges } = buildGraph(mindmapData);

  /* ---------- parent map ---------- */
  const parentMap = {};
  edges.forEach((e) => {
    parentMap[e.target] = e.source;
  });

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  /* ---------- node click (select + toggle) ---------- */
  const handleNodeClick = (node) => {
    setSelected(node);

    const fullNode = findNodeById(mindmapData, node.id);
    if (!fullNode?.children?.length) return;

    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(node.id) ? next.delete(node.id) : next.add(node.id);
      return next;
    });
  };

  /* ---------- visibility ---------- */
  const isHidden = (nodeId) => {
    let parent = parentMap[nodeId];
    while (parent) {
      if (collapsed.has(parent)) return true;
      parent = parentMap[parent];
    }
    return false;
  };

  const visibleNodes = nodes.map((n) => ({
    ...n,
    hidden: isHidden(n.id),
  }));

  const visibleEdges = edges.map((e) => ({
    ...e,
    hidden: isHidden(e.target),
  }));

  /* ---------- toolbar actions ---------- */
  const expandAll = () => setCollapsed(new Set());

  const collapseAll = () => {
    setCollapsed(new Set(Object.values(parentMap)));
  };

  const addChildNode = () => {
    if (!selected) return;

    const newNode = {
      id: `node-${Date.now()}`,
      title: "New Node",
      summary: "New summary",
      details: "New details",
      children: [],
    };

    const addRecursive = (node) => {
      if (node.id === selected.id) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(addRecursive),
        };
      }
      return node;
    };

    setMindmapData((prev) => addRecursive(prev));

    // ensure parent expands
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.delete(selected.id);
      return next;
    });
  };

  const downloadJSON = () => {
    const blob = new Blob(
      [JSON.stringify(mindmapData, null, 2)],
      { type: "application/json" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mindmap.json";
    link.click();
  };

  const updateNodeData = (nodeId, updatedFields) => {
    const updateRecursive = (node) => {
      if (node.id === nodeId) return { ...node, ...updatedFields };
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateRecursive),
        };
      }
      return node;
    };
    setMindmapData((prev) => updateRecursive(prev));
  };

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* LEFT */}
        <div style={{ flex: 1, position: "relative" }}>
          <Toolbar
            onExpandAll={expandAll}
            onCollapseAll={collapseAll}
            onAddNode={addChildNode}
            onDownload={downloadJSON}
          />

          <MindMap
            nodes={visibleNodes}
            edges={visibleEdges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* RIGHT */}
        <SidePanel node={selected} onUpdate={updateNodeData} />
      </div>
    </ReactFlowProvider>
  );
}
