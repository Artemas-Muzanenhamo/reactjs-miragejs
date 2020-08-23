import {IUserJson} from "../../../components/users/Users";
import {UsersApi} from "../UsersApi";

describe('UsersApi', () => {
    function finaliseTest(done: jest.DoneCallback) {
        jest.resetAllMocks();
        done();
    }

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

    function mockFailedFetchPromise(users = testUsersJson()) {
        return Promise.resolve({
            json: () => Promise.resolve(users),
            status: 401,
            statusText: 'Not Authorised Dawg!'
        })
    }

    it('retrieves Users and status 200 OK', (done) => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockSuccessFetchPromise() as Promise<Response>);

        UsersApi.fetchUsers()
            .then(
                users => {
                    expect(fetch).toHaveBeenCalledWith('/api/users');
                    expect(users.length).toEqual(2);
                    expect(users).toEqual(testUsersJson());

                    finaliseTest(done);
                }
            );
    });

    it('throws an error with an error message when Users retrieval fails', (done) => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFailedFetchPromise() as Promise<Response>);

        UsersApi.fetchUsers()
            .catch(
                (error) => {
                    expect(fetch).toHaveBeenCalledWith('/api/users');
                    expect(error).toEqual('Failed to retrieve users: Error: Not Authorised Dawg!');

                    finaliseTest(done);
                }
            );
    });
});
