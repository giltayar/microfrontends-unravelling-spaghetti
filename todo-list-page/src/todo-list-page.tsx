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

export interface TodoListPageData {
  message: string
}

export interface TodoListPageProps {
  data: TodoListPageData
}

export function TodoListPage({data}: TodoListPageProps) {
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
