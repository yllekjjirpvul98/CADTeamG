import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div style={{ paddingTop: '1%', marginLeft: '10%', marginRight: '10%'}}>
            <Navbar/>
            <br />
            {children}
        </div>
    )
}
