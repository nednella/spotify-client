import { getAvailableDevices, setDeviceId, syncSDKPlayerState } from '../hooks/usePlayer'

export default window.onSpotifyWebPlaybackSDKReady = (token: string): Spotify.Player => {
    const player = new Spotify.Player({
        name: 'Spotify Clone',
        getOAuthToken: (cb) => {
            cb(token)
        },
        volume: 0.02,
    })

    player.addListener('ready', ({ device_id }) => {
        // DEBUG
        console.log('Connected with Device ID', device_id)

        setDeviceId(device_id)
        getAvailableDevices()
    })

    player.addListener('player_state_changed', (state) => {
        syncSDKPlayerState(state)
    })

    player.on('initialization_error', ({ message }) => {
        console.log('Failed to initialize', message)
    })

    player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message)
    })

    player.on('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message)
    })

    player.on('playback_error', ({ message }) => {
        console.error('Failed to perform playback', message)
    })

    return player
}
