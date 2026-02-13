import { gql } from '@apollo/client';

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
