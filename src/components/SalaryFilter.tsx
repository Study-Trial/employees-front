import { Menu, Button, Portal, Slider, HStack, VStack, Text, Box } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import MotionComponent from './MotionComponent';
import useEmployeeFilters from '../state-management/store';
import employeesConfig from '../../config/employees-config.json'

const SalaryFilter: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState([employeesConfig.minSalary, employeesConfig.maxSalary]);

  const selectedMinSalary = useEmployeeFilters(s => s.salaryFrom);
  const onSelectMinSalary = useEmployeeFilters(s => s.setSalaryFrom);
  const selectedMaxSalary = useEmployeeFilters(s => s.salaryTo);
  const onSelectMaxSalary = useEmployeeFilters(s => s.setSalaryTo);
  const duration = 0.7;

  return (
    <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
          {`Salary: ${selectedMinSalary || employeesConfig.minSalary} - 
          ${selectedMaxSalary || employeesConfig.maxSalary}`}
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp />
          </MotionComponent> : <FaChevronDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content p={4} minW="350px">
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" fontWeight="medium">Salary Range</Text>
                
                <Box>
                  <Slider.Root 
                    maxW="lg"
                    step={1000}
                    minStepsBetweenThumbs={1}
                    min={employeesConfig.minSalary}
                    max={employeesConfig.maxSalary}
                    value={sliderValues}
                    onValueChange={(data) => setSliderValues(data.value)}
                  >
                    <Slider.Control>
                      <Slider.Track>
                        <Slider.Range />
                      </Slider.Track>
                      <Slider.Thumbs />
                    </Slider.Control>
                  </Slider.Root>
                  
                  <HStack justify="space-between" mt={2}>
                    <Text fontSize="xs" color="gray.600">
                      Min: {sliderValues[0]} NIS
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Max: {sliderValues[1]} NIS
                    </Text>
                  </HStack>
                </Box>
                
                <HStack gap={2} justify="center">
                  <Button size="sm" colorScheme="blue" onClick={() => {
                    onSelectMinSalary(sliderValues[0]);
                    onSelectMaxSalary(sliderValues[1]);
                    setIsOpen(false);
                  }}>Apply</Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setSliderValues([employeesConfig.minSalary, employeesConfig.maxSalary]);
                  }}>Reset</Button>
                </HStack>
              </VStack>
            </Menu.Content>
          </MotionComponent>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default SalaryFilter