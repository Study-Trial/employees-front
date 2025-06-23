import { SearchObject, Employee } from "../model/dto-types";
import ApiClient from "./ApiClient";
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/employees"
})

export default class ApiClientJsonServer implements ApiClient {
    async getAll(searchObject?: SearchObject): Promise<Employee[]> {
        const res = await apiClient.get<Employee[]>( "/", {
            params: {
                department: searchObject?.department,
                minSalary: searchObject?.minSalary,
                maxSalary: searchObject?.maxSalary,
                minAge: searchObject?.minAge,
                maxAge: searchObject?.maxAge
            }
        });
        return res.data;
    }
}