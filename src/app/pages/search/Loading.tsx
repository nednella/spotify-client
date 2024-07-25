import * as Spinner from 'react-spinners'

const Loading = () => {
    return (
        <div
            className="
                absolute
                left-[50%]
                top-[50%]
                w-full
                translate-x-[-50%]
                translate-y-[-50%]
                items-center
                justify-center
            "
        >
            <Spinner.ScaleLoader
                speedMultiplier={0.8}
                color="#1DB954"
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loading
