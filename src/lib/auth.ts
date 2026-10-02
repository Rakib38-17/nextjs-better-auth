import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("better_auth_db");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({ 
    emailAndPassword: { 
    enabled: true, 
    requireEmailVerification: true,
    sendResetPassword: async ({user, url, token}, request) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: "Reset your password",
        html: `
        <h3>Reset your password</h3>
        Click the link to reset your password: ${url} 
        <p>if you didn't request this, please ignore this email.</p>
        `
      });
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({user, url}) => {
      void resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: "Verify your email",
        html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
      });
    },
    sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 7*24*3600 // 7 days in seconds
  },

  socialProviders : {
    google : {
      clientId : process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret : process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});