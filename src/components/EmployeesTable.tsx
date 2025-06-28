import { MutationFunction, useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Employee } from "../model/dto-types";
import apiClient from "../services/ApiClientJsonServer";
import { Avatar, Button, HStack, Spinner, Stack, Table, Text } from "@chakra-ui/react";
import { AxiosError } from "axios";
import useEmployeesMutation from "../hooks/useEmployeesMutation";

interface Props {
  deleteFn: MutationFunction
}

const EmployeesTable: FC<Props> = ({ deleteFn }) => {
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey: ["employees"],
    queryFn: () => apiClient.getAll(),
    staleTime: 3600_000
  });
  const mutationDel = useEmployeesMutation(deleteFn);
  return (
    <>
      {mutationDel.isPending && (
        <HStack
          justifyContent="center"
          alignItems="center"
          height="80vh"
          width="100vw"
          bg="rgba(0, 0, 0, 0.5)"
          position="fixed"
        >
          <Spinner size="xl" color="white" 
          />
        </HStack>
      )}
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
                  <Table.Row bg="bg.subtle" zIndex="0">
                    <Table.ColumnHeader></Table.ColumnHeader>
                    <Table.ColumnHeader>Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader>Salary</Table.ColumnHeader>
                    <Table.ColumnHeader>Birthday</Table.ColumnHeader>
                    <Table.ColumnHeader></Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body  zIndex="-100">
                  {employees?.map((empl) => (
                    <Table.Row key={empl.id} >
                      <Table.Cell>
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell>{empl.fullName}</Table.Cell>
                      <Table.Cell>{empl.department}</Table.Cell>
                      <Table.Cell>{empl.salary}</Table.Cell>
                      <Table.Cell>{empl.birthDate}</Table.Cell>
                      <Table.Cell>
                        <Button bg="red.500" disabled={mutationDel.isPending} onClick={() => mutationDel.mutate(empl.id as string)}>
                          Delete
                        </Button>
                      </Table.Cell>
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
};

export default EmployeesTable;
