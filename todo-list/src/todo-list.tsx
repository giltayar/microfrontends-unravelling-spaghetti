import React from 'react'
import {Helmet} from 'react-helmet'
import {useTranslation} from './localization/translation.js'
import {
  BioAppBase,
  BioAppBar,
  BioAppBarMenu,
  BioMainMenu,
  BioAppFooter,
} from '@roundforest/bio-organisms'

export interface TodoListData {
  message: string
}

export interface TodoListProps {
  data: TodoListData
}

export function TodoList({data}: TodoListProps) {
  const strings = useTranslation()

  return (
    <BioAppBase>
      <Helmet title={strings.Page.title} />

      <BioAppBar sticky accented>
        <BioAppBarMenu data-testid="app-bar-menu">
          <BioMainMenu />
        </BioAppBarMenu>
      </BioAppBar>
      <h1>{data.message}</h1>
      <BioAppFooter />
    </BioAppBase>
  )
}
