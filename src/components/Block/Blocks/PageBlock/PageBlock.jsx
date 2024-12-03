import { Divider, Flex, Popover, Typography } from 'antd';
import React, { useState } from 'react';
import DraggableContainer from '../../DraggableContainer/DraggableContainer';
import Block from '../../Block';
import { BlockApi } from 'notes_service';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const apiInstance = new BlockApi();

const PageBlock = ({ block, inline=false }) => {
    const [blockData, setBlock] = useState(block);

    const patchContent = (content) => {
        if (blockData.content === content)
            return;
    
        blockData.content = content;

        setBlock({...blockData});
    
        apiInstance.updateBlockRouteBlockIdPut(blockData.id, {
            type: blockData.type,
            properties: blockData.properties,
            content: blockData.content,
            parent: blockData.parent,
        });
    }

    const patchProperties = (props) => {
        blockData.properties = {...blockData.properties, ...props};

        setBlock({...blockData});
    
        apiInstance.updateBlockRouteBlockIdPut(blockData.id, {
            type: blockData.type,
            properties: blockData.properties,
            content: blockData.content,
            parent: blockData.parent,
        });
    }

    if (!blockData) {
        return (
            <></>
        );
    }

    if (inline)
        return (
            <Typography.Link to={"/app/page/" + blockData.id}>{blockData.properties.title}</Typography.Link>
        );

    return (
        <>
            <h1 style={{paddingLeft: 12}}>
                <Flex gap="small">
                    <Popover content={
                        <Picker data={data} onEmojiSelect={(e) => patchProperties({emoji: e.native})} locale='ru' noResultsEmoji="page_facing_up" previewPosition="none"/>
                    } title="Выбор эмодзи" trigger="hover" placement="bottom">
                        <span style={{cursor: 'pointer'}}>
                        {blockData.properties.emoji}
                        </span>
                    </Popover>
                    <strong style={{width: '-webkit-fill-available'}}>
                    <Typography.Title editable={{onChange: (t) => patchProperties({title: t}), triggerType: ['text'], text: blockData.properties.title}} style={{width: '-webkit-fill-available', height: 'initial'}}>
                        {blockData.properties.title}
                    </Typography.Title>
                    </strong>
                </Flex>
            </h1>
            <Divider />
            {
                inline || blockData === null || blockData.content.length === 0 ?
                null :
                <DraggableContainer onUpdate={(reorderedItems) => patchContent(reorderedItems)}>
                {
                    blockData.content.map((data, i) => <Block id={data} key={data} inline/>)
                }
                </DraggableContainer>
            }
        </>
    );
};

export default PageBlock;