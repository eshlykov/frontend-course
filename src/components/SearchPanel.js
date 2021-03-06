import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FormInput from "./FormInput";
import FormField from "./FormField";
import User from "./User";
import api from "../constants/api";
import {DEBOUNCE_TIMEOUT} from "../constants/debounceTimeout";
import {onRecvUserListAction} from "../middlewares/onRecvUserList";
import {debounce} from "../utils/debounce";

class SearchPanel extends Component {
    handleInputChange(event) {
        this.props.recvUserList({
            request: api.getUserByName,
            query: event.target.value,
            token: this.props.token,
        });
    }

    render() {
        const emptyResult = this.props.message
            ? (<div className="row">
                <div className="col">
                    <div className="alert alert-danger" role="alert">{this.props.message}</div>
                </div>
            </div>)
            : null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <FormField label="Search participants" name="search">
                            <FormInput name="search" onChange={this.handleInputChange.bind(this)}/>
                        </FormField>
                    </div>
                </div>
                {emptyResult}
                {this.props.userList.length === 0
                    ? null
                    : (<div className="row">
                        <div className="col">
                            <ul className="list-group">{
                                this.props.userList.map((user, index) => (
                                    <li key={index} className="list-group-item">
                                        <User {...user}/>
                                    </li>))}
                            </ul>
                        </div>
                    </div>)}
            </div>
        );
    }
}

SearchPanel.propTypes = {
    userList: PropTypes.array
};

SearchPanel.defaultProps = {
    userList: []
};

const mapStateToProps = state => ({
    token: state.auth.token,
    userList: state.recvUserList.userList,
    message: state.recvUserList.message,
});

const mapDispatchToProps = dispatch => ({
    recvUserList: debounce(payload => dispatch(onRecvUserListAction(payload)), DEBOUNCE_TIMEOUT),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
