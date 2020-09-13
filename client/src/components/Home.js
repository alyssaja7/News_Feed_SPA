import React, {Component} from "react"
import {Container, Row, Col, Badge, ModalTitle} from "react-bootstrap"
import './home.css';
import Share from "./Share"
import Card from "react-bootstrap/Card";
import {Redirect} from "react-router";
import {Route, withRouter} from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";

const {useState} = require("react");


class Home extends Component {
    constructor(props) {
        super(props)
        const {guardian} = this.props
        console.log(this.props)
        this.state = {
            allArticles: [],
            guardian: guardian,
            // myStyle: {"display":"block"}
            isMobile : window.innerWidth <= 1024
        }

        //console.log(this.props.guardian)  //true
        //console.log(this.state.guardian)  //true 这两行始终为true
        console.log("constructor")
    }

    componentWillReceiveProps = (nextProps,prevState) => {

        this.setState({
            guardian: nextProps.guardian,
            // myStyle: {"display":"none"}
        })

        //console.log(this.state.guardian)
        //console.log(this.props.guardian)   //每次switch 才会触发 并且初值都为true

        const guardian = this.state.guardian

        let api;
        if (!guardian) {
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/search?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&section=(sport|business|technology|politics)&show-blocks=all';
            api = 'http://localhost:4000/search';

        } else {
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/home.json?api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
            api = 'http://localhost:4000/home.json';

        }
        fetch(api)
            .then(res => res.json())
            .then(allArticles => this.setState({allArticles},() => console.log('allArticles fetched...', allArticles)));
        //console.log("fetch home")
        console.log("willReceiveProps")


    }

    componentDidMount() {
        const guardian = this.state.guardian;
        //console.log(guardian)
        //console.log(this.props.guardian)  //true
        //console.log(this.state.guardian)   //初始加载出现一次，初值为true,后面点击无变化
        let api;
        if (guardian) {
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/search?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&section=(sport|business|technology|politics)&show-blocks=all';
            api = 'http://localhost:4000/search';

        } else {
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/home.json?api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
            api = 'http://localhost:4000/home.json';
        }

        console.log("fetch home before")
        fetch(api)
            .then(res => res.json())
            .then(allArticles => this.setState({allArticles}, () => console.log('allArticles fetched...', allArticles)));
        //console.log("fetch home")

        console.log("didMount")

    }

    render() {
        console.log("render")

        console.log(this.props.guardian)  //false
        console.log(this.state.guardian)  //false
        //const image = this.state.allArticles.map(article => <img src={article.Image}/>)
        //const image = this.state.allArticles.map(article => <img src={article.Image}/>)
        // const title = this.state.allArticles.map(article => <h3>{article.Title}</h3>)
        // const description = this.state.allArticles.map(article => <p>{article.Description}</p>)
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

        // const isMobile = window.innerWidth <= 1024;
        // console.log(this.state.isMobile)
        // console.log(this.state.isMobile)


        return (

            <Container style={{"padding": "0px"}}>
                {this.state.isMobile ? null: <LoadingSpinner allArticles={this.state.allArticles}/>}

                <Container fluid id="innerContainer" >
                    <Row>
                        <Col>
                            {console.log(this.props)}

                            {this.state.allArticles.map(article =>
                                <Card className="card" onClick={() => {
                                    // return console.log(<Redirect to={{
                                    //     pathname: "/article?",
                                    //     state: { id: id }
                                    // }}/>)
                                    let id;
                                    if (this.props.guardian) {
                                        id = article.ID;
                                    } else {
                                        id = article.URL;
                                    }
                                    this.props.history.push(`/article?id=${id}`);
                                    console.log(`/article?id=${id}`)

                                    // return <Redirect to={`article/${id}`}/>
                                }}>
                                    <Row id="inner_row">
                                        <Col lg={3} className="image-div" id='home_img'>
                                            <Card.Img src={article.Image} fluid="true"/>
                                        </Col>
                                        <Col lg={9} className="text-intro">
                                            <Row lg={1}>
                                                <Card.Title id="home_title">{article.Title}
                                                    <span onClick={(event) => {
                                                        event.stopPropagation();
                                                    }}>
                                                    <Share title={article.Title} url={article.URL}/>
                                                </span>

                                                </Card.Title>
                                            </Row>
                                            <Card.Text lg={3} id="description">
                                                {article.Description}
                                            </Card.Text>
                                            <Card.Text lg={1}>
                                                <Card.Text id="date">{article.Date}</Card.Text>
                                                {/*{article.qufen === "guardian" ?*/}
                                                {/*    <Badge*/}
                                                {/*        style={{color: "white", background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>*/}
                                                {/*        {article.Section.toUpperCase()}*/}
                                                {/*    </Badge> :*/}
                                                <Badge
                                                    style={{color:dictColor[article.Section.toUpperCase()] === undefined? "white" : dictColor[article.Section.toUpperCase()],
                                                        background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>
                                                    {article.Section.toUpperCase()}
                                                </Badge>
                                                {/*}*/}

                                            </Card.Text>
                                            <Row lg={8}>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>

            </Container>
        )
    }
}


export default withRouter(Home)