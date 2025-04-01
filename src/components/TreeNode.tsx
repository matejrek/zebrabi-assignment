import { NodeItem } from "../data/data"

interface TreeNodeProps {
    node: NodeItem;
    onSkipNode: (id: string) => void;
    onInvertNode: (id: string) => void;
    onToggleNodeControls: (id: string) => void;
    openNodeId: string | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSkipNode, onInvertNode, onToggleNodeControls, openNodeId }) => {
    const isOpen = node.id === openNodeId;

    return (
        <>
            <div className={`node ${node.depth === 1 ? 'base-node' : 'child-node'} ${node.skip ? 'skip' : ''}`}>
                <div className="node-head">
                    <span className="name">{node.name}</span> <span className="value">{node.sumValue ? node.sumValue : node.value}</span>
                </div>
                {/*CONTROLS*/}
                {

                    node.depth && node.depth > 1 ?
                        <div className="node-tools">
                            <button onClick={() => onToggleNodeControls(node.id)} className="material-symbols-outlined">
                                settings
                            </button>
                            {isOpen && (

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
                            )}
                        </div>
                        : ''
                }
                {/*RENDER CHILDREN*/}
                {
                    node.children && node.children.map((childNode: NodeItem) => {
                        return (
                            <TreeNode key={childNode.id} node={childNode} onSkipNode={onSkipNode} onInvertNode={onInvertNode} onToggleNodeControls={onToggleNodeControls} openNodeId={openNodeId} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default TreeNode;