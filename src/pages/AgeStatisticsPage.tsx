import { AxiosError } from "axios"
import { Employee } from "../model/dto-types"
import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/ApiClientJsonServer"
import Statistics from "../components/Statistics"
import { getAge } from "../util/functions"
import { useAuthData } from "../state-management/store"
import { Navigate } from "react-router-dom"

const AgeStatisticsPage = () => {
  const {userData} = useAuthData();
  const role = userData?.role;
 const {data: employees} = useQuery<Employee[], AxiosError>({
     queryKey: ["employees"],
     queryFn: () => apiClient.getAll(),
     staleTime: 3600_000
   })
 
   return (
    <>
    {role ?
    <Statistics numbers={employees?.map(e => getAge(e.birthDate)) || []} interval={10} label={'Age'} ></Statistics>
    : <Navigate to="/login" />}
    </>
   )
 }

export default AgeStatisticsPage