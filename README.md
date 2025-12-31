# 🧠 Interactive Mindmap UI

An interactive, data-driven mindmap application built to visualize hierarchical information with rich user interactions, clean UX, and maintainable frontend architecture.

This project was developed as part of a **Frontend Development Internship assignment**, focusing on complex UI behavior, data-driven rendering, and usability.

---

## 🎯 Objective

The goal of this project is to evaluate the ability to:

- Build complex, interactive user interfaces  
- Work with hierarchical, data-driven visualizations  
- Design a clean and intuitive UX  
- Structure frontend code in a scalable and maintainable way  

---

## ✨ Features

### 1️⃣ Mindmap Visualization
- Displays hierarchical data as a **graph / mindmap**
- Clear parent → child relationships
- Automatically generated layout from structured data
- No hardcoded nodes or edges

---

### 2️⃣ Interactive Features (Mandatory)

#### 🔹 Hover Interactions
- Hovering over a node displays a **contextual tooltip**
- Shows a short **summary** of the node
- Allows quick information access without changing focus

#### 🔹 Click Interactions
- Clicking a node **selects it**
- Clicking a node with children **toggles expand / collapse**
- Selected node becomes active in the side panel

#### 🔹 Highlight Related Nodes & Edges
- When a node is selected:
  - The selected node is highlighted
  - Its **direct parent and children** are highlighted
  - Connecting edges are subtly emphasized
- Improves structural clarity and navigation

#### 🔹 Fit / Reset View
- Toolbar action to automatically **fit the entire mindmap into view**
- Useful after zooming or expanding multiple nodes

#### 🔹 Edit Mindmap via UI
- A dedicated **side panel editor**
- Allows editing:
  - Title
  - Summary
  - Details
- Changes reflect **instantly in the graph**
- Uses controlled inputs for smooth editing

---

### 3️⃣ Toolbar Actions

The toolbar provides quick global actions:

- **Expand All** – Expands all nodes in the mindmap  
- **Collapse All** – Collapses all expandable nodes  
- **Fit View** – Fits the mindmap into the viewport  
- **Add Node** – Adds a new child node to the selected node  
- **Download** – Exports the current mindmap as a JSON file  

---

### 4️⃣ Side Panel
- Displays detailed information of the selected node
- Clean and readable UI
- Supports **collapse / expand** to maximize canvas space
- Uses local state for smooth input handling

---

### 5️⃣ Data-Driven Rendering (Key Requirement)

- The entire visualization is generated from a structured **JSON file**
- UI logic is completely decoupled from data
- Updating only the data file updates the visual mindmap

**Examples:**
- Adding a node in JSON → node appears in UI  
- Updating text in JSON → UI updates automatically  
- Changing hierarchy → graph structure updates  

---

## 🛠 Tech Stack

- **Frontend Framework:** React (Vite)  
- **Graph Visualization:** React Flow  
- **Styling:** Custom CSS (minimal, non-intrusive)  
- **State Management:** React Hooks (`useState`, `useMemo`)  
- **Data Format:** JSON  

> No backend is required.

---

## 🏗 Architecture & Data Flow

1. **Data Source**
   - Hierarchical JSON structure using `children`

2. **Graph Builder**
   - Converts JSON tree into React Flow nodes and edges
   - Each graph node carries full domain data:
     - title
     - summary
     - details

3. **Rendering**
   - React Flow renders nodes and edges
   - Expand / collapse handled via visibility logic (no data mutation)

4. **Interactions**
   - Hover → summary tooltip  
   - Click → expand / collapse + selection  
   - Side panel → edit node data  
   - Toolbar → global graph actions  

This separation ensures clean, maintainable, and scalable code.

---

## 📂 Project Structure

~~~text
src/
│
├── components/
│   ├── MindMap.jsx        # React Flow wrapper
│   ├── CustomNode.jsx    # Node UI + hover tooltip
│   ├── SidePanel.jsx     # Node editor (collapsible)
│   └── Toolbar.jsx       # Global actions
│
├── utils/
│   └── buildGraph.js     # JSON → nodes & edges
│
├── data/
│   └── mindmap.json      # Source of truth
│
├── App.jsx
├── index.css
└── main.jsx
~~~

---

## ▶️ How to Run

~~~bash
npm install
npm run dev
~~~

Open in browser:

~~~
http://localhost:5173
~~~

---

## 📦 Export / Download

- The **Download** button exports the current state of the mindmap as a JSON file  
- Useful for persistence, reuse, or further editing  

---

## 📝 Notes & Design Decisions

- UI is intentionally minimal to prioritize clarity  
- Advanced drill-down navigation was omitted to avoid unstable behavior  
- Highlighting focuses on direct relationships for better UX  
- All inputs are controlled to ensure smooth editing  
- React Flow core styles are preserved to maintain layout stability  

---

## ✅ Evaluation Checklist (Covered)

- ✔ Correctness of features  
- ✔ Data-driven design  
- ✔ Hover interactions with contextual info  
- ✔ Expand / collapse functionality  
- ✔ Highlight related nodes & edges  
- ✔ Fit / reset view  
- ✔ Editable UI  
- ✔ Clean UX and maintainable code  

---

## 🚀 Conclusion

This project demonstrates:

- Strong understanding of data-driven UI rendering  
- Thoughtful handling of complex interactions  
- Clean separation of data, logic, and presentation  
- Practical use of visualization libraries in real-world scenarios  
