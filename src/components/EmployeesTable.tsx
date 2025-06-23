import { Avatar,Spinner, Table, Text } from '@chakra-ui/react';
import useData from '../hooks/useData'

const EmployeesTable = () => {
    const { data: employees, isLoading, error } = useData();
    return (
        <>
        {isLoading && <Spinner />}
        {error && <Text>Error: {error.message}</Text>}
        {employees && (
        <Table.ScrollArea borderWidth="1px" rounded="md" height="80vh" width="70vw" margin="auto">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader >Avatar</Table.ColumnHeader>
                <Table.ColumnHeader >Full Name</Table.ColumnHeader>
                <Table.ColumnHeader >Department</Table.ColumnHeader>
                <Table.ColumnHeader >Salary</Table.ColumnHeader>
                <Table.ColumnHeader >Birthdate</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
    
            <Table.Body>
              {employees?.map((employee) => (
                <Table.Row key={employee.id}>
                  <Table.Cell >
                  <Avatar.Root size="sm">
                    <Avatar.Image src={employee.avatar}/>
                    <Avatar.Fallback name={employee.fullName}/>
                  </Avatar.Root>
                  </Table.Cell >
                  <Table.Cell >{employee.fullName}</Table.Cell>
                  <Table.Cell >{employee.department}</Table.Cell>
                  <Table.Cell >{employee.salary} NIS</Table.Cell>
                  <Table.Cell >{employee.birthDate}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
        )}
        </>
    )
  }

  export default EmployeesTable