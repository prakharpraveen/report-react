import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(5),
            width: theme.spacing("50%"),
            // height: theme.spacing(75),
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(10),
            width: '15%',
        }
    },
}));

const Home = () => {
    const classes = useStyles();
    const [initialState, setInitialState] = useState({
        script: "",
        quantity: 0,
        date: new Date(),
        buyingPrice: 0,
        sellingPrice: 0,
        totalPandL: 0
    });
    const [open, setOpen] = useState(false);
    const [response, setRespose] = useState('');

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        setInitialState(prevState => {
            const newItem = { ...prevState, [name]: value };
            return {
                ...prevState, [name]: value,
                totalPandL: (newItem.quantity) * ((newItem.sellingPrice) - (newItem.buyingPrice))
            }
        });
    };

    const handleCancel = () => {

        setInitialState({
            script: "",
            quantity: 0,
            date: new Date(),
            buyingPrice: 0,
            sellingPrice: 0,
            totalPandL: 0
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const resp = await axios.post('http://localhost:5000/scripts', initialState);
            console.log(resp.data);
            setRespose(resp.data);
            setOpen(true);
            handleCancel();
        } catch (err) {
            console.error("error during post request", err);
        }
    }

    const { script, quantity, buyingPrice, sellingPrice, totalPandL } = initialState;

    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <h1>Enter Script and Other Details</h1>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            label="Script"
                            type="text"
                            name="script"
                            value={script}
                            onChange={handleChange}
                            placeholder="e.g SBIN"
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleChange}
                            placeholder="e.g 10"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Date"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            label="Buying Price"
                            type="number"
                            name="buyingPrice"
                            value={buyingPrice}
                            onChange={handleChange}
                            placeholder="e.g 500"
                        />
                        <TextField
                            label="Selling Price"
                            type="number"
                            name="sellingPrice"
                            value={sellingPrice}
                            onChange={handleChange}
                            placeholder="e.g 550"
                        />
                        <TextField
                            // required
                            label="Total Profit And Loss"
                            type="number"
                            name="totalPandL"
                            value={totalPandL}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        style={{ margin: '5px' }}
                        disabled={(script.length <= 1 || totalPandL === 0)}
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: '5px' }}
                        disabled={(script.length <= 1 || totalPandL === 0)}
                        onClick={handleSave}>
                        Save
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={4000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {response}
                </Alert>
            </Snackbar>
        </div>
    );


}

export default Home;