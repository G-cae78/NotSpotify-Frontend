export type ArtistJSON={
    artistUserName: string;
    realName: string;
    monthlyListeners: number;
    genre: string;
    id: number;
    year: number;
    _links: {
        self: {
            href:string;
        }
        artist: {
            href:string;
        }
        albums: {
            href: string;
        }
        songs: {
            href: string;
        }
    };
};
//export default ArtistJSON;
export type AlbumJSON={
    releaseDate: string;
    albumTitle: string;
    totalPlays: number;
    //artist: ArtistJSON;
    _links: {
        self: {
            href:string;
        }
        album: {
            href:string;
        }
        artist: {
            href:string;
        }
        songs:{
            href: string;
        }
        
    };
};

export type AppUserJSON={
   name: string;
   email: string;
   dob: string;
   password: string;
   userName: string;
   _links: {
    self:{
        href:string;
    }
    appUser: {
        href:string;
    }
    playlist: {
        href:string;
    }
   };
};

export type SongJSON={
    songTitle:string;
    songLength:string;
    releaseDate:string;
    _links: {
        self:{
            href:string;
        }
        song: {
            href:string;
        }
        playlist: {
            href:string;
        }
        album: {
            href:string;
        }
        artist: {
            href:string;
        }
    };
};

export type UserPlaylistJSON={
    playlistName:string;
    playlistLength:number;
    _links: {
        self:{
            href:string;
        }
        userPlaylist: {
            href:string;
        }
        user: {
            href:string;
        }
        song: {
            href:string;
        }
    };
};