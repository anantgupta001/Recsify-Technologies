import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

export default function MindMap({
  nodes,
  edges,
  nodeTypes,
  onNodeClick,
}) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => onNodeClick(node)}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={32} size={1} color="#1e293b" />
      </ReactFlow>
    </div>
  );
}
