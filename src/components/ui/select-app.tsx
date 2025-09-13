/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectProps } from '@radix-ui/react-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

export type Option = {
  label: string
  value: any
}

export type SelectAppProps = SelectProps & {
  placeholder?: string
  options: Option[]
}

export const SelectApp = ({
  placeholder,
  options,
  ...props
}: SelectAppProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder ?? ''} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
