type Props = {
  children: React.ReactNode
}

export default function TableHeader({
  children,
}: Props) {
  return (
    <th className="border px-3 py-2 bg-gray-100 whitespace-nowrap">
      {children}
    </th>
  )
}