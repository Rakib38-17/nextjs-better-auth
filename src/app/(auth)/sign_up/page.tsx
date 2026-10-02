"use client";

import { signIn, signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";


// // /api/auth/sign-up/email/route.ts (or similar)
// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     // Your logic here (e.g., db.user.create)
//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error("Sign-up error:", error); // This will show in your terminal
//     return new Response(
//       JSON.stringify({ message: error.message || "Internal Server Error" }), 
//       { status: 500 }
//     );
//   }
// }

const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData.entries());

  console.log("data from the form", data);

const { data: resData, error } = await signUp.email({
  name: data.name as string,
  email: data.email as string,
  password: data.password as string ,
});

console.log(resData, error);

};

const handleGoogleSignUp = async () => {
  const resData = await signIn.social({
    provider : "google",
  })
  console.log("resData from google sign up", resData);
}

const SignUpPage = () => {
  return (
    <>
      <div className = "flex justify-center my-20">
      <Form
        className="flex w-96 flex-col gap-4"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={onSubmit}>

         <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Name</Label>
                <Input placeholder="Enter your name" variant="secondary" />
                <FieldError />
            </TextField>   
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
          }}>
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit">
           
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
      
    </div>
    <p> OR</p>

      <Button  variant="secondary" onClick={handleGoogleSignUp}>
        SignUp with google
      </Button>
    </>
  
  );
};

export default SignUpPage;
