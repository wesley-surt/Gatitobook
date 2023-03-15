export interface Animal {
  id: number;
  postDate: Date;
  url: string;
  description: string;
  allowComponents: boolean;
  likes: number;
  comments: number;
  userId: number;
}

export type Animais = Array<Animal>
