import {IUserJson} from "../../components/users/Users";

export class UsersApi {

    private static checkStatus(response: Response): Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        throw new Error(response.statusText);
    };

    static fetchUsers(): Promise<IUserJson[]> {
        return fetch('/api/users')
            .then((response) => UsersApi.checkStatus(response))
            .then(response => response.json())
            .catch(error => {
                    return Promise.reject('Failed to retrieve users: ' + error)
                }
            );
    }
}
