"use client";

import NewBillForm from "@/components/NewBillForm";
import { Button, Spin } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";



const CreateBill: React.FC = () => {

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
        <>
            <div style={{display:"flex", marginBottom: "20px" , color:"darkblue" , justifyContent:'flex-end'}}>
                <Button style={{ background: "skyblue" ,fontWeight:"bolder",}}><Link href='/supplier'>Add a new Supplier</Link></Button>
            </div>
            
            <NewBillForm />
        </>
      
    )
}


export default CreateBill;
