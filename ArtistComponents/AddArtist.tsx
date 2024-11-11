import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addArtist } from "../api/ArtistApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Artist } from "../types";
import AlbumDialogContent from "./ArtistDialogContent";

function AddAlbum() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState<Artist>({
      artistUserName: "",
      realName: "",
      monthlyListeners: 0,
      genre: "",
      id:0,
      year: 0,
  });

  const { mutate } = useMutation({
    mutationFn: addArtist, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["artists"]});
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
    setArtist({ ...artist, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    mutate(artist);
    setArtist({
      artistUserName: "",
      realName: "",
      monthlyListeners: 0,
      genre: "",
      id:0,
      year: 0,
    });
    handleClose();
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">New Artist</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Artist</DialogTitle>
        <AlbumDialogContent artist={artist} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddAlbum;
