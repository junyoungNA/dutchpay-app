import { ReactNode } from 'react';
import { Form, Button } from 'react-bootstrap';

interface IPOverlayFormProps {
    children: ReactNode,
    handleSubmit: (e : React.FormEvent<HTMLFormElement>) => void;
}

const OverlayForm  = ({ children, handleSubmit }: IPOverlayFormProps) => {
    return (
        <Form onSubmit={handleSubmit}>
                {children}
            <Button type='submit'>저장하기</Button>
        </Form>
    )
}


export default OverlayForm
