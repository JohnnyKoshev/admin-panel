import axiosInstance from "../utils/axios";
import {AxiosResponse} from "axios";

type GeneralResponse = {
    'limit': number;
    'skip': number;
    'total': number;
    [key: string]: any;
}
type PostResponse<T> = GeneralResponse & {
    'posts': T[];
}
type ProductResponse<T> = GeneralResponse & {
    'products': T[];
}
type UserResponse<T> = GeneralResponse & {
    'users': T[];
}
type TodoResponse<T> = GeneralResponse & {
    'todos': T[];
}

class GenericService<T> {
    private readonly endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getAll(params: Record<string, any> = {limit: 0}): Promise<PostResponse<T> | ProductResponse<T> | TodoResponse<T> | UserResponse<T>> {
        try {
            const response = await axiosInstance.get(`/${this.endpoint}`, {params});
            return response.data;
        } catch (error) {
            console.error(error);
            const itemName = this.endpoint + 's';
            return {
                [itemName]: [],
                limit: params.limit,
                skip: 0,
                total: 0
            } as PostResponse<T> | ProductResponse<T> | TodoResponse<T> | UserResponse<T>;
        }
    }

    async deleteOne(id: number): Promise<boolean> {
        try {
            const response: AxiosResponse<{
                isDeleted: boolean
            }> = await axiosInstance.delete(`/${this.endpoint}/${id}`);
            return response.data.isDeleted;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async deleteMany(ids: number[]): Promise<boolean> {
        try {
            let check: boolean = true;
            for (let id of ids) {
                const response: AxiosResponse<{
                    isDeleted: boolean
                }> = await axiosInstance.delete(`/${this.endpoint}/${id}`);
                if (!response.data.isDeleted) {
                    check = false;
                }
            }
            return check;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async search(searchTerm: string, params: Record<string, any> = {limit: 0}): Promise<PostResponse<T> | ProductResponse<T> | TodoResponse<T> | UserResponse<T> | null> {
        if (this.endpoint === 'todos') return null;
        try {
            const response = await axiosInstance.get(`/${this.endpoint}/search`, {
                params: {...params, q: searchTerm}
            });
            return response.data;
        } catch (error) {
            console.error(error);
            const itemName = this.endpoint + 's';
            return {
                [itemName]: [],
                limit: params.limit,
                skip: 0,
                total: 0
            } as PostResponse<T> | ProductResponse<T> | TodoResponse<T> | UserResponse<T>;
        }
    }

    async addOne(item: T): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await axiosInstance.post(`/${this.endpoint}/add`, item);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateOne(item: T & { id: number }): Promise<T | null> {
        try {
            const body = {};
            for (let key in item) {
                if (item[key] !== null && item[key] !== undefined && key !== 'id') {
                    body[key] = item[key];
                }
            }
            const response: AxiosResponse<T> = await axiosInstance.put(`/${this.endpoint}/${item.id}`, body);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default GenericService;
