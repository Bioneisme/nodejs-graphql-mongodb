import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Nav from './components/Nav';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
