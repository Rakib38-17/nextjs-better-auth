import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';


const resetPasswordPage = () => {

    return (
        <div>
            <h2>Reset Password</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default resetPasswordPage;