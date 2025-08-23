import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // مثال بسيط: username/password ثابتين
        if (
          credentials?.username === process.env.ADMIN_USER &&
          credentials?.password === process.env.ADMIN_PASS
        ) {
          return { id: "1", name: process.env.ADMIN_NAME, email: process.env.ADMIN_USER };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // صفحة لوجين مخصصة
  },
};