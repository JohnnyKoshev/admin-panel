import axiosInstance from "../utils/axios";

const UsersService = {
    getUsers: async () => {
        try {
            const response = await axiosInstance.get('/users', {
                params: {
                    limit: 0
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default UsersService;