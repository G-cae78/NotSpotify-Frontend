import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  getUserPlaylist, deleteUserPlaylist} from "../api/UserPlaylistApi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddUserPlaylist from "./AddUserPlaylist";
import EditUserPlaylist from "./EditUserPlaylist";
import { UserPlaylistOverview } from "../UserPlaylistOverview";

function UserPlaylistList() {
    // console.log("queryClient: ", queryClient);
  
  const [open, setOpen] = useState(false);
  const UserPlaylistQueryClient = useQueryClient();


  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getUserPlaylist,
  });

  const { mutate } = useMutation({
    mutationFn: deleteUserPlaylist,
    onSuccess: () => {
      setOpen(true);
      UserPlaylistQueryClient.invalidateQueries({ queryKey: ["userPlaylists"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "playlistName", headerName: "Playlist Name", flex: 1 },
    { field: "playlistLength", headerName: "Playlist Length", flex: 1 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditUserPlaylist userPlaylistData={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.playlistName} ${params.row.playlistLength}?`
              )
            ) {
              mutate(params.row._links.userPlaylist.href);
            }
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error when fetching user playlists...</span>;
  } else if (isSuccess) {
    return (
      <>
       <div style={{ display: "flex", gap: "16px" }} >
          <div style={{ flex: 1 }} >
            <UserPlaylistOverview />
          </div>
          <div style={{ flex: 1 }} className={"Grid-Table"}>
            <DataGrid
              // className="Grid-Table"
              rows={data}
              columns={columns}
              // option if you don't want to highlight selected row
              disableRowSelectionOnClick={true}
              //all rows must have unique id defined using getRowId
              getRowId={(row) => row._links.self.href}
              // sets toolbar
              // slots={{ toolbar: GridToolbar }}
              style={{ width: "100%" }}
            />
            <AddUserPlaylist />
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
              message="User Playlist deleted"
            />
          </div>
        </div>
      </>
    );
  }
}

export default UserPlaylistList;
