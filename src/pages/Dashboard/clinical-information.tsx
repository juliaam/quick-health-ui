import { DashboardCard } from '@/components/dashboard-card'
import { RHFormInput } from '@/components/forms/rh-form-input'
import { RHFormSelect } from '@/components/forms/rh-form-select'
import { RHFormTextarea } from '@/components/forms/rh-form-textarea'
import {
  clinicalInformationForm,
  type ClinicalInformationFormValues,
} from '@/forms/clinical-information'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'lucide-react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

export const ClinicalInformation = () => {
  return (
    <DashboardCard
      titleIcon={<User size={30} />}
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <RHFormInput name="name" label="Nome" />
        <RHFormInput name="last_name" label="Sobrenome" />
        <RHFormSelect name="gender_sex" label="Gênero" options={[]} />
        <RHFormInput name="emergency_contact" label="Contato de emergência" />
        <RHFormSelect name="blood_type" label="Tipo sanguíneo" options={[]} />
      </div>
      <div className="">
        <RHFormTextarea name="medicines_used" label="Medicamentos utilizados" />
        <RHFormTextarea name="illness" label="Doenças" />
        <RHFormTextarea name="surgery" label="Cirurgias realizadas" />
        <RHFormTextarea name="allergy" label="Alergias" />
      </div>
    </form>
  )
}
