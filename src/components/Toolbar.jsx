import { useReactFlow } from "reactflow";

export default function Toolbar({ onExpandAll, onCollapseAll }) {
  const { fitView } = useReactFlow();

  return (
    <div className="toolbar">
      <button className="toolbar-btn" onClick={onExpandAll}>
        Expand All
      </button>

      <button className="toolbar-btn" onClick={onCollapseAll}>
        Collapse All
      </button>

      <button className="toolbar-btn primary" onClick={() => fitView()}>
        Fit View
      </button>
    </div>
  );
}
