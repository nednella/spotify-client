import React from 'react'
import { useLocation } from 'react-router-dom'

import { MdLibraryMusic } from 'react-icons/md'
import { PiVinylRecord } from 'react-icons/pi'
import { BsFillPersonLinesFill } from 'react-icons/bs'

import { User } from '../../types/User'
import { Library } from '../../types/Library'
import { PlaylistSimplified } from '../../types/Playlist'
import { Album } from '../../types/Album'
import { Artist } from '../../types/Artist'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion'
import LikedSongs from './LikedSongs'
import LibraryItem from './LibraryItem'
import NoPlaylists from './NoPlaylists'
import NoFollowedPlaylists from './NoFollowedPlaylists'
import NoAlbums from './NoAlbums'
import NoArtists from './NoArtists'

interface LibraryContentProps {
    user: User
    data: Library
}

const LibraryContent: React.FC<LibraryContentProps> = ({ user, data }) => {
    const location = useLocation()

    const tracks = 'data.tracks'
    const yourPlaylists: PlaylistSimplified[] = data.playlists.filter(
        (playlist: PlaylistSimplified) => playlist.owner.display_name === user.display_name
    )
    const followedPlaylists: PlaylistSimplified[] = data.playlists.filter(
        (playlist: PlaylistSimplified) => playlist.owner.display_name !== user.display_name
    )
    const albums: Album[] = data.albums
    const artists: Artist[] = data.artists

    // TODO: add Saved Episodes (if adding podcast functionality) category above accordion

    return (
        <div className="h-full w-full">
            <Accordion>
                {tracks && (
                    <LikedSongs
                        active={location.pathname === '/playlist/liked'}
                        href={'playlist/liked'}
                    />
                )}
                {yourPlaylists && (
                    <AccordionItem value="your-playlists">
                        <AccordionTrigger
                            icon={MdLibraryMusic}
                            label={'Your playlists'}
                        />
                        <AccordionContent>
                            {Array.isArray(yourPlaylists) && yourPlaylists.length > 0 ? (
                                yourPlaylists.map((item: PlaylistSimplified) => (
                                    <LibraryItem
                                        key={item.id}
                                        image={
                                            item.images && item.images.length > 0
                                                ? item.images[0].url
                                                : './src/assets/images/placeholder.png'
                                        }
                                        title={item.name}
                                        author={item.owner.display_name}
                                        type={item.type}
                                        active={location.pathname === `/${item.type}/${item.id}`}
                                        href={`${item.type}/${item.id}`}
                                    />
                                ))
                            ) : (
                                <NoPlaylists />
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )}

                {followedPlaylists && (
                    <AccordionItem value="followed-playlists">
                        <AccordionTrigger
                            icon={MdLibraryMusic}
                            label={'Followed playlists'}
                        />
                        <AccordionContent>
                            {Array.isArray(followedPlaylists) && followedPlaylists.length > 0 ? (
                                followedPlaylists.map((item: PlaylistSimplified) => (
                                    <LibraryItem
                                        key={item.id}
                                        image={
                                            item.images && item.images.length > 0
                                                ? item.images[0].url
                                                : './src/assets/images/placeholder.png'
                                        }
                                        title={item.name}
                                        author={item.owner.display_name}
                                        type={item.type}
                                        active={location.pathname === `/${item.type}/${item.id}`}
                                        href={`${item.type}/${item.id}`}
                                    />
                                ))
                            ) : (
                                <NoFollowedPlaylists />
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )}

                {albums && (
                    <AccordionItem value="albums">
                        <AccordionTrigger
                            icon={PiVinylRecord}
                            label={'Albums'}
                        />
                        <AccordionContent>
                            {Array.isArray(albums) && albums.length > 0 ? (
                                albums.map((item: Album) => (
                                    <LibraryItem
                                        key={item.id}
                                        image={
                                            item.images && item.images.length > 0
                                                ? item.images[0].url
                                                : './src/assets/images/placeholder.png'
                                        }
                                        title={item.name}
                                        author={item.artists[0].name}
                                        type={item.type}
                                        active={location.pathname === `/${item.type}/${item.id}`}
                                        href={`${item.type}/${item.id}`}
                                    />
                                ))
                            ) : (
                                <NoAlbums />
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )}

                {artists && artists.length > 0 && (
                    <AccordionItem value="artists">
                        <AccordionTrigger
                            icon={BsFillPersonLinesFill}
                            label={'Artists'}
                        />
                        <AccordionContent>
                            {Array.isArray(artists) && artists.length > 0 ? (
                                artists.map((item: Artist) => (
                                    <LibraryItem
                                        key={item.id}
                                        image={
                                            item.images && item.images.length > 0
                                                ? item.images[0]?.url
                                                : './src/assets/images/liked.png'
                                        }
                                        title={item.name}
                                        author={item.name}
                                        type={item.type}
                                        active={location.pathname === `/${item.type}/${item.id}`}
                                        href={`${item.type}/${item.id}`}
                                    />
                                ))
                            ) : (
                                <NoArtists />
                            )}
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    )
}

export default LibraryContent
