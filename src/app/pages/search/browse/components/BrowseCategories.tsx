import React from 'react'

import { Category } from '../../../../../types/Category'

import BrowseCategory from './BrowseCategory'

interface BrowseCategoriesProps {
    categories: Category[]
}

const BrowseCategories: React.FC<BrowseCategoriesProps> = ({ categories }) => {
    return (
        <section className="mt-8 flex select-none flex-col px-4">
            <div className="py-2">
                <span className="text-2xl font-bold">Browse all</span>
            </div>
            <div
                className="
                    grid
                    h-fit
                    w-full
                    grid-cols-2
                    gap-6
                    xsm:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                "
            >
                {categories.map((category) => (
                    <BrowseCategory
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        image={
                            category.icons && category.icons[0]
                                ? category.icons[0].url
                                : '../../src/assets/images/placeholder.png'
                        }
                    />
                ))}
            </div>
        </section>
    )
}

export default BrowseCategories
