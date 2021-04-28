import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import TodoListPage from './pages/TodoListPage.jsx'



function AppRouter(){
    return (
        <div>
            <Router>
                    <Switch>
                        <Route path="/">
                            <TodoListPage />
                        </Route>
                    </Switch>
            </Router>
        </div>
    )
}

export default AppRouter;