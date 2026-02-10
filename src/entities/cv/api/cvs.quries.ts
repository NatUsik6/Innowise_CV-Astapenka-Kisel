import { gql } from "@apollo/client";

export const CVS_QUERY = gql`
    query GetCVs {
        cvs {
            id
            name
            description
            education
            user {
                id
                email
                role
                
            }
        }
    }    
`;