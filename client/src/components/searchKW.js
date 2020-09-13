import React, {Component} from "react"
import Container from "react-bootstrap/Container";
import "./searchKW.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Badge, Card} from "react-bootstrap";

import {useParams} from "react-router-dom";
import {CardTitle} from "react-bootstrap/Card";
import Share from "./Share";


class searchKW extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            ny_articles: [],
            gu_articles: [],
            keyword: this.props.match.params.keyword
        }
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps)
        this.setState({
            keyword: nextProps.match.params.keyword
        })
        console.log(this.state.keyword)
        const keyword = nextProps.match.params.keyword

        // console.log(nextProps.match.params.keyword)


        let guardian_api = 'http://localhost:4000/search/result?q=' + keyword +'&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all' ;
        //let guardian_api = 'http://ec2-52-90-225-69.compute-1.amazonaws.com:4000/search/result?q=' + keyword +'&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all' ;
        let ny_api = 'http://localhost:4000/articlesearch.json/result?q=' + keyword + '&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
        //let ny_api = 'http://ec2-52-90-225-69.compute-1.amazonaws.com:4000/articlesearch.json/result?q=' + keyword + '&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
        console.log(guardian_api)
        console.log(ny_api)

        //fetch ny json data & guardian json data
        fetch(ny_api)
            .then(res => res.json())
            .then(ny_articles => this.setState({ny_articles}, () => console.log('ny_articles fetched...', ny_articles)));

        fetch(guardian_api)
            .then(res => res.json())
            .then(gu_articles => this.setState({gu_articles}, () => console.log('gu_articles fetched...', gu_articles)));
    }



    componentDidMount() {
        // console.log(this.state.keyword)
        //  console.log(this.props.match.params.keyword)
        const keyword = this.state.keyword
        console.log(keyword)

        let guardian_api = 'http://localhost:4000/search/result?q=' + keyword +'&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all' ;
        //let guardian_api = 'http://ec2-52-90-225-69.compute-1.amazonaws.com:4000/search/result?q=' + keyword +'&api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all' ;
        let ny_api = 'http://localhost:4000/articlesearch.json/result?q=' + keyword + '&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
        //let ny_api = 'http://ec2-52-90-225-69.compute-1.amazonaws.com:4000/articlesearch.json/result?q=' + keyword + '&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
        console.log(guardian_api)
        console.log(ny_api)

        //fetch ny json data & guardian json data
        fetch(ny_api)
            .then(res => res.json())
            .then(ny_articles => this.setState({ny_articles}, () => console.log('ny_articles fetched...', ny_articles)));

        fetch(guardian_api)
            .then(res => res.json())
            .then(gu_articles => this.setState({gu_articles}, () => console.log('gu_articles fetched...', gu_articles)));

    }



    render() {
        console.log(this.state.keyword)
        console.log(this.state.ny_articles)
        console.log(this.state.gu_articles)
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
            <Container id="outter_container">
                <h2>Results</h2>
                <Row>
                    {this.state.ny_articles.map(article =>
                        <Col lg={3}>
                            <Card id="result_card" onClick={() => {
                                this.props.history.push(`/article?id=${article.URL}`);
                            }}>
                                <Container id="inner_container">
                                    <Row id="result_title">
                                        <Card.Title id="kw_result_card">{article.Title + " "}

                                            <span onClick={(event) => {
                                                event.stopPropagation();
                                            }}>
                                            <Share title={article.Title} url={article.URL}/>
                                        </span>

                                        </Card.Title>

                                    </Row>
                                    <Row id='result_img'>
                                        <Card.Img src={article.Image} fluid="true"/>
                                    </Row>
                                    <Row id="date_line">
                                        <Card.Text id="date">{article.Date}</Card.Text>
                                        <Col id="badge_col">
                                            <Badge id="kw_badge"
                                                   style={{
                                                       color:dictColor[article.Section.toUpperCase()] === undefined? "white" : dictColor[article.Section.toUpperCase()],
                                                       background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>
                                                {article.Section.toUpperCase()}
                                            </Badge>

                                        </Col>

                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    )}


                    {this.state.gu_articles.map(article =>
                        <Col lg={3}>
                            <Card id="result_card" onClick={() => {
                                this.props.history.push(`/article?id=${article.ID}`);
                            }}>
                                <Container id="inner_container">
                                    <Row id="result_title">
                                        <Card.Title id="kw_result_card">{article.Title + " "}

                                            <span onClick={(event) => {
                                                event.stopPropagation();
                                            }}>
                                            <Share title={article.Title} url={article.URL}/>
                                        </span>
                                        </Card.Title>
                                    </Row>
                                    <Row id='result_img'>
                                        <Card.Img src={article.Image} fluid="true"/>
                                    </Row>
                                    <Row id="date_line">
                                        <Card.Text id="date">{article.Date}</Card.Text>
                                        <Col id="badge_col">
                                            <Badge id="kw_badge"
                                                   style={{
                                                       color:dictColor[article.Section.toUpperCase()] === undefined? "white" : dictColor[article.Section.toUpperCase()],
                                                       background: dict[article.Section.toUpperCase()] === undefined ? "rgb(124,129,134)" : dict[article.Section.toUpperCase()]}}>
                                                {article.Section.toUpperCase()}
                                            </Badge>
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


export default searchKW