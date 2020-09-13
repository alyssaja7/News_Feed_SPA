import React, {Component} from "react"
import Switch from "react-switch";
import "./SwitchComponent.css"

class SwitchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.guardian
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({
            checked
        });

    }



    render() {
        console.log(this.props.func)
        //console.log(this.state.checked)



        return (
            <div className="example"  onClick = {this.props.func}>
                <label id="label">
                    <Switch
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        className="react-switch"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#3f95f0"
                    />
                </label>
            </div>
        );
    }
}


export default SwitchComponent