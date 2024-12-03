import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { authClient } from '../../client/client';
// import Block from '../../components/Block/Block';
// import Page from '../Page/Page';

// const BBlock = () => {
//     const { pageId } = useParams();

//     const navigate = useNavigate();

//     return (<Block id={pageId} onError={() => navigate('/app')}/>);
// }

const AppPage = () => {
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        authClient
            .get('/user')
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                // navigate('/auth/signin');
            });
    }, []);

    if (!userData) {
        return (<></>);
    }

    return (
        <>
                    <h1>{userData.username}</h1>
                    <Divider />
                </>
    );

    // return (
    //     // <Page>
    //         // <Routes>
    //             {/* <Route path='/page/:pageId' element={<BBlock />}/> */}
    //             <>
    //                 <h1>{userData.username}</h1>
    //                 <Divider />
    //             </>
    //         // </Routes>
    //     // </Page>
    // );
};

export default AppPage;