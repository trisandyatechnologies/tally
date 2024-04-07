
//app/user/bill/page.tsx
import react, { useState, useEffect } from 'react';
import GoodsSupplierSelect from '@/app/components/GoodsSupplierSelect'
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';   
import { Button } from 'antd';


const BillPage: React.FC = () => {

    const [selectSupplier, setSelectSupplier] = useState<string | null>(null);
    const {data: session, status} = useSession();
    const [userId,setUserId] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if(status === 'authenticated'){
           const userId = session?.user?.id;
           setUserId(userId);
        }
        else {
            router.push('/login')
        }
    }, [session, status])


    const handleSupplierSelect = (supplierId: string) => {
        setSelectSupplier(supplierId);
    }
    
    return (
        <div>
            <GoodsSupplierSelect userId={userId as string} onSupplierSelect={handleSupplierSelect} />
            {selectSupplier && (
                <div>
                    <Link href={{ pathname: "/users/bills/new", query: { userId } }} passHref>
                        <Button>Add a Bill</Button>
                    </Link>
                    <Link href={{ pathname: "/users/bills/view", query: { userId } }} passHref>
                        <Button>View Bills</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default BillPage;