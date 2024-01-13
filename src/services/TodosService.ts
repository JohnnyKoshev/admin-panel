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
    }
}

export default TodosService;