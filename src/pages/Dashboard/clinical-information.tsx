/* eslint-disable react-refresh/only-export-components */
import { DashboardCard } from '@/components/dashboard-card'
import { RHFormInput } from '@/components/forms/rh-form-input'
import { RHFormSelect } from '@/components/forms/rh-form-select'
import { RHFormTextarea } from '@/components/forms/rh-form-textarea'
import { Button } from '@/components/ui/button'
import { GenderSexEnum } from '@/enums/GenderSexEnum'
import {
  clinicalInformationForm,
  type ClinicalInformationFormValues,
} from '@/forms/clinical-information'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, User } from 'lucide-react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

export const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const ClinicalInformation = () => {
  return (
    <DashboardCard
      titleIcon={<User color="white" size={30} />}
      titleText="Informações clínicas"
    >
      <ClinicalInformationForm />
    </DashboardCard>
  )
}

export const ClinicalInformationForm = () => {
  const methods = useForm<ClinicalInformationFormValues>({
    defaultValues: clinicalInformationForm.defaultValues,
    resolver: zodResolver(clinicalInformationForm.validationSchema),
  })

  return (
    <FormProvider {...methods}>
      <ClinicalInformationUI />
    </FormProvider>
  )
}

export const ClinicalInformationUI = () => {
  const { handleSubmit } = useFormContext<ClinicalInformationFormValues>()

  const onSubmit = async () => {}
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-2 gap-x-16 gap-y-4">
        <RHFormInput name="name" label="Nome" />
        <RHFormInput name="last_name" label="Sobrenome" />
        <RHFormSelect
          name="gender_sex"
          label="Gênero"
          options={Object.keys(GenderSexEnum.enum).map((gender) => ({
            label: GenderSexEnum.getLabel(
              gender as keyof typeof GenderSexEnum.enum
            ),
            value: gender,
          }))}
        />
        <RHFormInput name="emergency_contact" label="Contato de emergência" />
        <RHFormSelect
          name="blood_type"
          label="Tipo sanguíneo"
          options={bloodTypes.map((bt) => {
            return {
              label: bt,
              value: bt,
            }
          })}
        />
      </div>
      <div className="mt-16 grid grid-cols-2 gap-x-16 gap-y-4">
        <RHFormTextarea name="medicines_used" label="Medicamentos utilizados" />
        <RHFormTextarea name="illness" label="Doenças" />
        <RHFormTextarea name="surgery" label="Cirurgias realizadas" />
        <RHFormTextarea name="allergy" label="Alergias" />
      </div>
      <Button className="mt-4 self-end">
        <Save />
        Salvar
      </Button>
    </form>
  )
}
