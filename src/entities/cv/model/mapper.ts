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
      email: apiCv.user.email, 
      firstName: 'Unknown', 
      lastName: 'User', 
      role: apiCv.user.role,
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