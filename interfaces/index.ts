export interface Credentials {
  username: string | null;
  password: string | null;
}

export interface Todo {
  id: number;
  task: string;
  is_complete: boolean;
  createdAt: string;
  updatedAt: string;
}
