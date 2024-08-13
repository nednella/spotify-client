import { FiSpeaker } from 'react-icons/fi'

import usePlayer from '../../hooks/usePlayer'

import DeviceMenu from '../menus/DeviceMenu'

import Tooltip from '../Tooltip'

const Devices = () => {
    const player = usePlayer()
    return (
        <div className="flex w-[30%] items-center justify-end gap-4 pr-2">
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
                            <FiSpeaker size={20} />
                        </span>
                    </Tooltip>
                </button>
            </DeviceMenu>
        </div>
    )
}

export default Devices
