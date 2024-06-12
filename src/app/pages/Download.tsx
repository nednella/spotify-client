import Button from '../../components/Button'
import Header from '../../components/Header'

const Download = () => {
    return (
        <>
            <Header />
            <div
                className="
                flex
                flex-grow
                flex-col
                items-center
                justify-center
                bg-gradient-to-b
                from-sky-900
                to-40%
            "
            >
                <div className="w-[640px] max-w-[80%]">
                    <img
                        className="object-cover"
                        src="src/assets/images/mac.png"
                    />
                    <div className="flex flex-col items-center">
                        <h2 className="text-center text-xl font-bold xsm:text-3xl">
                            Seamlessly listen the music you love. Download the Spotify app for your computer.
                        </h2>
                        <a
                            className="mt-8 w-[200px]"
                            href="https://spotify.com/download"
                            rel="noreferrer"
                            tabIndex={-1}
                        >
                            <Button>Get the free app</Button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Download
