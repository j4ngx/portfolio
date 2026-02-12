interface Props {
  icon: string
  filled?: boolean
}

export default function Icon({ icon, filled = false }: Props) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {icon}
    </span>
  )
}
