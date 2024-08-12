import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import React from 'react'
import usePlayer from '../../hooks/usePlayer'

interface DeviceMenuProps {
    children: React.ReactNode
}

const DeviceMenu: React.FC<DeviceMenuProps> = ({ children }) => {
    const thisDeviceId = usePlayer((state) => state.deviceId)
    const devices = usePlayer((state) => state.devices)
    const deviceList = devices.list.filter((device) => device.id !== devices.active.id)
    const setDevice = usePlayer((state) => state.setActiveDevice)

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
                    {devices.active.id && (
                        <>
                            <DropdownMenu.Item className="outline-none">
                                <div
                                    className="
                                        flex
                                        h-20
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
                                        <span className="truncate text-xl font-bold text-white">Current Device</span>
                                    </div>
                                    <span className="truncate text-sm font-medium text-neutral-200">
                                        {devices.active.name}
                                    </span>
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="m-[5px] h-[1px] bg-neutral-600" />
                        </>
                    )}
                    {deviceList.map((device) => (
                        <DropdownMenu.Item
                            key={device.id}
                            className="outline-none"
                        >
                            <div
                                onClick={() => setDevice(device.id)}
                                className="
                                    flex
                                    h-10
                                    w-full
                                    cursor-pointer
                                    rounded-t-sm
                                    pl-3
                                    hover:bg-neutral-700
                                "
                            >
                                <button className="truncate text-sm font-medium text-neutral-200">
                                    {device.id === thisDeviceId ? 'This Device' : device.name}
                                </button>
                            </div>
                        </DropdownMenu.Item>
                    ))}
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

export default DeviceMenu
