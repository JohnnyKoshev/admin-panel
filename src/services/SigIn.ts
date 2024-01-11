import axiosInstance from "../utils/axios";

const SignInService = {
    login: async (username: string, password: string) => {
        return axiosInstance.post('/auth/login', {
            username,
            password,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },
    getCurrentUser: (token: string) => {
        return axiosInstance.get('/auth/me', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }
}
export default SignInService;