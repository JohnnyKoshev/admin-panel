import axiosInstance from "../utils/axios";
import IUser from "../interfaces/IUser";

interface IUsersService {
    getUsers: () => Promise<{
        limit: number;
        users: IUser[];
        skip: number;
        total: number;
    }>;
    deleteOne: (id: number) => Promise<boolean>;
    deleteMany: (ids: number[]) => Promise<boolean>;
    search: (searchTerm: string) => Promise<IUser[]>;
}

const UsersService: IUsersService = {
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
    },
    deleteOne: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/users/${id}`);
            return response.data.isDeleted;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    deleteMany: async (ids: number[]) => {
        try {
            let check: boolean = true;
            for (let id of ids) {
                const response = await axiosInstance.delete(`/users/${id}`);
                if (!response.data.isDeleted)
                    check = false;
            }
            return check;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    search: async (searchTerm: string) => {
        try {
            const response = await axiosInstance.get('/users/search', {
                params: {
                    limit: 0,
                    q: searchTerm
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