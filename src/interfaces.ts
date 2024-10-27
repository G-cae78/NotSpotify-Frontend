// Defines the structure of an Artist object
export interface Artist {
    artistUserName: string,    // Username associated with the artist
    realName: string,          // Real name of the artist
    monthlyListeners: number,  // Number of monthly listeners the artist has
    genre: string,             // Primary music genre of the artist
    id: number,                // Unique identifier for the artist
    year: number,              // Year the artist started or joined the platform
}

// Defines the structure of an Album object
export interface Album {
    albumTitle: string,        // Title of the album
    releaseDate: string,       // Release date of the album
    totalPlays: number,        // Total number of plays for the album
    // artist: Artist,         // Reference to the artist of the album (currently commented out)
}

// Defines the structure of an AppUser object
export interface AppUser {
    name: string,              // Full name of the user
    email: string,             // Email address of the user
    dob: string,               // Date of birth of the user
    password: string,          // User's password
    userName: string,          // Unique username chosen by the user
}

// Defines the structure of a Song object
export interface Song {
    songTitle: string,         // Title of the song
    songLength: string,        // Duration or length of the song
    releaseDate: string,       // Release date of the song
}

// Defines the structure of a UserPlaylist object
export interface UserPlaylist {
    playlistName: string,      // Name of the playlist
    playlistLength: number,    // Number of songs in the playlist
}
