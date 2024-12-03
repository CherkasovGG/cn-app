import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Page from '../Page/Page';
import Block from '../../components/Block/Block';


const WorkSpace = () => {
    const { pageId } = useParams();

    const navigate = useNavigate();;

    const onError = (err) => {
        navigate('/app/page/');
    };

    return (
        <Page>
            {
                pageId === undefined ? 
                null :
                <Block id={pageId} onError={onError}/>
            }
        </Page>
    );
};

export default WorkSpace;