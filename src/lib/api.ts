



import { API_ROOT } from "@/utils/config";
import { User, Bill, GoodsSupplier ,Payment} from "@prisma/client";


export const getUser = async (userId: string) => {
    const user = await fetch(`${API_ROOT}users/${userId}`, { cache: "no-cache" }).then((res) =>
        res.json()
    );
    return user;
};






//Get all bills associated with the speicfic user and goodsSupplier
export const getAllBillsForUser = (
    userId: string,
    supplierId?: string,
    billType?: string,
    date?: string
): Promise<Bill[]> => {


    let apiUrl = `${API_ROOT}bill?userId=${userId}`;

    console.log("UserId in server", userId);

    if (supplierId) {
        console.log("supplierId in server", supplierId);
        apiUrl += `&supplierId=${supplierId}`;
    }

    if (billType) {
        apiUrl += `&billType=${billType}`;
    }

    if (date) {
        apiUrl += `&date=${date}`;
    }

    return fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        return data.bills as Bill[];
    }).catch((error) => {
        console.error('Error fetching bills:', error);
        throw error; 
    });
};


export const addBillForUser = async (orderBody: Partial<Bill>) => {
    const order = await fetch(`${API_ROOT}bill/new`, {
        method: "POST",
        body: JSON.stringify(orderBody),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return order;
};



export const getAllGoodsSuppliers = async (userId: string) => {
    const apiUrl = `${API_ROOT}supplier?userId=${userId}`;
    console.log("THis is apiUrl", apiUrl);
    const goodsSuppliers = await fetch(apiUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((error) => {
            console.error(`Failed to fetch goods suppliers: ${error.message}`);
        });
    console.log("goodsSuppliers are");
    console.log(apiUrl);
    console.log(goodsSuppliers);
    return goodsSuppliers;

}


export const createSupplier = async (orderBody: Partial<GoodsSupplier>) => {
    const order = await fetch(`${API_ROOT}supplier`, {
        method: "POST",
        body: JSON.stringify(orderBody),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return order;
};

// export const getSupplier = async () => {
//     const suppliers = await fetch(`${API_ROOT}supplier`).then((res) => res.json());
//     return suppliers;
// };

export const getSupplier = async () => {
    try {
        const suppliers = await fetch(`${API_ROOT}supplier`).then((res) => {
            if (!res.ok) {
                throw new Error('API request failed');
            }
            return res.json();
        });
        return suppliers;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


export const getBills = async () => {
    try {
        const bills = await fetch(`${API_ROOT}bill/view`).then((res) =>{
            if(!res.ok){
                throw new Error('API request failed');
            }
            return res.json();
        });
        console.log("Bills in API");
        return bills;
    }
    catch(error){
        console.error("Error fetching data", error);
        return null;
    }
};



export const updateUser = async (
    userId: string,
    updateBody: Partial<User>
): Promise<User> => {
    const user = await fetch(`${API_ROOT}users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updateBody),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return user;
};

export const createPayment = async (paymentBody: Payment) => {
    try {
        
        const response = await fetch(`${API_ROOT}payments`, {
            method: "POST",
            body: JSON.stringify(paymentBody),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("Error creating payments:", error);
    }
};
export const getPayments = async () => {
    try {
        const payments = await fetch(`${API_ROOT}payments`).then((res) =>
            res.json()
        );
        return payments;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
export const getPaymentById = async (paymentId: string) => {
    const payment = await fetch(`${API_ROOT}payments/${paymentId}`, {
        cache: "no-cache",
    }).then((res) => res.json());
    return payment;
};
export const updatePayment = async (
    paymentId: string,
    updateBody: Partial<Payment>
) => {
    const payment = await fetch(`${API_ROOT}payments/${paymentId}`, {
        method: "PUT",
        body: JSON.stringify(updateBody),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return payment;
};