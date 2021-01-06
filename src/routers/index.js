import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Register from '../component/Register';
import Check from '../component/Check';
import Report from '../component/Report';
import DangNhap from '../component/DangNhap';
import Voice from '../component/Voice';
import CheckVoice from '../component/CheckVoice';
const Routers = props => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/check" exact>
                        <Check />
                    </Route>
                    {/* <Route path="/" exact>
                        <DangNhap />
                    </Route> */}
                    <Route path="/" exact>
                        <Report />
                    </Route>
                    <Route path="/voice" exact>
                        <Voice />
                    </Route>
                    <Route path="/checkVoice" exact>
                        <CheckVoice />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Routers
