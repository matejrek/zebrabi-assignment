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

        if (nodeData.skip) {
            nodeData.sumValue = 0;
        } else {
            if (node.children?.length) {

                nodeData.sumValue = node.children.reduce((sum, child) => sum + (child.data.sumValue ?? 0), 0);
            } else {
                nodeData.sumValue = nodeData.value ?? 0;
            }
        }

        if (nodeData.inverted) {
            nodeData.sumValue = -nodeData.sumValue;
        }

        nodeData.sumValue = Number(nodeData.sumValue.toFixed(1));
    });

    return root.data.children ?? [];
}