import { API_ROOT } from "@/app/utils/config";
import { Payment } from "@prisma/client";

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
