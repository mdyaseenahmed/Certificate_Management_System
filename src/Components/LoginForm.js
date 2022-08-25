import React from 'react';
import Base from '../Core/Base';

const formUI = <div>
    <h3>Enter the below details:</h3>
</div>

const LoginForm = () => {
    return(
        <Base title="Certificate Management System" description="Welcome to Login Page.!">
            {formUI}
        </Base>
    )
}

export default LoginForm;