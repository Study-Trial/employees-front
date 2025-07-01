import { Employee } from '../model/dto-types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'
import { useAuthData } from '../state-management/store'
import { Navigate } from 'react-router-dom'

const SalaryStatisticsPage = () => {
  const role = useAuthData(s => s.userData?.role);
  const {data: employees} = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  })

  return (
    <>
    {role ?
    <Statistics numbers={employees?.map(e => e.salary) || []} interval={5000} label={'Salary'} ></Statistics>
    : <Navigate to="/login" />}
    </>
  )
}

export default SalaryStatisticsPage