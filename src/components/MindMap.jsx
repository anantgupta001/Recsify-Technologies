import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function MindMap({
  nodes,
  edges,
  nodeTypes,
  onNodeClick,
}) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodeClick={(_, node) => onNodeClick(node.data)}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
