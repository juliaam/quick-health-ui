import { DashboardCard } from '@/components/dashboard-card'
import { User } from 'lucide-react'
import { useClinicalInformationStore } from '@/stores/useClinicalInformationStore'
import { RHFormInput } from '@/components/forms/rh-form-input'
import { Field } from './field'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { acessKeyForm, type AcessKeyFormValues } from '@/shared/forms/acess-key'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearch } from '@tanstack/react-router'
import { useError } from '@/shared/errors/errorHandler'
import { Button } from '@/components/ui/button'

export const AcessKey = () => {
  const methods = useForm<AcessKeyFormValues>({
    defaultValues: acessKeyForm.defaultValues,
    resolver: zodResolver(acessKeyForm.validationSchema),
  })

  return (
    <FormProvider {...methods}>
      <AcessKeyUI />
    </FormProvider>
  )
}

export const AcessKeyUI = () => {
  const { handleSubmit } = useFormContext<AcessKeyFormValues>()
  const clinicalInformationStore = useClinicalInformationStore()
  const { errorHandler } = useError()

  const { clinical_information_id } = useSearch({
    from: '/clinical-information',
  })

  const onSubmit = async (data: AcessKeyFormValues) => {
    try {
      await clinicalInformationStore.get(
        clinical_information_id,
        data.acess_key
      )
    } catch (error) {
      errorHandler(error)
    }
  }

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-6 rounded-2xl bg-white p-6 shadow-md"
      >
        <h2 className="text-center text-lg font-semibold">
          Informe sua chave de acesso
        </h2>
        <RHFormInput
          label="Chave de acesso"
          name="acess_key"
          className="bg-secondary/10 rounded-xl px-3 py-2"
        />
        <Button type="submit" className="w-full">
          Acessar
        </Button>
      </form>
    </div>
  )
}

export function ClinicalInformationView() {
  const clinicalStore = useClinicalInformationStore()
  const info = clinicalStore.data

  if (!info) {
    return <AcessKey />
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <DashboardCard
        className="max-w-4xl rounded-2xl shadow-lg"
        titleIcon={<User className="text-white" size={30} />}
        titleText="Informações clínicas"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 text-sm md:grid-cols-2">
          <Field label="Nome" value={info.name} />
          <Field label="Sobrenome" value={info.last_name} />
          <Field label="Gênero" value={info.gender_sex} />
          <Field label="Contato de emergência" value={info.emergency_contact} />
          <Field label="Tipo sanguíneo" value={info.blood_type} />
          <Field label="Medicamentos utilizados" value={info.medicines_used} />
          <Field label="Doenças" value={info.illness} />
          <Field label="Cirurgias realizadas" value={info.surgery} />
          <Field label="Alergias" value={info.allergy} />
        </div>
      </DashboardCard>
    </div>
  )
}
