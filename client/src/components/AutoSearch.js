import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';

import Async, {makeAsyncSelect} from 'react-select/async';
import "./autoSearch.css"
import _ from "lodash";
import {State} from "@jest/types/build/Circus";
import {Link, Redirect} from 'react-router-dom'
import {Route, withRouter} from 'react-router-dom';


class AutoSearch extends Component<*, State> {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            // inputValue: '',
            valuePairs: {
                inputValue: '',
                value: ''
            },
            results: [],
            path: ''
        }
        this.getOptions = this.getOptions.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }


    //return the input value when type or retype  只执行了第一次 后面再输入并不返回inputValue
    handleInputChange = (newValue: string) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue: inputValue});
        console.log(inputValue)
        return inputValue;
    };


    //get the suggestion result from bing api
    getOptions = async ({inputValue}, callback) => {
        //check
        if (this.state.inputValue == undefined) return [];
        let results;
        try {
            const response = await fetch(
                `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${this.state.inputValue}`,
                {
                    headers: {
                        // "Ocp-Apim-Subscription-Key": "7aca5e3a55e944319422311423873d9c"
                        "Ocp-Apim-Subscription-Key": "5bb101e2dd5a4acca1e1628443e84bad"
                    }
                }
            );
            const data = await response.json();
            console.log(data)
            const resultsRaw = data.suggestionGroups[0].searchSuggestions;
            results = resultsRaw.map(result => ({label: result.displayText, value: result.url}));
            this.setState({results});
            console.log(results)
            // return results;
        } catch (error) {
            console.error(`Error fetching search ${this.state.inputValue}`);
        }
        callback(results)

    }


    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
        console.log(nextProps.location.pathname)
        this.setState({
            path: nextProps.location.pathname
        })


        // if(nextProps.location.pathname.indexOf("/search") !== -1){
        //     this.setState=({
        //         inputValue: nextProps.location.pathname.substring(7)
        //     })
        //
        //
        //
        // }else{
        //     this.setState=({
        //         inputValue: null
        //     })
        //
        // }


    }


    render() {
        console.log(window.location.href)     //#/china
        console.log(window.location.href.substring(24))     //#/china
        console.log(this.state.inputValue)    //china
        console.log(this.state.path)
        if (this.state.path.indexOf("/search") !== -1) {

            return (

                <div>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={_.debounce(this.getOptions, 500)}
                        //defaultOptions
                        onInputChange={_.debounce(this.handleInputChange, 500)}
                        // value = {this.state.inputValue}
                        //value = {this.state.inputValue}   //put this line, it can clear the search box when u navigate to othre pages, say detail page when u click the card
                        //value = {window.location.href.substring(24)}   //put this line, it can clear the search box when u navigate to othre pages, say detail page when u click the card


                        //to capture when user select
                        onChange={opt => {
                            console.log(opt.label, opt.value)
                            let path = "search?q=" + opt.label
                            this.props.history.push(`/search/${opt.label}`);
                        }}


                        id="autoSearch"
                        placeholder={"Enter keyword .."}

                    />
                </div>
            );
        } else {
            return (

                <div>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={_.debounce(this.getOptions, 500)}
                        //defaultOptions
                        onInputChange={_.debounce(this.handleInputChange, 500)}
                        // value = {this.state.inputValue}
                        value={this.state.inputValue}   //put this line, it can clear the search box when u navigate to othre pages, say detail page when u click the card
                        //value = {window.location.href.substring(24)}   //put this line, it can clear the search box when u navigate to othre pages, say detail page when u click the card


                        //to capture when user select
                        onChange={opt => {
                            console.log(opt.label, opt.value)
                            let path = "search?q=" + opt.label
                            this.props.history.push(`/search/${opt.label}`);
                        }}

                        id="autoSearch"
                        placeholder={"Enter keyword .."}

                    />
                </div>
            );
        }
    }
}


export default withRouter(AutoSearch)