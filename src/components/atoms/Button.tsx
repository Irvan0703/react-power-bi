type Props = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "success" | "danger" | "secondary" | "warning"
  size?: "sm" | "lg"
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size,
  className = "",
  disabled = false
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        btn 
        btn-${variant} 
        ${size ? `btn-${size}` : ""} 
        ${className}
      `}
    >
      {children}
    </button>
  )
}