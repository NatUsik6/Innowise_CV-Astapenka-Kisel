import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PROFILE_SKILLS, GET_SKILLS } from '@/entities/skills/api/queries';
import { ADD_PROFILE_SKILL, DELETE_PROFILE_SKILL, UPDATE_PROFILE_SKILL } from '@/entities/skills/api/mutations';
import {
  ProfileSkillsResult,
  SkillsResult,
  AddProfileSkillResult,
  UpdateProfileSkillResult,
  DeleteProfileSkillResult,
} from '@/entities/skills/api/types';

interface UseUserSkillsProps {
  userId: string;
}

export const useUserSkills = ({ userId }: UseUserSkillsProps) => {
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useQuery<ProfileSkillsResult>(GET_PROFILE_SKILLS, {
    variables: { userId },
  });

  const { data: skillsData } = useQuery<SkillsResult>(GET_SKILLS);

  const [addSkill, { loading: adding }] = useMutation<AddProfileSkillResult>(
    ADD_PROFILE_SKILL,
    {
      refetchQueries: [{ query: GET_PROFILE_SKILLS, variables: { userId } }],
      awaitRefetchQueries: true,
    }
  );

  const [updateSkill] = useMutation<UpdateProfileSkillResult>(
    UPDATE_PROFILE_SKILL,
    {
      refetchQueries: [{ query: GET_PROFILE_SKILLS, variables: { userId } }],
      awaitRefetchQueries: true,
    }
  );

  const [deleteSkills, { loading: deleting }] = useMutation<DeleteProfileSkillResult>(
    DELETE_PROFILE_SKILL,
    {
      refetchQueries: [{ query: GET_PROFILE_SKILLS, variables: { userId } }],
      awaitRefetchQueries: true,
    }
  );

  return {
    profileSkills: profileData?.profile?.skills ?? [],
    skillsData: skillsData?.skills ?? [],
    profileLoading,
    profileError,
    addSkill,
    updateSkill,
    deleteSkills,
    adding,
    deleting,
  };
};