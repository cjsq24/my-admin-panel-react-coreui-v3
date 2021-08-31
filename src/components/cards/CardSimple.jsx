import {
   CButton,
   CCard,
   CCardBody,
   CCardFooter,
   CCardHeader,
   CCardImage,
   CCardText,
   CCardTitle
 } from '@coreui/react'

export default function CardSimple(props) {
   return (
      <CCard className="mb-4">
         <CCardHeader>
            <h4>{props.title}</h4>
         </CCardHeader>
         <CCardBody>
            {props.children}
         </CCardBody>
      </CCard>
   );
}