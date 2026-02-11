import { User, UserAPI } from "@/entities/user/model/types";

interface BaseCV {
  id: string;
  name: string;
  education: string;
  description: string;
}

export interface CVAPI extends BaseCV {
  user: UserAPI;
}

export interface CV extends BaseCV {
  user: User;
}

export interface CvsApiResponse {
    cvs: CVAPI[];
}

export interface CvsData {
    cvs: CV[];
}