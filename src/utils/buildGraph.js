export function buildGraph(root) {
  const nodes = [];
  const edges = [];

  const traverse = (node, parentId = null, depth = 0) => {
    nodes.push({
      id: node.id,
      type: "custom",
      position: { x: depth * 250, y: nodes.length * 80 },
      data: {
        title: node.title,
        summary: node.summary,
        details: node.details,
      },
    });

    if (parentId) {
      edges.push({
        id: `${parentId}-${node.id}`,
        source: parentId,
        target: node.id,
      });
    }

    if (node.children) {
      node.children.forEach((child) =>
        traverse(child, node.id, depth + 1)
      );
    }
  };

  traverse(root);
  return { nodes, edges };
}
