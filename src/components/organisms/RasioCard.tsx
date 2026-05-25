import RasioTable from "../molecules/RasioTable"

type Props = {
  data?: Record<string, any>
  onChangeValue?: (
    size: string,
    value: number
  ) => void
}

export default function RasioCard({
  data = {},
  onChangeValue,
}: Props) {
  return (
    <div className="mt-3 rounded border bg-white shadow-sm">
      <div className="border-b px-4 py-3 font-semibold">
        Rasio
      </div>

      <div className="p-3">
        <RasioTable data={data} onChangeValue={onChangeValue} />
      </div>
    </div>
  )
}