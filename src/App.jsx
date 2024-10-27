import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ArtistOverview } from './ArtistOverview'
import { QueryClient,QueryClientProvider } from 'react-query'
import { AlbumOverview } from './AlbumOverview'
import { AppUserOverview } from './AppUserOverview'
import { SongOverview } from './SongOverview'
import { UserPlaylistOverview } from './UserPlaylistOverview'

// Creating a new instance of QueryClient to manage server state using react-query
const queryClient = new QueryClient();

function App() {
  // State for managing a count variable (currently unused in the UI)
  const [count, setCount] = useState(0);

  return (
    // Wrapping the application in a QueryClientProvider to enable server state handling across components
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        {/* App header with the main application title */}
        <header className='App-header'>
          <h1>NotSpotify</h1>
        </header>
        
        {/* Table headers and component sections for each entity in the app */}
        
        {/* Users Table */}
        <header className='table-header'>
          Users 
        </header>
        <AppUserOverview />    {/* Component displaying users in the application */}

        {/* Artists Table */}
        <header className='table-header'>
          Artists
        </header>
        <ArtistOverview />     {/* Component displaying artists */}

        {/* Albums Table */}
        <header className='table-header'>
          Albums 
        </header>
        <AlbumOverview />      {/* Component displaying albums */}
        
        {/* Songs Table */}
        <header className='table-header'>
          Songs
        </header>
        <SongOverview />       {/* Component displaying songs */}
        
        {/* Playlists Table */}
        <header className='table-header'>
          Playlists
        </header>
        <UserPlaylistOverview /> {/* Component displaying user playlists */}
      </div>
    </QueryClientProvider>
  );
}

export default App;