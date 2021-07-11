import React, {Fragment} from "react";
import { Row, Col, Form, Input, Button, Typography, Steps, Divider } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router";
import { useStateMachine } from "little-state-machine";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import updateAction from "./updateAction";

const Step1 = (props) => {
    const schema = yup.object().shape({
        nombreCompleto: yup.string().required('Este campo es requerido'),
        email: yup.string().email('Email no valido').required('Este campo es requerido'),
    });
    const {formState: { errors }, handleSubmit, control, setError, setValue} = useForm({resolver: yupResolver(schema)});
    const { Text } = Typography;
    const { Step } = Steps;
    const {actions, state} = useStateMachine({updateAction});
    const onSubmit = (data, e) => {
        console.log("step1: ", data);
        actions.updateAction(data);
        props.history.push("./direccion-apartamento");
    }

    return (
        <Fragment>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                <Steps size="small" current={0}>
                    <Step title="Datos del Cliente" />
                    <Step title="Direccion del Apartamento" />
                    <Step title="Datos Monetarios del Apartamento" />
                    <Step title="Finalizado" />
                </Steps>
                </Col>
            </Row>
            <Divider />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={24}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row justify="center">
                            <Col xs={24} sm={10} pull={1}>
                                <Form.Item label="Nombre Completo">
                                    <Controller
                                    name="nombreCompleto"
                                    placeholder="Nombre Completo"
                                    defaultValue={state.data.nombreCompleto}
                                    control={control}
                                    render={({ field }) => (<Input {...field}/>)}/>
                                    {
                                        errors.nombreCompleto && 
                                        <Text type="danger">
                                            {errors.nombreCompleto.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} push={1}>
                                <Form.Item label="Email">
                                    <Controller
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={state.data.email}
                                    type="email"
                                    control={control}
                                    render={({ field }) => (<Input {...field} onChange={(e) => setValue("email", e.target.value, true)} onBlur={(e) => setValue("email", e.target.value, true)} />)}/>
                                    {
                                        errors.email && 
                                        <Text type="danger">
                                            {errors.email.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => {
                                        setError("test", { type: "focus" }, { shouldFocus: true });
                                    }}>
                                        Siguiente
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Fragment>
    );
}

export default withRouter(Step1);