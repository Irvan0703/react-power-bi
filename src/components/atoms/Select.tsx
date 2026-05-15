type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  value?: Option | null
  onChange: (val: Option | null) => void
  placeholder?: string
  isDisabled?: boolean
}

export default function SelectField({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  isDisabled = false
}: Props) {
  return (
    <select
      className="form-select"
      disabled={isDisabled}
      value={value?.value || ""}
      onChange={(e) => {
        const selected = options.find(o => o.value === e.target.value) || null
        onChange(selected)
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}