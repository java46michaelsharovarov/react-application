import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
type Props = {
    open: boolean;
    title: string;
    content: string;
    confirmHandler: (flag: boolean) => void
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
const ActionConfirmation: React.FC<Props> = ({ open, title, content, confirmHandler }) => {
    return  <Dialog
                open={open}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ display:'flex', alignItems:'center', flexDirection:'column'}}>
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => confirmHandler(true)} autoFocus>OK</Button>
                        <Button onClick={() => confirmHandler(false)}>Cancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>            
}
export default ActionConfirmation;
