import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  getSongs, deleteSong} from "../api/SongApi";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddSongs from "./AddSongs"
import EditSong from "./EditSong";
import { SongOverview } from "../SongOverview";


function SongList(){

    const [open, setOpen] = useState(false);
    const UserPlaylistQueryClient = useQueryClient();
  
  
    const { data, isError, isLoading, isSuccess } = useQuery({
      queryKey: ["songs"],
      queryFn: getSongs,
    });
  
    const { mutate } = useMutation({
      mutationFn: deleteSong,
      onSuccess: () => {
        setOpen(true);
        UserPlaylistQueryClient.invalidateQueries({ queryKey: ["userPlaylists"] });
      },
      onError: (err) => {
        console.error(err);
      },
    });
  
    const columns: GridColDef[] = [
      { field: "songTitle", headerName: "Song Title", flex: 1 },
      { field: "songLength", headerName: "Song Length", flex: 1 },
      { field: "releaseDate", headerName: "Release Date", flex: 1 },
      {
        field: "edit",
        headerName: "",
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
          <EditSong songData={params.row} />
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
                  `Are you sure you want to delete ${params.row.songTitle} ${params.row.songLength}?`
                )
              ) {
                mutate(params.row._links.song.href);
                window.location.reload
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
              <SongOverview />
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
              <AddSongs />
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Song deleted"
              />
            </div>
          </div>
        </>
      );
    }
  }

export default SongList;