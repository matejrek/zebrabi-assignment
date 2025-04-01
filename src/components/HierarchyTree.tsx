import { useState } from 'react'
import { data, NodeItem } from '../data/data';
import TreeNode from './TreeNode';
import { computeHierarchyValues } from '../utils/hierarchyUtils';

const HierarchyTree = () => {
    const hierarchyData = computeHierarchyValues(data);
    const [nodes, setNodes] = useState<NodeItem[]>(hierarchyData);
    const [openNodeId, setOpenNodeId] = useState<string | null>(null);

    const handleToggleNodeControls = (nodeId: string) => {
        setOpenNodeId(prevNodeId => (prevNodeId === nodeId ? null : nodeId));
    };

    const findNodeById = (id: string, nodes: NodeItem[]): NodeItem | null => {
        for (let node of nodes) {
            if (node.id === id) {
                return node;
            }
            if (node.children) {
                const childNode = findNodeById(id, node.children);
                if (childNode) {
                    return childNode;
                }
            }
        }
        return null;
    }

    const handleToggleSkipNodeValue = (nodeId: string) => {
        setNodes(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData)) as NodeItem[];
            const toggleNode = findNodeById(nodeId, newData);
            if (toggleNode) {
                toggleNode.skip = !toggleNode.skip;
                if (toggleNode.skip) toggleNode.inverted = false;
            }
            return computeHierarchyValues(newData);
        });
    }

    const handleToggleInvertNodeValue = (nodeId: string) => {
        setNodes(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData)) as NodeItem[];
            const toggleNode = findNodeById(nodeId, newData);
            if (toggleNode && toggleNode.value) {
                toggleNode.inverted = !toggleNode.inverted;
                if (toggleNode.inverted) toggleNode.skip = false;
            }
            return computeHierarchyValues(newData);
        });
    }

    return (
        <div>
            <h2>Hierarchy Tree</h2>
            {
                nodes.map((node: NodeItem) => {
                    return (
                        <div className="tree-node-column" key={"column-" + node.id}>
                            <TreeNode
                                key={node.id}
                                node={node}
                                onSkipNode={handleToggleSkipNodeValue}
                                onInvertNode={handleToggleInvertNodeValue}
                                onToggleNodeControls={handleToggleNodeControls}
                                openNodeId={openNodeId}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default HierarchyTree;

