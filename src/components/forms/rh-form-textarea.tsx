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
import { Textarea } from '../ui/textarea'

type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  type?: string
}

export function RHFormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder = '',
  required = false,
  disabled = false,
}: FormTextareaProps<TFieldValues, TName>) {
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
            <Textarea
              id={formItemId}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
