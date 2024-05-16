import Header from '../components/Header'
// import Test from '../components/TEST'

const Home = () => {
    return (
        <>
            <Header className="">
                <h1 className="text-3xl font-semibold text-white">Welcome back, user</h1>
                <h3>[Additional Nav Buttons]</h3>
            </Header>
            <div className="flex items-center justify-center">
                <h1 className="text-3xl font-semibold text-white">Home Page</h1>
            </div>
        </>
    )
}

export default Home
