import { Handle, Position } from "reactflow";
import { useState } from "react";

export default function CustomNode({ data }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="node-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* NODE */}
      <div className="node">
        <strong>{data.title}</strong>
      </div>

      {/* TOOLTIP */}
      {hovered && (
        <div className="tooltip">
          <strong>{data.title}</strong>
          <p>{data.summary}</p>
        </div>
      )}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
