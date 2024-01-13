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
    }
}

export default PostsService;