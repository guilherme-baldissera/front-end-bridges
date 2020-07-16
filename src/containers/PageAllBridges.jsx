import React, {useEffect, useState} from "react";
import axios from 'axios'
import Table from "../components/table"
import styled from "styled-components"

const Content = styled.div`
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    `

export default props =>{
    const BridgeURL = 'http://localhost:8080/bridges'

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        {
            id: 'height',
            label: 'Height(m)',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'width',
            label: 'Width(m)',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'length',
            label: 'Length(m)',
            minWidth: 100,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        { id: 'latitude', label: 'Latitude', align: 'right', minWidth: 100 },
        { id: 'longitude', label: 'Longitude', align: 'right', minWidth: 100 },
    ];

    const [rows, setRows] = useState([])

    function createData(row) {
        return { ...row };
    }

    useEffect(()=>{
        axios.get(BridgeURL).then(resp=> {
            const rowsFromDB = []
            resp.data.map(row => rowsFromDB.push(createData(row)))
            setRows(rowsFromDB)
        })
    },[])

    return(
        <Content>
            <Table columns={columns} rows={rows} rowsPerPageOptions={[5,10]} />
        </Content>
    );
}
