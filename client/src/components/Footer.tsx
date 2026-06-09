import Separator from './Separator'

const Footer = () => {
    return (
        <section className="h-fit w-full select-none px-8 py-10">
            <div className="flex">
                <div className="flex w-full flex-wrap justify-center">
                    <div className="mb-8 mr-6 w-[20%] min-w-[80px] text-sm font-medium text-neutral-400">
                        <p className="text-white">Company</p>
                        <p className="my-2">About</p>
                        <p className="my-2">Jobs</p>
                        <p className="my-2">For the Record</p>
                    </div>
                    <div className="mb-8 mr-6 w-[20%] min-w-[80px] text-sm font-medium text-neutral-400">
                        <p className="text-white">Communities</p>
                        <p className="my-2">For Artists</p>
                        <p className="my-2">Developers</p>
                        <p className="my-2">Advertising</p>
                        <p className="my-2">Investors</p>
                        <p className="my-2">Vendors</p>
                    </div>
                    <div className="mb-8 mr-6 w-[20%] min-w-[80px] text-sm font-medium text-neutral-400">
                        <p className="text-white">Useful Links</p>
                        <p className="my-2">Support</p>
                        <p className="my-2">Free Mobile App</p>
                    </div>
                    <div className="mb-8 mr-6 w-[20%] min-w-[80px] text-sm font-medium text-neutral-400">
                        <p className="text-white">Spotify Plans</p>
                        <p className="my-2">Premium Individual</p>
                        <p className="my-2">Premium Duo</p>
                        <p className="my-2">Premium Family</p>
                        <p className="my-2">Premium Student</p>
                        <p className="my-2">Spotify Free</p>
                    </div>
                </div>
                <div></div>
            </div>
            <Separator
                orientation="horizontal"
                className="bg-neutral-700"
            />
            <div
                className="
                    flex
                    flex-wrap
                    justify-center
                    pt-4
                    text-sm
                    font-medium
                    text-neutral-400
                "
            >
                <p className="py-2 pr-3">Legal</p>
                <p className="py-2 pr-3">Safety & Privacy Center</p>
                <p className="py-2 pr-3">Privacy Policy</p>
                <p className="py-2 pr-3">Cookie Settings</p>
                <p className="py-2 pr-3">About Ads</p>
                <p className="py-2 pr-3">Accessibility</p>
                <p className="py-2 pr-3">Modern Slavery Act</p>
                <p className="py-2 pr-3">UK Tax Policy</p>
                <p className="py-2 pr-3">UK Gender Pay Report</p>
            </div>
        </section>
    )
}

export default Footer
