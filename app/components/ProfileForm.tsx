import React from 'react'
import Button from './Button'
import Input from './Input'

const ProfileForm = () => {
  return (
    <form className="flex flex-col gap-5">
      <Input label="Full Name" name="full_name" id="full_name" />
      <Input label="Job Title" name="job_title" id="job_title" />
      <Input label="Email" name="email" id="email" />
      <Input label="Phone" name="phone" id="phone" />
      <Input label="Address" name="address" id="address" />
      <Button buttonStyle="primary" className="w-full">
        Save
      </Button>
    </form>
  )
}

export default ProfileForm
