import axiosInstance from "../utils/axios";
import ITodo from "../interfaces/ITodo";

interface ITodosService {
    getTodos: () => Promise<{
        limit: number;
        todos: ITodo[];
        skip: number;
        total: number;
    }>;
    deleteOne: (id: number) => Promise<boolean>;
    deleteMany: (ids: number[]) => Promise<boolean>;
    search: (searchTerm: string) => Promise<ITodo[] | null>;
    addOne: (todo: ITodo) => Promise<ITodo | null>;
}

const TodosService: ITodosService = {
    getTodos: async () => {
        try {
            const response = await axiosInstance.get('/todos', {
                params: {
                    limit: 0
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    deleteOne: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/todos/${id}`);
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
                const response = await axiosInstance.delete(`/todos/${id}`);
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
        return null;
    },

    addOne: async (todo: ITodo) => {
        try {
            const response = await axiosInstance.post('/todos/add', todo);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default TodosService;