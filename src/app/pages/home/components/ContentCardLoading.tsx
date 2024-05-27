const ContentCardLoading = () => {
    return (
        <div
            className="
                flex
                flex-col
                gap-y-4
                rounded-lg
                bg-neutral-400/5
                p-4
            "
        >
            <div
                className="
                    flex
                    flex-grow
                    items-center
                    justify-center
                    overflow-hidden
                "
            >
                <div className="w-full rounded-md bg-neutral-500/40 pt-[100%]"></div>
            </div>
            <div className="flex h-16 w-full flex-col gap-y-3 overflow-hidden text-left">
                <p className="h-4 w-[90%] rounded-full bg-neutral-500/40"></p>
                <p className="h-4 w-[60%] rounded-full bg-neutral-500/40"></p>
            </div>
        </div>
    )
}

export default ContentCardLoading
