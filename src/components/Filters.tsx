import { HStack } from '@chakra-ui/react'
import DepartmentSelector from './DepartmentSelector'
import SalaryFilter from './SalaryFilter'
import AgeFilter from './AgeFilter'


const Filters = () => {
  return (
    <HStack justifyContent={"space-around"} p={"0 10vw"}>
        <DepartmentSelector/>
        <SalaryFilter/>
        <AgeFilter/>
    </HStack>
  )
}

export default Filters