export interface Artist{
    artistUserName: string,
    realName: string,
    monthlyListeners: number,
    genre: string,
    yearJoined: number,
}

export interface Album{
    albumTitle: string,
    releaseDate: string,
    totalPlays: number,
    //artist: Artist,
}

export interface AppUser{
    name: string,
    email: string,
    dob: string,
    password: string,
    userName: string,
}
export interface Song{
    songTitle:string,
    songLength:string,
    releaseDate:string,
}
export interface UserPlaylist{
    playlistName: string,
    playlistLength: number,
    
}