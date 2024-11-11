import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {  UserPlaylist } from "../types";
import UserPlaylistDialogContent from "./UserPlaylistDialogContent";
import { addUserPlaylist } from "../api/UserPlaylistApi";

function AddUserPlaylist() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState<UserPlaylist>({
    playlistName: "",
    playlistLength: 0,
  });

  const { mutate } = useMutation({
    mutationFn: addUserPlaylist, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userPlaylists"]});
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
    setUserPlaylist({ ...userPlaylist, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(userPlaylist);
    setUserPlaylist({
      playlistName: "",
      playlistLength: 0,
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">New User Playlist</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New User Playlist</DialogTitle>
        <UserPlaylistDialogContent userPlaylist={userPlaylist} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddUserPlaylist;
