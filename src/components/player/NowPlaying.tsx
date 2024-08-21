import usePlayer from '../../hooks/usePlayer'

import MediaItem from '../tracks/MediaItem'

const NowPlaying = () => {
    const currentTrack = usePlayer((state) => state.playerState?.track_window.current_track)

    return (
        <div className="w-[30%] pl-2">
            {currentTrack && currentTrack.id && (
                <MediaItem
                    title={currentTrack.name}
                    img={
                        currentTrack.album.images[0]
                            ? currentTrack.album.images[0].url
                            : '../src/assets/images/placeholder.png'
                    }
                    artists={currentTrack.artists}
                />
            )}
        </div>
    )
}

export default NowPlaying
