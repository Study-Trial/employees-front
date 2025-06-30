import { Button } from '@chakra-ui/react'
import { useAuthData } from '../state-management/store'
import apiClient from '../services/ApiClientJsonServer';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const logout = useAuthData(s => s.logout);
    const navigate = useNavigate();
    apiClient.setToken("");
  return (
    <Button onClick={() => {logout(); navigate("/login")}}>Logout</Button>
  )
}

export default LogoutPage