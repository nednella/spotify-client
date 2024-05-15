import Sidebar from './components/Sidebar'
import Home from './pages/Home'

const App = () => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <Home />
        </div>
    )
}

export default App
