import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppUsers, deleteAppUsers } from "../api/AppUserApi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddAlbum from "./AddAppUser";
import EditAlbum from "./EditAppUser";
import { AppUserOverview } from "../AppUserOverview";

function AppUserList() {
    // console.log("queryClient: ", queryClient);
  
  const [open, setOpen] = useState(false);
  const ArtistQueryClient = useQueryClient();


  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["appUsers"],
    queryFn: getAppUsers,
  });

  const { mutate } = useMutation({
    mutationFn: deleteAppUsers,
    onSuccess: () => {
      setOpen(true);
      ArtistQueryClient.invalidateQueries({ queryKey: ["appUsers"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1},
    { field: "email", headerName: "Email", flex: 1},
    { field: "dob", headerName: "Date Of Birth", flex: 1},
    { field: "password", headerName: "Password", flex: 1},
    { field: "userName", headerName: "Username", flex: 1},
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditAlbum appUserData={params.row} />
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
                `Are you sure you want to delete ${params.row.name} ${params.row.email}?`
              )
            ) {
              mutate(params.row._links.appUser.href);
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
    return <span>Error when fetching app users...</span>;
  } else if (isSuccess) {
    return (
      <>
        <div style={{ display: "flex", gap: "16px" }} >
          <div style={{ flex: 1 }} >
            <AppUserOverview />
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
            <AddAlbum />
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
              message="App User deleted"
            />
          </div>
        </div>
      </>
    );
  }
}

export default AppUserList;
