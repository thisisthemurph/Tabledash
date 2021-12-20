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
      aria-labelledby="Deleting item"
      aria-describedby="Are you sure youy would like to delete this item?"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
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
