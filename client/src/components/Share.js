import React, {Component} from "react"
import {IoMdShare} from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon

} from "react-share"
import './share.css'
import {ModalBody} from "react-bootstrap";

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    showModal() {
        this.setState(
            {
                show: true
            }
        )
        //console.log("showModal function")
    }

    handleClose() {
        this.setState({
            show: false
        })
        console.log("handleClose function")
    }


    render() {
        return (
            <span>
                <IoMdShare onClick={this.showModal}/>
                <Modal onHide={this.handleClose} show={this.state.show}>
                    <Modal.Header closeButton>
                      <Modal.Title id="modal_title"
                                   style={{"font-size": "20px", "font-weight": "450"}}>{this.props.title}</Modal.Title>

                    </Modal.Header>



                    <Modal.Footer>
                        <Col></Col>
                        <Col lg={6}id="shareReminder">Share via</Col>
                        <Col></Col>

                        <Container id="social_icons">
                            <Row>
                                <Col>
                                    <div id="out_div">
                                        <FacebookShareButton
                                            hashtag="#CSCI_571_NewsApp"
                                            url={this.props.url}
                                        >
                                            <FacebookIcon size={60} round/>
                                        </FacebookShareButton>

                                    </div>

                                </Col>
                                <Col>
                                    <div id="out_div">
                                    <TwitterShareButton

                                        url={this.props.url + "#CSCI_571_NewsApp"}

                                        // title={this.props.title}
                                        className="Demo__some-network__share-button"
                                    >
                                        <TwitterIcon size={60} round/>
                                    </TwitterShareButton>
                                    </div>
                                </Col>
                                <Col>
                                    <div id="out_div">
                                    <EmailShareButton
                                        hashtag="#CSCI_571_NewsApp"
                                        url={this.props.url}
                                        subject={"#CSCI_571_NewsApp"}

                                        className="Demo__some-network__share-button"
                                    >
                                        <EmailIcon size={60} round/>
                                    </EmailShareButton>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Footer>

                </Modal>


            </span>
        )
    }

}


export default Share