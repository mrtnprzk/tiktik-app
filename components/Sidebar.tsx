import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const userProfile = false;

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded-full duration-500';

  return (
    <div>
        <div className='block xl:hidden m-2 ml-4 mt-3 text-xl' onClick={() => setShowSidebar(prevState => !prevState)}>
            {showSidebar ? <ImCancelCircle/> : <AiOutlineMenu/>}
        </div>
        {showSidebar && (
            <div className='w-20 flex flex-col justify-start mb-10 p-3 border-r-2 border-gray-100 xl:w-400 xl:border-0'>
                <div className='border-gray-200 xl:border-b-2 xl:pb-4'>
                    <Link href="/">
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome/>
                            </p>
                            <span className='text-xl hidden xl:block'>
                                For You
                            </span>
                        </div>
                    </Link>
                </div>
                <Discover/>
                <SuggestedAccounts/>
                <Footer/>
            </div>
        )}
    </div>
  )
}

export default Sidebar