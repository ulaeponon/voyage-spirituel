"use server";

import { auth } from "@/lib/auth";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "missing-fields" };
  }

  try {
    const response = await auth.api.signUpEmail({
      body: { name, email, password },
      asResponse: true,
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        return { error: "user-exists" };
      }

      if (errorData.code === "PASSWORD_TOO_SHORT") {
        return { error: "password-too-short" };
      }

      return { error: "generic" };
    }

    return { success: true };

  } catch (error) {
    return { error: "generic" };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "missing-credentials" };
  }

  try {
    const response = await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.code === "INVALID_EMAIL_OR_PASSWORD") {
        return { error: "invalid-credentials" };
      }

      return { error: "generic" };
    }

    return { success: true };

  } catch (error) {
    return { error: "generic" };
  }
}
