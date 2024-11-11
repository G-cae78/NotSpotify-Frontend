import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAppUser } from "../api/AppUserApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { AppUser } from "../types";
import AlbumDialogContent from "./AppUserDialogContent";

function AddAlbum() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [appUser, setAppUser] = useState<AppUser>({
    name: "",
    email: "",
    dob: "",
    password: "",
    userName: "",
  });

  const { mutate } = useMutation({
    mutationFn: addAppUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appUsers"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppUser({ ...appUser, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(appUser);
    setAppUser({
      name: "",
      email: "",
      dob: "",
      password: "",
      userName: "",
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">New AppUser</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New appUser</DialogTitle>
        <AlbumDialogContent appUser={appUser} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAlbum;
