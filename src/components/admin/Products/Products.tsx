import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import Content from "../Content/Content";
import {GridColDef} from "@mui/x-data-grid";
import {useLoader} from "../../Loader/Loader";
import ProductsService from "../../../services/ProductsService";
import productsStore from "../../../stores/ProductsStore";

const Products = observer(() => {
    const {showLoader, hideLoader} = useLoader();
    const [rows, setRows] = useState([]);

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
        if(productsStore.data.length > 0) return setRows(productsStore.data);
        showLoader();
        ProductsService.getProducts().then((data) => {
            productsStore.data = data.products;
            setRows(data.products);
            hideLoader();
        })
    }, [])


    return <Content columns={columns} rows={rows} setRows={setRows}  service={ProductsService} store={productsStore}/>
});

export default Products;