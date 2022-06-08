import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { AlertTitle } from '@mui/material';
import { OperationCodeMessage } from '../../models/OperationCode';
import Spinner from '../Spinner/Spinner';
type Props = {
    onAlert: boolean,
    operationCodeMessage: OperationCodeMessage
}

const ServerAlert: React.FC<Props> = ({onAlert, operationCodeMessage}) => {
    return  (<Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Collapse sx={{ mt: { sm: -7, md: 0}, width: '90%' }} in={onAlert}>
                <Alert severity="error">                    
                    <AlertTitle>{operationCodeMessage.message}</AlertTitle>
                    {operationCodeMessage.code === 3 
                        ?  <> Waiting for retry
                            <Box sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '80%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                    <Spinner/>
                            </Box></>
                    : "Contact the application staff courses.admin@tel-ran.com"}
                </Alert>
                </Collapse>
            </Box>)           
}
export default ServerAlert;