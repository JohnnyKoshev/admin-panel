import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Content from "../Content/Content";
import {GridColDef} from "@mui/x-data-grid";
import {useLoader} from "../../Loader/Loader";
import UsersService from "../../../services/UsersService";
import usersStore from "../../../stores/UsersStore";

const Users = observer(() => {
    const {showLoader, hideLoader} = useLoader();

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'username', headerName: 'Username', width: 130},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'firstName', headerName: 'First Name', width: 130},
        {field: 'lastName', headerName: 'Last Name', width: 130},
        {field: 'gender', headerName: 'Gender', width: 90},
        {
            field: 'image', headerName: 'Image', width: 130, renderCell: (params) => (
                <img src={params.value} alt="" style={{width: "50px"}}/>
            )
        },
    ];


    useEffect(() => {
        showLoader();
        UsersService.getUsers().then((data) => {
            usersStore.users = data.users;
            hideLoader();
        })

    }, [])


    return <Content columns={columns} rows={usersStore.users}/>
});

export default Users;