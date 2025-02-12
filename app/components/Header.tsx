import React, { Fragment, useEffect, useRef, useState } from 'react'
import UserSvg from '~/static/images/UserSvg'
import Button from './Button'
import { AnimatePresence, motion } from 'motion/react'
import CloseSvg from '~/static/images/CloseSvg'
import LanguagePicker from './LanguagePicker'
import LogoutSvg from '~/static/images/LogoutSvg'
import apiCall from '~/utils/api'
import { useNavigate } from 'react-router'

export type HeaderProps = {
  userEmail?: string
}

export type ModalProps = {
  userEmail: string | undefined
  isOpen: boolean
  modalHandler: () => void
}

const Modal = ({ isOpen, modalHandler, userEmail }: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const navigator = useNavigate()

  const handleDocumentClick = (event: MouseEvent) => {
    if (!contentRef.current) return
    const target = event.target as Node
    if (!contentRef.current.contains(target)) modalHandler()
  }

  const handleLogout = async () => {
    await apiCall.logout()
    await navigator('/login')
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick)
      document.body.classList.add('overflow-hidden')
    } else {
      document.removeEventListener('click', handleDocumentClick)
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.removeEventListener('click', handleDocumentClick)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="backdrop-blur-sm size-full absolute z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="border-black border size-full rounded-xl p-4 bg-white bg-opacity-85"
            initial={{ y: '100%' }}
            animate={{ y: '10%' }}
            exit={{ y: '100%' }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            ref={contentRef}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center">
                <div
                  className="absolute size-8 right-0 mr-5"
                  onClick={modalHandler}
                >
                  <CloseSvg />
                </div>
                <h2 className="text-lg">You</h2>
              </div>
              <hr />
              <div className="flex flex-col gap-5">
                <LanguagePicker />
                <div className="flex items-center gap-5">
                  <div className="size-14">
                    <UserSvg />
                  </div>
                  <span>{userEmail}</span>
                </div>
                <div className="flex">
                  <Button onClick={handleLogout}>
                    <div className="flex gap-3 items-center">
                      <div className="size-5">
                        <LogoutSvg />
                      </div>
                      Logout
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Header = ({ userEmail }: HeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projectName = import.meta.env.VITE_PROJECT_NAME

  const trimmedUserEmail = userEmail?.split('@')[0]

  const handleModal = () => {
    setIsModalOpen((value) => !value)
  }

  return (
    <Fragment>
      <Modal
        isOpen={isModalOpen}
        modalHandler={handleModal}
        userEmail={userEmail}
      />
      <header className="flex justify-center p-2 border-b bg-gray-100">
        <div className="container flex justify-between items-center">
          <h1 className="text-xl">
            <a href="/">{projectName}</a>
          </h1>
          <div className="flex items-center gap-3">
            <Button
              className="h-9 flex items-center gap-3"
              onClick={handleModal}
            >
              <span>{trimmedUserEmail}</span>
              <UserSvg />
            </Button>
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Header
