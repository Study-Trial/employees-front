import useEmployeeFilters from '../state-management/store';
import { SearchObject } from '../model/dto-types';

export const useSearchObject = (): SearchObject => {
  const filters = useEmployeeFilters();
  
  return {
    department: filters.department || undefined,
    salaryFrom: filters.salaryFrom || undefined,
    salaryTo: filters.salaryTo || undefined,
    ageFrom: filters.ageFrom || undefined,
    ageTo: filters.ageTo || undefined
  };
};