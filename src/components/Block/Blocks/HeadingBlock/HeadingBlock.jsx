import React, { useState } from 'react';

import { Typography } from 'antd';
import { patchBlock } from '../../../../client/notes/block';


const HeadingBlock = ({ block, level, inline=false }) => {
    const [textContent, setTextContent] = useState(block.properties.text[0][0]);

    const onChange = (text) => {
        setTextContent(text);

        patchBlock(block.id, {
            properties: {
                ...block.properties,
                text: [[text]],
            }
        })
    }

    return (
        <Typography.Title level={level} type={textContent === '' ? 'secondary' : ''} editable={{onChange: onChange, triggerType: ['text']}}>
            {
                textContent === '' ? 
                "Type text..." :
                textContent
            }
        </Typography.Title>
    );
};

export default HeadingBlock;