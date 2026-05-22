type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen"
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "lg",
}: Props) {
  if (!open) return null

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-7xl",
    fullscreen: "w-screen h-screen",
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div
        className={`
          bg-white rounded-xl shadow-xl overflow-hidden
          ${sizeClass[size]}
          ${
            size === "fullscreen"
              ? "h-screen w-screen rounded-none"
              : "w-full mx-4"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl leading-none hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div
          className={`
            overflow-auto p-4
            ${
              size === "fullscreen"
                ? "h-[calc(100vh-130px)]"
                : "max-h-[80vh]"
            }
          `}
        >
          {children}
        </div>
      </div>
    </div>
  )
}