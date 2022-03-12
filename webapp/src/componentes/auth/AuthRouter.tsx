import { Switch, Route, Redirect} from 'react-router-dom';
import { Login } from '../../Login/Login';

export function AuthRouter() {
    return (
        <Switch>
            <Route path="/auth/login">
                <Login />
            </Route>

            <Redirect to="/auth/login" />
        </Switch>
    )
}