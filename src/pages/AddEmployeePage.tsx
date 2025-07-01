import EmployeeForm from "../components/EmployeeForm"
import useEmployeesMutation from "../hooks/useEmployeesMutation"
import { Employee } from "../model/dto-types"
import apiClient from "../services/ApiClientJsonServer"
import { useAuthData } from "../state-management/store"
import { Navigate } from "react-router-dom"

const AddEmployeePage = () => {
  const {userData} = useAuthData();
  const role = userData?.role;
  const mutationObj = useEmployeesMutation((empl) => apiClient.addEmployee(empl as Employee))
  return (
    <>
    {role === "admin" ?
    <EmployeeForm submitter={(empl) => mutationObj.mutate(empl)}></EmployeeForm>
    : <Navigate to="/home" />}
    </>
  )
}

export default AddEmployeePage