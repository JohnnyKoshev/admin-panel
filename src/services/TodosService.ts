import axiosInstance from "../utils/axios";

const TodosService = {
    getTodos: async () => {
        try {
            const response = await axiosInstance.get('/todos', {
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
    }
}

export default TodosService;