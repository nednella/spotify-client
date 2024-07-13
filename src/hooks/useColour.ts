import { create } from 'zustand'

interface ColourStore {
    colour: string[] // Accepts ['r', 'g', 'b']
    defaultColour: string[]
    setColour: (value: string[]) => void
}

const useColour = create<ColourStore>((set) => ({
    colour: ['23', '23', '23'],
    defaultColour: ['23', '23', '23'],
    setColour: (value: string[]) => set({ colour: value }),
}))

export default useColour
