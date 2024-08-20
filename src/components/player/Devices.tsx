import { PiPlaylist } from 'react-icons/pi'
import { FiSpeaker } from 'react-icons/fi'

import usePlayer from '../../hooks/usePlayer'

import TrackQueueMenu from '../menus/TrackQueueMenu'
import DeviceMenu from '../menus/DeviceMenu'

import Tooltip from '../Tooltip'
import Volume from './Volume'

const Devices = () => {
    const player = usePlayer()
    return (
        <div className="flex w-[30%] items-center justify-center gap-4 pr-2">
            {player.isThisDeviceActive() && (
                <TrackQueueMenu>
                    <button
                        className="
                        text-neutral-400
                        hover:text-white
                    "
                    >
                        <Tooltip message={'Queue'}>
                            <span>
                                <PiPlaylist size={22} />
                            </span>
                        </Tooltip>
                    </button>
                </TrackQueueMenu>
            )}
            <DeviceMenu>
                <button
                    data-active={player.isThisDeviceActive()}
                    className="
                        text-neutral-400
                        hover:text-white
                        data-[active=true]:text-green-500
                    "
                >
                    <Tooltip message={'Connect to a device'}>
                        <span>
                            <FiSpeaker size={18} />
                        </span>
                    </Tooltip>
                </button>
            </DeviceMenu>
            <Volume />
        </div>
    )
}

export default Devices
