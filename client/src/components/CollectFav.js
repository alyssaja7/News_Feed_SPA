import React, {Component} from "react"
import ReactDOM from "react-dom"
import {FaRegBookmark} from "react-icons/fa";
import {EmailShareButton, FacebookShareButton} from "react-share";
import ReactTooltip from "react-tooltip";
import "./CollectFav.css"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Zoom} from 'react-toastify';
import {FaBookmark} from "react-icons/fa";


class CollectFav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: [],
            detail:[],
            isBooked: this.props.isBooked
        }
        this.save = this.save.bind(this)
        this.remove = this.remove.bind(this)
    }

    save(){
        console.log(this.state.title)
        toast("Saving " + this.state.title)
        this.setState((prevState)=>{
            return { isBooked:!prevState.isBooked}
        })

        localStorage.setItem(this.state.title, JSON.stringify(this.state.detail))
        console.log(localStorage)
    }

    remove(){
        console.log(this.state.title)
        toast("Removing - " + this.state.title)
        this.setState((prevState)=>{
            return { isBooked:!prevState.isBooked}
        })
        // ReactDOM.render(<FaRegBookmark size={25} onClick={this.save}/>,document.getElementById("bookmark_part"))
        localStorage.removeItem(this.state.title,JSON.stringify(this.state.detail));
        console.log(localStorage)
    }


    componentWillReceiveProps = (nextProps,prevState) => {
        this.setState({
                title: nextProps.title,
                detail:nextProps.detail,
                isBooked: nextProps.isBooked
            }
        )
    }

    render() {

        return (

            <div>
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange={false} draggable={false} pauseOnHover transition={Zoom}/>


                <div id="bookmark_part" data-tip data-for='BookMark'>
                    {/*{this.state.isBooked ? <FaBookmark size={25} onClick={this.remove} /> : <FaRegBookmark size={25} onClick={this.save} />}*/}
                    {localStorage.getItem(this.state.title)? <FaBookmark size={25} onClick={this.remove} /> : <FaRegBookmark size={25} onClick={this.save} />}
                </div>


                <ReactTooltip id='BookMark' place='top'>
                    <span>Bookmark</span>
                </ReactTooltip>
            </div>

        )
    }
}


export default CollectFav