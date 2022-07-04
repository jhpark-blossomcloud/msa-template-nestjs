export type JwtPayloadData = {
  exp: number;
  iat: number;
  nbf: number;
  iss: string;
  user_id: string;
  is_admin: boolean;
};
