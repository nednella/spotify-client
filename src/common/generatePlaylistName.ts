import { SimplifiedPlaylist } from '../types/Playlist'
/**
 * Generate playlist name when new playlist is created.
 * @param {string } user_id - The Spotify ID of the authenticated user.
 * @param {SimplifiedPlaylist[]} playlists - An array of the user's playlists.
 * @returns a string for the newly generated playlist.
 */
export function generatePlaylistName(user_id: string, playlists: SimplifiedPlaylist[]) {
    const userPlaylistsCount = playlists.filter((playlist: SimplifiedPlaylist) => playlist.owner.id === user_id).length

    return `My Playlist #${userPlaylistsCount + 1}`
}
