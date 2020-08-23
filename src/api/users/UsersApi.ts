import {IUserJson} from "../../components/users/Users";

export class UsersApi {
    static fetchUsers(): Promise<IUserJson[]> {
        return fetch('/api/users')
            .then(response => response.json())
            .catch(error => console.error('Failed to retrieve users: ', error));
    }
}
