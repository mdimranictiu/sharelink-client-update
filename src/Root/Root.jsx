import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../sharedComponents/NavBar';
import Footer from '../sharedComponents/Footer';

const Root = () => {
    return (
        <>
        <div>
        <NavBar></NavBar>
        <div className='w-4/5 max-md:w-[90%] max-sm:w-[90%] my-5 mx-auto'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </div>
        </>
    );
};

export default Root;