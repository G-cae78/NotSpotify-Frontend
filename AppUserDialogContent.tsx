import DialogContent from "@mui/material/DialogContent";
import { AppUser } from "../types";

type DialogFormProps = {
  appUser: AppUser;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function AppUserDialogContent({ appUser, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input
          placeholder="App User Name"
          name="appUserName"
          value={appUser.name}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Email"
          name="email"
          value={appUser.email}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Date Of Birth"
          name="dob"
          value={appUser.dob}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Password"
          name="password"
          value={appUser.password}
          onChange={handleChange}
        />
        <br />
        <input
          placeholder="Username"
          name="userName"
          value={appUser.userName}
          onChange={handleChange}
        />
        <br />
      </DialogContent>
    </>
  );
}
export default AppUserDialogContent;
