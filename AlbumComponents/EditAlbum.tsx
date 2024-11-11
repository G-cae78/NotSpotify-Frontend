import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AlbumDialogContent from "./AlbumDialogContent";
import { Album, AlbumJSON, AlbumEntry } from "../types";
import { updateAlbum } from "../api/AlbumApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  albumData: AlbumJSON;
};

function EditAlbum({ albumData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [album, setAlbum] = useState<Album>({
    releaseDate: "",
    albumTitle: "",
    totalPlays: 0,
  });

  const { mutate } = useMutation({
    mutationFn: updateAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setAlbum({
      releaseDate: albumData.releaseDate,
      albumTitle: albumData.albumTitle,
      totalPlays: albumData.totalPlays,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = albumData._links.self.href;
    const albumEntry: AlbumEntry = { album, url };
    mutate(albumEntry);
    setAlbum({
      releaseDate: "",
      albumTitle: "",
      totalPlays: 0,
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbum({ ...album, [event.target.name]: event.target.value });
    
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit album</DialogTitle>
        <AlbumDialogContent album={album} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditAlbum;
