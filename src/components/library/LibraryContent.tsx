import React from 'react'

import { MdLibraryMusic } from 'react-icons/md'
import { PiVinylRecord } from 'react-icons/pi'
import { BsFillPersonLinesFill } from 'react-icons/bs'

import { User } from '../../types/User'
import { Library } from '../../types/Library'
import { PlaylistSimplified } from '../../types/Playlist'
import { Album } from '../../types/Album'
import { Artist } from '../../types/Artist'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion'
import LibraryItem from './LibraryItem'

interface LibraryContentProps {
    user: User
    data: Library
}

const LibraryContent: React.FC<LibraryContentProps> = ({ user, data }) => {
    const yourPlaylists: PlaylistSimplified[] = data.playlists.filter(
        (playlist: PlaylistSimplified) => playlist.owner.display_name === user.display_name
    )
    const followedPlaylists: PlaylistSimplified[] = data.playlists.filter(
        (playlist: PlaylistSimplified) => playlist.owner.display_name !== user.display_name
    )
    const albums: Album[] = data.albums
    const artists: Artist[] = data.artists

    console.log(yourPlaylists, albums, artists)

    return (
        <div className="h-full w-full">
            <Accordion>
                {yourPlaylists && yourPlaylists.length > 0 && (
                    <AccordionItem value="your-playlists">
                        <AccordionTrigger
                            icon={MdLibraryMusic}
                            label={'Your Playlists'}
                        />
                        <AccordionContent>
                            {yourPlaylists.map((item: PlaylistSimplified) => (
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
                                    href={`${item.type}/${item.id}`}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                )}

                {followedPlaylists && followedPlaylists.length > 0 && (
                    <AccordionItem value="followed-playlists">
                        <AccordionTrigger
                            icon={MdLibraryMusic}
                            label={'Followed Playlists'}
                        />
                        <AccordionContent>
                            {followedPlaylists.map((item: PlaylistSimplified) => (
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
                                    href={`${item.type}/${item.id}`}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                )}

                {albums && albums.length > 0 && (
                    <AccordionItem value="albums">
                        <AccordionTrigger
                            icon={PiVinylRecord}
                            label={'Albums'}
                        />
                        <AccordionContent>
                            {albums.map((item: Album) => (
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
                                    href={`${item.type}/${item.id}`}
                                />
                            ))}
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
                            {artists.map((item: Artist) => (
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
                                    href={`${item.type}/${item.id}`}
                                />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        </div>
    )
}

export default LibraryContent
