const RecentCardLoading = () => {
    return (
        <div
            className="
                group
                relative
                flex
                h-12
                items-center
                rounded-md
                bg-neutral-700/60
            "
        >
            <div
                className="
                    relative
                    size-12
                    rounded-l-md
                    bg-neutral-500/80
                "
            ></div>
            <div
                className="
                    mx-3
                    flex
                    h-5
                    flex-grow
                    items-center
                    justify-between
                    rounded-full
                    bg-neutral-500/80
                "
            ></div>
        </div>
    )
}

export default RecentCardLoading
