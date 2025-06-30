import { SearchObject, Employee } from "../model/dto-types";
import ApiClient, { Updater } from "./ApiClient";
import { getAge } from "../util/functions";

import axios from "axios";
const axiosIstance = axios.create({
    baseURL: "http://localhost:3000/employees"
})
 class ApiClientJsonServer implements ApiClient {
    async getEmployee(id: string): Promise<Employee> {
         const res = await axiosIstance.get<Employee>(`/${id}`);
         return res.data;
    }
    async addEmployee(empl: Employee): Promise<Employee> {
        const res = await axiosIstance.post<Employee>('/', empl);
        return res.data;
    }
    async deleteEmployee(id: string): Promise<Employee> {
        const res = await axiosIstance.delete<Employee>(`/${id}`);
        return res.data;
    }
    async updateEmployee(updater: Updater): Promise<Employee> {
        const res = await axiosIstance.patch<Employee>(`/${updater.id}`, updater.fields);
        return res.data
    }
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const params: any = {};
        if (searchObject?.department) {
            params.department = searchObject.department;
        }
        if (searchObject?.minSalary) {
            params.salary_gte = searchObject.minSalary;
        }
        if (searchObject?.maxSalary) {
            params.salary_lte = searchObject.maxSalary;
        }
        const res = await axiosIstance.get<Employee[]>("/", { params });
        let employees = res.data;
        if (searchObject?.minAge) {
            employees = employees.filter(e => getAge(e.birthDate) >= searchObject.minAge!);
        }
        if (searchObject?.maxAge) {
            employees = employees.filter(e => getAge(e.birthDate) <= searchObject.maxAge!);
        }
        return employees;
    }
    
    
}
const apiClient = new ApiClientJsonServer();
export default apiClient