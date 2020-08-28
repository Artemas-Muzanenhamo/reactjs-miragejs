import {IUserJson} from "../../../components/users/Users";
import {UsersApi} from "../UsersApi";

describe('UsersApi', () => {
    function finaliseTest(done: jest.DoneCallback) {
        jest.resetAllMocks();
        done();
    }

    function testUsersJson() {
        return {
            users: [
                {
                    name: 'Dummy',
                    surname: 'Test'
                },
                {
                    name: 'Hello',
                    surname: 'World'
                }
            ]
        };
    }

    function mockSuccessFetchPromise(users = testUsersJson()) {
        return Promise.resolve({
            json: () => Promise.resolve(users),
            status: 200
        });
    }

    function mockAddUserSuccessFetchPromise() {
        return Promise.resolve({
            json: () => Promise.resolve({}),
            status: 201
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
                    expect(users).toEqual(testUsersJson().users);

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

    it('adds a User and returns a status 201 CREATED', (done) => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockAddUserSuccessFetchPromise() as Promise<Response>);

        const user: IUserJson = {
            name: 'Hello',
            surname: 'World'
        };

        UsersApi.addUser(user)
            .then(
                response => {
                    expect(fetch).toHaveBeenCalledWith('/api/users/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    });
                    expect(response.status).toEqual(201);
                    finaliseTest(done);
                }
            );
    });
});
