import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    User: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      created_at: Date;
      update_at: Date;
    };
  }
}
