import React from 'react'
import * as RadixSlider from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
    defaultValue: number
    value: number
    thumb?: boolean
    disabled?: boolean
    onChange?: (value: number) => void
    onCommit?: (value: number) => void
    className?: string
}

const Slider: React.FC<SliderProps> = ({
    defaultValue,
    value,
    thumb = false,
    disabled,
    onChange,
    onCommit,
    className,
}) => {
    const handleChange = (newValue: number[]) => onChange?.(newValue[0])
    const handleCommit = (newValue: number[]) => onCommit?.(newValue[0])

    return (
        <RadixSlider.Root
            className={twMerge(
                `
                    group
                    relative
                    flex
                    h-4
                    touch-none
                    select-none
                    items-center
                    data-[disabled]:pointer-events-none
                    data-[disabled]:cursor-not-allowed
                    data-[disabled]:opacity-50
                `,
                className
            )}
            defaultValue={[defaultValue]}
            value={[value]}
            max={1}
            step={0.01}
            onValueChange={handleChange}
            onValueCommit={handleCommit}
            disabled={disabled}
        >
            <RadixSlider.Track
                className="
                    relative
                    h-[4px]
                    grow
                    rounded-full
                    bg-neutral-600
                "
            >
                <RadixSlider.Range
                    className={twMerge(
                        `
                            absolute
                            h-full
                            rounded-full
                            bg-white
                            
                        `,
                        thumb && 'group-hover:bg-green-500'
                    )}
                />
            </RadixSlider.Track>
            {thumb && (
                <RadixSlider.Thumb
                    className="
                        hidden
                        size-3
                        cursor-pointer
                        rounded-full
                        bg-white
                        outline-none
                        group-hover:block
                    "
                />
            )}
        </RadixSlider.Root>
    )
}

export default Slider
