import { Handle, Position } from "reactflow";
import { useState } from "react";

export default function CustomNode({ data }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`custom-node ${
        data.highlighted ? "highlighted-node" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Handle type="target" position={Position.Left} />

      <div className="node-title">{data.title}</div>

      {/* 🔥 Hover Card */}
      {hovered && data.summary && (
        <div className="node-tooltip">
          {data.summary}
        </div>
      )}

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
