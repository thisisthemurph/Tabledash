import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  title,
  body,
  open,
  handleClose,
  onConfirm,
  confirmBtnText = "Yes",
  rejectBtnText = "No",
}) => {
  const handleOnConfirm = (e) => {
    handleClose();
    onConfirm(e);
  };

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
        <Button variant="outlined" onClick={handleClose}>
          {rejectBtnText}
        </Button>
        <Button variant="contained" autoFocus onClick={handleOnConfirm}>
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
