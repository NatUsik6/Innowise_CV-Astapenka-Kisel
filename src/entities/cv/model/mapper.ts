import { mapUserFromAPI } from "@/entities/user/model/mapper";
import { CV, CVAPI } from "./cvs.types";

export const mapCvFromAPI = (apiCv: CVAPI): CV => {
  return {
    id: apiCv.id,
    name: apiCv.name,
    education: apiCv.education,
    description: apiCv.description,
    user: apiCv.user?.profile 
      ? mapUserFromAPI(apiCv.user) 
      : { 
          id: apiCv.user.id, 
          created_at: '',
          email: apiCv.user.email, 
          role: apiCv.user.role,
          profile: {
            id: '',
            firstName: '',
            lastName: '',
            avatar: '',
          },
          department: '',
          department_name: '',
          position: '',
          position_name: '',
        },
  };
};

export const mapCvsFromAPI = (apiCvs: CVAPI[]): CV[] => {
  return apiCvs.map(mapCvFromAPI);
};