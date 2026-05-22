// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Bot, Loader2, Send, Sparkles, Sprout, X } from "lucide-react";
// import { askAIChatbot } from "@/services/aiApi";
// import { useLanguage } from "@/context/LanguageContext";

// type ChatMessage = {
//   id: string;
//   role: "user" | "ai";
//   text: string;
//   language: "Bangla" | "English";
// };

// const hasBanglaText = (value: string) => /[\u0980-\u09FF]/.test(value);

// const getMessageLanguage = (value: string): "Bangla" | "English" =>
//   hasBanglaText(value) ? "Bangla" : "English";

// const createMessageId = () =>
//   `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// const isGreeting = (value: string) =>
//   /^(ass?al+a?m|as[-\s]?salam|salam|hello|hi|hey|আসসালাম|সালাম|হ্যালো|হাই)/i.test(
//     value.trim(),
//   );

// const agricultureWords =
//   /rice|paddy|ধান|wheat|গম|potato|আলু|tomato|টমেটো|vegetable|সবজি|crop|ফসল|soil|মাটি|seed|বীজ|fertilizer|সার|pest|পোকা|insect|disease|রোগ|leaf|পাতা|irrigation|সেচ|water|পানি|yield|ফলন|harvest|ফসল|গাছ|plant/i;

// const cultivationWords =
//   /grow|cultivat|plant|চাষ|চাস|কিভাবে|কীভাবে|কিবাবে|লাগাব|রোপণ|বপন/i;

// const onionWords = /onion|পেঁয়াজ|পেয়াজ|পিয়াজ|পিঁয়াজ|পিজাক|পিয়াজ/i;

// const isUnclearQuestion = (value: string) => {
//   const normalized = value.trim();

//   return (
//     normalized.length < 8 &&
//     !hasBanglaText(normalized) &&
//     !isGreeting(normalized) &&
//     !agricultureWords.test(normalized)
//   );
// };

// const getCultivationFallbackReply = (
//   userMessage: string,
//   replyLanguage: "Bangla" | "English",
// ) => {
//   if (!cultivationWords.test(userMessage)) return null;

//   if (onionWords.test(userMessage)) {
//     return replyLanguage === "Bangla"
//       ? "Assalamu Alaikum. পেঁয়াজ চাষের জন্য উঁচু ও পানি না জমে এমন দোআঁশ মাটি ভালো। জমি ঝুরঝুরে করে ৩-৪ বার চাষ দিন, পচা গোবর/কম্পোস্ট মিশান, ১০-১৫ সেমি দূরত্বে চারা রোপণ করুন, হালকা সেচ দিন এবং জমিতে পানি জমতে দেবেন না। থ্রিপস বা পাতায় দাগ দেখলে আক্রান্ত পাতা দেখে দ্রুত ব্যবস্থা নিন। আপনার এলাকা, মৌসুম ও জমির ধরন লিখলে আরো নির্দিষ্ট পরামর্শ দিতে পারব।"
//       : "Assalamu Alaikum. For onion cultivation, choose raised, well-drained loam soil. Prepare a fine seedbed, mix decomposed compost, transplant seedlings about 10-15 cm apart, irrigate lightly, and never let water stand in the field. Watch for thrips and leaf spots. Share your location, season, and soil type for more specific advice.";
//   }

//   return replyLanguage === "Bangla"
//     ? "Assalamu Alaikum. চাষের সাধারণ নিয়ম হলো: আগে ফসলের জন্য উপযুক্ত মৌসুম ও মাটি নির্বাচন করুন, জমি ঝুরঝুরে করুন, পচা জৈব সার মেশান, ভালো বীজ/চারা ব্যবহার করুন, পরিমিত সেচ দিন এবং পোকা-রোগ নিয়মিত দেখুন। কোন ফসল চাষ করবেন লিখলে আমি ধাপে ধাপে নির্দিষ্ট পরামর্শ দেব।"
//     : "Assalamu Alaikum. General cultivation steps are: choose the right season and soil, prepare a fine field, mix decomposed organic manure, use healthy seed or seedlings, irrigate carefully, and monitor pests or disease. Tell me the crop name for a step-by-step plan.";
// };

// const getLocalFallbackReply = (
//   userMessage: string,
//   replyLanguage: "Bangla" | "English",
// ) => {
//   if (isGreeting(userMessage)) {
//     return replyLanguage === "Bangla"
//       ? "Assalamu Alaikum. আমি KrishOky AI কৃষি সহকারী। ধান, সবজি, ফল, মাটি, সার, সেচ বা পোকা-রোগ নিয়ে আপনার প্রশ্ন লিখুন, আমি বাস্তব কৃষি বিশেষজ্ঞের মতো সাহায্য করব।"
//       : "Assalamu Alaikum. I am KrishOky AI, your agriculture assistant. Ask me about crops, soil, fertilizer, irrigation, pests, or plant disease, and I will guide you like a field specialist.";
//   }

//   if (isUnclearQuestion(userMessage)) {
//     return replyLanguage === "Bangla"
//       ? "Assalamu Alaikum. আপনার মেসেজটি পরিষ্কার বোঝা যাচ্ছে না। কোন ফসল, কী সমস্যা, পাতার রং/দাগ, মাটির অবস্থা বা কতদিন ধরে সমস্যা হচ্ছে লিখলে আমি ভালোভাবে পরামর্শ দিতে পারব।"
//       : "Assalamu Alaikum. I could not clearly understand that message. Please write the crop name, the problem, leaf color/spots, soil condition, or how long it has been happening.";
//   }

//   const cultivationReply = getCultivationFallbackReply(userMessage, replyLanguage);
//   if (cultivationReply) return cultivationReply;

//   return replyLanguage === "Bangla"
//     ? "Assalamu Alaikum. আপনার প্রশ্নটি পেয়েছি, কিন্তু লাইভ AI সার্ভার এখন উত্তর দিচ্ছে না। ফসলের নাম, সমস্যা, জমির ধরন ও আপনার এলাকা লিখে আবার পাঠালে আমি আরো নির্দিষ্ট কৃষি পরামর্শ দিতে চেষ্টা করব।"
//     : "Assalamu Alaikum. I received your question, but the live AI server is not responding right now. Please send the crop name, problem, soil type, and location so I can try to give more specific farming guidance.";
// };

// const buildExpertPrompt = (
//   userMessage: string,
//   replyLanguage: "Bangla" | "English",
// ) => `
// You are KrishOky AI, a real senior agriculture specialist and a respectful Muslim advisor.

// Reply rules:
// - First greet politely with "Assalamu Alaikum".
// - Reply only in ${replyLanguage}. If the user wrote Bangla, use natural Bangla. If the user wrote English, use clear English.
// - Give practical field-level agricultural advice like an experienced crop specialist.
// - Be concise, warm, and specific. Mention crop, soil, pest, fertilizer, irrigation, weather, or safety steps when relevant.
// - If the question needs diagnosis, ask for the missing details after giving the safest immediate guidance.
// - Do not switch language unless the user switches language in the latest message.

// Farmer message:
// ${userMessage}
// `;

// export default function AIChatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<ChatMessage[]>([]);
//   const [isSending, setIsSending] = useState(false);
//   const [sendingLanguage, setSendingLanguage] = useState<"Bangla" | "English">(
//     "English",
//   );
//   const latestMessageRef = useRef<HTMLDivElement>(null);
//   const { t } = useLanguage();

//   const trimmedMessage = message.trim();
//   useEffect(() => {
//     latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat, isSending]);

//   const handleSend = async () => {
//     if (!trimmedMessage || isSending) return;

//     const outgoingText = trimmedMessage;
//     const replyLanguage = getMessageLanguage(outgoingText);
//     const userMessage: ChatMessage = {
//       id: createMessageId(),
//       role: "user",
//       text: outgoingText,
//       language: replyLanguage,
//     };

//     setChat((prev) => [...prev, userMessage]);
//     setMessage("");
//     setSendingLanguage(replyLanguage);
//     setIsSending(true);

//     try {
//       const reply = await askAIChatbot(
//         buildExpertPrompt(outgoingText, replyLanguage),
//       );

//       setChat((prev) => [
//         ...prev,
//         {
//           id: createMessageId(),
//           role: "ai",
//           text: reply || getLocalFallbackReply(outgoingText, replyLanguage),
//           language: replyLanguage,
//         },
//       ]);
//     } catch {
//       setChat((prev) => [
//         ...prev,
//         {
//           id: createMessageId(),
//           role: "ai",
//           text: getLocalFallbackReply(outgoingText, replyLanguage),
//           language: replyLanguage,
//         },
//       ]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-4 z-[100] sm:bottom-8 sm:right-8">
//       {isOpen && (
//         <section className="absolute bottom-20 right-0 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[410px] flex-col overflow-hidden rounded-lg border border-emerald-500/20 bg-white/95 shadow-[0_24px_80px_rgba(2,6,23,0.22)] backdrop-blur-2xl dark:border-emerald-400/20 dark:bg-slate-950/95">
//           <header className="relative overflow-hidden border-b border-emerald-500/15 bg-slate-950 px-5 py-4 text-white">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.42),transparent_36%),linear-gradient(135deg,rgba(250,204,21,0.15),transparent_38%)]" />
//             <div className="relative flex items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30">
//                   <Sprout size={24} />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h2 className="text-base font-bold">KrishOky AI</h2>
//                     <Sparkles size={15} className="text-amber-300" />
//                   </div>
//                   <p className="text-xs font-medium text-emerald-100">
//                     {t("কৃষি বিশেষজ্ঞ সহায়তা", "Agriculture specialist support")}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
//                 aria-label={t("চ্যাট বন্ধ করুন", "Close chat")}
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           </header>

//           <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-emerald-50/80 via-white to-amber-50/40 p-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
//             {chat.length === 0 && (
//               <div className="rounded-lg border border-emerald-500/20 bg-white p-4 shadow-sm dark:bg-slate-900">
//                 <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
//                   <Bot size={18} className="text-emerald-500" />
//                   {t("আজ কী জানতে চান?", "What do you need help with today?")}
//                 </div>
//                 <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
//                   {t(
//                     "ধানের রোগ, সবজির পোকা, সার ব্যবস্থাপনা, সেচ বা মাটির যত্ন নিয়ে প্রশ্ন করুন। বাংলায় লিখলে বাংলায় উত্তর পাবেন।",
//                     "Ask about rice disease, vegetable pests, fertilizer planning, irrigation, or soil care. Write in English to get an English reply.",
//                   )}
//                 </p>
//               </div>
//             )}

//             {chat.map((item) => (
//               <div
//                 key={item.id}
//                 className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[84%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
//                     item.role === "user"
//                       ? "bg-emerald-600 text-white"
//                       : "border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
//                   }`}
//                 >
//                   {item.text}
//                 </div>
//               </div>
//             ))}

//             {isSending && (
//               <div className="flex justify-start">
//                 <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
//                   <Loader2 size={16} className="animate-spin text-emerald-500" />
//                   {sendingLanguage === "Bangla" ? "উত্তর লিখছে..." : "Writing advice..."}
//                 </div>
//               </div>
//             )}
//             <div ref={latestMessageRef} />
//           </div>

//           <div className="border-t border-slate-200 bg-white/90 p-3 dark:border-slate-800 dark:bg-slate-950/90">
//             <div className="flex items-end gap-2 rounded-lg border border-slate-200 bg-white p-2 transition focus-within:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-emerald-400">
//               <textarea
//                 value={message}
//                 onChange={(event) => setMessage(event.target.value)}
//                 onKeyDown={(event) => {
//                   if (event.key === "Enter" && !event.shiftKey) {
//                     event.preventDefault();
//                     void handleSend();
//                   }
//                 }}
//                 rows={1}
//                 className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-500 disabled:opacity-100 dark:text-slate-50 dark:placeholder:text-slate-400"
//                 placeholder={t(
//                   "আপনার কৃষি প্রশ্ন লিখুন...",
//                   "Type your farming question...",
//                 )}
//                 disabled={isSending}
//               />
//               <button
//                 type="button"
//                 onClick={() => void handleSend()}
//                 disabled={!trimmedMessage || isSending}
//                 className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
//                 aria-label={t("মেসেজ পাঠান", "Send message")}
//               >
//                 {isSending ? (
//                   <Loader2 size={18} className="animate-spin" />
//                 ) : (
//                   <Send size={18} />
//                 )}
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       <button
//         type="button"
//         onClick={() => setIsOpen((current) => !current)}
//         className="group relative grid h-16 w-16 place-items-center rounded-full bg-slate-950 text-white shadow-[0_18px_50px_rgba(2,6,23,0.28)] transition hover:-translate-y-1 dark:bg-emerald-500 dark:text-slate-950"
//         aria-label={isOpen ? t("চ্যাট বন্ধ করুন", "Close chat") : t("চ্যাট খুলুন", "Open chat")}
//       >
//         <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 blur-xl transition group-hover:opacity-50" />
//         <span className="relative grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white dark:bg-white dark:text-emerald-600">
//           {isOpen ? <X size={24} /> : <Bot size={25} />}
//         </span>
//       </button>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, Sprout, X } from "lucide-react";
import { askAIChatbot } from "@/services/aiApi";
import { useLanguage } from "@/context/LanguageContext";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  language: "Bangla" | "English";
};

const hasBanglaText = (value: string) => /[\u0980-\u09FF]/.test(value);

const getMessageLanguage = (value: string): "Bangla" | "English" =>
  hasBanglaText(value) ? "Bangla" : "English";

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// এরর ফলব্যাক মেসেজ
const getLocalFallbackReply = (replyLanguage: "Bangla" | "English") => {
  return replyLanguage === "Bangla"
    ? "আসসালামু আলাইকুম। দুঃখিত ভাই, লাইভ এআই সার্ভার সংযোগে সাময়িক সমস্যা হচ্ছে। দয়া করে একটু পর আবার চেষ্টা করুন।"
    : "Assalamu Alaikum. Sorry, the live AI server is temporarily offline. Please try again in a few moments.";
};

// ব্যাকঅ্যান্ড কোটেশন ফ্রেন্ডলি পারফেক্ট প্রম্পট বিল্ডার
const buildExpertPrompt = (
  userMessage: string,
  replyLanguage: "Bangla" | "English",
  isOngoing: boolean,
) => {
  const langRule = replyLanguage === "Bangla" ? "strictly in Bangla language" : "strictly in English language";
  const greetingRule = isOngoing 
    ? "DO NOT repeat Assalamu Alaikum or any greetings" 
    : "You must start this first response with Assalamu Alaikum";

  return `Reply ${langRule}. ${greetingRule}. Answer accurately: ${userMessage}`;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendingLanguage, setSendingLanguage] = useState<"Bangla" | "English">(
    "English",
  );
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const trimmedMessage = message.trim();
  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isSending]);

  const handleSend = async () => {
    if (!trimmedMessage || isSending) return;

    const outgoingText = trimmedMessage;
    const replyLanguage = getMessageLanguage(outgoingText);
    
    // টাইপস্ক্রিপ্ট ফ্রেন্ডলি নিখুঁত ইউজার মেসেজ অবজেক্ট
    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      text: outgoingText,
      language: replyLanguage,
    };

    // ফিক্সড লাইন: সরাসরি টাইপ-সেফ userMessage অবজেক্টটি চ্যাট স্টেটে পুশ করা হলো
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setSendingLanguage(replyLanguage);
    setIsSending(true);

    // চ্যাট হিস্ট্রি ট্র্যাক করা (সালাম লক করার জন্য)
    const isOngoing = chat.length > 0;

    try {
      // জেমিনি লাইভ সার্ভার কল
      const reply = await askAIChatbot(
        buildExpertPrompt(outgoingText, replyLanguage, isOngoing),
      );

      setChat((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "ai",
          text: reply || getLocalFallbackReply(replyLanguage),
          language: replyLanguage,
        },
      ]);
    } catch (error) {
      console.error("AI Chatbot Server Request Failed:", error);
      setChat((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "ai",
          text: getLocalFallbackReply(replyLanguage),
          language: replyLanguage,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-[100] sm:bottom-8 sm:right-8">
      {isOpen && (
        <section className="absolute bottom-20 right-0 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[410px] flex-col overflow-hidden rounded-lg border border-emerald-500/20 bg-white/95 shadow-[0_24px_80px_rgba(2,6,23,0.22)] backdrop-blur-2xl dark:border-emerald-400/20 dark:bg-slate-950/95">
          <header className="relative overflow-hidden border-b border-emerald-500/15 bg-slate-950 px-5 py-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.42),transparent_36%),linear-gradient(135deg,rgba(250,204,21,0.15),transparent_38%)]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30">
                  <Sprout size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold">KrishOky AI</h2>
                    <Sparkles size={15} className="text-amber-300" />
                  </div>
                  <p className="text-xs font-medium text-emerald-100">
                    {t("কৃষি বিশেষজ্ঞ সহায়তা", "Agriculture specialist support")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label={t("চ্যাট বন্ধ করুন", "Close chat")}
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-emerald-50/80 via-white to-amber-50/40 p-4 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
            {chat.length === 0 && (
              <div className="rounded-lg border border-emerald-500/20 bg-white p-4 shadow-sm dark:bg-slate-900">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <Bot size={18} className="text-emerald-500" />
                  {t("আজ কী জানতে চান?", "What do you need help with today?")}
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {t(
                    "ধানের রোগ, সবজির পোকা, সার ব্যবস্থাপনা, সেচ বা মাটির যত্ন নিয়ে প্রশ্ন করুন। বাংলায় লিখলে বাংলায় উত্তর পাবেন।",
                    "Ask about rice disease, vegetable pests, fertilizer planning, irrigation, or soil care. Write in English to get an English reply.",
                  )}
                </p>
              </div>
            )}

            {chat.map((item) => (
              <div
                key={item.id}
                className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[84%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm ${
                    item.role === "user"
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  {item.text}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <Loader2 size={16} className="animate-spin text-emerald-500" />
                  {sendingLanguage === "Bangla" ? "উত্তর লিখছে..." : "Writing advice..."}
                </div>
              </div>
            )}
            <div ref={latestMessageRef} />
          </div>

          <div className="border-t border-slate-200 bg-white/90 p-3 dark:border-slate-800 dark:bg-slate-950/90">
            <div className="flex items-end gap-2 rounded-lg border border-slate-200 bg-white p-2 transition focus-within:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-emerald-400">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                rows={1}
                className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm font-medium text-slate-950 outline-none placeholder:text-slate-500 disabled:opacity-100 dark:text-slate-50 dark:placeholder:text-slate-400"
                placeholder={t(
                  "আপনার কৃষি প্রশ্ন লিখুন...",
                  "Type your farming question...",
                )}
                disabled={isSending}
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={!trimmedMessage || isSending}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
                aria-label={t("মেসেজ পাঠান", "Send message")}
              >
                {isSending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-slate-950 text-white shadow-[0_18px_50px_rgba(2,6,23,0.28)] transition hover:-translate-y-1 dark:bg-emerald-500 dark:text-slate-950"
        aria-label={isOpen ? t("চ্যাট বন্ধ করুন", "Close chat") : t("চ্যাট খুলুন", "Open chat")}
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 blur-xl transition group-hover:opacity-50" />
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white dark:bg-white dark:text-emerald-600">
          {isOpen ? <X size={24} /> : <Bot size={25} />}
        </span>
      </button>
    </div>
  );
}