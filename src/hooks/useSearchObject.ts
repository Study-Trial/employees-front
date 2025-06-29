import useEmployeeFilters from '../state-management/store';
import { SearchObject } from '../model/dto-types';

export const useSearchObject = (): SearchObject => {
  const filters = useEmployeeFilters();
  
  return {
    department: filters.department || undefined,
    minSalary: filters.salaryFrom || undefined,
    maxSalary: filters.salaryTo || undefined,
    minAge: filters.ageFrom || undefined,
    maxAge: filters.ageTo || undefined
  };
};