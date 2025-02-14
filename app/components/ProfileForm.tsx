import React from 'react'
import Button from './Button'
import Input from './Input'
import { useForm, type SubmitHandler } from 'react-hook-form'

type Props = {
  onValid: SubmitHandler<ProfileForm>
}

const ProfileForm = ({ onValid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({ defaultValues: {} })

  const handleOnValid = (data: ProfileForm) => {
    data.formId = 'PROFILE_FORM'
    onValid(data)
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleOnValid)}
    >
      <Input
        label="Full Name"
        id="fullName"
        {...register('fullName', {
          required: { value: true, message: 'Required' },
        })}
        error={errors.fullName?.message}
        inputStyle="primary"
      />
      <Input label="Job Title" id="jobTitle" {...register('jobTitle')} />
      <Input label="Email" id="email" {...register('email')} />
      <Input label="Phone" id="phone" {...register('phone')} />
      <Input label="Address" id="address" {...register('address')} />
      <Button buttonStyle="primary" className="w-full">
        Save
      </Button>
    </form>
  )
}

export default ProfileForm
