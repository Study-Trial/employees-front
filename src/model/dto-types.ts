export interface Employee {
    id?: string;
    userId?: string;
    fullName: string;
    avatar: string;
    department: string;
    birthDate: string;
    salary: number;
}
export interface SearchObject {
    department?: string;
    salaryFrom?: number;
    salaryTo?: number;
    ageFrom?: number;
   ageTo?: number;
}