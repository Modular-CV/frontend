import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from './Button'
import { Language } from '~/types'
import { AnimatePresence, motion } from 'motion/react'

type LanguageListProps = {
  languages: LanguageKey[]
  onListitemClick: (language: string) => void
}

const LanguageList = ({ languages, onListitemClick }: LanguageListProps) => {
  return languages.map((language) => (
    <motion.ul
      className="flex flex-col justify-center rounded-md border p-2 shadow-md w-fit absolute top-full mt-1 bg-white"
      key={language}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <li>
        <Button className="w-full" onClick={() => onListitemClick(language)}>
          {Language[language as LanguageKey]}
        </Button>
      </li>
    </motion.ul>
  ))
}

const LanguagePicker = () => {
  const { i18n } = useTranslation()
  const [isLanguageListHidden, setIsLanguageListHidden] = useState(true)
  const languageSwitchRef = useRef<HTMLDivElement>(null)

  const currentLanguage = i18n.language

  const languages = Object.keys(Language).reduce((languages, language) => {
    if (language !== currentLanguage)
      return languages.concat(language as LanguageKey)
    return languages
  }, [] as LanguageKey[])

  const handleLanguageList = () => {
    if (isLanguageListHidden) setIsLanguageListHidden((current) => !current)
    else setIsLanguageListHidden((current) => !current)
  }

  const handleListItemClick = (language: string) => {
    handleLanguageList()
    i18n.changeLanguage(language)
  }

  const handleDocumentClick = async (event: MouseEvent) => {
    if (!languageSwitchRef.current) return
    const languageSwitch = languageSwitchRef.current
    const target = event.target as Node
    if (!languageSwitch.contains(target)) handleLanguageList()
  }

  const handleDocumentClickEventListener = () => {
    if (!isLanguageListHidden)
      document.addEventListener('click', handleDocumentClick)
    else document.removeEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  useEffect(handleDocumentClickEventListener, [isLanguageListHidden])

  return (
    <div
      className="flex flex-col gap-2 items-center relative"
      ref={languageSwitchRef}
    >
      <Button
        onClick={handleLanguageList}
        className="underline underline-offset-2"
      >
        {Language[currentLanguage as LanguageKey]}
      </Button>
      <AnimatePresence>
        {!isLanguageListHidden && (
          <LanguageList
            languages={languages}
            onListitemClick={handleListItemClick}
            key="LanguageList"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguagePicker
