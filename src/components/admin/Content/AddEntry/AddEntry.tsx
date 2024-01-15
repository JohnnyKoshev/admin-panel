import React, {useEffect, useState} from 'react';
import {Modal, Box, Typography, TextField, Button, InputLabel, Select, MenuItem} from '@mui/material';
import {observer} from 'mobx-react';
import {GridColDef} from "@mui/x-data-grid";
import generateId from "../../../../utils/IdGenerator";
import {useLoader} from "../../../Loader/Loader";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddEntry = observer(({open, handleClose, columns, store, service, handleAdd}) => {
    const [refactoredColumns, setRefactoredColumns] = useState<Array<GridColDef<any, any, any>>>(columns);
    const {showLoader, hideLoader} = useLoader();

    const initialFormData = columns.reduce((acc, column) => {
        acc[column.field] = '';
        return acc;
    }, {});

    const initialFormErrors = columns.reduce((acc, column) => {
        acc[column.field] = '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    useEffect(() => {
        setRefactoredColumns(refactoredColumns.filter(column => column.field !== 'id'));
    }, []);

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const validate = () => {
        let errors = {};
        let isValid = true;
        refactoredColumns.forEach(column => {
            console.log(formData);
            if (!formData[column.field]) {
                errors[column.field] = 'This field is required';
                isValid = false;
            }
        });
        setFormErrors(errors);
        return isValid;
    };

    const handleCloseModal = () => {
        handleClose();
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            console.log(formData);
            await handleAdd(formData);
            handleCloseModal();
        }
    };


    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    Add New Entry
                </Typography>
                <Box component="form" onSubmit={(event) => handleSubmit(event)} noValidate sx={{mt: 1}}>
                    {refactoredColumns.map((column) => (
                        <TextField
                            key={column.field}
                            margin="normal"
                            required
                            fullWidth
                            id={column.field}
                            label={column.headerName === 'Image' ? 'Image URL' : column.headerName}
                            name={column.field}
                            value={formData[column.field]}
                            onChange={handleChange}
                            error={!!formErrors[column.field]}
                            helperText={formErrors[column.field]}
                        />

                    ))}
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                        Add Entry
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
        ;
});

export default AddEntry;
