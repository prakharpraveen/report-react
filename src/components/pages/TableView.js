import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import axios from "axios";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const TableView = () => {
    const [data, setData] = useState([]);
    const [editScript, setEditScript] = useState(false);
    const [deleteScript, setDeleteScript] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:5000/scripts')
            .then((response) => {
                setData(response.data);
            });
    }, [editScript, deleteScript])

    const [columns, setColumns] = useState([
        { title: 'Script', field: 'script' },
        { title: 'Quantity', field: 'quantity', initialEditValue: 'initial edit value', type: 'numeric' },
        { title: 'Date', field: 'date', type: 'date' },
        { title: 'Buying Price', field: 'buyingPrice', type: 'numeric' },
        { title: 'Selling Price', field: 'sellingPrice', type: 'numeric' },
        { title: 'Total Profit And Loss', field: 'totalPandL', type: 'numeric' },
    ]);

    const handleEdit = async (newData) => {
        const _id = newData._id;
        try {
            const resp = await axios.put(`http://localhost:5000/scripts/${_id}`, newData);
            setEditScript(!editScript);
            console.log(resp.data);
        } catch (err) {
            console.error("Error dusing editing", err);
        }
    }

    const handleDelete = async (oldData) => {
        const _id = oldData._id;
        try {
            const resp = await axios.delete(`http://localhost:5000/scripts/${_id}`);
            setDeleteScript(!deleteScript);
            console.log(resp.data);
        } catch (err) {
            console.error("Error dusing editing", err);
        }
    }

    return (
        <Paper elevation={3} >
            <MaterialTable
                title="Table View"
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                    actionsColumnIndex: -1
                }}
                editable={{
                    onRowUpdate: newData => handleEdit(newData),
                    onRowDelete: oldData => handleDelete(oldData)
                }}
            />
        </Paper>
    )
}

export default TableView;