import { User, UserAPI } from "@/entities/user/model/types";

export interface CVAPI {
  id: string;
  name: string;
  education: string;
  description: string;
  user: UserAPI;
}

export interface CV {
    id: string;
    name: string;
    education: string;
    description: string;
    user: User;
}

export interface CvsApiResponse {
    cvs: CVAPI[];
}

export interface CvsData {
    cvs: CV[];
}