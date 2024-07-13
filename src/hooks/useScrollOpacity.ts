import { create } from 'zustand'

interface ScrollOpacityStore {
    opacity: number
    setOpacity: (value: number) => void
}

const useScrollOpacity = create<ScrollOpacityStore>((set) => ({
    opacity: 0,
    setOpacity: (value: number) => set({ opacity: value }),
}))

export default useScrollOpacity
