import { User } from "../../types/User";
import { client } from "../../utils/fetch";

export function fetchUser(email: string, password: string) {
    return client.post<User>('/users/login', { email, password });
}