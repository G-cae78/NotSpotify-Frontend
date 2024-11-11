import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArtist, deleteArtist } from "../api/ArtistApi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddAlbum from "./AddArtist";
import EditAlbum from "./EditArtist";
import { ArtistOverview } from "../ArtistOverview";

function ArtistList() {
    // console.log("queryClient: ", queryClient);
  
  const [open, setOpen] = useState(false);
  const ArtistQueryClient = useQueryClient();


  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtist,
  });

  const { mutate } = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      setOpen(true);
      ArtistQueryClient.invalidateQueries({ queryKey: ["artists"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "artistUserName", headerName: "Artist Username", flex:1 },
    { field: "realName", headerName: "Real Name", flex:1 },
    { field: "monthlyListeners", headerName: "Monthly Listeners", flex:1},
    { field: "genre", headerName: "Genre", flex:1 },
    { field: "id", headerName: "Id", flex:1 },
    { field: "year", headerName: "Year", flex:1 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditAlbum artistData={params.row} />
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
                `Are you sure you want to delete ${params.row.artistUserName} ${params.row.realName}?`
              )
            ) {
              mutate(params.row._links.artist.href);
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
    return <span>Error when fetching cars...</span>;
  } else if (isSuccess) {
    return (
      <>
        <div style={{ display: "flex", gap: "16px" }} >
          <div style={{ flex: 1 }} >
            <ArtistOverview />
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
              message="Artist deleted"
            />
          </div>
        </div>
      </>
    );
  }
}

export default ArtistList;
