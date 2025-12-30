import { useReactFlow } from "reactflow";

export default function Toolbar({ onExpandAll, onCollapseAll }) {
  const { fitView } = useReactFlow();

  return (
    <div className="toolbar">
      <button onClick={onExpandAll}>Expand All</button>
      <button onClick={onCollapseAll}>Collapse All</button>
      <button onClick={() => fitView()}>Fit View</button>
    </div>
  );
}
