const LibraryItemLoading = () => {
    return (
        <div className="flex gap-x-2 p-2">
            <div className="">
                <div className="size-12 rounded-md bg-neutral-800"></div>
            </div>
            <div className="flex flex-grow flex-col justify-center gap-y-1">
                <div className="h-4 w-36 rounded-md bg-neutral-800"></div>
                <div className="h-3 w-28 rounded-md bg-neutral-800"></div>
            </div>
        </div>
    )
}

export default LibraryItemLoading
