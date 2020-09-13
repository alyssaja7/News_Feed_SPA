import React,{Component}  from "react"
import ReactDOM from "react-dom"
import Card from "react-bootstrap/Card";
import { IoIosArrowUp } from "react-icons/io";
import Desc from "./Desc";
class DescExpand extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div id="desc_expand">
                <Card.Text id="desc_expand">
                    {this.props.descEx}
                </Card.Text>
                <IoIosArrowUp/>
            </div>


        )}
}



export default DescExpand