const defaultTrack: Spotify.Track = {
    album: {
        images: [],
        name: '',
        uri: '',
    },
    artists: [
        {
            name: '',
            uri: '',
        },
    ],
    duration_ms: 0,
    id: null,
    is_playable: true,
    media_type: 'audio',
    name: '',
    type: 'track',
    uid: '',
    uri: '',
}

export const defaultPlaybackState: Spotify.PlaybackState = {
    context: {
        metadata: '',
        uri: null,
    },
    disallows: {
        pausing: false,
        peeking_next: false,
        peeking_prev: false,
        resuming: false,
        seeking: false,
        skipping_next: false,
        skipping_prev: false,
    },
    duration: 0,
    loading: false,
    paused: true,
    playback_features: { hifi_status: 'NONE' },
    playback_id: '',
    playback_quality: 'VERY_HIGH',
    position: 0,
    repeat_mode: 0,
    restrictions: {
        disallow_pausing_reasons: [],
        disallow_peeking_next_reasons: [],
        disallow_peeking_prev_reasons: [],
        disallow_resuming_reasons: [],
        disallow_seeking_reasons: [],
        disallow_skipping_next_reasons: [],
        disallow_skipping_prev_reasons: [],
    },
    shuffle: false,
    timestamp: 0,
    track_window: {
        current_track: defaultTrack,
        next_tracks: [],
        previous_tracks: [],
    },
}
