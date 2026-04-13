const AUTH_STORAGE_KEY = "auth_session";
const BASE_URL = "http://localhost:8080";

type BackendErrorPayload = {
    message?: string;
    error?: string;
    details?: string;
    field?: string;
};

export class ApiError extends Error {
    status: number;
    statusText: string;
    endpoint: string;
    data?: unknown;

    constructor(message: string, status: number, statusText: string, endpoint: string, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.statusText = statusText;
        this.endpoint = endpoint;
        this.data = data;
    }
}

function shouldSetJsonContentType(options: RequestInit) {
    return Boolean(options.body) && !(options.body instanceof FormData);
}

async function parseResponseData(response: Response): Promise<unknown> {
    const contentType = response.headers.get("Content-Type") ?? "";

    if (contentType.includes("application/json")) {
        try {
            return await response.json();
        } catch {
            return undefined;
        }
    }

    try {
        const text = await response.text();
        return text || undefined;
    } catch {
        return undefined;
    }
}

function buildErrorMessage(status: number, statusText: string, data: unknown) {
    if (typeof data === "string" && data.trim().length > 0) {
        return data;
    }

    if (data && typeof data === "object") {
        const payload = data as BackendErrorPayload;
        if (payload.message) {
            return payload.message;
        }
        if (payload.error) {
            return payload.error;
        }
        if (payload.details) {
            return payload.details;
        }
    }

    return `Erro HTTP ${status}: ${statusText}`;
}

export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (isApiError(error)) {
        return error.message;
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallbackMessage;
}

export function getApiErrorField(error: unknown): string | undefined {
    if (!isApiError(error) || !error.data || typeof error.data !== "object") {
        return undefined;
    }

    const maybeField = (error.data as BackendErrorPayload).field;
    return typeof maybeField === "string" ? maybeField : undefined;
}

async function api(endpoint: string, options: RequestInit = {}) {
    // 1. Prepara os Headers
    const headers = new Headers(options.headers);


    if (shouldSetJsonContentType(options) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }



    // 2. Lógica do Interceptor (injetar o Token)
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (rawSession) {
        try {
            const session = JSON.parse(rawSession) as { token?: string };
            if (session.token) {
                headers.set("Authorization", `Bearer ${session.token}`);
            }
        } catch {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }

    // 3. Dispara a requisição com o Fetch nativo
    let response: Response;
    try {
        response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });
    } catch {
        throw new ApiError("Falha de conexao com o servidor.", 0, "NETWORK_ERROR", endpoint);
    }


    if (!response.ok) {
        const data = await parseResponseData(response);
        const message = buildErrorMessage(response.status, response.statusText, data);
        throw new ApiError(message, response.status, response.statusText, endpoint, data);
    }

    return response;
}

export default api;