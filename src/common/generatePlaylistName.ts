/**
 *
 */

import { SimplifiedPlaylist } from '../types/Playlist'

export function generatePlaylistName(user_id: string, playlists: SimplifiedPlaylist[]) {
    const userPlaylistsCount = playlists.filter((playlist: SimplifiedPlaylist) => playlist.owner.id === user_id).length

    return `My Playlist #${userPlaylistsCount + 1}`
}
