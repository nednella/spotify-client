import useGetBrowseCategories from '../../../../hooks/useGetBrowseCategories'

import BrowseCategories from './components/BrowseCategories'
import Footer from '../../../../components/Footer'

const Browse = () => {
    const { data } = useGetBrowseCategories()

    if (data)
        return (
            <>
                <BrowseCategories categories={data} />
                <Footer />
            </>
        )
}

export default Browse
