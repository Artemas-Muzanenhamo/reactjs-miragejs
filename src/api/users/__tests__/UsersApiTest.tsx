import {IUserJson} from "../../../components/users/Users";
import {UsersApi} from "../UsersApi";

describe('UsersApi', () => {
    function testUsersJson(): IUserJson[] {
        return [
            {
                name: 'Dummy',
                surname: 'Test'
            },
            {
                name: 'Hello',
                surname: 'World'
            }
        ];
    }

    function mockSuccessFetchPromise(users = testUsersJson()) {
        return Promise.resolve({
            json: () => Promise.resolve(users),
            status: 200
        });
    }

    it('renders fetched Users', () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockSuccessFetchPromise() as Promise<Response>);

        UsersApi.fetchUsers()
            .then(
                users => {
                    expect(fetch).toHaveBeenCalledWith('/api/users');
                    expect(users.length).toEqual(2);
                    expect(users).toEqual(testUsersJson())
                }
            );
    });
});
