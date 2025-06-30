import { Button, HStack } from '@chakra-ui/react'
import { useAuthData } from '../state-management/store'
import apiClient from '../services/ApiClientJsonServer';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const logout = useAuthData(s => s.logout);
    const navigate = useNavigate();
    apiClient.setToken("");
  return (
    <HStack justifyContent={"center"} p={"10vh"}>
    <Button onClick={() => {logout(); navigate("/login")}}>Logout</Button>
    </HStack>
  )
}

export default LogoutPage