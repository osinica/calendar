import { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { GitHubStrategy } from "remix-auth-github";
import { prisma } from "~/helper/prisma.server";

export const authenticator = new Authenticator<User>(sessionStorage);

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env["GITHUB_CLIENT_ID"]!,
    clientSecret: process.env["GITHUB_CLIENT_SECRET"]!,
    callbackURL: process.env["GITHUB_CALLBACK"]!,
  },
  async ({ accessToken, extraParams, profile }) => {
    return await prisma.user.upsert({
      create: { mail: profile.emails[0].value, name: profile.displayName },
      update: { name: profile.displayName },
      where: { mail: profile.emails[0].value },
    });
  }
);

authenticator.use(githubStrategy);
