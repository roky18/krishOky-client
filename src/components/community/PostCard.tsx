import { IPost } from "@/interfaces/communityInterface";

export default function PostCard({ post }: { post: IPost }) {
  return (
    <div className="ko-card p-4 rounded-xl border border-slate-200 shadow-sm bg-white">
      {/* ইমেজ রেন্ডারিং চেক */}
      {post.img && post.img !== "" ? (
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-3"
          onError={(e) => (e.currentTarget.style.display = "none")} // লিঙ্ক ভুল হলে ইমেজ লুকাবে
        />
      ) : null}

      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="text-slate-600">{post.desc}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-slate-400">
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
        </span>
        <div className="flex gap-2">
          <button className="text-emerald-600 text-sm">Like</button>
          <button className="text-slate-600 text-sm">Comment</button>
        </div>
      </div>
    </div>
  );
}
