import { ReactNode } from 'react'
import { Form } from 'react-bootstrap'

interface IPOverlayFormGroupProps {
    children: ReactNode,
}


const OverlayFormGroup = ({children} : IPOverlayFormGroupProps) => {
    return (
        <Form.Group>
            {children}
        </Form.Group>
    )
}

export default OverlayFormGroup
