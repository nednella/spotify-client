import Container from '../Container'
import SidebarNav from './SidebarNav'
import Library from '../library/Library'

const Sidebar = () => {
    return (
        <div className="hidden h-full w-[250px] flex-col gap-y-2 p-2 md:flex lg:w-[300px] xl:w-[350px]">
            <Container className="flex flex-col gap-y-4 px-6 py-4">
                <SidebarNav />
            </Container>
            <Container className="h-full overflow-y-auto">
                <Library />
            </Container>
        </div>
    )
}

export default Sidebar
