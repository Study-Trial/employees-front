import { HStack } from '@chakra-ui/react'
import DepartmentSelector from './DepartmentSelector'
import SalaryFilter from './SalaryFilter'
import AgeFilter from './AgeFilter'


const Filters = () => {
  return (
    <HStack>
        <DepartmentSelector/>
        <SalaryFilter/>
        <AgeFilter/>
    </HStack>
  )
}

export default Filters