import * as Spinner from 'react-spinners'

const Loading = () => {
    return (
        <Spinner.ScaleLoader
            speedMultiplier={0.8}
            color="#1DB954"
            aria-label="Loading Spinner"
            data-testid="loader"
            className="
                absolute
                left-[50%]
                top-[50%]
                translate-x-[-50%]
                translate-y-[-50%]
            "
        />
    )
}

export default Loading
