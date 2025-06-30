import { useAuthData } from '../state-management/store'
import { LoginData, UserData } from '../services/AuthClient';
import authClient from '../services/AuthClientJsonServer';
import LoginForm from '../components/LoginForm';
import apiClient from '../services/ApiClientJsonServer';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const login = useAuthData(s => s.login);
    const navigate = useNavigate();
    const submitter = async (loginData: LoginData) => {
        let res = false;
        try {
            const userData: UserData = await authClient.login(loginData);
            login(userData);
            apiClient.setToken(userData.token);
            res = true;
            navigate("/home")
        } catch (error) {
            
        }
        return res;
    }

  return (
    <LoginForm submitter={submitter}></LoginForm>
  )
}

export default LoginPage