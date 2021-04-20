import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import BaseInput from '../BaseInput';
import { Label } from './Wrappers';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            value: '',
        };
        this.baseInputRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { value } = this.props;
        if (prevProps.value !== this.props.value) {
            this.applyPattern(value);
        }
    }

    applyPattern = value => {
        let newValue = value;
        const { pattern } = this.props;
        if (pattern) {
            newValue = value.replace(pattern, '');
        }
        this.setState({ value: newValue });
    };

    handleErrorPassing = errors => this.setState({ errors }, () => this.props.onValidationResult(this.state.errors, this.props.validate));

    handleChangePassing = event => {
        this.applyPattern(event.target.value);
        this.props.onChange(event);
    };

    renderBaseInput = hasError => (
        <div style={{position: 'relative'}}>
            {this.props.label && this.state.value ? <Label error={hasError}>{this.props.label}</Label> : ''}
            <BaseInput
                type={this.props.type || 'text'}
                ref={this.baseInputRef}
                {...this.props}
                value={this.state.value}
                onValidationResult={this.handleErrorPassing}
                onChange={this.handleChangePassing}
            />
        </div>
    );

    render() {
        const hasError = Object.keys(this.state.errors).length > 0;
        return this.props.field ? (
            <Form.Field error={hasError}>{this.renderBaseInput(hasError)}</Form.Field>
        ) : (
            this.renderBaseInput(hasError)
        );
    }
}
Input.propTypes = {
    type: PropTypes.string,
    field: PropTypes.bool,
    label: PropTypes.string,
    onValidationResult: PropTypes.func,
    pattern: PropTypes.any,
};

export default Input;
