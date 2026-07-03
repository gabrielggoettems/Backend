

const BASE_URL = "http://localhost:3000" 


function defaultHeaders(): HeadersInit {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}


async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text().catch(() => `HTTP ${res.status}`)
    throw new Error(message || `HTTP ${res.status}`)
  }
  
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}


function toQueryString(params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return ""
  const entries = Object.entries(params).map(([k, v]) => [k, String(v)])
  return "?" + new URLSearchParams(entries).toString()
}

export const Service = {
  
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

  
  async DELETE<TResponse = void>(path: string): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: "DELETE",
      headers: defaultHeaders(),
    })
    return handleResponse<TResponse>(res)
  },
}
