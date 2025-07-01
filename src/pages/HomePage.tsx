import { Stack } from '@chakra-ui/react'
import EmployeesTable from '../components/EmployeesTable'
import { Updater } from '../services/ApiClient'
import apiClient from '../services/ApiClientJsonServer'
import Filters from '../components/Filters'
import { useAuthData } from '../state-management/store'
import { Navigate } from 'react-router-dom'

const HomePage = () => {
  const role = useAuthData(s => s.userData?.role);
    return (
    <>
    {role ?
    <Stack>
      <Filters></Filters>
      <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
      updateFn = {(updater) => apiClient.updateEmployee(updater as Updater)}></EmployeesTable>
    </Stack>
    : <Navigate to="/login" />}
    </>
  )
}

export default HomePage