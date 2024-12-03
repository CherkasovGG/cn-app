import { Typography } from 'antd';
import React from 'react';
import { BlockApi } from 'notes_service';
import DraggableContainer from '../../DraggableContainer/DraggableContainer';
import Block from '../../Block';


const apiInstance = new BlockApi();

const FolderBlock = ({ block, inline=false }) => {
    const patchContent = (content) => {
        if (block.content === content)
          return;
    
        block.content = content;
    
        apiInstance.updateBlockRouteBlockIdPut(block.id, {
          type: block.type,
          properties: block.properties,
          content: block.content,
          parent: block.parent,
        });
    }

    return (
        <>
            <Typography.Paragraph>
                <strong>
                {block.properties.title}
            </strong>
            </Typography.Paragraph>
            {
                block === null || block.content.length === 0 ?
                null :
                <DraggableContainer onUpdate={(reorderedItems) => patchContent(reorderedItems)}>
                {
                    block.content.map((data, i) => <Block id={data} key={data} inline/>)
                }
                </DraggableContainer>
            }
        </>
    );
};

export default FolderBlock;