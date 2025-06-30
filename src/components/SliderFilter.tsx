import { Menu, Button, Portal, Slider, HStack, VStack, Text, Box } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import MotionComponent from './MotionComponent';
import useEmployeeFilters from '../state-management/store';

interface Props {
  min: number;
  max: number;
  criteria: string;
}

const SliderFilter: FC<Props> = ({min, max, criteria}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState([min, max]);

  const title = criteria.charAt(0).toUpperCase() + criteria.slice(1);
  const selectedMin = useEmployeeFilters(s => criteria ==="salary" ? s.salaryFrom : s.ageFrom);
  const onSelectMin = useEmployeeFilters(s => criteria ==="salary" ? s.setSalaryFrom : s.setAgeFrom);
  const selectedMax = useEmployeeFilters(s => criteria ==="salary" ? s.salaryTo : s.ageTo);
  const onSelectMax = useEmployeeFilters(s => criteria ==="salary" ? s.setSalaryTo : s.setAgeTo);
  const duration = 0.7;

  return (
    <Menu.Root open={isOpen} onOpenChange={(details) => setIsOpen(details.open)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm" marginBottom={3} onClick={() => setIsOpen(!isOpen)}>
          {`${title}: ${selectedMin || min} - 
          ${selectedMax || max}`}
          {isOpen ? <MotionComponent duration={duration}>
            <FaChevronUp />
          </MotionComponent> : <FaChevronDown></FaChevronDown>}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <MotionComponent duration={duration}>
            <Menu.Content p={4} minW="350px">
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" fontWeight="medium">{title}</Text>
                
                <Box>
                  <Slider.Root 
                    maxW="lg"
                    step={criteria==="salary" ? 1000 : 1}
                    minStepsBetweenThumbs={1}
                    min={min}
                    max={max}
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
                      Min: {sliderValues[0]} {criteria==="salary" ? "NIS" : "years"}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Max: {sliderValues[1]} {criteria==="salary" ? "NIS" : "years"}
                    </Text>
                  </HStack>
                </Box>
                
                <HStack gap={2} justify="center" >
                  <Button type="submit" size="sm" colorScheme="blue" onClick={() => {
                    onSelectMin(sliderValues[0]);
                    onSelectMax(sliderValues[1]);
                    setIsOpen(false);
                  }}>Apply</Button>
                  <Button type="reset" size="sm" variant="outline" onClick={() => {
                    setSliderValues([min, max]);
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

export default SliderFilter