import { useState, useEffect } from "react";

export default function SidePanel({ node, onUpdate }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    details: "",
  });

  useEffect(() => {
    if (node) {
      setForm({
        title: node.title || "",
        summary: node.summary || "",
        details: node.details || "",
      });
    }
  }, [node]);

  if (!node) {
    return (
      <div className="panel">
        <h3>Select a node</h3>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(node.id, form);
    alert("Node updated");
  };

  return (
    <div className="panel">
      <h2>Edit Node</h2>

      <label>Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />

      <label>Summary</label>
      <input
        name="summary"
        value={form.summary}
        onChange={handleChange}
      />

      <label>Details</label>
      <textarea
        name="details"
        value={form.details}
        onChange={handleChange}
        rows={4}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}
