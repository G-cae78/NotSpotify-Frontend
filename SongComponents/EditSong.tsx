import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import SondDialogContent from "./SongsDialogContent";
import { Song ,songEntry,SongJSON} from "../types";
import { updateSong } from "../api/SongApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  songData: SongJSON;
};

function EditSong({ songData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [song, setSong] = useState<Song>({
        songTitle: "",   
        songLength: "",       
        releaseDate: "", 
  });

  const { mutate } = useMutation({
    mutationFn: updateSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setSong({
      songTitle: songData.songTitle,
      songLength: songData.songLength,
      releaseDate: songData.releaseDate,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = songData._links.self.href;
    const songEntry: songEntry = { song, url };
    mutate(songEntry);
    setSong({  
        songTitle: "",   
        songLength: "",       
        releaseDate: "", 
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSong({ ...song, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Song</DialogTitle>
        <SondDialogContent song={song} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditSong;
