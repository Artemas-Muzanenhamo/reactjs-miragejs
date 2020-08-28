import {Request, Server, Model} from "miragejs";
import {IUserJson} from "./components/users/Users";
import {Registry} from "miragejs/-types";

const UserModel = Model.extend({
    name: 'hello',
});

export class MirageJsServer {
    private static mockedUsers = (): IUserJson[] => [
        {
            name: 'Artemas',
            surname: 'Muza'
        }, {
            name: 'LeBron',
            surname: 'James'
        }, {
            name: 'Lara',
            surname: 'Croft'
        }
    ];

    public static mirageJsServer(): Server<Registry<{user: typeof UserModel}, {}>> {
        return new Server({
            models: {
                user: Model
            },
            seeds(server: Server): void {
                server.create('user',
                    {
                        modelName: 'user',
                        name: 'Artemas',
                        surname: 'Muza'
                    }
                    );
                server.create('user', {modelName: 'user', name: 'LeBron', surname: 'James'});
                server.create('user', {modelName: 'user', name: 'Lara', surname: 'Croft'});
            },
            routes(): void {
                this.namespace = 'api';

                this.get('/users', (schema: any) => {
                    debugger
                    return schema.users.all();
                });

                this.post('/users/user', (schema: any, request: Request) => {
                    let attributes = JSON.parse(request.requestBody);
                    schema.users.create(attributes);
                    debugger
                    return {};
                });
            },
        });
    }
}
