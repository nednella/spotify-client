import { create } from 'zustand'

interface LoginModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    img: string | undefined
    setImg: (prop: string) => void
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    img: 'src/assets/images/liked.png', // default image
    setImg: (src: string) => set({ img: src || 'src/assets/images/liked.png' }), // revert to default if error
}))

export default useLoginModal
