import Header from '../../components/Header'
import * as Spinner from 'react-spinners'

const Loading = () => {
    return (
        <>
            <Header />
            <div className="flex flex-grow flex-col items-center justify-center gap-y-4">
                <Spinner.ScaleLoader
                    speedMultiplier={0.8}
                    color="#1DB954"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    )
}

export default Loading
