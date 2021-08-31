import React, { Suspense } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const loading = (
  <div className="pt-3 text-center">
    <p>Cargando...</p>
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <Suspense fallback={loading}>
            <TheContent {...props} />
          </Suspense>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
