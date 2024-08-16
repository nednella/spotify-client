import { FiHeadphones } from 'react-icons/fi'

import usePlayer from '../../hooks/usePlayer'

const ActiveDevice = () => {
    const player = usePlayer()

    if (player.devices.active.id && !player.isThisDeviceActive())
        return (
            <div
                className="
                    flex
                    h-[24px]
                    items-center
                    justify-end
                    gap-x-2
                    rounded-[4px]
                    bg-green-500
                    pr-2
                    text-black
                "
            >
                <FiHeadphones size={18} />
                <button className="mb-[-2px] text-sm font-extrabold hover:underline">
                    Playing on {player.devices.active.name}
                </button>
            </div>
        )
}

export default ActiveDevice
