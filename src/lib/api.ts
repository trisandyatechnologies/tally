import { API_ROOT } from "@/utils/config";


import { User } from "@prisma/client";
import { message } from "antd";

export const getUser = async (userId: string) => {
  const user = await fetch(`${API_ROOT}users/${userId}`,{cache:"no-cache"}).then((res) =>
    res.json()
  );
  return user;
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

export const getAllGoodsSuppliers = async(userId: string) => {
    const apiUrl = `${API_ROOT}user/{userId}/goodsSuppliers`;
    const goodsSuppliers = await fetch(apiUrl, {cache: "no-cache"})
        .then((res) => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .catch((error) => {
            message.error(`Failed to fetch goods suppliers: ${error.message}`);
        });

        return goodsSuppliers;
}