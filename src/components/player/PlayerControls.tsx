import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from 'react-icons/io5'
import { MdPause, MdPlayArrow } from 'react-icons/md'
import { FiShuffle, FiRepeat } from 'react-icons/fi'

import Button from '../Button'
import Tooltip from '../Tooltip'
import Slider from '../Slider'

const PlayerControls = () => {
    const isPlaying = true

    return (
        <div className="mt-auto w-[40%]">
            {/* Playback controls */}
            <div className="mb-2 flex items-center gap-x-6">
                <div className="flex w-full justify-end gap-x-4">
                    <Tooltip message={'Toggle shuffle'}>
                        <button
                            data-active={true}
                            disabled={false}
                            className="
                                text-neutral-400
                                enabled:hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                data-[active=true]:text-green-500
                            "
                        >
                            <FiShuffle size={20} />
                        </button>
                    </Tooltip>

                    <Tooltip message={'Previous'}>
                        <button className="text-neutral-400 hover:text-white">
                            <IoPlaySkipBackSharp size={20} />
                        </button>
                    </Tooltip>
                </div>
                {!isPlaying ? (
                    <Tooltip message={'Play'}>
                        <Button className="w-fit bg-white p-1 text-black">
                            <MdPlayArrow size={24} />
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip message={'Pause'}>
                        <Button className="w-fit bg-white p-1 text-black">
                            <MdPause size={24} />
                        </Button>
                    </Tooltip>
                )}
                <div className="flex w-full justify-start gap-x-4">
                    <Tooltip message={'Next'}>
                        <button className="text-neutral-400 hover:text-white">
                            <IoPlaySkipForwardSharp size={20} />
                        </button>
                    </Tooltip>

                    <Tooltip message={'Toggle repeat'}>
                        <button
                            data-active={true}
                            disabled={false}
                            className="
                                text-neutral-400
                                enabled:hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                data-[active=true]:text-green-500
                            "
                        >
                            <FiRepeat size={20} />
                        </button>
                    </Tooltip>
                </div>
            </div>
            {/* Playback seek */}
            <div className="flex items-center justify-center gap-x-2 text-sm text-neutral-300">
                <span className="text-nowrap">-:--</span>
                <Slider className="w-full max-w-[600px]" />
                <span className="text-nowrap">-:--</span>
            </div>
        </div>
    )
}

export default PlayerControls
