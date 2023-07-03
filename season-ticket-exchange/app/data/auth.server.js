import { prisma } from "./database.server";
import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function signup({ email, password }) {
  // Check if user email exists
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already."
    );
    error.status = 422;
    throw error;
  }

  // hash pw
  const passwordHash = await hash(password, 12);

  // store user in db
  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
  return createUserSession(user.id, "/");
}

export async function login({ email, password }) {
  //check user exists
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error("Email Address Was Not Found");
    error.status = 401;
    error.message = "Email Address Was Not Found";
    throw error;
  }

  // check the password is correct
  const passwordCorrect = await compare(password, existingUser.password);
  if (!passwordCorrect) {
    const error = new Error("Password is incorrect.");
    error.status = 401;
    error.message = "Password is incorrect.";
    throw error;
  }
  //create cookie and return session
  return createUserSession(existingUser.id, "/");
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/auth", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
  //   sessionStorage.destroySession(session);
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
  return userId;
}

export async function getUserCount() {
  const userCount = await prisma.user.count({});
  return userCount;
}

export async function updateUserProfile(id, profileData) {
  try {
    const userProfile = await prisma.user.update({
      where: { id },
      data: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        paypal: profileData.paypal,
        zelle: profileData.zelle,
        venmo: profileData.venmo,
        section: profileData.section,
        row: profileData.row,
        seats: profileData.seats,
      },
    });
    return userProfile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user profile.");
  }
}

export async function verifySeller(id, profileData) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        verified: profileData.verified,
      },
    });
    redirect("/mytickets");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to verify user as seller");
  }
}

export async function getUserProfile(id) {
  try {
    const profile = await prisma.user.findFirst({
      where: { id },
    });
    return profile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user profile.");
  }
}
