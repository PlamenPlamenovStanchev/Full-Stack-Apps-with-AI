import {
  validateEmail,
  validateLoginInput,
  validatePassword,
  validateRecipeInput,
  validateRegisterInput,
} from "@/lib/validation";

describe("validation", () => {
  it("validates email format", () => {
    expect(validateEmail("cook@example.com")).toBe(true);
    expect(validateEmail(" cook@example.com ")).toBe(true);
    expect(validateEmail("missing-at-symbol")).toBe(false);
    expect(validateEmail("cook@example")).toBe(false);
    expect(validateEmail(42)).toBe(false);
  });

  it("validates password length", () => {
    expect(validatePassword("password123")).toBe(true);
    expect(validatePassword("short")).toBe(false);
    expect(validatePassword(null)).toBe(false);
  });

  it("normalizes valid register input", () => {
    const result = validateRegisterInput({
      email: " AVA@EXAMPLE.COM ",
      password: "password123",
      name: " Ava ",
    });

    expect(result).toEqual({
      success: true,
      data: {
        email: "ava@example.com",
        password: "password123",
        name: "Ava",
      },
    });
  });

  it("reports invalid register input fields", () => {
    const result = validateRegisterInput({
      email: "bad",
      password: "short",
      name: " ",
    });

    expect(result.success).toBe(false);
    expect(result).toMatchObject({
      errors: {
        email: "Enter a valid email address.",
        password: "Password must be at least 8 characters.",
        name: "Name is required.",
      },
    });
  });

  it("validates login input", () => {
    expect(
      validateLoginInput({
        email: "MILO@EXAMPLE.COM",
        password: "password123",
      }),
    ).toEqual({
      success: true,
      data: {
        email: "milo@example.com",
        password: "password123",
      },
    });

    expect(validateLoginInput({ email: "bad", password: "" })).toMatchObject({
      success: false,
      errors: {
        email: "Enter a valid email address.",
        password: "Password is required.",
      },
    });
  });

  it("validates and normalizes recipe input", () => {
    const result = validateRecipeInput({
      title: " Pasta ",
      description: "Fast dinner",
      ingredients: "pasta, tomato",
      instructions: "Boil and toss",
      cookingTime: "20",
      servings: 2,
      tags: [" Pasta ", "quick", "pasta"],
    });

    expect(result).toEqual({
      success: true,
      data: {
        title: "Pasta",
        description: "Fast dinner",
        ingredients: "pasta, tomato",
        instructions: "Boil and toss",
        cookingTime: 20,
        servings: 2,
        tags: ["pasta", "quick"],
      },
    });
  });

  it("reports invalid recipe fields", () => {
    const result = validateRecipeInput({
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      cookingTime: 0,
      servings: "two",
      tags: [],
    });

    expect(result.success).toBe(false);
    expect(result).toMatchObject({
      errors: {
        title: "Title is required.",
        description: "Description is required.",
        ingredients: "Ingredients are required.",
        instructions: "Instructions are required.",
        cookingTime: "Cooking time must be a positive whole number.",
        servings: "Servings must be a positive whole number.",
        tags: "Add at least one tag.",
      },
    });
  });
});
