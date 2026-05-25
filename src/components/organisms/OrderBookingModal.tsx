import Modal from "../atoms/Modal"
import Button from "../atoms/Button"

type Props = {
  open: boolean
  onClose: () => void

  artikel?: string
  toko?: string
  gudang?: string

  children?: React.ReactNode

  onSaveDraft: () => void
}

export default function OrderBookingModal({
  open,
  onClose,
  artikel,
  toko,
  gudang,
  children,
  onSaveDraft,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Konfirmasi Order Booking"
      size="xl"
    >

      {/* hidden value */}
      <input
        type="hidden"
        value={artikel || ""}
      />

      <input
        type="hidden"
        value={toko || ""}
      />

      <input
        type="hidden"
        value={gudang || ""}
      />

      {/* body */}
      <div className="space-y-4">

        {children || (
          <div className="text-gray-500">
            Loading...
          </div>
        )}

      </div>

      {/* footer */}
      <div className="mt-6 flex justify-end gap-2 border-t pt-4">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Tutup
        </Button>

        <Button
          onClick={onSaveDraft}
        >
          Tambahkan Ke Draft
        </Button>
      </div>
    </Modal>
  )
}