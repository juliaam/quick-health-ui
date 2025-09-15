export function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  )
}
