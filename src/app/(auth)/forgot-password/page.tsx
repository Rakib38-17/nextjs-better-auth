"use client";
import { requestPasswordReset } from "@/lib/auth-client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";


const handleforgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const userData = Object.fromEntries(formData.entries());

  console.log("userData from forgot password form", userData);

  const resData = await requestPasswordReset({
    email: userData.email as string,
    redirectTo : '/reset-password'
  });
  toast.success("Password reset email sent! Please check your inbox.");
  console.log("resData from forgot password", resData);
} 

const ForgotPasswordPage = () => {
    return (
        <>
         <h2>Forgot Password</h2>
    <Form className="flex w-96 flex-col gap-4" onSubmit={handleforgotPasswordSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
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
        </>
       
    );
};

export default ForgotPasswordPage;