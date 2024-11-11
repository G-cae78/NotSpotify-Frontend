import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAlbum } from "../api/AlbumApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Album } from "../types";
import AlbumDialogContent from "./AlbumDialogContent";


function AddAlbum() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState<Album>({
    releaseDate: "",
    albumTitle: "",
    totalPlays: 0,
  });

  const { mutate } = useMutation({
    mutationFn: addAlbum, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["albums"]});
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
    setAlbum({ ...album, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(album);
    setAlbum({
      releaseDate: "",
      albumTitle: "",
      totalPlays: 0,
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">New Album</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >New album</DialogTitle>
        <AlbumDialogContent album={album} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose} >Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAlbum;
