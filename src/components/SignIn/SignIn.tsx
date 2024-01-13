import React, {useState} from "react";
import styles from './SignIn.module.scss';
import SignInIcon from '../../assets/sign-in-icon.png';
import {Button, TextField} from "@mui/material";
import AuthService from "../../services/AuthService";
import {useLoader} from "../Loader/Loader";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const SignIn = observer(() => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {showLoader, hideLoader} = useLoader();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        console.log({
            username: username,
            password: password
        });

        if (username && password) {
            showLoader();
            try {
                const response = await AuthService.login(username as string, password as string);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('data', JSON.stringify(response.data));
                setError('');
                hideLoader();
                navigate('/main');
            } catch (error) {
                setError("Login failed. Please check your username and password.")
                hideLoader();
            }
        }
    }


    return <div className={styles.signInContainer}>

        <div className={styles.signInFormContainer}>
            <img src={SignInIcon} alt="basket icon" style={{width: '12vw'}}/>
            <form onSubmit={handleSubmit}>
                <TextField
                    className={styles.signInFormInput}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    className={styles.signInFormInput}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{margin: '30px 0'}}
                >
                    Sign In
                </Button>
                {error && <div className={styles.signInFormError}>{error}</div>}
            </form>
        </div>


    </div>;
});
export default SignIn