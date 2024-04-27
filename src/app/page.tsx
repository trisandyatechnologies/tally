

"use client";

import HomePage from "@/components/Home";
import {useSession} from 'next-auth/react';
import {redirect} from 'next/navigation';
import {useState} from 'react';
import {Spin} from 'antd';



export default function Home() {

    const { data: session, status } = useSession();
    
    const [userIdFromSession, setUserIdFromSession] = useState<string>(status === 'authenticated' ? session?.user?.id : '');
    if (status === 'unauthenticated') {
        redirect('/signin');
    }

    const loaderStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(-50%,-50%)'

    };
    if (status === "loading") {
        return <div style={loaderStyle}><Spin size="large" tip="Loading..." /></div>;
    }

    return (
       <HomePage/>
    )
 
}
