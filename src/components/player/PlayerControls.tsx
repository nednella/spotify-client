import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import { FiShuffle, FiRepeat } from 'react-icons/fi'

import usePlayer from '../../hooks/usePlayer'

import Button from '../Button'
import Tooltip from '../Tooltip'
import Seeker from './Seeker'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Controls = () => {
    const player = usePlayer()
    const isThisDeviceActive = player.isThisDeviceActive()

    return (
        <div className="my-auto w-full p-2 md:w-[40%] md:p-0">
            <div className="mb-2 flex items-center gap-x-6">
                <div className="flex w-full justify-end gap-x-4">
                    {/* Shuffle */}
                    <CButton
                        tooltip={'Toggle shuffle'}
                        onClick={() => player.toggleShuffle()}
                        active={player.playerState?.shuffle}
                        disabled={!isThisDeviceActive || player.playerState?.disallows.toggling_shuffle}
                    >
                        <FiShuffle size={20} />
                    </CButton>
                    {/* Previous */}
                    <CButton
                        tooltip={'Previous'}
                        onClick={() => player.previous()}
                        disabled={!isThisDeviceActive || player.playerState?.disallows.skipping_prev}
                    >
                        <IoPlaySkipBackSharp size={20} />
                    </CButton>
                </div>
                {/* Play/pause */}
                {player.playerState?.paused ? (
                    <Tooltip message={'Play'}>
                        <Button
                            onClick={() => player.play()}
                            disabled={!isThisDeviceActive || player.playerState?.disallows.resuming}
                            className="
                                w-fit
                                bg-white
                                p-1
                                text-black
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <MdPlayArrow size={24} />
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip message={'Pause'}>
                        <Button
                            onClick={() => player.pause()}
                            disabled={!isThisDeviceActive || player.playerState?.disallows.pausing}
                            className="
                                w-fit
                                bg-white
                                p-1
                                text-black
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <MdPause size={24} />
                        </Button>
                    </Tooltip>
                )}
                <div className="flex w-full justify-start gap-x-4">
                    {/* Next */}
                    <CButton
                        tooltip={'Next'}
                        onClick={() => player.next()}
                        disabled={!isThisDeviceActive || player.playerState?.disallows.skipping_next}
                    >
                        <IoPlaySkipForwardSharp size={20} />
                    </CButton>

                    {/* Repeat */}
                    <CButton
                        tooltip={'Toggle repeat'}
                        onClick={() => player.toggleRepeat()}
                        active={player.playerState?.repeat_mode !== 0}
                        disabled={
                            !isThisDeviceActive ||
                            (player.playerState?.disallows.toggling_repeat_context &&
                                player.playerState?.disallows.toggling_repeat_track)
                        }
                    >
                        <FiRepeat size={20} />
                        {player.playerState?.repeat_mode === 2 && (
                            <span className="absolute left-[110%] top-[50%] translate-y-[-50%] text-sm">1</span>
                        )}
                    </CButton>
                </div>
            </div>
            {/* Playback seek */}
            <Seeker />
        </div>
    )
}

export default Controls

interface CButtonProps {
    tooltip: string
    onClick: () => void
    active?: boolean
    disabled?: boolean
    className?: string
    children: React.ReactNode
}

const CButton: React.FC<CButtonProps> = ({ tooltip, onClick, active, disabled, className, children }) => {
    return (
        <Tooltip message={tooltip}>
            <button
                onClick={onClick}
                data-active={active}
                disabled={disabled}
                className={twMerge(
                    `
                        relative
                        text-neutral-400
                        enabled:hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        data-[active=true]:text-green-500
                        data-[active=true]:enabled:hover:text-green-400
                    `,
                    className
                )}
            >
                {children}
            </button>
        </Tooltip>
    )
}
