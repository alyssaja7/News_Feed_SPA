import React, {Component} from "react"
import ReactDOM from "react-dom"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Details.css"
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import Bookmark from "./Bookmark";
import Comment from "./Comment"
import Card from "react-bootstrap/Card";
import CollectFav from "./CollectFav";
import {IoIosArrowUp} from "react-icons/io";
import {IoIosArrowDown} from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner"
import {Nav} from "react-bootstrap";
import ReactTooltip from "react-tooltip";


class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            isMobile : window.innerWidth <= 1024,
            isBooked: false
        }
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    show() {
        window.scrollTo({top: 7000, left: 0, behavior: 'smooth' });
        ReactDOM.render(
            <div id="show">
                <Card.Text id="desc_show" style={{"text-align": "justify"}}>
                    {this.state.detail.Description}
                </Card.Text>
                <IoIosArrowUp onClick={this.hide} style={{"float": "right"}}/>
            </div>,
            document.getElementById("Collapse_Part")
        )
    }

    hide() {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
        ReactDOM.render(
            <div id="hide">
                <Card.Text id="desc_hide" style={{"text-align": "justify"}}>
                    {this.state.detail.Description}
                </Card.Text>
                <IoIosArrowDown onClick={this.show} style={{"float": "right"}}/>
            </div>,
            document.getElementById("Collapse_Part"))
    }


    componentDidMount() {

        const id = this.props.location.search.substring(4)
        console.log(this.props.location.search)
        console.log(id)
        console.log(typeof id)
        //const id = this.props.match.params.id;
        //console.log(id)
        let api;
        if (id.substring(0, 5) === "https") {
             api = 'http://localhost:4000/articlesearch.json?fq=web_url:("' + id + '")&api-key=ci5mI5D1XhSbHZfaueFFTKqMDclZfABq';
            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/articlesearch.json?fq=web_url:("' + id + '")';

        } else {
            //http://localhost:5000/article?id=sport/2020/apr/03/englands-cricketers-to-hand-back-500000-and-donate-to-charities?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all

            //api = 'http://ec2-54-174-22-8.compute-1.amazonaws.com:4000/article?id=' + id + '?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all';
             api = 'http://localhost:4000/article?id=' + id + '?api-key=c05384c5-6def-48bd-8d98-ad6b7c9e9caa&show-blocks=all';
        }
        console.log(api)
        fetch(api)
            .then(res => res.json())
            .then(detail => this.setState({detail}, () => console.log('detail fetched...', detail)));
    }

    render() {
        console.log(this.state.detail)
        return (
            <Container style={{"padding": "0px"}}>
                {this.state.isMobile ? null: <LoadingSpinner allArticles={this.state.allArticles}/>}
                <Container>
                    <Row>
                        <Col className="cardCol">
                            <Card className="detail_Card">
                                <Card.Title className="title">{this.state.detail.Title}</Card.Title>
                                <Row style={{"margin-bottom": "10px"}}>
                                    <Col lg={7} xs={6} className="date">
                                        <Card.Text id="detail_date" style={{
                                            "font-style": "italic",
                                            "font-size": "20px"
                                        }}>{this.state.detail.Date}</Card.Text>
                                    </Col>


                                    <Col lg={4} xs={4} className="detail_social" className="social">
                                        <Row>
                                            <Col lg={6}></Col>
                                            <Col lg={6}>
                                                <EmailShareButton
                                                    hashtag="#CSCI_571_NewsApp"
                                                    url={this.state.detail.URL}
                                                    subject={"#CSCI_571_NewsApp"}
                                                    data-tip data-for='email'
                                                    id="social_button"
                                                >
                                                    <EmailIcon size={28} round/>
                                                </EmailShareButton>
                                                <ReactTooltip id='email' place='top'>
                                                    <span>Email</span>
                                                </ReactTooltip>


                                                <TwitterShareButton
                                                    url={this.state.detail.URL + "#CSCI_571_NewsApp"}
                                                    data-tip data-for='twitter'
                                                    id="social_button"
                                                >
                                                    <TwitterIcon size={28} round/>
                                                </TwitterShareButton>
                                                <ReactTooltip id='twitter' place='top'>
                                                    <span>Twitter</span>
                                                </ReactTooltip>


                                                <FacebookShareButton
                                                    hashtag="#CSCI_571_NewsApp"
                                                    url={this.state.detail.URL}
                                                    data-tip data-for='faceBook'
                                                    id="social_button"
                                                >
                                                    <FacebookIcon size={28} round/>
                                                </FacebookShareButton>
                                                <ReactTooltip id='faceBook' place='top'>
                                                    <span>Facebook</span>
                                                </ReactTooltip>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col lg={1} xs={1} className="bookmark">
                                        <Row>
                                            <Col lg={4}></Col>
                                            <Col lg={4}>
                                                <CollectFav title={this.state.detail.Title} detail={this.state.detail} isBooked={this.state.isBooked}/>
                                            </Col>
                                            <Col lg={4}></Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <Card.Img src={this.state.detail.Image} id="detail_img"/>
                                <div id="Collapse_Part">
                                    <div id="hide">
                                        <Card.Text id="desc_hide" style={{"text-align": "justify"}}>
                                            {this.state.detail.Description}
                                        </Card.Text>
                                        <IoIosArrowDown onClick={this.show} style={{"float": "right"}}/>
                                    </div>

                                </div>
                            </Card>
                            <div className="comment_box">
                                {/*<Comment url={this.state.detail.URL} id={this.props.location.search.substring(4)}/>*/}

                                <Comment id={this.props.location.search.substring(4)}/>
                            </div>

                        </Col>

                    </Row>

                </Container>
            </Container>


        )
    }
}

export default Details