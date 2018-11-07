declare const history: History;

export class Router {

    routes: string[];
    defaultRoute: string;

    constructor() {
        this.routes = [];
    }

    matchRoute(prefix: any, isDefaultPage?: boolean): (location: Location) => boolean {
        if (prefix.prop && prefix.prop.constructor === Array) {
            Array.prototype.push.apply(this.routes, prefix);
        } else {
            this.routes.push(prefix);
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

    private pathMatch(location: Location, path: string): boolean {
        const loc = location.pathname + location.search;
        return loc.indexOf(path) !== -1;
    }

}
