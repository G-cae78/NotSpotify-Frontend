import DialogContent from "@mui/material/DialogContent";
import { Album } from "../types";

type DialogFormProps = {
  album: Album;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function AlbumDialogContent({ album, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Album Title"
          name="albumTitle"
          value={album.albumTitle}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Release Date"
          name="releaseDate"
          value={album.releaseDate}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Total Plays"
          name="totalPlays"
          value={album.totalPlays}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default AlbumDialogContent;
