import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

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
                    <Dialog.Overlay className="fixed inset-0 z-20" />
                    <Dialog.Content
                        className={twMerge(``, className)}
                        style={style}
                    >
                        {children}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default Modal
