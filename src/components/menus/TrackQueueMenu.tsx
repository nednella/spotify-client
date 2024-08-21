import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'

import usePlayer from '../../hooks/usePlayer'

import ScrollArea from '../ScrollArea'
import MediaItem from '../tracks/MediaItem'

interface TrackQueueMenuProps {
    children: React.ReactNode
}

const TrackQueueMenu: React.FC<TrackQueueMenuProps> = ({ children }) => {
    const current = usePlayer((state) => state.queue.current)
    const list = usePlayer((state) => state.queue.list)

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className="outline-none"
                asChild
            >
                {children}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align={'end'}
                    sideOffset={15}
                    className="
                        relative
                        z-50
                        h-fit
                        max-h-full
                        w-[280px]
                        select-none
                        rounded-sm
                        bg-neutral-800
                        p-1
                        shadow-md
                        shadow-neutral-900
                        transition
                    "
                >
                    <>
                        <DropdownMenu.Item className="outline-none">
                            <div
                                className="
                                        flex
                                        h-fit
                                        w-full
                                        flex-col
                                        gap-1
                                        rounded-t-sm
                                        bg-gradient-to-b
                                        from-green-500/20
                                        to-transparent
                                        p-3
                                    "
                            >
                                <div className="flex gap-x-2">
                                    <img
                                        className="size-6 max-h-6 max-w-6"
                                        src="../../src/assets/images/equaliser-animation.webp"
                                        alt=""
                                    />
                                    <span className="truncate text-xl font-bold text-white">Now Playing</span>
                                </div>
                                {current ? (
                                    <MediaItem
                                        title={current.name}
                                        img={
                                            current.album.images[0]
                                                ? current.album.images[0].url
                                                : '../src/assets/images/placeholder.png'
                                        }
                                        artists={current.artists}
                                    />
                                ) : (
                                    <p>There is no currently playing track.</p>
                                )}
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator className="m-[5px] h-[1px] bg-neutral-600" />
                    </>
                    <ScrollArea className="!flex max-h-[500px] min-h-[60px] flex-col gap-y-2">
                        {list.length > 0 ? (
                            list.map((track) => (
                                <DropdownMenu.Item
                                    key={track.id}
                                    className="outline-none"
                                >
                                    <MediaItem
                                        title={track.name}
                                        img={
                                            track.album.images[0]
                                                ? track.album.images[0].url
                                                : '../src/assets/images/placeholder.png'
                                        }
                                        artists={track.artists}
                                    />
                                </DropdownMenu.Item>
                            ))
                        ) : (
                            <p className="self-center">There are no tracks in the queue.</p>
                        )}
                    </ScrollArea>
                    <DropdownMenu.Arrow
                        height={8}
                        width={12}
                        className="fill-neutral-800"
                    />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default TrackQueueMenu
