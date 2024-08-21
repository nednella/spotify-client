const Banner = () => {
    return (
        <footer className="flex h-full bg-gradient-to-r from-[#af2896] to-[#509bf5] px-4 py-3">
            <div className="flex-1">
                <p className="text-sm font-bold">
                    This application is a clone of the official Spotify client, intended for educational purposes.
                </p>
                <p className="font-medium">
                    Sign up to get unlimited songs and podcasts with occassional ads. No card required.
                </p>
            </div>
            <a
                className="
                    flex
                    items-center
                    justify-center
                    text-nowrap
                    rounded-full
                    bg-white
                    px-8
                    py-2
                    font-bold
                    text-black
                    transition
                    hover:opacity-75
                    active:scale-95
                "
                href="https://spotify.com/signup"
                rel="noreferrer"
            >
                Sign up for free
            </a>
        </footer>
    )
}

export default Banner
