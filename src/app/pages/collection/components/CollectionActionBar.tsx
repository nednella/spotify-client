import PlayButton from '../../../../components/PlayButton'

const CollectionActionBar = () => {
    return (
        <div className={'flex h-20 items-center justify-between py-4'}>
            <div className="flex items-center">
                <PlayButton
                    contextUri={'spotify:collection:tracks'}
                    size={24}
                    className="mr-6 shadow-md shadow-black/30"
                />
            </div>
        </div>
    )
}

export default CollectionActionBar
