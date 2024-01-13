import axiosInstance from "../utils/axios";

const PostsService = {
    getPosts: async () => {
        try {
            const response = await axiosInstance.get('/posts', {
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
            const response = await axiosInstance.delete(`/posts/${id}`);
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
                const response = await axiosInstance.delete(`/posts/${id}`);
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

export default PostsService;