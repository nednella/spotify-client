import Button from '../../components/Button'
import Header from '../../components/Header'

const Download = () => {
    return (
        <>
            <Header className="bg-none" />
            <div
                className="flex flex-grow flex-col items-center justify-center bg-blue-900"
                style={{ backgroundImage: 'linear-gradient(to bottom,rgba(0,0,0,.3),#171717 40%)' }}
            >
                <div className="w-[640px] max-w-[80%]">
                    <img
                        className="object-cover"
                        src="src/assets/images/mac.png"
                    />
                    <div className="flex flex-col items-center">
                        <h2 className="xsm:text-3xl text-center text-xl font-bold">
                            Seamlessly listen the music you love. Download the Spotify app for your
                            computer.
                        </h2>
                        <a
                            href="https://spotify.com/download"
                            rel="noreferrer"
                        >
                            <Button className="mt-8 w-[200px]">Get the free app</Button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Download
