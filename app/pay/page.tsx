import type { Metadata } from "next";
import Payment from "@/components/Payment";

export const metadata: Metadata = {
  title: "Payment — BLACK-MAK",
  description:
    "Payment details for approved BLACK-MAK projects. Transfer via your preferred method, then send the confirmation on WhatsApp.",
  robots: { index: false, follow: false },
};

// Payment rails live here — sent to the client after the proposal is
// approved, never on the storefront.
export default function PayPage() {
  return (
    <main className="pt-[76px]">
      <Payment />
    </main>
  );
}
