// "use client";

// import { ChangeEvent, useState } from "react";
// import { ImagePlus, LayoutGrid, Loader2, Send } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import { useLanguage } from "@/context/LanguageContext";
// import { createPost, CreatePostPayload } from "@/services/communityApi";
// import { IPost } from "@/interfaces/communityInterface";
// import { SessionUser } from "@/interfaces/authInterface";

// const CATEGORIES = [
//   { bn: "ফলমূল", en: "Fruits" },
//   { bn: "শাকসবজি", en: "Vegetables" },
//   { bn: "ফসল", en: "Crops" },
//   { bn: "কৃষি যন্ত্রপাতি", en: "Agricultural Machinery" },
//   { bn: "মসলা", en: "Spices" },
//   { bn: "বীজ ও চারা", en: "Seeds & Saplings" },
//   { bn: "সার", en: "Fertilizer" },
//   { bn: "অন্যান্য", en: "Others" },
// ];

// export default function PostInput() {
//   const { t } = useLanguage();
//   const { data: session, status } = useSession();
//   const queryClient = useQueryClient();

//   const [loading, setLoading] = useState(false);
//   const [imgUrl, setImgUrl] = useState("");
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [category, setCategory] = useState("");

//   const { mutate: handlePostMutation, isPending } = useMutation<
//     IPost,
//     Error,
//     CreatePostPayload
//   >({
//     mutationFn: createPost,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["community-posts"] });
//       toast.success(t("পোস্ট সফল হয়েছে!", "Post successful!"));
//       setTitle("");
//       setDesc("");
//       setImgUrl("");
//       setCategory("");
//     },
//     onError: (error) => {
//       const message = axios.isAxiosError(error)
//         ? error.response?.data?.message || error.message
//         : error.message;
//       toast.error(message || t("পোস্ট করা যায়নি!", "Could not create post!"));
//     },
//   });

//   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

//     if (!cloudName || !uploadPreset) {
//       toast.error(
//         t("Cloudinary সেটআপ পাওয়া যায়নি।", "Cloudinary setup is missing."),
//       );
//       return;
//     }

//     setLoading(true);
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);

//     try {
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//         formData,
//       );
//       setImgUrl(res.data.secure_url);
//       toast.success(t("ছবি যোগ হয়েছে!", "Image added!"));
//     } catch (error) {
//       console.error("Cloudinary Error:", error);
//       toast.error(t("ছবি আপলোড ব্যর্থ!", "Image upload failed!"));
//     } finally {
//       setLoading(false);
//       e.target.value = "";
//     }
//   };

//   const onSubmit = () => {
//     const trimmedTitle = title.trim();
//     const trimmedDesc = desc.trim();

//     // Session থেকে ইউজারের নাম বা আইডি নিশ্চিত করা
//     const sessionUser = session?.user as SessionUser | undefined;

//     if (status === "loading") return;

//     if (!sessionUser) {
//       toast.error(t("পোস্ট করতে আগে লগইন করুন!", "Please log in to post!"));
//       return;
//     }

//     if (!category || !trimmedTitle || !trimmedDesc) {
//       toast.error(t("সব ফিল্ড পূরণ করুন!", "Please fill all fields!"));
//       return;
//     }

//     // ব্যাকএন্ডে পাঠানোর জন্য ডাটা ফরম্যাট
//     handlePostMutation({
//       user: sessionUser.id || sessionUser.name || "Anonymous",
//       title: trimmedTitle,
//       desc: trimmedDesc,
//       type: category,
//       ...(imgUrl ? { img: imgUrl } : {}),
//     });
//   };

//   return (
//     <div className="bg-background/60 backdrop-blur-xl p-6 rounded-3xl mb-12 border border-border/50 shadow-lg">
//       {/* ক্যাটাগরি সিলেকশন */}
//       <div className="mb-4 flex items-center gap-3 bg-background/50 p-2 rounded-2xl border border-border/50 focus-within:border-primary transition-all">
//         <LayoutGrid size={20} className="text-primary ml-2" />
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full bg-transparent outline-none text-sm font-bold p-2 cursor-pointer text-foreground"
//         >
//           <option value="" disabled>
//             {t("ক্যাটাগরি নির্বাচন করুন...", "Select a category...")}
//           </option>
//           {CATEGORIES.map((cat) => (
//             <option key={cat.en} value={cat.en}>
//               {t(cat.bn, cat.en)}
//             </option>
//           ))}
//         </select>
//       </div>

//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder={t("পোস্টের শিরোনাম...", "Post title...")}
//         className="w-full mb-3 p-4 rounded-2xl bg-background/50 border border-border/50 outline-none focus:border-primary transition-colors text-foreground placeholder:text-foreground/40"
//       />
//       <textarea
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//         placeholder={t(
//           "এটি সম্পর্কে বিস্তারিত লিখুন...",
//           "What's on your mind?",
//         )}
//         className="w-full p-4 rounded-2xl bg-background/50 border border-border/50 outline-none focus:border-primary transition-colors h-24 text-foreground placeholder:text-foreground/40"
//       />

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
//         <label className="cursor-pointer flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
//           {loading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
//           <span className="text-sm font-bold">
//             {imgUrl
//               ? t("ছবি যোগ হয়েছে", "Image added")
//               : t("ছবি যোগ করুন", "Add image")}
//           </span>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="hidden"
//           />
//         </label>

//         <button
//           type="button"
//           onClick={onSubmit}
//           disabled={loading || isPending || status === "loading"}
//           className="bg-primary text-white px-8 py-3 rounded-2xl hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {isPending ? (
//             <Loader2 size={16} className="animate-spin" />
//           ) : (
//             <Send size={16} />
//           )}
//           {isPending ? t("পোস্ট হচ্ছে...", "Posting...") : t("পোস্ট", "Post")}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { ChangeEvent, useState } from "react";
import { ImagePlus, LayoutGrid, Loader2, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { createPost } from "@/services/communityApi";

// ইন্টারফেস ডিফাইন (আলাদা ফাইলে থাকলে সেখান থেকে ইমপোর্ট করবেন)
interface SessionUser {
  name?: string | null;
  email?: string | null;
}

const CATEGORIES = [
  { bn: "ফলমূল", en: "Fruits" },
  { bn: "শাকসবজি", en: "Vegetables" },
  { bn: "ফসল", en: "Crops" },
  { bn: "কৃষি যন্ত্রপাতি", en: "Agricultural Machinery" },
  { bn: "মসলা", en: "Spices" },
  { bn: "বীজ ও চারা", en: "Seeds & Saplings" },
  { bn: "সার", en: "Fertilizer" },
  { bn: "অন্যান্য", en: "Others" },
];

export default function PostInput() {
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const { mutate: handlePostMutation, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success(t("পোস্ট সফল হয়েছে!", "Post successful!"));
      setTitle("");
      setDesc("");
      setImgUrl("");
      setCategory("");
    },
    onError: () => toast.error(t("পোস্ট ব্যর্থ হয়েছে!", "Post failed!")),
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
    );

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      setImgUrl(res.data.secure_url);
    } catch (err) {
      toast.error(t("ছবি আপলোড ব্যর্থ!", "Image upload failed!"));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    const sessionUser = session?.user as SessionUser | undefined;

    if (!sessionUser?.name) {
      toast.error(t("পোস্ট করতে লগইন করুন!", "Please login to post!"));
      return;
    }

    if (!category || !title || !desc) {
      toast.error(t("সব ফিল্ড পূরণ করুন!", "Please fill all fields!"));
      return;
    }

    // এখানে user হিসেবে সরাসরি নাম পাঠানো হচ্ছে
    handlePostMutation({
      user: sessionUser.name,
      title,
      desc,
      type: category,
      img: imgUrl,
    });
  };

  return (
    <div className="bg-background/60 backdrop-blur-xl p-6 rounded-3xl mb-12 border border-border/50 shadow-lg">
      <div className="mb-4 flex items-center gap-3 bg-background/50 p-2 rounded-2xl border border-border/50">
        <LayoutGrid size={20} className="text-primary ml-2" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-transparent outline-none text-sm font-bold p-2 cursor-pointer"
        >
          <option value="" disabled>
            {t("ক্যাটাগরি নির্বাচন করুন...", "Select a category...")}
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.en} value={cat.en}>
              {t(cat.bn, cat.en)}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t("পোস্টের শিরোনাম...", "Post title...")}
        className="w-full mb-3 p-4 rounded-2xl bg-background/50 border border-border/50 outline-none focus:border-primary"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder={t("বিস্তারিত লিখুন...", "Write details...")}
        className="w-full p-4 rounded-2xl bg-background/50 border border-border/50 outline-none focus:border-primary h-24"
      />

      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer flex items-center gap-2 text-primary">
          {loading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
          <span className="text-sm font-bold">
            {imgUrl
              ? t("ছবি যোগ হয়েছে", "Image added")
              : t("ছবি যোগ করুন", "Add image")}
          </span>
          <input type="file" onChange={handleImageUpload} className="hidden" />
        </label>
        <button
          onClick={onSubmit}
          disabled={isPending || loading}
          className="bg-primary text-white px-8 py-3 rounded-2xl hover:bg-primary/90"
        >
          {isPending ? t("পোস্ট হচ্ছে...", "Posting...") : t("পোস্ট", "Post")}
        </button>
      </div>
    </div>
  );
}
