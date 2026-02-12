import { gql } from '@apollo/client';

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;