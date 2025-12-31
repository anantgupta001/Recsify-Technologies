import { useMemo, useState } from "react";
import { ReactFlowProvider } from "reactflow";
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
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const { nodes, edges } = buildGraph(mindmapData);

  /* ---------- parent map ---------- */
  const parentMap = {};
  edges.forEach((e) => (parentMap[e.target] = e.source));

  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  /* ---------- node click ---------- */
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

  /* ---------- highlight ---------- */
  const getRelatedNodeIds = (nodeId) => {
    const related = new Set([nodeId]);
    const parent = parentMap[nodeId];
    if (parent) related.add(parent);
    edges.forEach((e) => {
      if (e.source === nodeId) related.add(e.target);
    });
    return related;
  };

  const relatedIds = selected
    ? getRelatedNodeIds(selected.id)
    : new Set();

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
    data: {
      ...n.data,
      highlighted: relatedIds.has(n.id),
    },
  }));

  const visibleEdges = edges.map((e) => ({
    ...e,
    hidden: isHidden(e.target),
    style: {
      stroke:
        selected &&
        (e.source === selected.id || e.target === selected.id)
          ? "#94a3b8"
          : "#e5e7eb",
      strokeWidth:
        selected &&
        (e.source === selected.id || e.target === selected.id)
          ? 1.2
          : 0.5,
    },
  }));

  /* ---------- toolbar actions ---------- */
  const expandAll = () => setCollapsed(new Set());
  const collapseAll = () =>
    setCollapsed(new Set(Object.values(parentMap)));

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

  const updateNodeData = (id, fields) => {
    const updateRecursive = (node) => {
      if (node.id === id) return { ...node, ...fields };
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
        <SidePanel
          node={selected}
          onUpdate={updateNodeData}
          isOpen={isPanelOpen}
          onToggle={() => setIsPanelOpen((p) => !p)}
        />
      </div>
    </ReactFlowProvider>
  );
}
