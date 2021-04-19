import React from 'react';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';
import { omit, isFunction } from 'lodash';
import { Input } from 'semantic-ui-react';
import MaskedInput from 'react-text-mask';
import { ErrorSpan } from './Wrappers';

export default class BaseInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validationRules: {
                loginRules: {
                    login: {
                        presence: {
                            message: '^Логин не может быть пустым',
                            allowEmpty: false,
                        },
                    },
                },
                passwordRules: {
                    password: {
                        presence: {
                            message: '^Пароль не может быть пустым',
                            allowEmpty: false,
                        },
                    },
                },
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
                        presence: {
                            message: '^Почта обязательна для заполнения',
                            allowEmpty: false,
                        },
                        email: {
                            message: '^Введите корректную почту',
                        },
                    },
                },
                codeRules: {
                    code: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        length: {
                            is: 6,
                            wrongLength: '^Код должен состоять из %{count} символов',
                        },
                    },
                },
                kppCbrfRules: {
                    kpp: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        length: {
                            is: 9,
                            wrongLength: '^Код должен состоять из %{count} символов',
                        },
                        format: {
                            pattern: /[0-9]{4}01001|[0-9]{4}50001/,
                            message: '^КПП не соответствует формату',
                        },
                    },
                },
                kppRules: {
                    kpp: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        length: {
                            is: 9,
                            wrongLength: '^КПП должен состоять из %{count} символов',
                        },
                        format: {
                            pattern: /^\d{4}([A-Z]|\d){2}\d{3}$/,
                            message: '^КПП не соответствует формату',
                        },
                    },
                },
                rnsFssRules: {
                    rnsFss: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^\d{10}$/,
                            message: '^РНС должен состоять из 10 цифр',
                        },
                    },
                },
                ifnsCodeRules: {
                    ifnsCode: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^(\d){4}$/,
                            message: '^Код ИФНС должен содержать 4 цифры',
                        },
                    },
                },
                rnsPfrRules: {
                    rnsPfr: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^\d{3} - \d{3} - \d{6}$/,
                            message: '^Регистрационный номер не соответсвует допустимому формату',
                        },
                    },
                },
                upfrRules: {
                    upfr: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^(\d){6}$/,
                            message: '^Поле УПФР должно содержать 6 цифр',
                        },
                    },
                },
                okpoRules: {
                    okpo: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^(\d){8}$|(\d){10}$|(\d){14}$/,
                            message: '^ОКПО должен содержать 8 (10) цифр или 14-ти значный номер ТОП',
                        },
                    },
                },
                togsRules: {
                    togs: {
                        presence: {
                            message: '^Поле не может быть пустым',
                            allowEmpty: false,
                        },
                        format: {
                            pattern: /^\d{2}-\d{2}$/,
                            message: '^ТОГС должен состоять из 4 цифр в формате XX-XX',
                        },
                    },
                },
                snilsRules: {
                    snils: {
                        presence: {
                            message: '^СНИЛС не может быть пустым',
                            allowEmpty: false,
                        },

                        format: {
                            pattern: /^\d{11}$|^\d{3}-\d{3}-\d{3} \d{2}$/,
                            message: '^СНИЛС должен состоять из 11 цифр',
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
            case 'login':
                this.validateLogin(inputValue);
                break;
            case 'password':
                this.validatePassword(inputValue);
                break;
            case 'inn':
                this.validateInn(inputValue);
                break;
            case 'emailAddress':
                this.validateEmail(inputValue);
                break;
            case 'code':
                this.validateCode(inputValue);
                break;
            case 'kppCbrf':
                this.validateKppCbrf(inputValue);
                break;
            case 'kpp':
                this.validateKpp(inputValue);
                break;
            case 'rnsFss':
                this.validateRnsFss(inputValue);
                break;
            case 'ifnsCode':
                this.validateIfnsCode(inputValue);
                break;
            case 'rnsPfr':
                this.validateRnsPfr(inputValue);
                break;
            case 'upfr':
                this.validateUpfr(inputValue);
                break;
            case 'okpo':
                this.validateOkpo(inputValue);
                break;
            case 'togs':
                this.validateTogs(inputValue);
                break;
            case 'phone':
                this.validatePhone(inputValue);
                break;
            case 'fio':
                this.validateFIO(inputValue);
                break;
            case 'snils':
                this.validateSnils(inputValue);
                break;
            default:
                break;
        }
    };

    setValidationResult = ({ errors, errorMessage }) =>
        this.setState({ errors, errorMessage }, () => {
            this.props.onValidationResult(this.state.errors);
        });

    validateCode(inputValue) {
        let validationResult;
        if (this.props.validationRules) {
            validationResult = validate({ code: inputValue }, { code: { ...this.props.validationRules } });
        } else {
            validationResult = validate({ code: inputValue }, this.state.validationRules.codeRules);
        }

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.code[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validatePhone(inputValue) {
        const phone = inputValue && inputValue.trim();
        const error = {};

        if (!phone?.length) {
            error.message = 'Телефон обязателен для заполнения';
        } else if (/[^(0-9 )+-]/.test(phone)) {
            error.message = 'Телефон может состоять только из цифр, символов "()+-" и пробелов';
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

    validateInn(inputValue) {
        let result = false;
        let inn = inputValue;
        const error = {};
        if (typeof inn === 'number') {
            inn = inn.toString();
        } else if (typeof inn !== 'string') {
            inn = '';
        }
        if (!inn.length) {
            error.message = 'ИНН обязателен для заполнения';
        } else if (/[^0-9]/.test(inn)) {
            error.message = 'ИНН может состоять только из цифр';
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
        } else {
            const checkDigit = (innNum, coefficients) => {
                let n = 0;
                Object.keys(coefficients).forEach(key => {
                    n += coefficients[key] * innNum[key];
                });
                return parseInt((n % 11) % 10, 10);
            };
            switch (inn.length) {
                case 10: {
                    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9], 10)) {
                        result = true;
                    }
                    break;
                }
                case 12: {
                    const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n11 === parseInt(inn[10], 10) && n12 === parseInt(inn[11], 10)) {
                        result = true;
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            if (!result) {
                error.code = 4;
                error.message = 'Неправильное контрольное число';
            }
        }
        if (error.message) {
            this.setState(
                {
                    errors: {
                        inn: [error.message],
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

        return result;
    }

    validateKppCbrf(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ kpp: inputValue }, this.state.validationRules.kppCbrfRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.kpp[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateKpp(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ kpp: inputValue }, this.state.validationRules.kppRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.kpp[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateRnsFss(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ rnsFss: inputValue }, this.state.validationRules.rnsFssRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.rnsFss[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateIfnsCode(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ ifnsCode: inputValue }, this.state.validationRules.ifnsCodeRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.ifnsCode[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateRnsPfr(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ rnsPfr: inputValue }, this.state.validationRules.rnsPfrRules);
        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.rnsPfr[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateUpfr(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ upfr: inputValue }, this.state.validationRules.upfrRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.upfr[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateOkpo(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ okpo: inputValue }, this.state.validationRules.okpoRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.okpo[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateTogs(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ togs: inputValue }, this.state.validationRules.togsRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.togs[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validateLogin(inputValue) {
        let validationResult;
        if (this.props.validationRules) {
            validationResult = validate({ login: inputValue }, { login: { ...this.props.validationRules } });
        } else {
            validationResult = validate({ login: inputValue }, this.state.validationRules.loginRules);
        }

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.login[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    validatePassword(inputValue) {
        let validationResult;
        if (this.props.validationRules) {
            validationResult = validate({ password: inputValue }, { password: { ...this.props.validationRules } });
        } else {
            validationResult = validate({ password: inputValue }, this.state.validationRules.passwordRules);
        }

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.password[0] : '',
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

    validateSnils(inputValue) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const validationResult = validate({ snils: inputValue }, this.state.validationRules.snilsRules);

        this.setState(
            {
                errors: { ...validationResult },
                errorMessage: validationResult ? validationResult.snils[0] : '',
            },
            () => {
                this.props.onValidationResult(this.state.errors);
            },
        );
    }

    render() {
        const { errorMessage } = this.state;
        const ownInputProps = omit(this.props, 'onValidationResult', 'field', 'noSpaceError', 'label');
        const { mask } = this.props;
        return (
            <div>
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
};
