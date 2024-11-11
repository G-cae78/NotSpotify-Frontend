import DialogContent from "@mui/material/DialogContent";
import { Song } from "../types";

type DialogFormProps = {
  song: Song;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function SongDialogContent({ song, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Song Title"
          name="songTitle"
          value={song.songTitle}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Song Length"
          name="songLength"
          value={song.songLength}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Release Data"
          name="releaseDate"
          value={song.releaseDate}
          onChange={handleChange}
        />
        <br />
        
        
      </DialogContent>
    </>
  );
}
export default SongDialogContent;
