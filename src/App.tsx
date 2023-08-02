import Routes from '@/router/routes';

import NavBar from './components/nav-bar';

function App() {
    return (
        <div className="layout">
            <NavBar
                routes={[
                    { path: '/getUserMedia', text: 'getUserMedia' },
                    { path: '/screenSharing', text: 'screenSharing' },
                ]}
            ></NavBar>
            <div className="main">
                <Routes />
            </div>
        </div>
    );
}

export default App;
