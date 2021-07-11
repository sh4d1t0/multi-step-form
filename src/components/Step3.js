import React, {Fragment, useState} from "react";
import { Row, Col, Form, Button, Typography, InputNumber, Steps, Divider, Modal, Upload, Space } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router";
import { useStateMachine } from "little-state-machine";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import updateAction from "./updateAction";
import Resume from "./Resume";

const Step3 = (props) => {
    const schema = yup.object().shape({
        montoDepartamento: yup.string().required('Este campo es requerido').nullable(),
    });
    const {formState: { errors }, handleSubmit, control} = useForm({resolver: yupResolver(schema)});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Text } = Typography;
    const { Step } = Steps;
    const {actions, state} = useStateMachine({updateAction});
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onSubmit = (data, e) => {
        console.log("step3: ", data);
        actions.updateAction(data);
        props.history.push("./envio-exitoso");
    }

    return (
        <Fragment>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                <Steps size="small" current={2}>
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
                        <Form.Item label="Monto de Venta">
                            <Controller
                            name="montoDepartamento"
                            control={control}
                            render={({ field }) => (<InputNumber {...field} defaultValue={state.data.montoDepartamento} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />)}/>
                            {
                                errors.montoDepartamento && 
                                <Text type="danger">
                                    {errors.montoDepartamento.message}
                                </Text>
                            }
                        </Form.Item>
                        <Form.Item>
                            <Space direction="vertical" style={{ width: '100%' }} size="large">
                                <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                maxCount={1}
                                >
                                <Button>Subir Imagen</Button>
                                </Upload>
                            </Space>
                        </Form.Item>
                        <Row>
                            <Col flex="auto"></Col>
                            <Col xs={2} style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={showModal}>
                                Ver Resumen
                            </Button>
                            <Modal title="Resumen de Datos" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <Resume />
                            </Modal>
                            </Col>
                            <Col xs={2} style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">Siguiente</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Fragment>
    );
}

export default withRouter(Step3);