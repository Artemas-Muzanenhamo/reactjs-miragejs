interface UserJson {
    name: string
    surname: string
}

export class UsersService {
    public getAllUsers(): Promise<UserJson[]> {
        return fetch('/api/users')
            .then(response => response.json())
            .catch(error => console.error('Failed to retrieve users: ', error));
    }
}
