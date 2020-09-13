//5717744787914752-proj
import React,{Component} from "react"
import commentBox from 'commentbox.io';


class Comment extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.removeCommentBox = commentBox('5717744787914752-proj')
    }
    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {

        return (
            <div className="commentbox" id={this.props.id} />

        );
    }

}


export default Comment
