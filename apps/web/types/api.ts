/** Standard backend response wrapper */
export interface IResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface IUser {
  id: number;
  email: string;
  name: string | null;
  google_id: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITargetAudience {
  id: number;
  job_roles: string[];
  industries: string[];
  locations: string[];
  goal: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProduct {
  id: number;
  targetAudience: ITargetAudience | null;
}

export interface IMeData {
  user: IUser;
  products: IUserProduct[];
}
