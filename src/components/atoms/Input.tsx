type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export default function Input({ value, onChange, placeholder }: Props) {
  return (
    <input
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}