import {IUserJson} from "../../components/users/Users";
import {MirageJsServer} from "../../mirageJsServer";

MirageJsServer.mirageJsServer();

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
            .then((response) => response.users)
            .catch(error => {
                    return Promise.reject('Failed to retrieve users: ' + error)
                }
            );
    }

    static addUser(user: IUserJson): Promise<Response> {
        return fetch('/api/users/user', {
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
