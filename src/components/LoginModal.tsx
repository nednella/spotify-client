import useLoginModal from '../hooks/useLoginModal'

import Login from '../api/Login'

import Modal from './Modal'
import Button from './Button'

const LoginModal = () => {
    const { isOpen, onClose, img } = useLoginModal()

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onChange={onChange}
            className="
                animate-login-modal
                bg-pink-700/80
                bg-gradient-to-b
                from-black/40 
                to-neutral-800
                to-90%
                py-16
                transition
                lg:max-w-[800px]
                lg:p-16
            "
        >
            <div
                className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                lg:flex-row
            "
            >
                <div
                    className="
                    flex
                    h-[200px]
                    w-[200px]
                    items-center
                    sm:h-[240px]
                    sm:w-[240px]
                    lg:mr-16
                    lg:h-[300px]
                    lg:w-[300px]
                "
                >
                    <img
                        src={img}
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="mt-8 flex flex-col items-center lg:mt-0">
                    <h2 className="max-w-[350px] text-center text-2xl font-bold lg:text-3xl">
                        Start listening with your Spotify account
                    </h2>
                    <Button
                        onClick={Login}
                        className="mt-8 w-[200px] px-12"
                    >
                        Log in
                    </Button>
                    <a
                        className="
                            mt-4
                            w-[200px]
                            whitespace-nowrap
                            rounded-full
                            border
                            border-neutral-500
                            px-12
                            py-3
                            font-bold
                            text-white
                            transition
                            hover:opacity-75
                            active:scale-95
                        "
                        href="https://spotify.com/download"
                        rel="noreferrer"
                    >
                        Download app
                    </a>
                    <p className="mt-8 text-center">
                        <span className="text-neutral-400">Don't have an account?</span>
                        <a
                            href="https://spotify.com/signup"
                            rel="noreferrer"
                            className="ml-2 font-bold"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal
