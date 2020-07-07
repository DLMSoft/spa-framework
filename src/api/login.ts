import * as http from '../common/httpUtils';

export interface ILoginInput {
    userName: string;
    password: string;
    rememberPassword: boolean;
}

export async function userLogin(input: ILoginInput) {
    return await http.postJson('/sessions', input);
}

export async function getUserInfo(sessionId: string) {
    return await http.getJson('/sessions/' + sessionId);
}