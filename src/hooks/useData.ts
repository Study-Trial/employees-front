import { useQuery } from "@tanstack/react-query";
import { SearchObject } from '../model/dto-types';
import ApiClientJsonServer from '../services/ApiClientJsonServer';
import { Employee } from '../model/dto-types';

export default function useData(searchObject?: SearchObject) {
  return useQuery<Employee[], Error>({
    queryKey: [searchObject],
    queryFn: () => new ApiClientJsonServer().getAll(searchObject),
    staleTime: 3600 * 1000 * 24
  })
}