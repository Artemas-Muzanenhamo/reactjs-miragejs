import {Server} from "miragejs";
import {IUserJson} from "./components/users/Users";

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

        public static mirageJsServer(): Server {
            return new Server({
                routes(): void {
                    this.namespace = 'api';

                    this.get('/users', () => {
                        return MirageJsServer.mockedUsers();
                    });
                },
            });
        }
}
