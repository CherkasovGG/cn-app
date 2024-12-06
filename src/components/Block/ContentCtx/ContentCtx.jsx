import React, { useEffect, useState } from 'react';
import Block from '../Block';
import DraggableContainer from '../DraggableContainer/DraggableContainer';

import { Button } from 'antd';
import { createBlock } from '../../../client/notes/block';

const ContentCtx = ({ block, onUpdate, inline=false }) => {
    const [blockData, setBlockData] = useState(block);
    
    useEffect(() => {
        setBlockData(block);
    }, [block]);

    const newBlock = () => {
        createBlock({
            parent: block.id,
            type: 'text',
            properties: { text: [['']] },
            content: [],
        })
            .then(data => {
                const newBlockData = {
                    ...blockData
                };

                setBlockData(newBlockData);
            })
    }

    return (
        <>
        <div key={blockData.id + blockData.content}>
            <DraggableContainer onUpdate={onUpdate}>
                {
                    blockData.content.map((data, i) => <Block id={data} key={data} inline={inline}/>)
                }
            </DraggableContainer>
        </div>
        {
            blockData.content.length === 0 && blockData.type !== "page" && blockData.type !== "workspace" ?
            null :
            <Button icon="+" style={{'width': "auto", marginTop: '12px'}} type='dashed' onClick={newBlock}/>
        }
        {/* <BlockSceleton id={"skeleton-" + block.id} key={"skeleton-" + block.id} className={classes.skeleton}/> */}
        </>
    );
};

export default ContentCtx;