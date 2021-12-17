import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const BooleanAlert = ({
  title,
  body,
  open,
  handleClose,
  onConfirm,
  yesValue = "Yes",
  noValue = "No",
}) => {
  const handleOnConfirm = (e) => {
    handleClose();
    onConfirm(e);
  };

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
        <Button variant="outlined" onClick={handleClose}>
          {noValue}
        </Button>
        <Button variant="contained" autoFocus onClick={handleOnConfirm}>
          {yesValue}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BooleanAlert;
