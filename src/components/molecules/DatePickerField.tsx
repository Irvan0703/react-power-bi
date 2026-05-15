import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
  value: Date | null
  onChange: (date: Date | null) => void
}

export default function DatePickerField({ value, onChange }: Props) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      className="form-control"
      dateFormat="yyyy-MM-dd"
    />
  )
}