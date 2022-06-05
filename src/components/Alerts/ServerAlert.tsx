import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { AlertTitle } from '@mui/material';
import { OperationCodeMessage } from '../../models/OperationCode';
type Props = {
    onAlert: boolean
    retryTimeout: number,
    operationCodeMessage: OperationCodeMessage
}

const ServerAlert: React.FC<Props> = ({onAlert, retryTimeout, operationCodeMessage}) => {
    const [counter, setCounter] = React.useState(retryTimeout);
    React.useEffect(() => {
        const timer1 = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer1);
      }, [counter]);
    return  (<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Collapse sx={{ mt: { sm: -7, md: 0}, width: '90%' }} in={onAlert}>
                <Alert severity="error">                    
                    <AlertTitle>{operationCodeMessage.message}</AlertTitle>
                    {operationCodeMessage.code === 3 
                        ? `Automatic retry after ${counter} seconds`
                    : "restart the application"}
                </Alert>
                </Collapse>
            </Box>)           
}
export default ServerAlert;