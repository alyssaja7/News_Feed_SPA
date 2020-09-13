import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import NavigationBar from "./components/NavigationBar"
import Home from "./components/Home";
import World from "./components/World";
import Politics from "./components/Politics";
import Business from "./components/Business";
import Technology from "./components/Technology";
import Sports from "./components/Sports";
import searchKW from "./components/searchKW";
import Details from "./components/Details"
import Favorites from "./components/Favorites";



class App extends Component {
    constructor() {
        super();
        this.state = {
            guardian: true
        };

        this.handleChange = this.handleChange.bind(this)

        console.log(window.location.href)
    }

    handleChange() {
        this.setState((prevState) => {
            //window.location.reload();
            //console.log(prevState)
            return {guardian: !prevState.guardian}
        })

    }



    render() {

        return (
            <div>
                <Router>
                    <NavigationBar handleChange={this.handleChange} guardian={this.state.guardian}/>
                    <Switch>
                        {/*//{console.log(this.state.guardian)}*/}
                        <Route exact strict path="/" render={() => <Home guardian={this.state.guardian}/>}/>

                        <Route exact strict path="/World" render={() => <World guardian={this.state.guardian}/>}/>
                        <Route exact strict path="/Politics" render={() => <Politics guardian={this.state.guardian}/>}/>
                        <Route exact strict path="/Business" render={() => <Business guardian={this.state.guardian}/>}/>
                        <Route exact strict path="/Technology"
                               render={() => <Technology guardian={this.state.guardian}/>}/>
                        <Route exact strict path="/Sports" render={() => <Sports guardian={this.state.guardian}/>}/>


                        {/*<Route exact strict path="/search" render={() => <searchKW/>}/>*/}
                        <Route exact strict path="/favorites" component={Favorites}/>
                        <Route exact strict path="/:url" component={Details}/>
                        {/*<Route path="/search:url" component={SearchResult}/>*/}
                        <Route exact strict path="/search/:keyword" component={searchKW}/>

                    </Switch>
                </Router>

            </div>
        )

    }
}


export default App