import ContentCardLoading from './ContentCardLoading'

const ContentSectionLoading = () => {
    return (
        <section className="flex flex-col gap-y-2">
            <div className="mt-6 pb-1">
                <div className="h-6 w-[25%] rounded-full bg-neutral-500/40"></div>
            </div>
            <div
                className="
                    grid
                    grid-cols-2
                    grid-rows-1
                    gap-x-3
                    overflow-hidden
                    xsm:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                "
                style={{ gridAutoRows: 0 }}
            >
                <ContentCardLoading />
                <ContentCardLoading />
                <ContentCardLoading />
                <ContentCardLoading />
                <ContentCardLoading />
            </div>
        </section>
    )
}

export default ContentSectionLoading
