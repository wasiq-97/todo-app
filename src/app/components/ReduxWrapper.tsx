'use client'
import { persistor, store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

type Props = {
    children:React.ReactNode
}

const ReduxWrapper = (props: Props) => {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            {props.children}
        </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper