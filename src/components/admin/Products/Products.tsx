import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Content from "../Content/Content";
import {GridColDef} from "@mui/x-data-grid";
import {useLoader} from "../../Loader/Loader";
import ProductsService from "../../../services/ProductsService";
import productsStore from "../../../stores/ProductsStore";

const Products = observer(() => {
    const {showLoader, hideLoader} = useLoader();

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Title', width: 130},
        {field: 'description', headerName: 'Description', width: 200},
        {field: 'price', headerName: 'Price', type: 'number', width: 90},
        {field: 'discountPercentage', headerName: 'Discount %', type: 'number', width: 130},
        {field: 'rating', headerName: 'Rating', type: 'number', width: 90},
        {field: 'stock', headerName: 'Stock', type: 'number', width: 90},
        {field: 'brand', headerName: 'Brand', width: 130},
        {field: 'category', headerName: 'Category', width: 130},
        {
            field: 'thumbnail', headerName: 'Image', width: 130, renderCell: (params) => (
                <img src={params.value} alt="" style={{width: "50px"}}/>
            )
        },
    ];

    useEffect(() => {
        if (productsStore.products.length > 0) return;
        showLoader();
        ProductsService.getProducts().then((data) => {
            productsStore.products = data.products;
            hideLoader();
        })
    }, [])


    return <Content columns={columns} rows={productsStore.products} service={ProductsService} store={productsStore}/>
});

export default Products;