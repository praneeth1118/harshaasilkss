"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { products as initialProducts, Product } from "@/lib/data";

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  amount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  itemsCount: number;
  city: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  status: "Active" | "Inactive";
  ordersCount: number;
}

export interface StoreSettings {
  storeName: string;
  contactEmail: string;
  shippingRate: number;
  supportPhone: string;
  currency: string;
}

const initialOrdersList: AdminOrder[] = [
  {
    id: "#ORD-9512",
    customerName: "Ananya Rao",
    customerEmail: "ananya.rao@example.com",
    date: "Aug 14, 2026",
    amount: 45000,
    status: "Delivered",
    itemsCount: 1,
    city: "Hyderabad",
  },
  {
    id: "#ORD-9450",
    customerName: "Priyanka Sharma",
    customerEmail: "priyanka.s@example.com",
    date: "Aug 13, 2026",
    amount: 32000,
    status: "Processing",
    itemsCount: 1,
    city: "Bangalore",
  },
  {
    id: "#ORD-9304",
    customerName: "Meera Reddy",
    customerEmail: "meera.reddy@example.com",
    date: "Aug 12, 2026",
    amount: 58000,
    status: "Shipped",
    itemsCount: 2,
    city: "Chennai",
  },
  {
    id: "#ORD-9211",
    customerName: "Sunita Verma",
    customerEmail: "sunita.v@example.com",
    date: "Aug 10, 2026",
    amount: 28500,
    status: "Delivered",
    itemsCount: 1,
    city: "Mumbai",
  },
  {
    id: "#ORD-8924",
    customerName: "Kavita Nair",
    customerEmail: "kavita.nair@example.com",
    date: "Aug 09, 2026",
    amount: 64000,
    status: "Pending",
    itemsCount: 2,
    city: "Delhi",
  },
  {
    id: "#ORD-8710",
    customerName: "Radhika Sen",
    customerEmail: "radhika.sen@example.com",
    date: "Aug 08, 2026",
    amount: 41000,
    status: "Processing",
    itemsCount: 1,
    city: "Kolkata",
  },
];

const initialCustomersList: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Ananya Rao",
    email: "ananya.rao@example.com",
    totalSpent: 125000,
    status: "Active",
    ordersCount: 3,
  },
  {
    id: "cust-2",
    name: "Priyanka Sharma",
    email: "priyanka.s@example.com",
    totalSpent: 78000,
    status: "Active",
    ordersCount: 2,
  },
  {
    id: "cust-3",
    name: "Meera Reddy",
    email: "meera.reddy@example.com",
    totalSpent: 94000,
    status: "Active",
    ordersCount: 2,
  },
  {
    id: "cust-4",
    name: "Sunita Verma",
    email: "sunita.v@example.com",
    totalSpent: 28500,
    status: "Inactive",
    ordersCount: 1,
  },
  {
    id: "cust-5",
    name: "Kavita Nair",
    email: "kavita.nair@example.com",
    totalSpent: 165000,
    status: "Active",
    ordersCount: 4,
  },
];

const initialStoreSettings: StoreSettings = {
  storeName: "Harshaa Silks",
  contactEmail: "concierge@harshaasilks.com",
  shippingRate: 0,
  supportPhone: "+91 98765 43210",
  currency: "INR (₹)",
};

interface AdminContextType {
  adminProducts: Product[];
  adminOrders: AdminOrder[];
  adminCustomers: AdminCustomer[];
  storeSettings: StoreSettings;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, newStatus: AdminOrder["status"]) => void;
  deleteCustomer: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminProducts, setAdminProducts] = useState<Product[]>(initialProducts);
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(initialOrdersList);
  const [adminCustomers, setAdminCustomers] = useState<AdminCustomer[]>(initialCustomersList);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(initialStoreSettings);

  const addProduct = (product: Product) => {
    setAdminProducts((prev) => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setAdminProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (
    orderId: string,
    newStatus: AdminOrder["status"]
  ) => {
    setAdminOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setAdminCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider
      value={{
        adminProducts,
        adminOrders,
        adminCustomers,
        storeSettings,
        addProduct,
        deleteProduct,
        updateOrderStatus,
        deleteCustomer,
        updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
