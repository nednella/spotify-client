import Container from '../components/Container'
import Content from '../components/Content'

const App = () => {
    return (
        <div className="flex h-full">
            <div className="hidden h-full w-[300px] flex-col gap-y-2 p-2 md:flex lg:w-[350px]">
                <Container className="h-full overflow-y-auto" />
            </div>
            <Content children={undefined} />
        </div>
    )
}

export default App
