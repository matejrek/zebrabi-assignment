import { NodeItem } from "../data/data"

interface TreeNodeProps {
    node: NodeItem;
    onSkipNode: (id: string) => void;
    onInvertNode: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSkipNode, onInvertNode }) => {

    return (
        <>
            <div className="node">
                {node.name} <strong data-skip={node.skip} data-inverted={node.inverted}>{node.sumValue ? node.sumValue : node.value}</strong>
                {/*CONTROLS*/}
                {

                    node.depth && node.depth > 1 ?
                        <span className="node-controls">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!node.skip}
                                    onChange={() => onSkipNode(node.id)}
                                /> Skip
                            </label>
                            <label style={{ marginLeft: '0.5em' }}>
                                <input
                                    type="checkbox"
                                    checked={!!node.inverted}
                                    onChange={() => onInvertNode(node.id)}
                                /> Invert
                            </label>
                        </span>

                        : ''
                }
                {/*RENDER CHILDREN*/}
                {
                    node.children && node.children.map((childNode: NodeItem) => {
                        return (
                            <TreeNode key={childNode.id} node={childNode} onSkipNode={onSkipNode} onInvertNode={onInvertNode} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default TreeNode;