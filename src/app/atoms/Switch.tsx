import './Switch.css'

interface Props {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export const Switch = (props: Props) => {
  return (
    <label className={props.className}>
      <input type="checkbox" checked={props.checked} onChange={(e) => props.onChange?.(e.target.checked ?? false)} />
      {props.label}
    </label>
  )
}
