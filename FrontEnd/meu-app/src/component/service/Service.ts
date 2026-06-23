// Service.ts — cliente HTTP genérico
// Uso: Service.GET("api/users", { page: 1 })
//      Service.POST("api/users", { nome: "Ana" })
//      Service.PUT("api/users/42", { nome: "Ana Lima" })
//      Service.PATCH("api/users/42", { nome: "Ana Lima" })
//      Service.DELETE("api/users/42")

const BASE_URL = "http://localhost:3000"

// Cabeçalhos padrão enviados em toda requisição
function defaultHeaders(): HeadersInit {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// Trata a resposta: lança erro se status >= 400
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`)
    throw new Error(message || `HTTP ${res.status}`)
  }
  // 204 No Content não tem corpo
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// Converte objeto de params em query string: ?page=1&limit=10
function toQueryString(params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return ""
  const entries = Object.entries(params).map(([k, v]) => [k, String(v)])
  return "?" + new URLSearchParams(entries).toString()
}

export const Service = {
  // GET — parâmetros viram query string na URL
  async GET<TResponse>(
    path: string,
    params?: Record<string, unknown>
  ): Promise<TResponse> {
    const url = `${BASE_URL}/${path}${toQueryString(params)}`
    const res = await fetch(url, {
      method: "GET",
      headers: defaultHeaders(),
    })
    return handleResponse<TResponse>(res)
  },

  // POST — parâmetros vão no corpo (body)
  async POST<TBody, TResponse>(
    path: string,
    body?: TBody
  ): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      headers: defaultHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    return handleResponse<TResponse>(res)
  },

  // PUT — substitui o recurso inteiro
  async PUT<TBody, TResponse>(
    path: string,
    body?: TBody
  ): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "PUT",
      headers: defaultHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })
    return handleResponse<TResponse>(res)
  },

  // PATCH — atualiza só os campos enviados
  async PATCH<TBody extends object, TResponse>(
    path: string,
    body?: Partial<TBody>
  ): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "PATCH",
      headers: defaultHeaders(),
      body: body ? JSON.stringify(body) : undefined,	
    })
    return handleResponse<TResponse>(res)
  },

  // DELETE — sem corpo, só a URL com o id
  async DELETE<TResponse = void>(path: string): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "DELETE",
      headers: defaultHeaders(),
    })
    return handleResponse<TResponse>(res)
  },
}
