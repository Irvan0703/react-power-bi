import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

type Props = {
  judulToko: string
  divisi: string
  ornal: string
  selectedOrnal: string
  selectedDivisi: string
  onChangeOrnal: (value: string) => void
  onChangeDivisi: (value: string) => void
  onApply: () => void
}

export default function Navbar({
  judulToko,
  divisi,
  ornal,
  selectedOrnal,
  selectedDivisi,
  onChangeOrnal,
  onChangeDivisi,
  onApply,
}: Props) {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)
      if (desktop) setOpen(false)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-md">
      {/* Baris utama navbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        {/* Title — truncate supaya tidak mendorong controls */}
        <h3 className="min-w-0 flex-1 truncate text-base font-bold text-gray-800">
          {judulToko} – Divisi : {divisi} - {ornal}
        </h3>

        {/* Desktop controls — hanya render jika isDesktop */}
        {isDesktop && (
          <div className="flex shrink-0 items-center gap-3">
            {/* Ornal */}
            <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-1.5">
              {["Normal", "Obral"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onChangeOrnal(selectedOrnal === item ? "" : item)}
                  className={`min-w-[90px] rounded-md border-2 px-3 py-1.5 text-sm transition-all ${
                    selectedOrnal === item
                      ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Divisi */}
            <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-1.5">
              {[
                { label: "JEANS", value: "JEANS / YOUTH" },
                { label: "CASUAL", value: "CASUAL / MAN" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChangeDivisi(selectedDivisi === value ? "" : value)}
                  className={`min-w-[90px] rounded-md border-2 px-3 py-1.5 text-sm transition-all ${
                    selectedDivisi === value
                      ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Apply */}
            <button
              type="button"
              onClick={onApply}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Terapkan Filter
            </button>
          </div>
        )}

        {/* Mobile hamburger — hanya render jika bukan desktop */}
        {!isDesktop && (
          <button
            type="button"
            className="shrink-0 rounded-md border border-gray-300 bg-white p-2 shadow-sm"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown — hanya tampil jika bukan desktop dan open */}
      {!isDesktop && open && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-3">
          <div className="flex flex-col gap-4">
            {/* Ornal */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Ornal
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["Normal", "Obral"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onChangeOrnal(selectedOrnal === item ? "" : item)}
                    className={`rounded-lg border-2 px-4 py-2.5 text-sm transition-all ${
                      selectedOrnal === item
                        ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Divisi */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Divisi
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "JEANS", value: "JEANS / YOUTH" },
                  { label: "CASUAL", value: "CASUAL / MAN" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onChangeDivisi(selectedDivisi === value ? "" : value)}
                    className={`rounded-lg border-2 px-4 py-2.5 text-sm transition-all ${
                      selectedDivisi === value
                        ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply */}
            <button
              type="button"
              onClick={() => {
                onApply()
                setOpen(false)
              }}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}