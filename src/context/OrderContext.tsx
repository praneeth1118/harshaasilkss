"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "@/context/CartContext";

export type Order = {
  id: string;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
};

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const initialOrders: Order[] = [];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
