import React, {useEffect, useState} from "react";
import styles from "./Content.module.scss";
import {Button, IconButton, InputBase, Paper, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {DataGrid, GridColDef, GridRowId, useGridApiRef} from '@mui/x-data-grid';
import TrashIcon from '../../../assets/delete-btn.png';
import TrashIconDisabled from '../../../assets/delete-btn-disabled.png';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {useLoader} from "../../Loader/Loader";
import {debounce} from 'lodash';
import AddEntry from "./AddEntry/AddEntry";
import generateId from "../../../utils/IdGenerator";
import {runInAction} from "mobx"

const Content = ({columns, service, store, rows, setRows}) => {
    const [isSelection, setIsSelection] = useState(false);
    const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);
    const [refactoredColumns, setRefactoredColumns] = useState<Array<GridColDef<any, any, any>>>([]);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const {showLoader, hideLoader} = useLoader();
    const apiRef = useGridApiRef();

    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);

    const handleDeleteEntryDebounced = debounce(async (params) => {
        showLoader()
        if (await service.deleteOne(params.id) || store.data.find(entry => entry.id === params.id)) {
            store.deleteOne(params.id);
            setRows(store.data);
        }
        hideLoader();
    }, 300);
    const handleDeleteEntriesDebounced = debounce(async () => {
        showLoader();
        if (isSelection) {
            if (await service.deleteMany(selectedIds) || store.data.some(entry => selectedIds.includes(entry.id))) {
                store.deleteMany(selectedIds);
                setRows(store.data);
            }
        }
        hideLoader();
    }, 300);
    const handleSearchDebounced = debounce(async (value) => {
        console.log(value)
        try {
            showLoader();
            if (value === '') setRows(store.data);
            const data = await service.search(value);
            if (data === null) {
                setRows(store.search(value));
            } else {
                const filteredRows = data[`${window.location.href.split('/').slice(-1)}`].filter(apiEntry =>
                    store.data.some(localEntry => localEntry.id === apiEntry.id)
                );
                setRows(filteredRows);
                console.log(filteredRows);
            }
            hideLoader();
        } catch (e) {
            console.log(e)
            hideLoader();
        }
    }, 300);

    const handleAddEntryDebounced = async (formData) => {
        showLoader();
        formData['id'] = generateId(store.getIds());
        const response = await service.addOne(formData);
        if (response) {
            store.addOne(response);
            setRows([...rows]);
        }

        hideLoader();
    };

    useEffect(() => {

        setRows(store.data);

    }, [store.data]);

    useEffect(() => {
        if (refactoredColumns.length > 0 || rows.length > 0) return;
        setRefactoredColumns([{
            field: 'actions', headerName: 'Actions', width: 130, renderCell: (params) => (
                <div style={{display: "flex", flexDirection: "row"}}>
                    <IconButton>
                        <BorderColorIcon color={"primary"} style={{cursor: "pointer"}}/>
                    </IconButton>
                    <IconButton onClick={async () => await handleDeleteEntryDebounced(params)}>
                        <DeleteIcon color={"error"} style={{cursor: "pointer"}}/>
                    </IconButton>
                </div>
            )
        }, ...columns]);
    }, [columns]);


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
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}/>
                <IconButton type="button" sx={{p: '10px'}} aria-label="search"
                            onClick={() => handleSearchDebounced(searchValue)}>
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <span className={styles.contentActionsContainer}>
                <Button variant="contained" color="success" onClick={handleAddOpen}>
                    Add Entry
                </Button>
                {isSelection ?
                    <img src={TrashIcon} alt="delete icon" style={{width: "50px", cursor: "pointer"}}
                         onClick={async () => await handleDeleteEntriesDebounced()}/> :
                    <img src={TrashIconDisabled} alt="delete icon disabled" style={{width: "50px"}}/>}
            </span>
            <AddEntry open={addOpen} handleClose={handleAddClose} columns={columns} store={store} service={service}
                      handleAdd={handleAddEntryDebounced}/>
        </div>
        <TextField
            placeholder="Selected Cell Value"
            disabled
            multiline
            minRows={2}
            maxRows={3}
            value={value}
        />
        <div style={{height: '50vh', width: '100%'}}>
            <DataGrid
                apiRef={apiRef}
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
                    if (ids.length > 0) {
                        setSelectedIds(ids);
                        setIsSelection(true);
                    } else {
                        setSelectedIds([]);
                        setIsSelection(false);
                    }
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