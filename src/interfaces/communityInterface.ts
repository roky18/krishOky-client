export interface IPost {
  _id: string;
  user: string;
  title: string;
  desc: string;
  type: string;
  img?: string;
  createdAt?: string | Date;

  likes?: string[];
  comments?: {
    user: string;
    text: string;
    createdAt: string | Date;
  }[];
}
