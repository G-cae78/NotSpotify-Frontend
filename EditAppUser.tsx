import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AppUserDialogContent from "./AppUserDialogContent";
import { AppUserJSON, appUserEntry, AppUser } from "../types";
import { updateAppUser } from "../api/AppUserApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  appUserData: AppUserJSON;
};

function EditAppUser({ appUserData }: FormProps) {
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
    mutationFn: updateAppUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appUsers"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setAppUser({
      name: appUserData.name,
      email: appUserData.email,
      dob: appUserData.dob,
      password: appUserData.password,
      userName: appUserData.userName,

    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = appUserData._links.self.href;
    const appUserEntry: appUserEntry = { appUser, url };
    mutate(appUserEntry);
    setAppUser({
      name: "",
      email: "",
      dob: "",
      password: "",
      userName: "",
      });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppUser({ ...appUser, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit App User</DialogTitle>
        <AppUserDialogContent appUser={appUser} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditAppUser;
