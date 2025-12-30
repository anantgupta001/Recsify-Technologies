import { useEffect, useState } from "react";

export default function SidePanel({ node, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    details: "",
  });

  useEffect(() => {
    if (node) {
      setForm({
        title: node.data.title || "",
        summary: node.data.summary || "",
        details: node.data.details || "",
      });
    }
  }, [node]);

  if (!node) {
    return (
      <div className="side-panel">
        <p>Select a node to see details</p>
      </div>
    );
  }

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    onUpdate(node.id, { [key]: value });
  };

  return (
    <div className="side-panel">
      <h3>Edit Node</h3>

      <label>Title</label>
      <input
        value={form.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <label>Summary</label>
      <textarea
        rows={3}
        value={form.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />

      <label>Details</label>
      <textarea
        rows={5}
        value={form.details}
        onChange={(e) => handleChange("details", e.target.value)}
      />
    </div>
  );
}
