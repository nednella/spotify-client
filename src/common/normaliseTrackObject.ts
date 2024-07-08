import { NormalisedTrack, PlaylistTrack, Track, SavedTrack, SimplifiedTrack } from '../types/Track'

export function normaliseTrackObj(track: PlaylistTrack | Track | SavedTrack | SimplifiedTrack): NormalisedTrack {
    if ('track' in track) {
        if ('added_by' in track) {
            return {
                ...track.track,
                added_at: track.added_at,
                added_by: track.added_by,
            }
        } else
            return {
                ...track.track,
                added_at: track.added_at,
            }
    } else return track
}
