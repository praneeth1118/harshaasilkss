export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Kanchipuram" | "Banarasi" | "Bridal" | "Designer";
  image: string;
  images?: string[];
  isNew?: boolean;
  fabric: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "The Royal Maroon Kanchipuram",
    price: 45000,
    category: "Bridal",
    image: "/images/collection_bridal.png",
    isNew: true,
    fabric: "Pure Kanchipuram Silk",
    color: "Deep Maroon",
  },
  {
    id: "p2",
    name: "Vintage Gold Tissue Banarasi",
    price: 32000,
    category: "Banarasi",
    image: "/images/collection_kanchi.png",
    fabric: "Tissue Silk",
    color: "Gold",
  },
  {
    id: "p3",
    name: "Midnight Blue Zari Brocade",
    price: 55000,
    category: "Kanchipuram",
    image: "/images/hero.png",
    fabric: "Kanchipuram Silk",
    color: "Midnight Blue",
  },
  {
    id: "p4",
    name: "Emerald Green Heritage Weave",
    price: 28500,
    category: "Kanchipuram",
    image: "/images/heritage.png",
    isNew: true,
    fabric: "Silk Blend",
    color: "Emerald Green",
  },
  {
    id: "p5",
    name: "Ivory & Gold Classic Drape",
    price: 38000,
    category: "Designer",
    image: "/images/collection_bridal.png",
    fabric: "Organza Silk",
    color: "Ivory",
  },
  {
    id: "p6",
    name: "Crimson Red Temple Border",
    price: 41000,
    category: "Bridal",
    image: "/images/collection_kanchi.png",
    fabric: "Pure Kanchipuram Silk",
    color: "Crimson Red",
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
