import TableHeader from "../atoms/TableHeader"

type Props = {
    data?: any
    onChangeValue?: (
        size: string,
        value: number
    ) => void
}

export default function RasioTable({
    data,
    onChangeValue,
}: Props) {

    if (!data || !data.items) {
        return (
            <div className="text-sm text-gray-500">
                Belum ada gudang dipilih
            </div>
        )
    }

    return (
        <div className="overflow-auto">
            <table className="min-w-full border-collapse border text-sm">

                <thead>
                    <tr>
                        {data.items.map(
                            (item: any) => (
                                <TableHeader
                                    key={item.size}
                                >
                                    {item.size}
                                </TableHeader>
                            )
                        )}
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {data.items.map(
                            (item: any) => (
                                <td
                                    key={item.size}
                                    className="border p-2 text-center"
                                >
                                    <input
                                        type="number"
                                        className="w-16 rounded border px-1 py-0.5 text-center"
                                        value={item.value}
                                        disabled={item.disabled}
                                        min={0}
                                        max={item.max}
                                        onChange={(e) => {

                                            let value = Number(
                                                e.target.value
                                            )

                                            // minimal 0
                                            if (value < 0) {
                                                value = 0
                                            }

                                            // maksimal stok
                                            if (value > item.max) {
                                                value = item.max
                                            }

                                            onChangeValue?.(
                                                item.size,
                                                value
                                            )
                                        }}
                                    />

                                    <div className="text-xs text-gray-500">
                                        Stok: {item.stok}
                                    </div>
                                </td>
                            )
                        )}
                    </tr>
                </tbody>

            </table>
        </div>
    )
}