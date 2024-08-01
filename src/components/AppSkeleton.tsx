import Container from './Container'
import Content from './Content'

const App = () => {
    return (
        <div className="flex h-full gap-2 p-2">
            <div className="hidden h-full w-[300px] flex-col gap-y-2 md:flex lg:w-[350px]">
                <Container className="h-full overflow-y-auto" />
            </div>
            <Content children={undefined} />
        </div>
    )
}

export default App
