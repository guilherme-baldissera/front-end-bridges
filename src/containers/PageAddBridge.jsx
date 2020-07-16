import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import styled from "styled-components";
import MessageBar from '../components/message'

const Form = styled.form`
        border-radius: 4px;
        display: inline-flex;
        flex-flow: wrap;
        justify-content: space-around;
        align-items: center;
        background: #696464;
        width: 800px;
        opacity: 80%;
        height: 350px;
        padding: 1%;
        div {
            width: 45%;
            label{
                font-size: 16px;
                color: #e9e5dd;
                font-weight: bold;
                .MuiFormLabel-root{
                    font: 'Roboto', sans-serif;
                }
            }
        }
        .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl{
            width: 100%;
            font: 'Roboto', sans-serif;
        }
        .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl::before{
            border-bottom-color: rgb(233, 229, 221);
        }

    `
const TF = styled(TextField)`
        .MuiInput-underline:after{
            border-bottom-color: rgb(233, 229, 221);
        }
        input {
            font: 'Roboto', sans-serif;
            font-size: 16px;
            color: #e9e5dd;
            font-weight: bold;
        }
        span {
            font: 'Roboto', sans-serif;
            font-size: 16px;
            color: #e9e5dd;
            font-weight: bold;
        }

    `
const BT = styled(Button)`
        background-color: white;
        width: 45%;
        .MuiButton-label{
            color: #3e3e3e;
            z-index: 1;
            font: 'Roboto', sans-serif;
            font-size: 16px;
            font-weight: bold;
        }
        .MuiTouchRipple-root{
            opacity: 50%;
            background-color: #e9e5dd;
        }
    `

export default props => {
    const [name, setName] = useState("")
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [height, setHeight] = useState('')

    // feedback states
    const [closeAfter, setCloseAfter] = useState(0)
    const [type, setType] = useState('')
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)

    const closeFeedback = () => {
        const isOpen = showMessage
        setShowMessage(!isOpen)
    }

    function sendFeedBack(closeAfter, type, message){
        setCloseAfter(closeAfter)
        setType(type)
        setMessage(message)
        setShowMessage(true)
    }

    function fieldsAreValid(){
        if(name===""){
            sendFeedBack(3000,'error', "Name can't be empty")
            return false
        }
        else if(!(isValidNumber(length) && isValidNumber(width) && isValidNumber(height) && isValidNumber(latitude) && isValidNumber(longitude))){
            sendFeedBack(3000,'error', "The following fields should be numbers: length, width, height, latitude and longitude")
            return false
        }else if(!(length > 0 && width > 0 && height > 0)){
            sendFeedBack(3000,'error', "The following fields should be greater than 0 : length, width and height")
            return false
        }
        return true
    }

    function isValidNumber(validatingString){
        const integerRegex = /^[\d]+$/
        const floatRegex = /^[\d]+[/.]{1}[\d]+$/
        const isNumber = integerRegex.test(validatingString) || floatRegex.test(validatingString)
        return isNumber
    }

    function cleanFields(){
        setName('')
        setLength('')
        setWidth('')
        setLatitude('')
        setLongitude('')
        setHeight('')
    }

    const addBridge = (event) => {

        if (!fieldsAreValid()){
            return 0
        }
        const data = {
            "name": name,
            "height": height,
            "width": width,
            "length": length,
            "latitude": latitude,
            "longitude": longitude
        }
        axios.post(
            "http://localhost:8080/bridges", data,{ headers: {"Content-Type": "application/json"}})
            .then((response) => {
                if (response.status === 201) {
                    sendFeedBack(1500, 'success', "The bridge was saved succefully")
                    cleanFields()
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message && error.response.status === 400) {
                    sendFeedBack(3000,'error',error.response.data.message)
                }
                else if (error && error.response && error.response.status) {
                    sendFeedBack(3000,'error', "Bad Request")
                }
                else { 
                    sendFeedBack(3000,'error','API is down')
                } 
            });
    }
    return(
        <>
            <Form>
                <TF id="name"type="text" label="Name" value={name} onChange={e => setName(e.target.value)} />
                <TF id="length" type="number" label="Length(m)" value={length} onChange={e => setLength(e.target.value)} />
                <TF id="width" type="number" label="Width(m)" value={width} onChange={e => setWidth(e.target.value)} />
                <TF id="height" type="number" label="Height(m)" value={height} onChange={e => setHeight(e.target.value)} />
                <TF id="longitude" type="number" label="Longitude" value={longitude} onChange={e => setLongitude(e.target.value)} />
                <TF id="latitude" type="number" label="Latitude" value={latitude} onChange={e => setLatitude(e.target.value)} />
                <BT id="submit" onClick={addBridge}>Submit</BT>
            </Form>
            <MessageBar
                type={type}
                closeAfter={closeAfter}
                onMessageBarClose={closeFeedback}
                message={message}
                isOpen={showMessage} />
        </>
    )
}
