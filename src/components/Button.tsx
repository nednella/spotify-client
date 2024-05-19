import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, disabled, type = 'button', ...props }, ref) => {
        return (
            <button
                type={type}
                className={twMerge(
                    `
                        w-full
                        whitespace-nowrap
                        rounded-full
                        border
                        border-transparent
                        bg-green-500
                        px-3
                        py-3
                        font-bold
                        text-black
                        transition
                        hover:opacity-75
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-75
                    `,
                    className
                )}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
