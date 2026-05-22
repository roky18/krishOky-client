export interface IPost {
  _id: string;
  user: string;
  title: string;
  desc: string;
  type: string;
  img?: string;
  createdAt?: Date;
  // নতুন ফিল্ডগুলো এখানে যোগ করুন
  likes?: string[];
  comments?: {
    user: string;
    text: string;
    createdAt: Date;
  }[];
}
