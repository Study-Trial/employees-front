# HW #48 Definition
## Pagination 
### Create Zustand EmployeesPaginationStore and appropriate hook containing following properties
count <br>
page <br>
setCount <br>
setPage 
### Add property pageSize (number employees on one page) inside configuration JSON file config/employees-config.json (with value 6)
### Build separate EmployeesPaginator component based on the example https://chakra-ui.com/docs/components/pagination?page=10#data-driven 
### Add EmployeesPaginator component inside HomePage
### Integrate EmployeesTable with EmployeesPaginator
#### consider using the method "slice"
#### Note: ApiClientJsonServer and whatever related to the Server data using @tanstack/react-query (useQuery, useMutation) shouldn't be updated