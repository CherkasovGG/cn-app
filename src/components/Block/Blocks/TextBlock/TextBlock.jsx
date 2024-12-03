import React, { memo, useState } from 'react';

import { Typography } from 'antd';
import DraggableContainer from '../../DraggableContainer/DraggableContainer';
import { BlockApi } from 'notes_service';
import Block from '../../Block';


const apiInstance = new BlockApi();

const BlockText = ({ block }) => {
    const [textContent, setTextContent] = useState(block.properties.text[0][0]);

    const onChange = (text) => {
        setTextContent(text);
    }

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
            <Typography.Text editable={{onChange: onChange, triggerType: ['text']}}>{textContent}</Typography.Text>
            {
                block === null || block.content.length == 0 ?
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

export default memo(BlockText);
