import {IUserJson} from "../../../components/users/Users";
import {UsersApi} from "../UsersApi";

const ADD_USER_URL = '/api/users/user';
const GET_USERS_URL = '/api/users';

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

    function mockAddUserFailureFetchPromise() {
        return Promise.resolve({
            json: () => Promise.resolve({}),
            status: 400,
            statusText: 'Bad request while adding users'
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
                    expect(fetch).toHaveBeenCalledWith(GET_USERS_URL);
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
                    expect(fetch).toHaveBeenCalledWith(GET_USERS_URL);
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
                    expect(fetch).toHaveBeenCalledWith(ADD_USER_URL, {
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

    it('throws an error with an error message when adding a User fails', (done) => {
        jest.spyOn(global, 'fetch').mockImplementation(() => mockAddUserFailureFetchPromise() as Promise<Response>);

        const user: IUserJson = {
            name: 'Hello',
            surname: 'World'
        };

        UsersApi.addUser(user)
            .catch(
                (error) => {
                    expect(fetch).toHaveBeenCalledWith(ADD_USER_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    });
                    expect(error).toEqual('There was an error saving the user: Error: Bad request while adding users');

                    finaliseTest(done);
                }
            );
    });
});
