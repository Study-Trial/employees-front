import { Menu, Button, Portal } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import MotionComponent from './MotionComponent';
import useEmployeeFilters from '../state-management/store';
import employeesConfig from '../../config/employees-config.json'

const DepartmentSelector: FC = () => {
   const [isOpen, setIsOpen] =  useState<boolean>(false);
   const selectedDepartment = useEmployeeFilters(s => s.department);
   const onSelectDepartment = useEmployeeFilters(s => s.setDepartment);
   const duration=0.7;

  return (
      <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
         { selectedDepartment || "All Departments"}
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp></FaChevronUp>
          </MotionComponent> :<FaChevronDown></FaChevronDown>}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content>
            <Menu.Item key={"department"} value={""} cursor="pointer"
               onClick={() => {onSelectDepartment(null); setIsOpen(false)}}>All Departments</Menu.Item>
              {employeesConfig.departments?.map(d => <Menu.Item key={d} value={d} cursor="pointer"
               onClick={() => {onSelectDepartment(d); setIsOpen(false)}}>{d}</Menu.Item>)}
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default DepartmentSelector