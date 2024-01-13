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
    }
}

export default ProductsService;