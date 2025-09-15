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
  useFormField,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  type?: string
  className?: string
}

export function RHFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder = '',
  required = false,
  disabled = false,
  type = 'text',
  className,
}: FormInputProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>()
  const { formItemId } = useFormField()

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
            <Input
              id={formItemId}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              type={type}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
