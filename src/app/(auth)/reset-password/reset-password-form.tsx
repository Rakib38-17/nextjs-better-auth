'use client'

import { useSearchParams } from 'next/navigation';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import { resetPassword } from '@/lib/auth-client';

const ResetPasswordForm = () => {
     const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("data from reset password form", data);

        const resData = await resetPassword({            
            newPassword: data.password as string,
            token: token as string
        });
        console.log("resData from reset password", resData);
        toast.success("Password reset successful! You can now sign in with your new password.");
    }

    return (
        <div>
             <Form className="flex w-96 flex-col gap-4" onSubmit={handleResetPassword}>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
        </div>
    );
};

export default ResetPasswordForm;