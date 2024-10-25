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

const queryClient= new QueryClient();
function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
     
      <div className='App'>
      <header className='App-Header'>
        <h1>NotSpotify</h1>
      </header>
        <header className='table-Header'>
          Users Table
        </header>
        <AppUserOverview/>
        <header className='table-header'>
          Artist Table
        </header>
        <ArtistOverview/>
        <header className='table-Header'>
          Album Table
        </header>
        <AlbumOverview/>
        <header className='table-Header'>
          Song Table
        </header>
        <SongOverview/>
        <header className='table-Header'>
          Playlist Table
        </header>
        <UserPlaylistOverview/>
        </div>
    </QueryClientProvider>
  );
}

export default App
