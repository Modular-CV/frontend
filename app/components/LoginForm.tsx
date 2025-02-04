import React, { useTransition } from 'react'
import Input from './Input'
import { emailRegex } from '~/utils'
import Button from './Button'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SpinnerSvg from '~/static/images/SpinnerSvg'

export type Props = {
  onValid: SubmitHandler<LoginForm>
}

const LoginForm = ({ onValid }: Props) => {
  const { t } = useTranslation()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({})

  const handleOnValid = (data: LoginForm) => {
    startTransition(async () => {
      await onValid(data)
    })
  }

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={handleSubmit(handleOnValid)}
      noValidate
    >
      <Input
        data-cy="email"
        label={t('loginForm.email')}
        placeholder="example@example.com"
        type="email"
        id="email"
        {...register('email', {
          required: { value: true, message: t('form.error.field.required') },
          pattern: {
            value: emailRegex,
            message: t('form.error.field.invalidEmail'),
          },
        })}
        error={errors.email?.message}
        inputStyle={errors.email ? 'error' : 'primary'}
      />
      <Input
        data-cy="password"
        label={t('loginForm.password')}
        placeholder="Account password"
        type="password"
        id="password"
        {...register('password', {
          required: { value: true, message: t('form.error.field.required') },
        })}
        error={errors.password?.message}
        inputStyle={errors.password ? 'error' : 'primary'}
      />
      <Button
        data-cy="submit"
        buttonStyle={isPending ? 'disabled' : 'primary'}
        disabled={isPending}
      >
        <div className="flex justify-center items-center relative">
          {!isPending ? t('loginForm.login') : t('loginForm.checking')}
          <span className="absolute opacity-20 right-0">
            {isPending && <SpinnerSvg />}
          </span>
        </div>
      </Button>
    </form>
  )
}

export default LoginForm
