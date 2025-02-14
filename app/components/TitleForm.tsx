import React from 'react'
import Input from './Input'
import Button from './Button'
import { useForm, type SubmitHandler } from 'react-hook-form'

type Props = {
  onValid: SubmitHandler<TitleForm>
}

const TitleForm = ({ onValid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleForm>({ defaultValues: { formId: 'TITLE_FORM' } })

  const handleOnValid = (data: TitleForm) => {
    data.formId = 'TITLE_FORM'
    onValid(data)
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleOnValid)}
    >
      <Input
        label="Title"
        id="title"
        {...register('title', {
          required: { value: true, message: 'Required' },
        })}
        error={errors.title?.message}
        inputStyle="primary"
      />
      <Button buttonStyle="primary" className="w-full">
        Save
      </Button>
    </form>
  )
}

export default TitleForm
