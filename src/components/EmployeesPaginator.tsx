import {
    ButtonGroup,
    IconButton,
    Pagination,
    Stack,
} from "@chakra-ui/react"
import { FC } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { usePagination } from "../state-management/EmployeesPaginationStore"
import employeesConfig from '../../config/employees-config.json'
import { Employee } from "../model/dto-types"

interface Props {
    employees: Employee[]
}

export const EmployeesPaginator: FC<Props> = ({ employees }) => {
    const statePage = usePagination(s => s.page)
    const setPage = usePagination(s => s.setPage)
    const pageSize = employeesConfig.pageSize
    const count = usePagination(s => s.count)
    const setCount = usePagination(s => s.setCount)
    setCount(employees.length)
    const pageQuantity = Math.ceil(employees.length / pageSize);

    return (
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Pagination.Root
                count={count}
                pageSize={pageSize}
                page={statePage}
                onPageChange={(e) => setPage(e.page)}
                siblingCount={pageQuantity > 8 ? 1 : pageQuantity}
            >
                <ButtonGroup variant="ghost" size="sm">
                    <Pagination.PrevTrigger asChild>
                        <IconButton>
                            <HiChevronLeft />
                        </IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items
                        render={(page) => (
                            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                                {page.value}
                            </IconButton>
                        )}
                    />

                    <Pagination.NextTrigger asChild>
                        <IconButton>
                            <HiChevronRight />
                        </IconButton>
                    </Pagination.NextTrigger>
                </ButtonGroup>
            </Pagination.Root>
        </Stack>
    )
}