import { FiHeadphones } from 'react-icons/fi'

import usePlayer from '../../hooks/usePlayer'

const ActiveDevice = () => {
    const player = usePlayer()

    if (!player.isThisDeviceActive() && player.devices.active.id)
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
                <span className="mb-[-2px] text-sm font-extrabold">Playing on {player.devices.active.name}</span>
            </div>
        )
}

export default ActiveDevice
