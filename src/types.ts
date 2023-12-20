export interface Task {
  id: number;
  title: string;
  body: string;
  deadline: Date;
  isDone: boolean;
  created_at: Date;
}
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface Room {
  id: number;
  created_at: Date;
  name: string;
  user: string[];
}

export interface Message {
  id: number;
  created_at: Date;
  user: string;
  body: string;
  roomId: number;
}
