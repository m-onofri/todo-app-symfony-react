import React, {Component} from 'react';
import PropTypes from 'prop-types'; 

class AddActivity extends Component {
    state = {
        value: "",
        placeholder: ""
    }

    componentDidMount() {
        this.setState({
            placeholder: this.props.placeholder
        });
    }

    updateValue = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleClick = () => {
        this.props.cb(this.state.value, this.props.id);
        this.setState({
            value: ""
        });
    }

    render () {
        return (
            <div className="centered space-btm">
                <input 
                    type="text"
                    placeholder={this.state.placeholder} 
                    value={this.state.value} 
                    onChange={this.updateValue} />
                <button
                    className="btn add-btn" 
                    onClick={() => this.handleClick()} >
                    add
                </button>
            </div>
        );
    }
}

AddActivity.propTypes = {
    placeholder: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired,
    index: PropTypes.number
}

export default AddActivity;