import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     return user.rows[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }),
    Apple({ clientId: process.env.AUTH_APPLE_ID, clientSecret: process.env.AUTH_APPLE_SECRET }),
    //   Credentials({
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //       if (parsedCredentials.success) {
    //         const { email, password } = parsedCredentials.data;
    //         const user = await getUser(email);
    //         if (!user) return null;
    //         const passwordsMatch = await bcrypt.compare(password, user.password);

    //         if (passwordsMatch) return user;
    //       }

    //       console.log('Invalid credentials');
    //       return null;
    //   },
    // }),
  ],
});