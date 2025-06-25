import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import apiClient from '../services/ApiClientJsonServer'
import _ from 'lodash'
import { Employee } from '../model/dto-types'
import { Text, Stack, Spinner, Table } from '@chakra-ui/react'

const DepartmentStatisticsTable = () => {
    const {
        data: employees,
        error,
        isLoading,
    } = useQuery<Employee[], AxiosError>({
        queryKey: ["employees"],
        queryFn: () => apiClient.getAll(),
        staleTime: 3600_000
    });
    const objDep = _.groupBy(employees, (empl) => empl.department);
    const depSize = Object.entries(objDep).map(([key, value]) => ({
        department: key,
        size: value.length
    }));
    const depSalary = Object.entries(objDep).map(([key, value]) => ({
        department: key,
        salary: Math.round(value.reduce((acc: number, empl: Employee) => (acc + empl.salary), 0) / value.length)
    }));
    const depAge = Object.entries(objDep).map(([key, value]) => ({
        department: key,
        age: Math.round(value.reduce((acc: number, empl: Employee) => (acc + (2025 - (+empl.birthDate.slice(0, 4)))), 0) / value.length)
    }));

    return (
        <>
            {error ?
                <Text color={"red"} fontSize={"2xl"}>{error.message}</Text>
                :
                <>
                    {isLoading && <Spinner />}
                    <Stack
                        height={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Table.ScrollArea
                            borderWidth="1px"
                            rounded="md"
                            height="80vh"
                            width="80vw"
                        >
                            <Table.Root size="sm" stickyHeader>
                                <Table.Header>
                                    <Table.Row bg="bg.subtle" zIndex="-1">
                                        <Table.ColumnHeader>Department</Table.ColumnHeader>
                                        <Table.ColumnHeader>Size</Table.ColumnHeader>
                                        <Table.ColumnHeader>Salary Avg.</Table.ColumnHeader>
                                        <Table.ColumnHeader>Age Avg.</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {depSize?.map((dep) => (
                                        <Table.Row key={dep.department}>
                                            <Table.Cell>{dep.department}</Table.Cell>
                                            <Table.Cell>{dep.size}</Table.Cell>
                                            <Table.Cell>{depSalary.find(s => s.department === dep.department)?.salary}</Table.Cell>
                                            <Table.Cell>{depAge.find(a => a.department === dep.department)?.age}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Table.ScrollArea>
                    </Stack>
                </>
            }
        </>
    );
}

export default DepartmentStatisticsTable