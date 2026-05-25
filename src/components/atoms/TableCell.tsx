type Props = {
  value?: React.ReactNode
}

export default function TableCell({
  value = "-",
}: Props) {
  return (
    <td className="border px-3 py-2 text-center">
      {value}
    </td>
  )
}