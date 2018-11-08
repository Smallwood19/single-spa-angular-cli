declare const history: History;

export class Router {

    routes: string[];
    defaultRoute: string;

    constructor() {
        this.routes = [];
    }

    matchRoute(prefix: any, isDefaultPage?: boolean): (location: Location, console: Console) => boolean {
        if (Array.isArray(prefix)) {
            Array.prototype.push.apply(this.routes, prefix);
            console.info("Push Array", prefix, this.routes);
        } else {
            this.routes.push(prefix);
            console.info("Push String", prefix, this.routes);
        }
        if (isDefaultPage) {
            this.defaultRoute = prefix;
        }
        return (location: Location): boolean => {
            if (prefix === '/**') {
                return true;
            }
            const route = this.routes.find(r => this.pathMatch(location, r));
            if (route) {
                return this.pathMatch(location, prefix);
            } else {
                this.navigate(this.defaultRoute);
                return false;
            }
        }
    }

    public navigate(path: string): void {
        history.pushState(null, null, path);
    }

    private pathMatch(location: Location, path: any): boolean {
        if (Array.isArray(path)) {
            for (const p in path) {
                if (location.pathname.indexOf(p) === 0) {
                    return true;
                }
                if (location.search.indexOf(p) === 1) {
                    return true;
                }
            }
        }
        else {
            if (location.pathname.indexOf(path) === 0) {
                return true;
            }
            if (location.search.indexOf(path) === 1) {
                return true;
            }
            return false;
        }

        return false;
    }

}
