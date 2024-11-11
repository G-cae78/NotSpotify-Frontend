import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlbums, deleteAlbum } from "../api/AlbumApi";
import { AlbumOverview } from "../AlbumOverview";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import AddAlbum from "./AddAlbum";
import EditAlbum from "./EditAlbum";

function AlbumList() {
  // console.log("queryClient: ", queryClient);

  const [open, setOpen] = useState(false);
  console.log("Data: ", getAlbums);
  const AlbumqueryClient = useQueryClient();
  console.log("queryClient: ", AlbumqueryClient);
  console.log("Data2: ", getAlbums);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  const { mutate } = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      setOpen(true);
      AlbumqueryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "releaseDate", headerName: "Release Date", flex: 1 },
    { field: "albumTitle", headerName: "Album Title", flex: 1 },
    { field: "totalPlays", headerName: "Total Plays", flex: 1 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditAlbum albumData={params.row} />
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
        <button className="Button"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.albumTitle} ${params.row.releaseDate}?`
              )
            ) {
              mutate(params.row._links.album.href);
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
            <AlbumOverview />
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
              message="Album deleted"
            />
          </div>
        </div>
      </>
    );
  }
}

// export function deleteButton {
//   return (
//     <>
//     renderCell: (params: GridCellParams) => (
//     <button
//     onClick={() => {
//       if (
//         window.confirm(
//           `Are you sure you want to delete ${params.row.albumTitle} ${params.row.releaseDate}?`
//         )
//       ) {
//         mutate(params.row._links.albums.href);
//       }
//     }}
//   >
//     Delete
//   </button>
//     )
//   </>
//   )
// }

export default AlbumList;
