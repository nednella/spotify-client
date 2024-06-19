import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import Button from '../Button'

interface CarouselProps {
    title: string
    children: React.ReactNode
    className?: string
}

export const Carousel: React.FC<CarouselProps> = ({ title, children }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 'auto' })
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
    }, [emblaApi])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect).on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="flex select-none flex-col">
            <div className="mt-6 flex items-center justify-between pb-1">
                <p className="text-2xl font-bold">{title}</p>
                <div className="flex gap-x-2">
                    {/* TODO: Nav buttons */}
                    <CarouselButton
                        direction={'left'}
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <CarouselButton
                        direction={'right'}
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
            <div className="flex"></div>
            {/* TODO: Viewport */}
            <CarouselViewport
                ref={emblaRef}
                className="flex w-full"
            >
                {children}
            </CarouselViewport>
            {/* TODO: Dot navigation */}
        </section>
    )
}

interface CarouselButtonProps {
    direction: 'left' | 'right'
    disabled: boolean
    onClick: () => void
}

export const CarouselButton: React.FC<CarouselButtonProps> = ({ direction, disabled, onClick }) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className="
                flex
                items-center
                justify-center
                bg-transparent
                p-0
                text-white
                disabled:opacity-50
            "
        >
            {direction === 'left' ? <RxCaretLeft size={32} /> : <RxCaretRight size={32} />}
        </Button>
    )
}

interface CarouselViewportProps {
    children: React.ReactNode
    className?: string
}

export const CarouselViewport = React.forwardRef<HTMLDivElement, CarouselViewportProps>(
    ({ className, children }, forwardedRef) => {
        return (
            <div
                ref={forwardedRef}
                className={twMerge('overflow-hidden', className)}
            >
                {children}
            </div>
        )
    }
)

interface CarouselContainerProps {
    children: React.ReactNode
}

export const CarouselContainer: React.FC<CarouselContainerProps> = ({ children }) => {
    return <div className="flex h-fit w-full">{children}</div>
}

interface CarouselSlideProps {
    children: React.ReactNode
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({ children }) => {
    return (
        <div
            className="
                flex
                w-[50%]
                shrink-0
                justify-center
                xsm:w-[calc(100%/3)]
                lg:w-[25%]
                xl:w-[20%]
                2xl:w-[calc(100%/6)]
            "
        >
            {children}
        </div>
    )
}
