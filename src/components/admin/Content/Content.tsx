import React, {useEffect, useState} from "react";
import styles from "./Content.module.scss";
import {Button, IconButton, InputBase, Paper, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import TrashIcon from '../../../assets/delete-btn.png';
import TrashIconDisabled from '../../../assets/delete-btn-disabled.png';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const Content = ({columns, rows}) => {
    const [isSelection, setIsSelection] = useState(false);
    const [refactoredColumns, setRefactoredColumns] = useState<Array<GridColDef<any, any, any>>>([]);
    const [value, setValue] = useState('');


    useEffect(() => {
        setRefactoredColumns([{
            field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) => (
                <div style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
                    <BorderColorIcon color={"primary"} style={{cursor: "pointer"}}/>
                    <DeleteIcon color={"error"} style={{cursor: "pointer"}}/>
                </div>
            )
        }, ...columns]);
    }, []);


    return <div className={styles.contentContainer}>
        <div className={styles.contentTopContainer}>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Search for entry"
                    inputProps={{'aria-label': 'search bar'}}
                />
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <span className={styles.contentActionsContainer}>
                <Button variant="contained" color="success">
                    Add Entry
                </Button>
                {isSelection ? <img src={TrashIcon} alt="delete icon" style={{width: "50px", cursor: "pointer"}}/> :
                    <img src={TrashIconDisabled} alt="delete icon" style={{width: "50px"}}/>}
            </span>
        </div>
        <TextField
            placeholder="Selected Cell Value"
            disabled
            multiline
            rows={2}
            maxRows={3}
            value={value}
        />
        <div style={{height: '50vh', width: '100%'}}>
            <DataGrid
                disableRowSelectionOnClick
                rows={rows}
                columns={refactoredColumns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowSelectionModelChange={(ids, details) => {
                    if (ids.length > 0)
                        setIsSelection(true);
                    else
                        setIsSelection(false);
                }}
                onCellClick={(params, event) => {
                    setValue(params.formattedValue as string)
                }}
            />
        </div>


    </div>
        ;
}

export default Content;