import { gql } from '@apollo/client';

export const GET_PROFILE_SKILLS = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      created_at
      category {
        id
        name
        parent {
          id
          name
        }
      }
      category_name
      category_parent_name
    }
  }
`;

export const GET_SKILL_CATEGORIES = gql`
  query GetSkillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
      }
      children {
        id
        name
      }
    }
  }
`;