import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AlbumDialogContent from "./ArtistDialogContent";
import { ArtistJSON ,artistEntry,Artist} from "../types";
import { updateArtist } from "../api/ArtistApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  artistData: ArtistJSON;
};

function EditArtist({ artistData }: FormProps) {
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
    mutationFn: updateArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setArtist({
      artistUserName: artistData.artistUserName,
      realName: artistData.realName,
      monthlyListeners: artistData.monthlyListeners,
      genre: artistData.genre,
      id: artistData.id,
      year: artistData.year,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = artistData._links.self.href;
    const artistEntry: artistEntry = { artist, url };
    mutate(artistEntry);
    setArtist({  
      artistUserName: "",
      realName: "",
      monthlyListeners: 0,
      genre: "",
      id:0,
      year: 0,
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtist({ ...artist, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit artist</DialogTitle>
        <AlbumDialogContent artist={artist} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditArtist;
