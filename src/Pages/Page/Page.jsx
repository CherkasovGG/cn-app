import React from 'react';
import Menu from './Menu/Menu';


const Page = ({ children }) => {
    return (
        <div className="flex row align-items-left w100vw h100vh" style={{padding: "50px"}}>
            <div className="flex column">
                <Menu />
            </div>
            <div style={{
                width: "-webkit-fill-available",
                padding: "50px 200px",
            }}>
                {children}
            </div>
        </div>
    );
};

export default Page;