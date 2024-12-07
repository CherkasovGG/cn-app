import React, { useState } from 'react';

import { Checkbox, Typography } from 'antd';
import { patchBlock } from '../../../../client/notes/block';


const CheckBoxBlock = ({ block }) => {
    const [textContent, setTextContent] = useState(block.properties.text[0][0]);
    const [checked, setChecked] = useState(block.properties.checked ? block.properties.checked[0][0] : false);

    const onChange = (prop, val) => {
        if (prop === "text")
            setTextContent(val);
        else 
            setChecked(val);

        patchBlock(block.id, {
            properties: {
                ...block.properties,
                [prop]: [[val]],
            }
        })
    }

    return (
        <Checkbox onChange={(e) => onChange("checked", e.target.checked)} checked={checked}>
            <Typography.Text type={textContent === '' ? 'secondary' : ''} editable={{onChange: (t) => onChange("text", t), triggerType: ['text']}}>
            
            {
                textContent === '' ? 
                "Type text..." :
                textContent
            }
        </Typography.Text>
        </Checkbox>
    );
};

export default CheckBoxBlock;
