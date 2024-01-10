export interface Credentials {
  username: string;
  password: string;
}

export interface Todo {
  id: number;
  task: string;
  is_complete: boolean;
  createdAt: string;
  updatedAt: string;
}
