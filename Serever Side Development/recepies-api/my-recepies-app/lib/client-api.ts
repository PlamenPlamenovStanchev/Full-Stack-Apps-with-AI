export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
};

export type AdminUser = User & {
  createdAt: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  tags: string[];
  photoUrl: string | null;
  dateCreated: string;
  userId: string;
  user?: {
    id: string;
    name: string;
  };
};

export type RecipeInput = {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  tags: string[];
};

export type RecipeListResponse = {
  data: Recipe[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

type AuthResponse = {
  user: User;
  token: string;
};

type ApiErrorBody = {
  error?: {
    message?: string;
  };
};

export const authTokenStorageKey = "recipes_api_token";

export function getStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(authTokenStorageKey);
}

export function storeToken(token: string) {
  window.localStorage.setItem(authTokenStorageKey, token);
}

export function clearStoredToken() {
  window.localStorage.removeItem(authTokenStorageKey);
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
) {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const body = (await response.json()) as ApiErrorBody;
      message = body.error?.message ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(email: string, password: string, name: string) {
  return apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export async function logout() {
  await apiFetch<{ message: string }>("/api/auth/logout", { method: "POST" });
  clearStoredToken();
}

export function getMe(token: string) {
  return apiFetch<{ user: User }>("/api/auth/me", { token });
}

export function getRecipes(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  tag?: string;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("pageSize", String(params.pageSize ?? 10));

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.tag) {
    searchParams.set("tag", params.tag);
  }

  return apiFetch<RecipeListResponse>(`/api/recipes?${searchParams}`);
}

export function getAllRecipes() {
  return getRecipes({ page: 1, pageSize: 50 }).then(async (firstPage) => {
    const pages = [firstPage];

    for (let page = 2; page <= firstPage.pagination.totalPages; page += 1) {
      pages.push(await getRecipes({ page, pageSize: 50 }));
    }

    return pages.flatMap((page) => page.data);
  });
}

export function getRecipe(id: string) {
  return apiFetch<{ recipe: Recipe }>(`/api/recipes/${id}`);
}

export function createRecipe(input: RecipeInput, token: string) {
  return apiFetch<{ recipe: Recipe }>("/api/recipes", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function updateRecipe(id: string, input: RecipeInput, token: string) {
  return apiFetch<{ recipe: Recipe }>(`/api/recipes/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(input),
  });
}

export function deleteRecipe(id: string, token: string) {
  return apiFetch<{ message: string }>(`/api/recipes/${id}`, {
    method: "DELETE",
    token,
  });
}

export function uploadRecipePhoto(id: string, file: File, token: string) {
  const formData = new FormData();
  formData.set("photo", file);

  return apiFetch<{ photoUrl: string }>(`/api/recipes/${id}/photo`, {
    method: "POST",
    token,
    body: formData,
  });
}

export function removeRecipePhoto(id: string, token: string) {
  return apiFetch<{ photoUrl: null }>(`/api/recipes/${id}/photo`, {
    method: "DELETE",
    token,
  });
}

export function getAdminRecipes(token: string) {
  return apiFetch<{ recipes: Recipe[] }>("/api/admin/recipes", { token });
}

export function updateAdminRecipe(
  id: string,
  input: RecipeInput,
  token: string,
) {
  return apiFetch<{ recipe: Recipe }>(`/api/admin/recipes/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(input),
  });
}

export function deleteAdminRecipe(id: string, token: string) {
  return apiFetch<{ message: string }>(`/api/admin/recipes/${id}`, {
    method: "DELETE",
    token,
  });
}

export function getAdminUsers(token: string) {
  return apiFetch<{ users: AdminUser[] }>("/api/admin/users", { token });
}

export function updateAdminUser(
  id: string,
  input: { name: string; isAdmin: boolean },
  token: string,
) {
  return apiFetch<{ user: AdminUser }>(`/api/admin/users/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(input),
  });
}

export function deleteAdminUser(id: string, token: string) {
  return apiFetch<{ message: string }>(`/api/admin/users/${id}`, {
    method: "DELETE",
    token,
  });
}
