import { SimplifiedAlbum } from './Album'
import { Artist } from './Artist'
import { SimplifiedPlaylist } from './Playlist'
import { Track } from './Track'

export interface Search {
    artists: Artist[]
    albums: SimplifiedAlbum[]
    playlists: SimplifiedPlaylist[]
    tracks: Track[]
}
