import React from "react";
import styles from "./Content.module.scss";
import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Content = ({}) => {

    


    return <div className={styles.contentContainer}>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for entry"
                inputProps={{ 'aria-label': 'search bar' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>


    </div>;
}

export default Content;