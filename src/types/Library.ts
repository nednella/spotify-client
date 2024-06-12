import { Album } from './Album'
import { Artist } from './Artist'
import { PlaylistSimplified } from './Playlist'
import { Track } from './Track'

export interface Library {
    tracks: SavedTrack[]
    playlists: PlaylistSimplified[]
    albums: Album[]
    artists: Artist[]
}

interface SavedTrack {
    added_at: string
    track: Track
}
