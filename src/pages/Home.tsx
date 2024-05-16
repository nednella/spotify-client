import Header from '../components/Header'

const Home = () => {
    const user = false

    return (
        // to-33 bg-gradient-to-b from-emerald-800
        <>
            <Header className="to-emerald-800">
                {user ? (
                    <>
                        <h1 className="text-3xl font-semibold text-white">Welcome back, user</h1>
                        <h3>[Additional Nav Buttons]</h3>
                    </>
                ) : null}
            </Header>
            <div className="flex items-center justify-center">
                <h1 className="text-3xl font-semibold text-white">Home Page</h1>
            </div>
        </>
    )
}

export default Home
