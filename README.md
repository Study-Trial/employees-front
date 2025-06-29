# HW #46 Definition
## Filtering of Employee queries
### updating method getAll of ApiClientJsonServer taking into consideration searchObject containing filter values
### Fill the stub of the DepartmentSelector component
#### Similar to https://github.com/java-60TelRan/games-hub/blob/main/src/components/GenreSelector.tsx
#### Using useEmployeeFilters with the selectors for department and setDepartment fields
### Fill the stub of the SalaryFilter component
#### Look & feel similar to EditField component having been written at the class #46
#### Using useEmployeeFilters with the selectors for salaryFrom, salaryTo, setSalaryFrom, setSalaryTo
### Fill the stub of the AgeFilter component
#### Look & feel similar to SalaryFilter (a reusable additional component maybe introduced for DRY) 
#### Using useEmployeeFilters with the selectors for ageFrom, ageTo, setAgeFrom, setAgeTo
### updating EmployeesTable component taking into consideration filters 
#### consider applying useEmployeeFilters state management hook
#### consider  useQuery call with updated queryFn