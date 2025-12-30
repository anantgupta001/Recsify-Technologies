import { hierarchy, tree } from "d3-hierarchy";

export function buildGraph(data) {
  const root = hierarchy(data);

  const treeLayout = tree()
    .nodeSize([100, 250]); // [vertical, horizontal]

  treeLayout(root);

  const nodes = [];
  const edges = [];

  root.each((node) => {
    nodes.push({
      id: node.data.id,
      data: node.data,
      position: {
        x: node.y,
        y: node.x,
      },
      type: "custom",
    });

    if (node.parent) {
      edges.push({
        id: `e-${node.parent.data.id}-${node.data.id}`,
        source: node.parent.data.id,
        target: node.data.id,
      });
    }
  });

  return { nodes, edges };
}
