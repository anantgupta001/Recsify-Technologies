import { useMemo, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import data from "./data/mindmap.json";
import { buildGraph } from "./utils/buildGraph";
import MindMap from "./components/MindMap";
import SidePanel from "./components/SidePanel";
import CustomNode from "./components/CustomNode";
import Toolbar from "./components/Toolbar";

export default function App() {
  // 🔹 editable mindmap data (IMPORTANT)
  const [mindmapData, setMindmapData] = useState(data);

  const { nodes, edges } = buildGraph(mindmapData);

  // 🔹 parent map for collapse logic
  const parentMap = {};
  edges.forEach((e) => {
    parentMap[e.target] = e.source;
  });

  const [selected, setSelected] = useState(null);
  const [collapsed, setCollapsed] = useState(new Set());

  // 🔹 nodeTypes memoized
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  // 🔹 node click → select + toggle collapse
  const handleNodeClick = (node) => {
    setSelected(node);

    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(node.id)) next.delete(node.id);
      else next.add(node.id);
      return next;
    });
  };

  // 🔹 check if node should be hidden
  const isHidden = (nodeId) => {
    let parent = parentMap[nodeId];
    while (parent) {
      if (collapsed.has(parent)) return true;
      parent = parentMap[parent];
    }
    return false;
  };

  // 🔹 visible graph
  const visibleNodes = nodes.map((n) => ({
    ...n,
    hidden: isHidden(n.id),
  }));

  const visibleEdges = edges.map((e) => ({
    ...e,
    hidden: isHidden(e.target),
  }));

  // 🔹 toolbar actions
  const handleExpandAll = () => {
    setCollapsed(new Set());
  };

  const handleCollapseAll = () => {
    const allParents = new Set(Object.values(parentMap));
    setCollapsed(allParents);
  };

  // 🔹 update node data (EDIT FEATURE)
  const updateNodeData = (nodeId, updatedFields) => {
    const updateRecursive = (node) => {
      if (node.id === nodeId) {
        return { ...node, ...updatedFields };
      }

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
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        {/* LEFT: Mindmap */}
        <div style={{ flex: 1, height: "100%", position: "relative" }}>
          <Toolbar
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
          />

          <MindMap
            nodes={visibleNodes}
            edges={visibleEdges}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* RIGHT: Side Panel */}
        <SidePanel node={selected} onUpdate={updateNodeData} />
      </div>
    </ReactFlowProvider>
  );
}
