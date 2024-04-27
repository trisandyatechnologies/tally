"use client";


import RecordCash from "@/components/PaymentForm";

import { useState } from "react";
import {redirect} from 'next/navigation';
import { useSession } from "next-auth/react";
import { Spin } from "antd";

export default function Payment() {

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

    return <RecordCash />;
}