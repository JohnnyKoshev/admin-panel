import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import Content from '../Content/Content';
import {GridColDef} from '@mui/x-data-grid';
import {useLoader} from '../../Loader/Loader';
import TodosService from '../../../services/TodosService';
import todosStore from '../../../stores/TodosStore';
import ITodo from "../../../interfaces/ITodo";

const Todos = observer(() => {
    const {showLoader, hideLoader} = useLoader();
    const [rows, setRows] = useState<ITodo[]>([]);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'todo', headerName: 'Todo', width: 500},
        {field: 'completed', headerName: 'Completed', width: 130},
        {field: 'userId', headerName: 'User ID', width: 130},
    ];

    useEffect(() => {
        if (todosStore.data.length > 0) return setRows(todosStore.data);
        showLoader();
        TodosService.getTodos().then((data) => {
            todosStore.data = data.todos;
            setRows(data.todos);
            hideLoader();
        })
    }, [])

    return <Content columns={columns} rows={rows} setRows={setRows} service={TodosService} store={todosStore}/>
});

export default Todos;
