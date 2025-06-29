import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Employee } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import { SearchObject } from "../model/dto-types";

export const useData = (searchObject?: SearchObject) => {
return useQuery<Employee[], AxiosError>({
  queryKey: ["employees", searchObject],
  queryFn: () => apiClient.getAll(searchObject),
  staleTime: 3600_000
});
}

export default useData;