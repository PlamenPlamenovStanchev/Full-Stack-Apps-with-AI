import { apiFetch } from "@/lib/client-api";

describe("client API wrapper", () => {
  afterEach(() => {
    jest.resetAllMocks();
    Reflect.deleteProperty(globalThis, "fetch");
  });

  it("mocks fetch and sends bearer tokens without touching the network", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);
    globalThis.fetch = fetchMock;

    await expect(
      apiFetch<{ ok: boolean }>("/api/example", {
        method: "POST",
        token: "test-token",
        body: JSON.stringify({ hello: "world" }),
      }),
    ).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/example",
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Headers),
      }),
    );

    const headers = fetchMock.mock.calls[0][1]?.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer test-token");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("uses API error messages from mocked failed responses", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: "Bad Request",
      json: async () => ({
        error: {
          message: "Recipe title is required.",
        },
      }),
    } as Response);

    await expect(apiFetch("/api/recipes")).rejects.toThrow(
      "Recipe title is required.",
    );
  });
});
