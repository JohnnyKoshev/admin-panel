import axiosInstance from "../utils/axios";
import IPost from "../interfaces/IPost";

interface IPostsService {
    getPosts: () => Promise<{
        'limit': number;
        'posts': IPost[];
        'skip': number;
        'total': number;
    }>;
    deleteOne: (id: number) => Promise<boolean>;
    deleteMany: (ids: number[]) => Promise<boolean>;
    search: (searchTerm: string) => Promise<IPost[]>;
    addOne: (post: IPost) => Promise<IPost | null>;
}

const PostsService: IPostsService = {
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
    },

    search: async (searchTerm: string) => {
        try {
            const response = await axiosInstance.get('/posts/search', {
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
    addOne: async (post: IPost) => {
        try {
            const response = await axiosInstance.post('/posts/add', post);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export default PostsService;