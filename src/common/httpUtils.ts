import axios from 'axios';

const API_PREFIX = '/api';

export interface HttpResponse {
    statusCode: number;
    body: any;
}

export interface HttpSessionInfo {
    sessionId?: string;
    userId?: string;
}

const sessionInfo: HttpSessionInfo = {
    sessionId: window.sessionStorage.getItem('sessionId') || null,
    userId: window.sessionStorage.getItem('userId') || null
}

export function getSession(): HttpSessionInfo {
    return sessionInfo;
}

export function setSession(value?: HttpSessionInfo): void {
    if (!value) {
        sessionInfo.sessionId = null;
        sessionInfo.userId = null;
        window.sessionStorage.clear();
        return;
    }
    sessionInfo.sessionId = value.sessionId;
    sessionInfo.userId = value.userId;
    window.sessionStorage.setItem('sessionId', sessionInfo.sessionId);
    window.sessionStorage.setItem('userId', sessionInfo.userId);
}

function getHeaders() {
    const headers:Object = {
        'Accept': 'application/json'
    };
    if (sessionInfo.sessionId) {
        headers['X-Session-Id'] = sessionInfo.sessionId;
        headers['X-User-Id'] = sessionInfo.userId;
    }
    return headers;
}

export async function getJson(url: string): Promise<HttpResponse> {
    try {
        const res = await axios.get(API_PREFIX + url, { headers: getHeaders() });
        return {
            statusCode: res.status,
            body: res.data
        };
    }
    catch (ex) {
        if (!ex.response) {
            throw ex;
        }

        return {
            statusCode: ex.response.status,
            body: ex.response.data
        }
    }
}

export async function postJson(url: string, postData: any): Promise<HttpResponse> {
    try {
        const res = await axios.post(API_PREFIX + url, postData, { headers: getHeaders() });
        return {
            statusCode: res.status,
            body: res.data
        };
    }
    catch (ex) {
        if (!ex.response) {
            throw ex;
        }

        return {
            statusCode: ex.response.status,
            body: ex.response.data
        }
    }
}