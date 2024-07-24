const NotFound = () => {
    return (
        <div
            className="
                absolute
                left-[50%]
                top-[50%]
                flex
                w-full
                translate-x-[-50%]
                translate-y-[-50%]
                flex-col
                items-center
                justify-center
            "
        >
            <img src="/spotify-icon.svg" />
            <h1 className="mt-8 text-5xl font-bold">Page not found</h1>
            <p className="mt-2 text-neutral-400">We can't seem to find the page you are looking for.</p>
        </div>
    )
}

export default NotFound
