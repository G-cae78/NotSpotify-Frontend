import DialogContent from "@mui/material/DialogContent";
import { UserPlaylist } from "../types";

type DialogFormProps = {
  userPlaylist: UserPlaylist;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function UserPlaylistDialogContent({ userPlaylist, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="User Playlist Name"
          name="playlistName"
          value={userPlaylist.playlistName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="User Playlist Length"
          name="pLaylistLength"
          value={userPlaylist.playlistLength}
          onChange={handleChange}
        />
        <br />
        
      </DialogContent>
    </>
  );
}
export default UserPlaylistDialogContent;
