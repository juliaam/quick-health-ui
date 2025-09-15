import {
  useFormContext,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { SelectApp, type Option } from '../ui/select-app'

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  type?: string
  options: Option[]
}

export function RHFormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  options,
  placeholder,
  required = false,
  disabled = false,
}: FormSelectProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-600">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <SelectApp
              onValueChange={field.onChange}
              options={options}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            ></SelectApp>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
