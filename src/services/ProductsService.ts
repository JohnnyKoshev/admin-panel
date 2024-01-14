import axiosInstance from "../utils/axios";

const ProductsService = {
    getProducts: async () => {
        try {
            const response = await axiosInstance.get('/products', {
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
            const response = await axiosInstance.delete(`/products/${id}`);
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
                const response = await axiosInstance.delete(`/products/${id}`);
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
            const response = await axiosInstance.get('/products/search', {
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

export default ProductsService;