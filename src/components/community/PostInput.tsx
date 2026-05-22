// "use client";
// import { useState, ChangeEvent } from "react";
// import { ImagePlus, Loader2 } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { createPost } from "@/services/communityApi";
// import toast from "react-hot-toast";

// export default function PostInput() {
//   const [loading, setLoading] = useState(false);
//   const [imgUrl, setImgUrl] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [desc, setDesc] = useState<string>("");

//   const queryClient = useQueryClient();

//   const { mutate: handlePostMutation } = useMutation({
//     mutationFn: createPost,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["community-posts"] });
//       toast.success("পোস্ট সফলভাবে সম্পন্ন হয়েছে!");
//       setTitle("");
//       setDesc("");
//       setImgUrl("");
//     },
//     onError: () => toast.error("পোস্ট করতে ব্যর্থ হয়েছেন!"),
//   });

//   const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     setLoading(true);
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     // নিশ্চিত করুন .env ফাইলে এই ভেরিয়েবলটি আছে
//     formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

//     try {
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData
//       );
//       setImgUrl(res.data.secure_url);
//       toast.success("ছবি আপলোড সফল হয়েছে!");
//     } catch (err) {
//       toast.error("ছবি আপলোড ব্যর্থ হয়েছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = () => {
//     if (!title || !desc) return toast.error(" শিরোনাম এবং বিবরণ লিখুন!");

//     handlePostMutation({
//       user: "রকি",
//       title,
//       desc,
//       type: "সাধারণ",
//       img: imgUrl, // ইমেজ ইউআরএলটি এখানে পাঠানো হচ্ছে
//     });
//   };

//   return (
//     <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="পোস্টের শিরোনাম..."
//         className="w-full mb-3 p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 outline-none"
//       />
//       <textarea
//         value={desc}
//         onChange={(e) => setDesc(e.target.value)}
//         placeholder="কী জানাতে চান?"
//         className="w-full p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 outline-none h-24"
//       ></textarea>

//       <div className="flex justify-between items-center mt-4">
//         <label className="cursor-pointer flex items-center gap-2 text-emerald-600">
//           {loading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
//           <span>{imgUrl ? "ছবি যোগ হয়েছে" : "ছবি যোগ করুন"}</span>
//           <input type="file" onChange={handleImageUpload} className="hidden" />
//         </label>
//         <button
//           onClick={onSubmit}
//           className="bg-emerald-500 text-white px-8 py-2 rounded-full hover:bg-emerald-600 transition-all"
//         >
//           Post
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, ChangeEvent } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createPost } from "@/services/communityApi";
import toast from "react-hot-toast";

export default function PostInput() {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const { mutate: handlePostMutation } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
      toast.success("পোস্ট সফলভাবে সম্পন্ন হয়েছে!");
      setTitle("");
      setDesc("");
      setImgUrl("");
    },
    onError: () => toast.error("পোস্ট করতে ব্যর্থ হয়েছেন!"),
  });

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();

    // ১. ফাইল অ্যাপ্রেন্ড করুন
    formData.append("file", file);

    // ২. প্রিসেট নাম চেক করুন
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!preset) {
      console.error("Upload preset is missing in .env!");
      setLoading(false);
      return;
    }
    formData.append("upload_preset", preset);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(url, formData);

      // Cloudinary এর রেসপন্স থেকে URL নিন
      setImgUrl(res.data.secure_url);
      console.log("Image successfully uploaded:", res.data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      toast.error("ছবি আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    if (!title || !desc) return toast.error("শিরোনাম এবং বিবরণ লিখুন!");
    if (loading) return toast("ছবি আপলোড হচ্ছে, দয়া করে অপেক্ষা করুন...");

    handlePostMutation({
      user: "রকি",
      title,
      desc,
      type: "সাধারণ",
      img: imgUrl, // নিশ্চিত করুন এই স্টেট-এ লিঙ্কটি আছে
    });
  };

  return (
    <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-white/20 shadow-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="পোস্টের শিরোনাম..."
        className="w-full mb-3 p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 outline-none"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="কী জানাতে চান?"
        className="w-full p-3 rounded-xl bg-transparent border border-gray-300 dark:border-gray-700 outline-none h-24"
      ></textarea>

      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer flex items-center gap-2 text-emerald-600">
          {loading ? <Loader2 className="animate-spin" /> : <ImagePlus />}
          <span>{imgUrl ? "ছবি যোগ হয়েছে" : "ছবি যোগ করুন"}</span>
          <input type="file" onChange={handleImageUpload} className="hidden" />
        </label>

        <button
          disabled={loading} // ছবি আপলোডের সময় বাটন ডিজেবল থাকবে
          onClick={onSubmit}
          className="bg-emerald-500 text-white px-8 py-2 rounded-full hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "আপলোড হচ্ছে..." : "Post"}
        </button>
      </div>
    </div>
  );
}
