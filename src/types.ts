// JSON structure representing data for an artist
export type ArtistJSON = {
    artistUserName: string;    // Username of the artist
    realName: string;          // Real name of the artist
    monthlyListeners: number;  // Monthly listener count for the artist
    genre: string;             // Genre associated with the artist
    id: number;                // Unique identifier for the artist
    year: number;              // Year associated with the artist (e.g., debut year)
    _links: {                  // Links for related resources
        self: { 
            href: string;      // Link to the artist's own resource
        };
        artist: { 
            href: string;      // Link to artist resource endpoint
        };
        albums: { 
            href: string;      // Link to artist's albums
        };
        songs: { 
            href: string;      // Link to artist's songs
        };
    };
};

// JSON structure representing data for an album
export type AlbumJSON = {
    releaseDate: string;       // Release date of the album
    albumTitle: string;        // Title of the album
    totalPlays: number;        // Total plays of the album
    // artist: ArtistJSON;     // Reference to the artist who created the album (currently commented out)
    _links: {                  // Links for related resources
        self: { 
            href: string;      // Link to the album's own resource
        };
        album: { 
            href: string;      // Link to album resource endpoint
        };
        artist: { 
            href: string;      // Link to associated artist
        };
        songs: { 
            href: string;      // Link to album's songs
        };
    };
};

// JSON structure representing data for an application user
export type AppUserJSON = {
    name: string;              // Full name of the user
    email: string;             // Email of the user
    dob: string;               // Date of birth of the user
    password: string;          // User's password
    userName: string;          // Username chosen by the user
    _links: {                  // Links for related resources
        self: { 
            href: string;      // Link to the user's own resource
        };
        appUser: { 
            href: string;      // Link to appUser resource endpoint
        };
        playlist: { 
            href: string;      // Link to user's playlist
        };
    };
};

// JSON structure representing data for a song
export type SongJSON = {
    songTitle: string;         // Title of the song
    songLength: string;        // Duration of the song
    releaseDate: string;       // Release date of the song
    _links: {                  // Links for related resources
        self: { 
            href: string;      // Link to the song's own resource
        };
        song: { 
            href: string;      // Link to song resource endpoint
        };
        playlist: { 
            href: string;      // Link to playlists containing the song
        };
        album: { 
            href: string;      // Link to the album containing the song
        };
        artist: { 
            href: string;      // Link to the song's artist
        };
    };
};

// JSON structure representing data for a user playlist
export type UserPlaylistJSON = {
    playlistName: string;      // Name of the playlist
    playlistLength: number;    // Number of songs in the playlist
    _links: {                  // Links for related resources
        self: { 
            href: string;      // Link to the playlist's own resource
        };
        userPlaylist: { 
            href: string;      // Link to userPlaylist resource endpoint
        };
        user: { 
            href: string;      // Link to the user who owns the playlist
        };
        song: { 
            href: string;      // Link to songs in the playlist
        };
    };
};
