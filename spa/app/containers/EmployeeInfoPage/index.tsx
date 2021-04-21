import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Form, Header, Dimmer, Loader} from "semantic-ui-react";
import Input from "../../components/_common/Input";
import {Masks} from "../../helpers/Masks";
import { BaseButtonWrapper } from 'components/_common/Button/Wrappers';
import reducer from "./reducer";
import saga from "./saga";
import injectSaga from "../../utils/injectSaga";
import {DAEMON} from "../../utils/constants";
import injectReducer from "../../utils/injectReducer";
import {saveEmployeeInfo} from "./actions";
import {EmployeeInfo} from "./types";
import BaseDateInput from "../../components/_common/BaseDateInput";
import { FlexContainer, HalfSizedDiv, PageContent, HalfSizedDivMargened } from './Wrappers';
import { isEmpty } from 'validate.js';
import BaseDropdown from "../../components/_common/BaseDropdown";
import {isLoading} from "./selectors";

export function EmployeeInfoPage(props: {
    saveEmployeeInfo: (employeeInfo: EmployeeInfo) => void;
    isLoading: boolean;
}) {
    const {
        saveEmployeeInfo,
        isLoading,
    } = props;

    const [employeeData, setEmployeeData] = useState<EmployeeInfo>();
    const [validation, setValidation] = useState<{ [key: string]: any }>({});
    const [saveEnabled, setSaveEnabled] = useState<boolean>(false);
    const [gender, setGender] = useState<number>(0);

    const onChange = ({ target: { id, value } }) => {
        setEmployeeData({ ...employeeData, [id]: value });
    };

    const GenderOptions = [
        { key: 0, value: 0, text: 'Мужской' },
        { key: 1, value: 1, text: 'Женский' },
    ];

    const changeGender = (event, { value: gender }) => {
        setGender(gender);
    };

    const onValidation = (errors, target) => {
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) {
            setValidation({ ...validation, [target]: errors });
        } else {
            const { [target as string]: _, ...rest } = validation;
            setValidation(rest);
        }
    };

    useEffect(() => {
        if (!employeeData) return;
        const { firstName, secondName, phone, birthDay } = employeeData;
        setSaveEnabled(firstName && secondName && phone && birthDay && isEmpty(validation));
    }, [employeeData,  setSaveEnabled, validation]);

    useEffect(() => {
    }, []);

    const onChangeDayTo = date => {
        setEmployeeData({...employeeData, birthDay: date});
    };

    return (
        <PageContent>
            <Dimmer.Dimmable dimmed={isLoading}>
                <Form>
                    <Form.Field>
                        <Header>Информация о сотруднике</Header>
                    </Form.Field>
                    <Form.Field>
                        <Input
                            noSpaceError
                            id="secondName"
                            label="Фамилия"
                            field
                            placeholder="Фамилия"
                            input={{ maxLength: 150 }}
                            onChange={onChange}
                            validate="fio"
                            onValidationResult={onValidation}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            noSpaceError
                            id="firstName"
                            label="Имя"
                            placeholder="Имя"
                            field
                            input={{ maxLength: 150 }}
                            onChange={onChange}
                            validate="fio"
                            onValidationResult={onValidation}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            id="patronymic"
                            label="Отчество"
                            placeholder="Отчество"
                            input={{ maxLength: 150 }}
                            onChange={onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <FlexContainer style={{display: 'flex'}}>
                            <HalfSizedDiv>
                                <BaseDropdown
                                    label="Пол"
                                    placeholder="Пол"
                                    color="gray"
                                    onChange={changeGender}
                                    selection
                                    defaultValue={gender}
                                    options={GenderOptions}
                                    selectOnBlur={false}
                                />
                            </HalfSizedDiv>
                            <HalfSizedDivMargened>
                                <BaseDateInput
                                    label="Дата рождения"
                                    placeholder="Дата рождения"
                                    value={employeeData?.birthDay} onChange={onChangeDayTo}/>
                            </HalfSizedDivMargened>
                        </FlexContainer>
                    </Form.Field>
                    <Form.Field>
                        <FlexContainer>
                            <HalfSizedDiv>
                                <Input
                                    noSpaceError
                                    id="phone"
                                    label="Мобильный телефон"
                                    validate="phone"
                                    placeholder="Мобильный телефон"
                                    showMask
                                    field
                                    mask={Masks.telephone}
                                    onChange={onChange}
                                    onValidationResult={onValidation}
                                />
                            </HalfSizedDiv>
                            <HalfSizedDivMargened>
                                <Input
                                    noSpaceError
                                    id="email"
                                    label="Email"
                                    field
                                    validate="emailAddress"
                                    input={{ maxLength: 150 }}
                                    onChange={onChange}
                                    placeholder="Email (необязательно)"
                                    onValidationResult={onValidation}
                                />
                            </HalfSizedDivMargened>
                        </FlexContainer>
                    </Form.Field>
                    <Form.Field>
                        <Input
                            id="address"
                            label="Адрес постоянной регистрации"
                            input={{ maxLength: 150 }}
                            onChange={onChange}
                            placeholder="Адрес постоянной регистрации"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            id="companyName"
                            label="Название работодателя"
                            input={{ maxLength: 150 }}
                            onChange={onChange}
                            placeholder="Название работодателя"
                        />
                    </Form.Field>
                    <Form.Field>
                        <div>
                            <BaseButtonWrapper
                                disabled={!saveEnabled || isLoading}
                                onClick={() => saveEmployeeInfo(employeeData)}
                                style={{float: 'right'}}
                            >
                                СОХРАНИТЬ
                            </BaseButtonWrapper>
                        </div>
                    </Form.Field>
                </Form>
                <Dimmer active={isLoading} inverted>
                    <Loader />
                </Dimmer>
            </Dimmer.Dimmable>
        </PageContent>
    );
}

const mapStateToProps = createStructuredSelector({
    isLoading: isLoading(),
});

function mapDispatchToProps(dispatch) {
    return {
        saveEmployeeInfo: employeeInfo => dispatch(saveEmployeeInfo(employeeInfo)),
        dispatch,
    };
}

const withReducer = injectReducer({ key: 'employeeInfoPage', reducer });
const withSaga = injectSaga({ key: 'employeeInfoPage', saga, mode: DAEMON });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withSaga, withReducer)(EmployeeInfoPage);
