interface Window {
    onSpotifyWebPlaybackSDKReady(token: string): void
    Spotify: typeof Spotify
}

// // Spotify player typing for the playback SDK.
// // Docs URL: https://developer.spotify.com/documentation/web-playback-sdk/reference#objects

declare namespace Spotify {
    interface Track {
        album: {
            images: {
                url: string
            }[]
            name: string
            uri: string
        }
        artists: {
            name: string
            uri: string
        }[]
        duration_ms: number
        id: string | null
        is_playable: boolean
        media_type: 'audio' | 'video'
        name: string
        type: 'ad' | 'episode' | 'track'
        uid: string
        uri: string
    }

    interface PlaybackState {
        context: {
            metadata: unknown
            uri: string | null
        }
        disallows: {
            pausing: boolean
            peeking_next: boolean
            peeking_prev: boolean
            resuming: boolean
            seeking: boolean
            skipping_next: boolean
            skipping_prev: boolean
            toggling_repeat_track: boolean
            toggling_repeat_context: boolean
            toggling_shuffle: boolean
        }
        duration: number
        loading: boolean
        paused: boolean
        playback_features: { hifi_status: string }
        playback_id: string
        playback_quality: string
        position: number
        repeat_mode: 0 | 1 | 2 // No repeat mode is 0, repeat context is 1 and repeat track is 2.
        restrictions: {
            disallow_pausing_reasons: string[]
            disallow_peeking_next_reasons: string[]
            disallow_peeking_prev_reasons: string[]
            disallow_resuming_reasons: string[]
            disallow_seeking_reasons: string[]
            disallow_skipping_next_reasons: string[]
            disallow_skipping_prev_reasons: string[]
        }
        shuffle: boolean
        timestamp: number
        track_window: {
            current_track: Track
            previous_tracks: Track[]
            next_tracks: Track[]
        }
    }

    interface PlayerInitialise {
        getOAuthToken(cb: (token: string) => void): void
        name: string
        volume?: number
    }

    type ErrorTypes = 'account_error' | 'authentication_error' | 'initialization_error' | 'playback_error'
    type PlaybackInstanceListener = (inst: { device_id: string }) => void
    type PlaybackStateListener = (s: PlaybackState) => void
    type ErrorListener = (err: { message: string }) => void

    type AddListenerFn = ((event: 'not_ready' | 'ready', cb: PlaybackInstanceListener) => void) &
        ((event: 'player_state_changed', cb: PlaybackStateListener) => void) &
        ((event: ErrorTypes, cb: ErrorListener) => void)

    class Player {
        readonly _options: PlayerInitialise & { id: string }
        addListener: AddListenerFn
        on: AddListenerFn
        constructor(options: PlayerInitialise)
        connect(): Promise<boolean>
        disconnect(): void
        getCurrentState(): Promise<PlaybackState | null>
        setName(name: string): Promise<void>
        getVolume(): Promise<number>
        setVolume(volume: number): Promise<void>
        pause(): Promise<void>
        resume(): Promise<void>
        togglePlay(): Promise<void>
        seek(position_ms: number): Promise<void>
        previousTrack(): Promise<void>
        nextTrack(): Promise<void>
        activateElement(): Promise<void>
    }
}
