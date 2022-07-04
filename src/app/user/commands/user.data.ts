export type User = {
  id: string;
  nickname: string | null;
  avatar: string | null;
  studentYear: string | null;
  majorCode: string | null;
  isAdmin: boolean;
  permissions: string[];
};
