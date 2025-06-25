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
    const objDep = getDepartmentStats(employees ?? []);
    function getDepartmentStats(items: Employee[]) {
        return _.chain(items)
        .groupBy((i) => i.department)
        .map((value: Employee[], key: string) => ({
          department: key,
            size: value.length,
            avgAge: _.round(_.meanBy(value,e=>getAge(e.birthDate)), 1),
            avgSalary: _.round(_.meanBy(value,e=>e.salary), 1)
        }))
        .value();
      }
      function getAge(birthDate: string) {
        return new Date().getFullYear() - new Date(birthDate).getFullYear();
      }

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
                                    {objDep?.map((dep) => (
                                        <Table.Row key={dep.department}>
                                            <Table.Cell>{dep.department}</Table.Cell>
                                            <Table.Cell>{dep.size}</Table.Cell>
                                            <Table.Cell>{dep.avgSalary}</Table.Cell>
                                            <Table.Cell>{dep.avgAge}</Table.Cell>
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