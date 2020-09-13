import React, {Component} from "react"
import {Container, Row, Col, Badge, ModalTitle} from "react-bootstrap"
import './politics.css';
import Share from "./Share"
import Card from "react-bootstrap/Card";
import {Redirect} from "react-router";
import { Route , withRouter} from 'react-router-dom';
import LoadingSpinner from "./LoadingSpinner";
const {useState} = require("react");

class Politics extends Component {
    constructor(props) {
        super(props)
        const {guardian} = this.props

        this.state = {
            allArticles: [],
            guardian: guardian,
            isMobile : window.innerWidth <= 1024
        }
        //console.log(this.props.guardian)  //true
        //console.log(this.state.guardian)  //true 这两行始终为true

    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            guardian: nextProps.guardian
        })
        //console.log(this.state.guardian)
        //console.log(this.props.guardian)   //每次switch 才会触发 并且初值都为true
        const guardian = this.state.guardian
        let api;
        if(!guardian){
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/politics';
            api = 'http://localhost:4000/politics';
        }else{
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/politics.json';
            api = 'http://localhost:4000/politics.json';

        }
        fetch(api)
            .then(res => res.json())
            .then(allArticles => this.setState({allArticles}, () => console.log('allArticles fetched...', allArticles)));
        //console.log("fetch home")

    }

    componentDidMount() {
        const guardian = this.state.guardian;
        //console.log(guardian)
        //console.log(this.props.guardian)  //true
        //console.log(this.state.guardian)   //初始加载出现一次，初值为true,后面点击无变化
        let api;
        if(guardian){
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/politics';
            api = 'http://localhost:4000/politics';
        }else{
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/politics.json';
            api = 'http://localhost:4000/politics.json';

        }
        console.log("fetch home before")
        fetch(api)
            .then(res => res.json())
            .then(allArticles => this.setState({allArticles}, () => console.log('allArticles fetched...', allArticles)));
        //console.log("fetch home")

    }

    render() {
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

        return (
            <Container style={{"padding":"0px"}}>
                {this.state.isMobile ? null: <LoadingSpinner allArticles={this.state.allArticles}/>}
                <Container fluid>
                    <Row>
                        <Col>
                            {this.state.allArticles.map(article =>
                                <Card className="card" onClick={() => {
                                    let id;
                                    if(this.props.guardian){
                                        id = article.ID;

                                    }else{
                                        id = article.URL;
                                    }
                                    this.props.history.push("/article?id=" + id);
                                }}>
                                    <Row>
                                        <Col lg={3} className="image-div" id='home_img'>

                                            <Card.Img src={article.Image} fluid="true"/>


                                        </Col>
                                        <Col lg={9} className="text-intro">
                                            <Row lg={1}>
                                                <Card.Title id="home_title">{article.Title}
                                                    <span onClick={(event) => {event.stopPropagation();}}>
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
                                                {/*    <Badge*/}
                                                {/*        style={{color:"black", background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>*/}
                                                {/*        {article.Section.toUpperCase()}*/}
                                                {/*    </Badge>*/}
                                                {/*}*/}
                                                <Badge
                                                    style={{color:dictColor[article.Section.toUpperCase()] === undefined? "white" : dictColor[article.Section.toUpperCase()],
                                                        background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>
                                                    {article.Section.toUpperCase()}
                                                </Badge>
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


export default withRouter(Politics)