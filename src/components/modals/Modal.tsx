import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
    isOpen: boolean
    onChange: (open: boolean) => void
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onChange, children, className, style }) => {
    return (
        <>
            <Dialog.Root
                open={isOpen}
                defaultOpen={isOpen}
                onOpenChange={onChange}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[99] bg-black/70" />
                    <Dialog.Content
                        className={twMerge(
                            `
                                fixed
                                left-[50%]
                                top-[50%]
                                z-[100]
                                h-full
                                max-h-full
                                w-full
                                translate-x-[-50%]
                                translate-y-[-50%]
                                rounded-lg
                                bg-neutral-900
                                p-8
                                drop-shadow-md
                                sm:h-[auto]
                                sm:max-h-[85vh]
                                sm:w-[90vw]
                                sm:max-w-[450px]
                            `,
                            className
                        )}
                        style={style}
                    >
                        {children}
                        <Dialog.Close asChild>
                            <button
                                className="
                                    absolute
                                    right-[10px]
                                    top-[10px]
                                    flex
                                    h-[36px]
                                    w-[36px]
                                    appearance-none
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-neutral-400
                                    hover:bg-neutral-700
                                    focus:outline-none
                                "
                            >
                                <IoMdClose size={24} />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default Modal
