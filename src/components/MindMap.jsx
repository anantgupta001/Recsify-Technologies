import ReactFlow, { Background } from "reactflow";
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
      proOptions={{ hideAttribution: true }}
    >
      <Background />
    </ReactFlow>
  );
}
