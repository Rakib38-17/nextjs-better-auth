"use client";

import { signIn } from "@/lib/auth-client";
import { Envelope, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("form er data", data);

    const { data: resData, error } = await signIn.email({
      email: data.email as string,
      password: data.password as string,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log(resData, error);
  };

  return (
    <div className="flex justify-center flex-col gap-5 items-center my-5">
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}>
          <Label>Email</Label>
          <Input placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField 
        className="w-full max-w-[280px]" 
        name="password"
        isRequired
        minLength={8}        
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
          
          
          <InputGroup>           
            <InputGroup.Input
              className="w-full max-w-[280px]"
              type={isVisible ? "text" : "password"}             
            />
            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}>
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>  
                 
          </InputGroup>
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description> 
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
      <p><small>Forgot Password? <Link className="text-blue-500 hover:underline" href="/forgot-password">Click here</Link></small></p>
    </div>

  );
};

export default SignInPage;
