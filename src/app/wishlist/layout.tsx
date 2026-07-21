import { ReactNode } from "react";

export const metadata = {
  title: "Your Wishlist | Harshaa Silks",
  description: "View your saved heirloom pieces.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
