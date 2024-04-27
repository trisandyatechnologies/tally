

import React from 'react';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';

const { Title, Text } = Typography;

const UserDetailsCard: React.FC = () => {
    const { data: session, status } = useSession();
    const user = session?.user!;

    return (
        <div
            style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                backgroundColor: '#f0f5ff', // Sky blue background color
                marginBottom: '20px',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
                <UserOutlined style={{ fontSize: '36px', marginRight: '16px', color: '#1890ff' }} />
                <div>
                    <Title level={4} style={{ marginBottom: '8px', color: '#333' }}>
                        {user?.firmname}
                    </Title>
                    <Text style={{ fontSize: '14px', color: '#888' }}>{user?.email}</Text>
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div
                    style={{
                        backgroundColor: '#bae7ff', // Light blue background color
                        borderRadius: '5px',
                        padding: '5px',
                        marginRight: '10px',
                        marginBottom: '8px',
                    }}
                >
                    <Text strong style={{ fontSize: '14px', color: '#555', marginRight: '5px', fontWeight: 'bold' }}>
                        Owner:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#333' ,fontWeight:'bold', }}>{user?.owner}</Text>
                </div>
                <div
                    style={{
                        backgroundColor: '#bae7ff', // Light blue background color
                        borderRadius: '5px',
                        padding: '5px',
                        marginRight: '10px',
                        marginBottom: '8px',
                    }}
                >
                    <Text strong style={{ fontSize: '14px', color: '#555', marginRight: '5px' }}>
                        Address:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#333', fontWeight: 'bold', }}>{user?.address}</Text>
                </div>
                <div
                    style={{
                        backgroundColor: '#bae7ff', // Light blue background color
                        borderRadius: '5px',
                        padding: '5px',
                        marginRight: '10px',
                        marginBottom: '8px',
                    }}
                >
                    <Text strong style={{ fontSize: '14px', color: '#555', marginRight: '5px' }}>
                        GST No:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#333', fontWeight: 'bold', }}>{user?.gstNo}</Text>
                </div>
                <div
                    style={{
                        backgroundColor: '#bae7ff',
                        borderRadius: '5px',
                        padding: '5px',
                        marginRight: '10px',
                        marginBottom: '8px',
                    }}
                >
                    <Text strong style={{ fontSize: '14px', color: '#555', marginRight: '5px', fontWeight: 'bold' }}>
                        Phone:
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#333', fontWeight: 'bold', }}>{user?.phone}</Text>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsCard;
