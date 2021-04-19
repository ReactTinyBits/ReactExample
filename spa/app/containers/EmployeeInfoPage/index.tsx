import React, {useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form } from "semantic-ui-react";
import Input from "../../components/_common/Input";
import {Masks} from "../../helpers/Masks";
import { BaseButtonWrapper } from 'components/_common/Button/Wrappers';


export function EmployeeInfoPage(props: {

}) {
    const {
    } = props;

    const [presetName, setPresetName] = useState<string | null>(null);

    return (
        <div style={{ width: '35rem'}}>
            <Form>
                <Form.Field>
                    <div style={{marginBottom: '1rem', fontWeight: 'bold', color: 'rgba(51,51,51,255)', fontSize: '1.5rem'}}>Информация о сотруднике</div>
                </Form.Field>
                <Form.Field>
                    <Input placeholder="Фамилия" input={{ maxLength: 150 }} onChange={({ target: { value } }) => setPresetName(value)}/>
                </Form.Field>
                <Form.Field>
                    <Input placeholder="Имя" input={{ maxLength: 150 }} onChange={({ target: { value } }) => setPresetName(value)}/>
                </Form.Field>
                <Form.Field>
                    <Input placeholder="Отчество" input={{ maxLength: 150 }} onChange={({ target: { value } }) => setPresetName(value)}/>
                </Form.Field>
                <Form.Field>
                    <div style={{display: 'flex'}}>
                        <div style={{ flex: 1 }}>
                            <Input onChange={({ target: { value } }) => setPresetName(value)}/>
                        </div>
                        <div style={{ flex: 1, marginLeft: '1.5rem'}}>
                            <Input input={{ maxLength: 150 }} onChange={({ target: { value } }) => setPresetName(value)}/>
                        </div>
                    </div>
                </Form.Field>
                <Form.Field>
                    <div style={{display: 'flex'}}>
                        <div style={{ flex: 1 }}>
                            <Input
                                placeholder="Мобильный телефон"
                                showMask
                                mask={Masks.telephone}
                                onChange={({ target: { value } }) => setPresetName(value)}/>
                        </div>
                        <div style={{ flex: 1, marginLeft: '1.5rem'}}>
                            <Input
                                input={{ maxLength: 150 }}
                                onChange={({ target: { value } }) => setPresetName(value)}
                                placeholder="Email (необязательно)"
                            />
                        </div>
                    </div>
                </Form.Field>
                <Form.Field>
                    <Input
                        input={{ maxLength: 150 }}
                        onChange={({ target: { value } }) => setPresetName(value)}
                        placeholder="Адрес постоянной регистрации"
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        input={{ maxLength: 150 }}
                        onChange={({ target: { value } }) => setPresetName(value)}
                        placeholder="Название работодателя"
                    />
                </Form.Field>
                <Form.Field>
                    <div>
                        <BaseButtonWrapper style={{float: 'right'}}>СОХРАНИТЬ</BaseButtonWrapper>
                    </div>
                </Form.Field>
            </Form>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EmployeeInfoPage);
