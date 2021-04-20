import React, {useCallback, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Form, Header} from "semantic-ui-react";
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
import dateFns from "date-fns";
import {formatDate} from "../../helpers/Dates";
import { FlexContainer, HalfSizedDiv, PageContent, HalfSizedDivMargened } from './Wrappers';

export function EmployeeInfoPage(props: {
    saveEmployeeInfo: (employeeInfo: EmployeeInfo) => void;
}) {
    const {
        saveEmployeeInfo
    } = props;

    const [selectedDayTo, setSelectedDayTo] = useState(formatDate(dateFns.endOfMonth(new Date())));
    const [employeeData, setEmployeeData] = useState<EmployeeInfo>();

    const onChange = ({ target: { id, value } }) => {
        setEmployeeData({ ...employeeData, [id]: value });
    };

    useEffect(() => {
    }, []);

    const onChangeDayTo = useCallback(
        date => {
            setSelectedDayTo(date);
        },
        [],
    );

    return (
        <PageContent>
            <Form>
                <Form.Field>
                    <Header>Информация о сотруднике</Header>
                </Form.Field>
                <Form.Field>
                    <Input
                        id="lastName"
                        label="Фамилия"
                        placeholder="Фамилия"
                        input={{ maxLength: 150 }}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        id="firstName"
                        label="Имя"
                        placeholder="Имя"
                        input={{ maxLength: 150 }}
                        onChange={onChange}
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
                            <Input
                                id="gender"
                                label="Пол"
                                placeholder="Пол"
                            />
                        </HalfSizedDiv>
                        <HalfSizedDivMargened>
                            <BaseDateInput
                                placeholder="Дата рождения"
                                value={selectedDayTo} onChange={onChangeDayTo}/>
                        </HalfSizedDivMargened>
                    </FlexContainer>
                </Form.Field>
                <Form.Field>
                    <FlexContainer>
                        <HalfSizedDiv>
                            <Input
                                id="phone"
                                label="Мобильный телефон"
                                placeholder="Мобильный телефон"
                                showMask
                                mask={Masks.telephone}
                                onChange={onChange}
                            />
                        </HalfSizedDiv>
                        <HalfSizedDivMargened>
                            <Input
                                id="email"
                                label="Email"
                                input={{ maxLength: 150 }}
                                onChange={onChange}
                                placeholder="Email (необязательно)"
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
                            onClick={() => saveEmployeeInfo(employeeData)}
                            style={{float: 'right'}}
                        >
                            СОХРАНИТЬ
                        </BaseButtonWrapper>
                    </div>
                </Form.Field>
            </Form>
        </PageContent>
    );
}

const mapStateToProps = createStructuredSelector({

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
