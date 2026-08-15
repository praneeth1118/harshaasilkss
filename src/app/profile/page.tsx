"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/data";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";

type Address = {
  id: string;
  title: string;
  name: string;
  details: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "1",
    title: "Home",
    name: "John Doe",
    details: "123 Silk Lane, Appt 4B\nNew York, NY 10001\nUnited States",
    isDefault: true,
  },
  {
    id: "2",
    title: "Office",
    name: "John Doe",
    details: "456 Corporate Blvd, Suite 200\nSan Francisco, CA 94105\nUnited States",
    isDefault: false,
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { logout } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { orders } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isEditingAddress, setIsEditingAddress] = useState<string | boolean>(false);

  const handleSaveUserDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const formData = new FormData(e.currentTarget);
    const updated = {
      firstName: (formData.get("firstName") as string) || userDetails.firstName,
      lastName: (formData.get("lastName") as string) || userDetails.lastName,
      email: (formData.get("email") as string) || userDetails.email,
      phone: (formData.get("phone") as string) || userDetails.phone,
    };

    setTimeout(() => {
      setUserDetails(updated);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 500);
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const name = formData.get('name') as string;
    const details = formData.get('details') as string;
    
    if (typeof isEditingAddress === 'string') {
      // Edit existing
      setAddresses(addresses.map(a => a.id === isEditingAddress ? { ...a, title, name, details } : a));
    } else {
      // Add new
      setAddresses([...addresses, { 
        id: Math.random().toString(), 
        title, 
        name, 
        details, 
        isDefault: addresses.length === 0 
      }]);
    }
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 bg-[var(--color-brand-ivory)]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] text-center lg:text-left">
          My <span className="text-[var(--color-brand-maroon)] italic">Account</span>
        </h1>
      </div>

      {/* Dashboard Split */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-16 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Sidebar Menu (Left Column) */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-6">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`cursor-pointer hover:bg-black/5 py-2 text-left text-sm tracking-widest uppercase transition-colors pl-4 border-l-2 ${
                activeTab === 'orders' 
                  ? 'text-[var(--color-brand-maroon)] font-semibold border-[var(--color-brand-maroon)]' 
                  : 'text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] border-transparent'
              }`}
            >
              Order History
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`cursor-pointer hover:bg-black/5 py-2 text-left text-sm tracking-widest uppercase transition-colors pl-4 border-l-2 ${
                activeTab === 'details' 
                  ? 'text-[var(--color-brand-maroon)] font-semibold border-[var(--color-brand-maroon)]' 
                  : 'text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] border-transparent'
              }`}
            >
              Account Details
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`cursor-pointer hover:bg-black/5 py-2 text-left text-sm tracking-widest uppercase transition-colors pl-4 border-l-2 ${
                activeTab === 'addresses' 
                  ? 'text-[var(--color-brand-maroon)] font-semibold border-[var(--color-brand-maroon)]' 
                  : 'text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] border-transparent'
              }`}
            >
              Saved Addresses
            </button>
            <button 
              type="button"
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="cursor-pointer hover:bg-black/5 py-2 text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] pl-4 text-sm tracking-widest uppercase transition-colors mt-8 text-left"
            >
              Log Out
            </button>
          </nav>
        </div>

        {/* Content (Right Column) */}
        <div className="flex-1">
          {activeTab === 'orders' && (
            <>
              <h2 className="font-heading text-3xl text-[var(--color-brand-dark)] mb-8 pb-4 border-b border-black/10">
                Recent Orders
              </h2>
              
              <div className="flex flex-col gap-6">
                {orders.length === 0 ? (
                  <div className="bg-white p-12 text-center shadow-sm border border-black/5 mt-8">
                    <p className="font-heading text-2xl text-[var(--color-brand-charcoal)] mb-6">You haven&apos;t placed any orders yet.</p>
                    <Link href="/collections" className="bg-[var(--color-brand-dark)] text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors inline-block">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <div key={order.id} className="bg-white shadow-sm border border-black/5 transition-all">
                        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 flex-1">
                            <div>
                              <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Order Number</p>
                              <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)] font-medium">{order.id}</p>
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Date</p>
                              <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)]">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Total Price</p>
                              <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)] font-medium">{formatPrice(order.total)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Status</p>
                              <span className={`inline-block px-3 py-1 text-[10px] sm:text-xs tracking-widest uppercase rounded-sm border font-medium ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-50 border-green-200 text-green-800' 
                                  : 'bg-amber-50 border-amber-200 text-amber-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="shrink-0 md:pl-6 md:border-l border-black/10 pt-4 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0 flex items-center gap-4">
                            <button 
                              onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                              className="cursor-pointer text-sm uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors underline-offset-4 hover:underline"
                            >
                              {isExpanded ? "Hide Details" : "View Details"}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Items Mini-Grid */}
                        {isExpanded && order.items && order.items.length > 0 && (
                          <div className="border-t border-black/10 bg-black/[0.02] p-6 sm:p-8 animate-in fade-in duration-300">
                            <h4 className="text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] mb-4 font-semibold">
                              Items in this Order ({order.items.reduce((acc, it) => acc + (it.quantity || 1), 0)})
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {order.items.map((item, idx) => (
                                <div key={item.id || idx} className="bg-white p-4 border border-black/5 shadow-2xs flex gap-4 items-center">
                                  <div className="relative w-16 h-20 shrink-0 bg-[var(--color-brand-silk)] overflow-hidden">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-heading text-sm text-[var(--color-brand-dark)] truncate">{item.name}</h5>
                                    <p className="text-xs text-[var(--color-brand-charcoal)] uppercase tracking-wider">{item.category}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs">
                                      <span className="text-[var(--color-brand-charcoal)] font-body">Qty: <span className="font-semibold text-[var(--color-brand-dark)]">{item.quantity || 1}</span></span>
                                      <span className="font-body text-[var(--color-brand-dark)] font-medium">{formatPrice(item.price)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}

          {activeTab === 'details' && (
            <>
              <h2 className="font-heading text-3xl text-[var(--color-brand-dark)] mb-8 pb-4 border-b border-black/10">
                Account Details
              </h2>
              <div className="bg-white p-6 sm:p-8 shadow-sm border border-black/5 max-w-2xl">
                <form className="flex flex-col gap-6" onSubmit={handleSaveUserDetails}>
                  {saveSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-sm flex items-center gap-2 animate-in fade-in">
                      <span>✓</span> Account details updated successfully.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        required
                        defaultValue={userDetails.firstName} 
                        className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        required
                        defaultValue={userDetails.lastName} 
                        className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      defaultValue={userDetails.email} 
                      className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      defaultValue={userDetails.phone} 
                      className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="cursor-pointer mt-4 bg-[var(--color-brand-maroon)] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[var(--color-brand-dark)] transition-colors self-start disabled:opacity-60"
                  >
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </>
          )}

          {activeTab === 'addresses' && (
            <>
              <h2 className="font-heading text-3xl text-[var(--color-brand-dark)] mb-8 pb-4 border-b border-black/10 flex justify-between items-end">
                <span>Saved Addresses</span>
                {isEditingAddress === false && (
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="cursor-pointer text-sm tracking-widest uppercase text-[var(--color-brand-maroon)] hover:text-[var(--color-brand-dark)] transition-colors font-body mb-1"
                  >
                    + Add New
                  </button>
                )}
              </h2>
              
              {isEditingAddress !== false ? (
                <div className="bg-white p-6 sm:p-8 shadow-sm border border-black/5 max-w-2xl">
                  <h3 className="font-semibold text-[var(--color-brand-dark)] mb-6">
                    {typeof isEditingAddress === 'string' ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <form className="flex flex-col gap-6" onSubmit={handleSaveAddress}>
                    {(() => {
                      const editAddr = typeof isEditingAddress === 'string' 
                        ? addresses.find(a => a.id === isEditingAddress) 
                        : null;
                      
                      return (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Title (e.g., Home, Office)</label>
                              <input required name="title" type="text" defaultValue={editAddr?.title || ''} className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" />
                            </div>
                            <div>
                              <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Full Name</label>
                              <input required name="name" type="text" defaultValue={editAddr?.name || ''} className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2">Address Details (Street, City, Zip, Country)</label>
                            <textarea required name="details" rows={4} defaultValue={editAddr?.details || ''} className="w-full border border-black/10 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors resize-none" />
                          </div>
                          <div className="flex gap-4 mt-4">
                            <button type="submit" className="cursor-pointer bg-[var(--color-brand-maroon)] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[var(--color-brand-dark)] transition-colors">
                              Save Address
                            </button>
                            <button type="button" onClick={() => setIsEditingAddress(false)} className="cursor-pointer border border-black/20 text-[var(--color-brand-dark)] px-8 py-3 text-sm tracking-widest uppercase hover:bg-black/5 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`bg-white p-6 shadow-sm border transition-colors relative ${
                        address.isDefault ? 'border-[var(--color-brand-maroon)]' : 'border-black/5 hover:border-black/20'
                      }`}
                    >
                      {address.isDefault && (
                        <div className="absolute top-0 right-0 bg-[var(--color-brand-maroon)] text-white text-[10px] uppercase tracking-widest px-2 py-1">
                          Default
                        </div>
                      )}
                      <h3 className="font-semibold text-[var(--color-brand-dark)] mb-2">{address.title}</h3>
                      <p className="text-sm text-[var(--color-brand-charcoal)] leading-relaxed whitespace-pre-line">
                        {address.name}<br/>
                        {address.details}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4">
                          <button onClick={() => setIsEditingAddress(address.id)} className="cursor-pointer text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors underline underline-offset-4">Edit</button>
                          <button onClick={() => handleDeleteAddress(address.id)} className="cursor-pointer text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-red-600 transition-colors underline underline-offset-4">Delete</button>
                        </div>
                        {!address.isDefault && (
                          <button onClick={() => handleSetDefault(address.id)} className="cursor-pointer text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] transition-colors">
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {addresses.length === 0 && (
                    <div className="col-span-full py-12 text-center text-[var(--color-brand-charcoal)] border border-dashed border-black/20">
                      No saved addresses. Add one to checkout faster.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
