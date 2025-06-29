
import { FC, useState } from 'react';
import { Menu, Button, Portal, Slider, HStack, VStack, Text, Box } from '@chakra-ui/react'
import MotionComponent from './MotionComponent';
import useEmployeeFilters from '../state-management/store';
import employeesConfig from '../../config/employees-config.json'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const AgeFilter:FC= () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState([employeesConfig.minAge, employeesConfig.maxAge]);

  const selectedMinAge = useEmployeeFilters(s => s.ageFrom);
  const onSelectMinAge = useEmployeeFilters(s => s.setAgeFrom);
  const selectedMaxAge = useEmployeeFilters(s => s.ageTo);
  const onSelectMaxAge = useEmployeeFilters(s => s.setAgeTo);
  const duration = 0.7;

  return (
    <Menu.Root onExitComplete={() => setIsOpen(false)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
          {`Age: ${selectedMinAge || employeesConfig.minAge} - 
          ${selectedMaxAge || employeesConfig.maxAge}`}
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
                <Text fontSize="sm" fontWeight="medium">Age Range</Text>
                
                <Box>
                  <Slider.Root 
                    maxW="lg"
                    step={1}
                    minStepsBetweenThumbs={1}
                    min={employeesConfig.minAge}
                    max={employeesConfig.maxAge}
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
                      Min: {sliderValues[0]} years
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Max: {sliderValues[1]} years
                    </Text>
                  </HStack>
                </Box>
                
                <HStack gap={2} justify="center">
                  <Button size="sm" colorScheme="blue" onClick={() => {
                    onSelectMinAge(sliderValues[0]);
                    onSelectMaxAge(sliderValues[1]);
                    setIsOpen(false);
                  }}>Apply</Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    setSliderValues([employeesConfig.minAge, employeesConfig.maxAge]);
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

export default AgeFilter