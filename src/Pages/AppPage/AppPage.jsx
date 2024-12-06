import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import Block from '../../components/Block/Block';
import Page from '../Page/Page';
import { getUser } from '../../client/auth/user';

const BBlock = () => {
    const navigate = useNavigate();
    const { pageId } = useParams();
    const location = useLocation();
    const [key, setKey] = useState(pageId);

    useEffect(() => {
        setKey(pageId);
    }, [location.pathname]);

    return (
        <Block key={key} id={pageId} onError={() => navigate('/app')} />
    );
}

const AppPage = () => {
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
            .then((data) => {
                setUserData(data);
            })
            .catch((e) => {
                navigate('/auth/signin');
            });
    }, []);

    if (!userData) {
        return (<></>);
    }

    return (
        <Page>
            <Routes>
                <Route path='/page/:pageId' element={<BBlock />} />
            </Routes>
        </Page>
    );
};

export default AppPage;