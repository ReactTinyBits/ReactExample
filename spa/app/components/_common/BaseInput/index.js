import React from 'react';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';
import { omit, isFunction } from 'lodash';
import { Input } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { ErrorSpan } from './Wrappers';
import { Label } from '../Input/Wrappers';

export default class BaseInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validationRules: {
        FIOrules: {
          fio: {
            presence: {
              message: '^Поле не может быть пустым',
              allowEmpty: false,
            },
            format: {
              pattern: /^[(А-я)][(А-я) -]+/,
              message: '^Допускается только кирилица',
            },
          },
        },
        emailRules: {
          emailAddress: {
            email: {
              message: '^Введите корректную почту',
            },
          },
        },
      },
      errors: {},
      errorMessage: '',
    };
  }

  validateInput = key => {
    const { customValidate, value: inputValue } = this.props;
    if (isFunction(customValidate)) {
      const validationResult = customValidate(inputValue);
      if (validationResult) {
        this.setValidationResult(validationResult);
        return;
      }
    }
    switch (key) {
      case 'emailAddress':
        this.validateEmail(inputValue);
        break;
      case 'phone':
        this.validatePhone(inputValue);
        break;
      case 'fio':
        this.validateFIO(inputValue);
        break;
      default:
        break;
    }
  };

  setValidationResult = ({ errors, errorMessage }) =>
    this.setState({ errors, errorMessage }, () => {
      this.props.onValidationResult(this.state.errors);
    });

  validatePhone(inputValue) {
    const phone = inputValue && inputValue.trim();
    const error = {};

    if (!phone?.length) {
      error.message = 'Телефон обязателен для заполнения';
    } else if (/[^(0-9 )+-]/.test(phone)) {
      error.message = 'Телефон может состоять только из цифр';
    }

    if (error.message) {
      this.setState(
        {
          errors: {
            phone: [error.message],
          },
          errorMessage: error.message,
        },
        () => {
          this.props.onValidationResult(this.state.errors);
        },
      );
    } else {
      this.setState(
        {
          errors: {},
          errorMessage: '',
        },
        () => {
          this.props.onValidationResult(this.state.errors);
        },
      );
    }
  }

  validateFIO(inputValue) {
    let validationResult;
    if (this.props.validationRules) {
      validationResult = validate({ fio: inputValue }, { fio: { ...this.props.validationRules } });
    } else {
      validationResult = validate({ fio: inputValue }, this.state.validationRules.FIOrules);
    }

    this.setState(
      {
        errors: { ...validationResult },
        errorMessage: validationResult ? validationResult.fio[0] : '',
      },
      () => {
        this.props.onValidationResult(this.state.errors);
      },
    );
  }

  validateEmail(inputValue) {
    let validationResult;
    if (this.props.validationRules) {
      validationResult = validate({ emailAddress: inputValue }, { emailAddress: { ...this.props.validationRules } });
    } else {
      validationResult = validate({ emailAddress: inputValue }, this.state.validationRules.emailRules);
    }

    this.setState(
      {
        errors: { ...validationResult },
        errorMessage: validationResult ? validationResult.emailAddress[0] : '',
      },
      () => {
        this.props.onValidationResult(this.state.errors);
      },
    );
  }

  render() {
    const { errorMessage } = this.state;
    const ownInputProps = omit(this.props, 'onValidationResult', 'field', 'noSpaceError', 'label', 'showMask');
    const { mask, label } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        {label && mask ? <Label>{label}</Label> : ''}
        <Input onBlur={() => this.validateInput(this.props.validate)} {...ownInputProps}>
          {mask && (
            <MaskedInput
              showMask
              mask={mask}
              onBlur={() => this.validateInput(this.props.validate)}
              {...ownInputProps}
            />
          )}
        </Input>
        {errorMessage && <ErrorSpan noSpaceError={this.props.noSpaceError}>{errorMessage}</ErrorSpan>}
      </div>
    );
  }
}

BaseInput.propTypes = {
  value: PropTypes.string,
  password: PropTypes.bool,
  onEyeClick: PropTypes.func,
  type: PropTypes.string,
  validate: PropTypes.string,
  validationRules: PropTypes.shape({
    presense: PropTypes.shape({
      message: PropTypes.string, // Сообщение ошибки, если поле не заполнено
      allowEmpty: PropTypes.bool, // Разрешаем ли оставить поле пустым
    }),
    length: PropTypes.shape({
      minimum: PropTypes.number, // Минимально ожидаемый размер значения
      maximum: PropTypes.number, // Максимально ожидаемый размер значения
      is: PropTypes.number, // Точный ожидаемый размер значения
      tooShort: PropTypes.string, // Какую ошибку выводить, если слишком короткое значение
      tooLong: PropTypes.string, // Какую ошибку выводить, если слишком длинное значение
      wrongLength: PropTypes.string, // Какую ошибку выводить, если неправильное значение
      // Можно использовать %{count} как placeholder для отображения ожидаемого размера значения от пользователя
    }),
  }),
  onValidationResult: PropTypes.func,
  noSpaceError: PropTypes.bool,
  showMask: PropTypes.bool,
  mask: PropTypes.array,
  customValidate: PropTypes.func,
  label: PropTypes.string,
};
