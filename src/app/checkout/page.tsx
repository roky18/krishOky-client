"use client";

import Link from "next/link";
import { CreditCard, Leaf, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();
  const { t } = useLanguage();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const deliveryFee = cartItems.length > 0 ? 80 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-28 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-500">
              <Leaf size={16} />
              {t("নিরাপদ অর্ডার", "Secure order")}
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">
              {t("চেকআউট", "Checkout")}
            </h1>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-500 hover:text-white dark:text-emerald-400"
          >
            <ShoppingBag size={18} />
            {t("আরও পণ্য দেখুন", "Continue shopping")}
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
            <ShoppingBag className="mx-auto mb-4 text-emerald-500" size={42} />
            <h2 className="text-2xl font-black">
              {t("আপনার কার্ট খালি", "Your cart is empty")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {t(
                "বীজ, সার বা কৃষি সরঞ্জাম যোগ করে অর্ডার সম্পন্ন করুন।",
                "Add seeds, fertilizer, or farm tools to complete an order.",
              )}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item._id}
                  className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-lg font-black">
                      {t(item.title.bn, item.title.en)}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.category} - {t("পরিমাণ", "Quantity")}:{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                      ৳{item.price * item.quantity}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                      className="rounded-xl border border-red-200 p-3 text-red-500 transition hover:bg-red-500 hover:text-white dark:border-red-400/30"
                      aria-label={t("কার্ট থেকে সরান", "Remove from cart")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h2 className="text-xl font-black">
                {t("অর্ডার সারাংশ", "Order summary")}
              </h2>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {t("সাবটোটাল", "Subtotal")}
                  </span>
                  <span className="font-bold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {t("ডেলিভারি", "Delivery")}
                  </span>
                  <span className="font-bold">৳{deliveryFee}</span>
                </div>
                <div className="border-t border-zinc-200 pt-3 dark:border-white/10">
                  <div className="flex justify-between text-lg font-black">
                    <span>{t("মোট", "Total")}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ৳{total}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600"
              >
                <CreditCard size={20} />
                {t("অর্ডার কনফার্ম করুন", "Confirm order")}
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
