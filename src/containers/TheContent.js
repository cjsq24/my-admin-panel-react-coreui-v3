import React from 'react'
import { CContainer, CFade } from '@coreui/react'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  return (
    <main className="c-main">
      <CContainer fluid>
          <CFade>
            {props.children}
          </CFade>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
