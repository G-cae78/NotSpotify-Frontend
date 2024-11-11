import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {  Song } from "../types";
import SongsDialogContent from "./SongsDialogContent";
import { addSong } from "../api/SongApi";

function AddSong() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [song, setSong] = useState<Song>({
        songTitle: "",   
        songLength: "",       
        releaseDate: "", 
  });

  const { mutate } = useMutation({
    mutationFn: addSong, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["songs"]});
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
    setSong({ ...song, [event.target.name]: event.target.value });
    window.location.reload
  };

  const handleSave = () => {
    mutate(song);
    setSong({
        songTitle: "",   
        songLength: "",       
        releaseDate: "", 
    });
    
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">New Song</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Song</DialogTitle>
        <SongsDialogContent song={song} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddSong;
