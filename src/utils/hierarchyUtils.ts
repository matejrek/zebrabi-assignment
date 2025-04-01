import { hierarchy } from "d3";
import { NodeItem } from "../data/data";

export function computeHierarchyValues(data: NodeItem[]): NodeItem[] {
    const root = hierarchy<NodeItem>(
        { id: '0', name: 'root', children: data },
        (d) => d.children
    );

    root.eachAfter(node => {
        const nodeData = node.data;
        nodeData.depth = node.depth;

        if (node.children && node.children.length > 0) {
            const childrenValues = node.children.map((child) => {
                if (child.data.skip) return 0;

                if (child.data.value) {
                    if (child.data.inverted) {
                        node
                        return -child.data.value;
                    }
                }
                return child.data.value ?? 0
            });

            const sum = Number(childrenValues.reduce((a, b) => a + b, 0).toFixed(1));
            nodeData.sumValue = sum;
        }
        else {
            if (nodeData.skip) return 0;
            if (nodeData.value) {
                if (nodeData.inverted) {
                    nodeData.sumValue = -nodeData.value;
                    return -nodeData.value;
                }
                else {
                    nodeData.sumValue = nodeData.value;
                    return nodeData.value;
                }
            }
        }
    });

    return root.data.children ?? [];
}