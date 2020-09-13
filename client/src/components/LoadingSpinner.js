import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import "./loadingSpinner.css"

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  
  top: 40%;
  left: 50%;
  margin:0;
  padding:0;
`;

class LoadingSpinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            allArticles: this.props.allArticles
        };

    }

    componentWillReceiveProps = (nextProps) => {

        this.setState({
            allArticles: nextProps.allArticles,
            loading: !this.state.loading
        })
    }



    render() {
        let spanStyle;
        if(!this.state.loading){
            spanStyle = {"display":"none"};
        }
        console.log(spanStyle)
        return (
            <div>
                <div className="sweet-loading">
                    <BounceLoader
                        css={override}
                        size={50}
                        color={"#123abc"}
                        loading={this.state.loading}
                        style={{"padding":"0px","margin":"0px"}}

                    />
                    <span id="loading" style={spanStyle}>Loading</span>

                </div>

            </div>
        );
    }
}

export default LoadingSpinner