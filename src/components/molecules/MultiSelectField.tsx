import Select from "react-select"

type Option = {
  label: string
  value: string
}

type ReturnType =
  | "value"
  | "label"
  | "object"

type Props = {
  options: Option[]
  value: any
  onChange: (val: any) => void
  returnType?: ReturnType
  isMulti?: boolean
}

export default function MultiSelectField({
  options,
  value,
  onChange,
  returnType = "object",
  isMulti = true,
}: Props) {
  const handleChange = (selected: any) => {
    if (!selected) {
      onChange([])
      return
    }

    // MULTI
    if (Array.isArray(selected)) {
      if (returnType === "value") {
        onChange(
          selected.map((item) => item.value)
        )
      } else if (
        returnType === "label"
      ) {
        onChange(
          selected.map((item) => item.label)
        )
      } else {
        onChange(selected)
      }

      return
    }

    // SINGLE
    if (returnType === "value") {
      onChange(selected.value)
    } else if (
      returnType === "label"
    ) {
      onChange(selected.label)
    } else {
      onChange(selected)
    }
  }

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}