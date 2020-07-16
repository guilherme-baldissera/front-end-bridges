import React, { Component } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const messageType = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
}

const position = {
    horizontal: 'center',
    vertical: 'top',
}

class MessageBar extends Component {

    render() {
        const { message } = this.props;
        const { closeAfter } = this.props;
        const { onMessageBarClose } = this.props;
        const { isOpen } = this.props;
        const { type } = this.props;
        
        return (
            <Snackbar
                autoHideDuration={closeAfter}
                anchorOrigin={position}
                onClose={onMessageBarClose}
                open={isOpen}>
                    <Alert
                        variant="filled"
                        severity={messageType[type]}>
                            {message}
                    </Alert>
            </Snackbar>
        )
    }
}
export default MessageBar;
