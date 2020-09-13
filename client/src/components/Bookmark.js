import React,{Component} from "react"
import { FaRegBookmark } from "react-icons/fa";
import {FaBookmark  } from "react-icons/fa";
import ReactDOM from "react-dom"

class Bookmark extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        if( this.props.fill === "/favorites"){
            return( <div id="changeBmark"><FaBookmark size={22}/></div>)
        }else{
            return(<div id="changeBmark"><FaRegBookmark size={22}/></div>)
        }

    }
}

export default Bookmark
