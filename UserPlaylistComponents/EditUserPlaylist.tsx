import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import UserPlaylistDialogContent from "./UserPlaylistDialogContent";
import { UserPlaylist ,userPlaylistEntry,UserPlaylistJSON} from "../types";
import { updateUserplaylist } from "../api/UserPlaylistApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormProps = {
  userPlaylistData: UserPlaylistJSON;
};

function EditUserPlaylist({ userPlaylistData }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState<UserPlaylist>({
      playlistName: "",
      playlistLength: 0,
  });

  const { mutate } = useMutation({
    mutationFn: updateUserplaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPlaylists"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
    setUserPlaylist({
      playlistName: userPlaylistData.playlistName,
      playlistLength: userPlaylistData.playlistLength,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = userPlaylistData._links.self.href;
    const userPlaylistEntry: userPlaylistEntry = { userPlaylist, url };
    mutate(userPlaylistEntry);
    setUserPlaylist({  
      playlistName: "",
      playlistLength: 0,
    });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPlaylist({ ...userPlaylist, [event.target.name]: event.target.value });
  };

  return (
    <>
      <button onClick={handleClickOpen} className="Button">Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User Playlist</DialogTitle>
        <UserPlaylistDialogContent userPlaylist={userPlaylist} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditUserPlaylist;
