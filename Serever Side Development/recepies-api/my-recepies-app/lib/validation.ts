export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RecipeValidationInput = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  tags: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: unknown) {
  return typeof email === "string" && emailPattern.test(email.trim());
}

export function validatePassword(password: unknown) {
  return typeof password === "string" && password.length >= 8;
}

export function validateRegisterInput(
  input: Record<string, unknown>,
): ValidationResult<RegisterInput> {
  const errors: Record<string, string> = {};
  const email = normalizedEmail(input.email);
  const password = stringValue(input.password);
  const name = stringValue(input.name);

  if (!email || !validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!validatePassword(password)) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!name) {
    errors.name = "Name is required.";
  }

  if (Object.keys(errors).length) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      email: email as string,
      password: password as string,
      name: name as string,
    },
  };
}

export function validateLoginInput(
  input: Record<string, unknown>,
): ValidationResult<LoginInput> {
  const errors: Record<string, string> = {};
  const email = normalizedEmail(input.email);
  const password = stringValue(input.password);

  if (!email || !validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      email: email as string,
      password: password as string,
    },
  };
}

export function validateRecipeInput(
  input: Record<string, unknown>,
): ValidationResult<RecipeValidationInput> {
  const errors: Record<string, string> = {};
  const title = stringValue(input.title);
  const description = stringValue(input.description);
  const ingredients = stringValue(input.ingredients);
  const instructions = stringValue(input.instructions);
  const cookingTime = positiveInteger(input.cookingTime);
  const servings = positiveInteger(input.servings);
  const tags = tagList(input.tags);

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!description) {
    errors.description = "Description is required.";
  }

  if (!ingredients) {
    errors.ingredients = "Ingredients are required.";
  }

  if (!instructions) {
    errors.instructions = "Instructions are required.";
  }

  if (!cookingTime) {
    errors.cookingTime = "Cooking time must be a positive whole number.";
  }

  if (!servings) {
    errors.servings = "Servings must be a positive whole number.";
  }

  if (!tags?.length) {
    errors.tags = "Add at least one tag.";
  }

  if (Object.keys(errors).length) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      title: title as string,
      description: description as string,
      ingredients: ingredients as string,
      instructions: instructions as string,
      cookingTime: cookingTime as number,
      servings: servings as number,
      tags: tags as string[],
    },
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizedEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : null;
}

function positiveInteger(value: unknown) {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : null;
}

function tagList(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  const tags = value.map((tag) =>
    typeof tag === "string" ? tag.trim().toLowerCase() : null,
  );

  if (tags.some((tag) => !tag)) {
    return null;
  }

  return Array.from(new Set(tags as string[]));
}
