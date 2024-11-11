import DialogContent from "@mui/material/DialogContent";
import { Artist } from "../types";

type DialogFormProps = {
  artist: Artist;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function ArtistDialogContent({ artist, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="Artist User name"
          name="artistUserName"
          value={artist.artistUserName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Real Name"
          name="realName"
          value={artist.realName}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Monthly Listeners"
          name="monthlyListeners"
          value={artist.monthlyListeners}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Genre"
          name="genre"
          value={artist.genre}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Id"
          name="id"
          value={artist.id}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Year"
          name="year"
          value={artist.year}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default ArtistDialogContent;
