import React, {Component} from "react"
import {Nav, Navbar, Form, FormControl} from "react-bootstrap"
import Bookmark from "./Bookmark"
import SwitchComponent from "./SwitchComponent";
import './NavigationBar.css';
import AutoSearch from "./AutoSearch";
import ReactTooltip from "react-tooltip";
import {Route, withRouter} from 'react-router-dom';


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            pathName: this.props.location.pathname,
            guardian: this.props.guardian

        }
        console.log(this.state.pathName)


        // console.log(this.props)
        // console.log(this.props.showSwitch())   // the value of showSwitch function
        // console.log(this.props.showSwitch)  //showSwitch function

    }

    //
    // componentWillMount() {
    //     this.setState({
    //         pathName: this.props.location.pathname
    //     });
    //     console.log(this.state.pathName)
    // }


    componentWillReceiveProps = (nextProps, nextContext) => {
        console.log(nextProps)
        this.setState({
            pathName: nextProps.location.pathname,
            guardian: nextProps.guardian
        })

        console.log(this.state.pathName)
        console.log(nextProps.location.pathname)

    }
    // componentDidMount() {
    //     this.setState({
    //         pathName: this.props.location.pathname
    //     })
    //     console.log(this.state.pathName)
    // }


    render() {

        console.log(this.state.pathName)
        console.log(this.state.guardian)

        //hide the switch, ny, guardian text when hit these three path
        if (this.state.pathName === "/article" || this.state.pathName === "/favorites" || this.state.pathName.indexOf("/search") !== -1) {
            return (

                <Navbar className="navbar" expand="lg">
                    <AutoSearch/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" id="nav_section">

                            {this.state.pathName === "/" ? <Nav.Link href="#/" active>Home</Nav.Link> :
                                <Nav.Link href="#/">Home</Nav.Link>}
                            <Nav.Link href="#/World">World</Nav.Link>
                            <Nav.Link href="#/Politics">Politics</Nav.Link>
                            <Nav.Link href="#/Business">Business</Nav.Link>
                            <Nav.Link href="#/Technology">Technology</Nav.Link>
                            <Nav.Link href="#/Sports">Sports</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="justify-content-end">
                            <Nav.Item id="bookmark_nav">

                                <Nav.Link href="#/favorites" data-tip data-for='bookMark'>
                                    <div id="bookmark"><Bookmark  fill={this.state.pathName}/></div>

                                </Nav.Link>

                                <ReactTooltip id='bookMark' place='bottom'>
                                    <span>Bookmark</span>
                                </ReactTooltip>
                            </Nav.Item>


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )

        } else {


            return (

                <Navbar className="navbar" expand="lg">
                    <AutoSearch/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" id="nav_section">

                            {this.state.pathName === "/" ? <Nav.Link href="#/" active>Home</Nav.Link> :
                                <Nav.Link href="#/">Home</Nav.Link>}
                            <Nav.Link href="#/World">World</Nav.Link>
                            <Nav.Link href="#/Politics">Politics</Nav.Link>
                            <Nav.Link href="#/Business">Business</Nav.Link>
                            <Nav.Link href="#/Technology">Technology</Nav.Link>
                            <Nav.Link href="#/Sports">Sports</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="justify-content-end">
                            <Nav.Item id="bookmark_nav">

                                <Nav.Link href="#/favorites" data-tip data-for='bookMark'>
                                    <div id="bookmark"><Bookmark fill={this.state.pathName}/></div>

                                </Nav.Link>

                                <ReactTooltip id='bookMark' place='bottom'>
                                    <span>Bookmark</span>
                                </ReactTooltip>
                            </Nav.Item>


                            <Nav.Item id="hideIndetail">
                                <Navbar.Brand style={{"color": "rgb(208,224,247)"}}>NYTimes</Navbar.Brand>
                            </Nav.Item>


                            <Nav.Item id="hideIndetail">
                                <SwitchComponent func={this.props.handleChange} guardian={this.state.guardian}/>
                            </Nav.Item>

                            <Nav.Item id="hideIndetail">
                                <Navbar.Brand style={{"color": "rgb(208,224,247)"}}>Guardian</Navbar.Brand>
                            </Nav.Item>



                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}

export default withRouter(NavigationBar)
