import {IUserJson} from "../../components/users/Users";

export class UsersApi {
    private static readonly _users_url = '/api/users';

    private static checkStatus(response: Response): Promise<Response> {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        throw new Error(response.statusText);
    };

    static fetchUsers(): Promise<IUserJson[]> {
        return fetch(this._users_url)
            .then((response) => UsersApi.checkStatus(response))
            .then(response => response.json())
            .then((json) => json.users)
            .catch(error => {
                    return Promise.reject('Failed to retrieve users: ' + error)
                }
            );
    }

    static addUser(user: IUserJson): Promise<Response> {
        return fetch(this._users_url + '/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((response) => UsersApi.checkStatus(response))
            .catch(error => Promise.reject('There was an error saving the user: ' + error))

    }
}
