import { Typography } from 'antd';
import React, { useState } from 'react';
import { patchBlock } from '../../../../client/notes/block';

const QuoteBlock = ({ block }) => {
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
        <Typography.Paragraph type={textContent === '' ? 'secondary' : ''} editable={{onChange: onChange, triggerType: ['text'], text: (
                textContent === '' ? 
                "Type text..." :
                textContent
            )}}
            style={{margin: 0}}>
            <blockquote style={{margin: 0}}>
            {
                textContent === '' ? 
                "Type text..." :
                textContent
            }
            </blockquote>
        </Typography.Paragraph>
    );
};

export default QuoteBlock;
