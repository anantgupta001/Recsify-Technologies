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
        <h3 className="panel-title">Node Details</h3>
        <p className="panel-muted">Select a node to view or edit details</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(node.id, form);
  };

  return (
    <div className="panel">
      <h3 className="panel-title">Edit Node</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter node title"
        />
      </div>

      <div className="form-group">
        <label>Summary</label>
        <input
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Short summary (shown on hover)"
        />
      </div>

      <div className="form-group">
        <label>Details</label>
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          rows={5}
          placeholder="Detailed explanation of this node"
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}
