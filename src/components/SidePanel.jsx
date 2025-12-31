import { useEffect, useState } from "react";

export default function SidePanel({ node, onUpdate, isOpen, onToggle }) {
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

  const handleChange = (key, value) => {
    // ✅ update local UI state
    setForm((prev) => ({ ...prev, [key]: value }));

    // ✅ update global data
    onUpdate(node.id, { [key]: value });
  };

  return (
    <div className={`side-panel ${isOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <div className="panel-toggle-wrapper">
        <button className="panel-toggle" onClick={onToggle}>
          {isOpen ? "❮" : "❯"}
        </button>
      </div>

      {isOpen && (
        <>
          {!node ? (
            <p className="empty-text">Select a node to edit details</p>
          ) : (
            <>
              <h3>Edit Node</h3>

              <label>Title</label>
              <input
                value={form.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
              />

              <label>Summary</label>
              <textarea
                rows={3}
                value={form.summary}
                onChange={(e) =>
                  handleChange("summary", e.target.value)
                }
              />

              <label>Details</label>
              <textarea
                rows={5}
                value={form.details}
                onChange={(e) =>
                  handleChange("details", e.target.value)
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
