import axiosInstance from "../utils/axios";
import {AxiosResponse} from "axios";
import Optional from "../interfaces/Optional";
import IUser from "../interfaces/IUser";

interface IAuthService {
    login: (username: string, password: string) => Promise<AxiosResponse<any, any>>;
    getCurrentUser: () => Optional<IUser>;
    logout: () => void;
}

const AuthService: IAuthService = {
    login: async (username: string, password: string) => {
        return axiosInstance.post('/auth/login', {
            username,
            password,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('data') as string);
    },
    logout: () => {
        localStorage.removeItem('data');
        localStorage.removeItem('token');
        window.location.href = '/sign-in';
    }
}
export default AuthService;