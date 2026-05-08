import {
  getJwtSecret,
  hashPassword,
  signAuthToken,
  verifyAuthToken,
  verifyPassword,
} from "@/lib/auth-core";

describe("auth core", () => {
  const originalSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = "unit-test-secret";
  });

  afterAll(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  it("hashes passwords and verifies correct and incorrect candidates", async () => {
    const hash = await hashPassword("password123");

    expect(hash).not.toBe("password123");
    expect(await verifyPassword("password123", hash)).toBe(true);
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("signs a JWT and verifies the expected user payload", () => {
    const token = signAuthToken({
      id: "user-1",
      email: "ava@example.com",
      isAdmin: false,
      name: "Ava",
    });
    const payload = verifyAuthToken(token);

    expect(payload).toMatchObject({
      sub: "user-1",
      email: "ava@example.com",
      isAdmin: false,
      name: "Ava",
    });
  });

  it("throws when JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET;

    expect(() => getJwtSecret()).toThrow("JWT_SECRET is not set");
  });

  it("rejects tokens signed with another secret", () => {
    const token = signAuthToken({
      id: "user-1",
      email: "ava@example.com",
      isAdmin: false,
      name: "Ava",
    });

    process.env.JWT_SECRET = "different-secret";

    expect(() => verifyAuthToken(token)).toThrow();
  });
});
