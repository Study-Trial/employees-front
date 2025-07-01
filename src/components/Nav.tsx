import { HStack, Text } from '@chakra-ui/react'
import { NavLink as RouterLink } from 'react-router-dom'
import { ColorModeButton } from './ui/color-mode'
import StatisticsSelector from '../pages/StatisticsSelector'
import { useAuthData } from '../state-management/store'

const Nav = () => {
  const role = useAuthData(s => s.userData?.role);
  return (
    <>
    {role ? <HStack justifyContent={"space-around"} marginLeft={"4vw"} p={"1rem"}>
        <RouterLink to="/home"> <Text>Home</Text></RouterLink>
        {role === "admin" && <RouterLink to="/add"> <Text>Add Employee</Text></RouterLink>}
        <StatisticsSelector></StatisticsSelector>
        <RouterLink to="/logout"><Text>Logout</Text></RouterLink>
        <ColorModeButton></ColorModeButton>
    </HStack>
    : <HStack justifyContent={"space-around"} marginLeft={"4vw"} p={"1rem"}>
        <RouterLink to="/login"><Text>Login</Text></RouterLink>
        <RouterLink to="/logout"><Text>Logout</Text></RouterLink>
    </HStack>
    }
    </>
  )
}

export default Nav