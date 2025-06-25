import { Employee } from '../model/dto-types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/ApiClientJsonServer'
import Statistics from '../components/Statistics'

const AgeStatisticsPage = () => {
  const {data: employees} = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  })

  return (
    <Statistics numbers={employees?.map(e => 2025 - (+e.birthDate.slice(0,4))) || []} interval={10} label={'Age'} />
  )
}

export default AgeStatisticsPage