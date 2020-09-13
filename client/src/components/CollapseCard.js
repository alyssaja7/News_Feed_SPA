import React, {Component} from "react"
import {FaAngleDown} from "react-icons/fa";

class CollapseCard extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div>
                <div className="desc">
                    {this.props.desc}
                </div>
                <FaAngleDown onClick={console.log("hi FaAngle")}/>

            </div>

        )
    }

}


export default CollapseCard