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
    addOne: (user: IUser) => Promise<IUser | null>;
    updateOne: (user: IUser) => Promise<IUser | null>;
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
    },

    addOne: async (user: IUser) => {
        try {
            const response = await axiosInstance.post('/users/add', user);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateOne: async (user: IUser) => {
        try {
            const body = {};
            for (let key in user) {
                if (user[key] !== null && user[key] !== undefined && key !== 'id') {
                    body[key] = user[key];
                }
            }
            const response = await axiosInstance.put(`/users/${user.id}`, body);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export default UsersService;