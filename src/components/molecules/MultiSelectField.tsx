import Select from "react-select"

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value: Option[]
  onChange: (val: Option[]) => void
}

export default function MultiSelectField({ options, value, onChange }: Props) {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={(val) => onChange(val as Option[])}
    />
  )
}