import { API_ROOT } from "@/utils/config";
import { Payment, User } from "@prisma/client";
import { message } from "antd";

export const getUser = async (userId: string) => {
  const user = await fetch(`${API_ROOT}users/${userId}`, {
    cache: "no-cache",
  }).then((res) => res.json());
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
