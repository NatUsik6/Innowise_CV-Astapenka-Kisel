import { Proficiency } from './types';

export const getProficiencyColor = (proficiency: Proficiency): string => {
    switch (proficiency) {
        case Proficiency.A1:
            return '#9e9e9e';
        case Proficiency.A2:
            return '#e53935';
        case Proficiency.B1:
            return '#ef6c00';
        case Proficiency.B2:
            return '#f9a825';
        case Proficiency.C1:
            return '#43a047';
        case Proficiency.C2:
            return '#2e7d32';
        case Proficiency.Native:
            return '#1565c0';
        default:
            return '#9e9e9e';
    }
};