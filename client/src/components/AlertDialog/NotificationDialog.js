import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const NotificationDialog = ({
  title,
  body,
  open,
  handleClose,
  btnText = "OK",
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialogTitle"
      aria-describedby="dialogContent"
    >
      <DialogTitle id="dialogTitle">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialogContent">{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" autoFocus onClick={handleClose}>
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
