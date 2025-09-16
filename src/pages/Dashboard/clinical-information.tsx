/* eslint-disable react-hooks/exhaustive-deps */
import { DashboardCard } from '@/components/dashboard-card'
import { RHFormInput } from '@/components/forms/rh-form-input'
import { RHFormSelect } from '@/components/forms/rh-form-select'
import { RHFormTextarea } from '@/components/forms/rh-form-textarea'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { BloodTypeEnum } from '@/shared/enums/BloodTypeEnum'
import { GenderSexEnum } from '@/shared/enums/GenderSexEnum'
import { useError } from '@/shared/errors/errorHandler'
import {
  clinicalInformationForm,
  type ClinicalInformationFormValues,
} from '@/shared/forms/clinical-information'
import { useUserStore } from '@/stores/useUserStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Trash, User } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

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
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<ClinicalInformationFormValues>()
  const userStore = useUserStore()
  const { errorHandler } = useError()
  const isEdit = !!userStore.data.clinical_information

  console.log(userStore.data.clinical_information)

  const onSubmit = async (data: ClinicalInformationFormValues) => {
    try {
      if (!isEdit) await userStore.createClinicalInformation(data)
      if (isEdit) await userStore.updateClinicalInformation(data)
      toast.success('Informações clínicas alteradas com sucesso')
    } catch (error) {
      errorHandler(error)
    }
  }

  const onDelete = async () => {
    try {
      await userStore.deleteClinicalInformation()
      reset()
      setValue('name', userStore.data.name)

      toast('Informação clínica excluída com sucesso!')
    } catch (error) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    if (isEdit) {
      const formData = {
        name: userStore.data.name,
        last_name: userStore.data.clinical_information?.last_name || '',
        gender_sex:
          userStore.data.clinical_information?.gender_sex || undefined,
        emergency_contact:
          userStore.data.clinical_information?.emergency_contact || '',
        blood_type:
          userStore.data.clinical_information?.blood_type || undefined,
        allergy: userStore.data.clinical_information?.allergy || '',
        medicines_used:
          userStore.data.clinical_information?.medicines_used || '',
        illness: userStore.data.clinical_information?.illness || '',
        surgery: userStore.data.clinical_information?.surgery || '',
      }

      reset(formData)
      return
    }

    setValue('name', userStore.data.name)
  }, [userStore.data, reset])

  useEffect(() => {
    const getUser = async () => {
      await userStore.get()
    }
    getUser()
  }, [])

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
          options={Object.keys(BloodTypeEnum.enum).map((bt) => {
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
      <div className="mt-4 flex justify-end gap-2">
        <Button type="button" variant="destructive" onClick={onDelete}>
          Apagar <Trash />
          {userStore.loading && <Spinner />}
        </Button>
        <Button>
          <Save />
          Salvar
          {isSubmitting && <Spinner />}
        </Button>
      </div>
    </form>
  )
}
