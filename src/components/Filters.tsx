import { HStack } from '@chakra-ui/react'
import DepartmentSelector from './DepartmentSelector'
import SliderFilter from './SliderFilter'
import employeesConfig from '../../config/employees-config.json'


const Filters = () => {
  return (
    <HStack justifyContent={"space-around"} p={"0 10vw"}>
        <DepartmentSelector/>
        <SliderFilter min={employeesConfig.minSalary} max={employeesConfig.maxSalary} criteria="salary"/>
        <SliderFilter min={employeesConfig.minAge} max={employeesConfig.maxAge} criteria="age"/>
    </HStack>
  )
}

export default Filters