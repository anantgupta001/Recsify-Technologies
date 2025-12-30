import { Handle, Position } from "reactflow";

export default function CustomNode({ data }) {
  return (
    <div className="custom-node" title={data.summary}>
      <Handle type="target" position={Position.Left} />
      <div>{data.title}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
