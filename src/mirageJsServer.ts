import {Request, Server, Model} from "miragejs";
import {Registry} from "miragejs/-types";

const UserModel = Model.extend({
    name: '',
});

export class MirageJsServer {
    public static mirageJsServer(): Server<Registry<{user: typeof UserModel}, {}>> {
        return new Server({
            models: {
                user: Model
            },
            seeds(server: Server): void {
                // https://github.com/miragejs/miragejs/pull/525 until this is fixed...
                // @ts-ignore
                server.create('user', {name: 'Artemas', surname: 'Prime'});
                // @ts-ignore
                server.create('user', {name: 'LeBron', surname: 'James'});
                // @ts-ignore
                server.create('user', {name: 'Lara', surname: 'Croft'});
            },
            routes(): void {
                this.namespace = 'api';

                this.get('/users', (schema: any) => {
                    return schema.users.all();
                });

                this.post('/users/user', (schema: any, request: Request) => {
                    let attributes = JSON.parse(request.requestBody);
                    schema.users.create(attributes);
                    return {};
                });
            },
        });
    }
}
