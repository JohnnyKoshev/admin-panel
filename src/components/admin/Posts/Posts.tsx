import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import Content from "../Content/Content";
import {GridColDef} from "@mui/x-data-grid";
import {useLoader} from "../../Loader/Loader";
import PostsService from "../../../services/PostsService";
import postsStore from "../../../stores/PostsStore";

const Posts = observer(() => {
    const {showLoader, hideLoader} = useLoader();
    const [rows, setRows] = useState([]);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Title', width: 200},
        {field: 'body', headerName: 'Body', width: 300},
        {field: 'userId', headerName: 'User ID', width: 100, align: 'center', headerAlign: 'center'},
        {
            field: 'tags', headerName: 'Tags', width: 150,
            renderCell: (params) => (
                <span>{params.value.join(', ')}</span>
            )
        },
        {field: 'reactions', headerName: 'Reactions', width: 110, align: 'center', headerAlign: 'center'},
    ];


    useEffect(() => {
        if (postsStore.data.length > 0) return setRows(postsStore.data);
        showLoader();
        PostsService.getPosts().then((data) => {
            postsStore.data = data.posts;
            setRows(data.posts);
            hideLoader();
        })

    }, [])


    return <Content columns={columns} rows={rows} setRows={setRows} service={PostsService} store={postsStore}/>
});

export default Posts;