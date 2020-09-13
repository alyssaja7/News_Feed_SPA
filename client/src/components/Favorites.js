import React, {Component} from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {Badge, Card} from "react-bootstrap";
import Share from "./Share";
import Col from "react-bootstrap/Col";
import "./Favorites.css"
import {IoMdTrash} from "react-icons/io";
import ReactTooltip from "react-tooltip";
import {toast, ToastContainer, Zoom} from "react-toastify";
import ReactDOM from "react-dom";
import {preventInertiaScroll} from "react-select/src/internal/ScrollLock/utils";

class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            // localStorage: localStorage,
            len: localStorage.length,                 //The reason I am suggesting the use of a state variable to store articles data for the bookmarks page is that when you delete an article from favorites, you modify the localstorage and set state according to the localstorage, so that the component will be re-rendered on account of the change in state.
            localStorageValues: Object.values(localStorage)  //get the value: values is the string format of required json data for small card to render
        }
    }




    render() {
        console.log(this.state.localStorageValues)

        // console.log(localStorage)
        // this.state.localStorage.map(article => {
        //     console.log(JSON.parse(article))
        // })
        const dict = {
            "WORLD": "rgb(115,85,246)",
            "POLITICS": "rgb(87,146,136)",
            "BUSINESS": "rgb(88,150,229)",
            "TECHNOLOGY": "rgb(209,218,89)",
            "SPORT": "rgb(239,195,92)",
            "SPORTS": "rgb(239,195,92)",
            "GUARDIAN": "rgb(24,40,72)",
            "NYTIMES": "rgb(220,220,220)",
        }

        const dictColor={
            "TECHNOLOGY": "black",
            "SPORT": "black",
            "SPORTS": "black",
            "NYTIMES": "black",

            "WORLD": "white",
            "POLITICS": "white",
            "BUSINESS": "white",

            "GUARDIAN": "white"
        }

        console.log(this.state.len)
        console.log(localStorage.length)

        if (localStorage.length === 0) {

            return (
                <h4 style={{"margin-top": "10px", "text-align": "center"}}>You have no saved articles</h4>
            )
        } else {
            return (
                <Container id="outter_container">
                    <h2 style={{"margin-top": "20px"}}>Favorites</h2>
                    <Row>
                        {this.state.localStorageValues.map(article =>
                            <Col lg={3}>
                                <Card id="fav_result_card" onClick={() => {
                                    let id;
                                    if (JSON.parse(article).Tag === "NYTIMES") {
                                        id = JSON.parse(article).URL;
                                    } else if (JSON.parse(article).Tag === "GUARDIAN") {
                                        id = JSON.parse(article).ID;
                                    }
                                    this.props.history.push(`/article?id=${id}`);
                                }}>
                                    <Container id="fav_inner_container">
                                        <Row id="fav_result_title">
                                            <Card.Title id="fav_result_card" style={{"font-style": "italic"}}>
                                                <span>{JSON.parse(article).Title + " "}</span>

                                                <span onClick={(event) => {
                                                    event.stopPropagation();
                                                }}>
                                                    <Share title={JSON.parse(article).Title}
                                                           url={JSON.parse(article).URL}/>
                                                </span>


                                                <span onClick={(event) => {
                                                    event.stopPropagation();
                                                }}>
                                                    <IoMdTrash onClick={() => {
                                                        console.log(localStorage)                               // before delete, not change
                                                        localStorage.removeItem(JSON.parse(article).Title)
                                                        //console.log(localStorage)                               //after delete, change
                                                        toast("Removing " + JSON.parse(article).Title)
                                                        console.log(this.state.localStorageValues)              //before setState, not change
                                                        this.setState({
                                                            localStorageValues: Object.values(localStorage)
                                                        })
                                                        console.log(this.state.localStorageValues)                 //after setState, not change. However, on account of setState, localStorageValues change, so the statement in return rerender. But why this statement not change
                                                        this.forceUpdate()

                                                    }}/>
                                                    {/*<IoMdTrash onClick={this.trash}/>*/}
                                                </span>


                                                <ToastContainer position="top-center" autoClose={2000} hideProgressBar
                                                                newestOnTop={false} closeOnClick rtl={false}
                                                                pauseOnVisibilityChange={false} draggable={false}
                                                                pauseOnHover transition={Zoom} style={{
                                                    "font-size": "16px",
                                                    "font-weight": "normal",
                                                    "font-style": "normal"
                                                }}/>

                                            </Card.Title>
                                        </Row>

                                        <Row id='fav_result_img'>
                                            <Card.Img src={JSON.parse(article).Image} fluid="true"/>
                                            {/*<Card.Img src={JSON.parse(article).Image} class="img-fluid"/>*/}

                                        </Row>

                                        <Row id="fav_date_line">
                                            <Card.Text id="fav_date"
                                                       style={{"font-style": "italic"}}>{JSON.parse(article).Dash_Date}
                                            </Card.Text>

                                            <Col id="favbadge_col">
                                                <Badge id="fav_badge"
                                                       style={{
                                                           background: dict[JSON.parse(article).Tag] === undefined ? "rgb(124,129,134)" : dict[JSON.parse(article).Tag],
                                                           color: JSON.parse(article).Tag === "NYTIMES" ? "black" : "white"

                                                       }}>
                                                    {JSON.parse(article).Tag}
                                                </Badge>
                                                <Badge id="fav_badge"
                                                       style={{
                                                           background:
                                                               dict[JSON.parse(article).Section.toUpperCase()] === undefined ?
                                                                   "rgb(124,129,134)"
                                                                   : dict[JSON.parse(article).Section.toUpperCase()],
                                                           color: dictColor[JSON.parse(article).Section.toUpperCase()] === undefined ? "white" : dictColor[JSON.parse(article).Section.toUpperCase()]
                                                       }}
                                                >
                                                    {JSON.parse(article).Section.toUpperCase()}
                                                    {console.log(JSON.parse(article).Section.toUpperCase())}
                                                </Badge>
                                                {/*<Badge id="fav_badge"*/}
                                                {/*       style={{*/}
                                                {/*           background:*/}
                                                {/*               dict[JSON.parse(article).Section] === undefined ?*/}
                                                {/*                   "rgb(124,129,134)"*/}
                                                {/*                   : dict[JSON.parse(article).Section]*/}
                                                {/*       }}*/}
                                                {/*>*/}
                                                {/*    {JSON.parse(article).Section}*/}
                                                {/*    {console.log(JSON.parse(article).Section)}*/}
                                                {/*</Badge>*/}
                                            </Col>

                                        </Row>
                                    </Container>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            )
        }
    }

    //
    // }

}


export default Favorites