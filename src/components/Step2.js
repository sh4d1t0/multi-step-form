import React, {Fragment, useState} from "react";
import { Row, Col, Form, Input, Button, Radio, Checkbox, Typography, InputNumber, Space, Select, Divider, Steps, Modal } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router";
import { useStateMachine } from "little-state-machine";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import updateAction from "./updateAction";
import Resume from "./Resume";

const Step2 = (props) => {
    const schema = yup.object().shape({
        calle: yup.string().required('Este campo es requerido'),
        colonia: yup.string().required('Este campo es requerido'),
        municipio: yup.string().required('Este campo es requerido'),
        codigoPostal: yup.number().positive().integer().min(10000).max(99999).required('Este campo es requerido'),
        piso: yup.number().positive().integer().max(50).required('Este campo es requerido'),
        ascensor: yup.string().required('Este campo es requerido'),
        zonabbq: yup.boolean(),
        salonComunal: yup.boolean(),
        parqueJuegos: yup.boolean(),
        parqueadero: yup.string().required('Este campo es requerido'),
        parqueaderoDetalles: yup.string().required('Este campo es requerido'),
    });
    const {formState: { errors }, handleSubmit, control} = useForm({resolver: yupResolver(schema)});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { Text } = Typography;
    const { Step } = Steps;
    const {actions, state} = useStateMachine({updateAction});
    const { Option } = Select;
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
        console.log("step2: ", data);
        actions.updateAction(data);
        props.history.push("./datos-apartamento");
    }

    return (
        <Fragment>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                <Steps size="small" current={1}>
                    <Step title="Datos del Cliente" />
                    <Step title="Direccion del Apartamento" />
                    <Step title="Datos Monetarios del Apartamento" />
                    <Step title="Finalizado" />
                </Steps>
                </Col>
            </Row>
            <Divider />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row justify="center">
                            <Col xs={24} sm={10} pull={1}>
                                <Form.Item label="Calle" rules={[{ required: true }]}>
                                    <Controller
                                    name="calle"
                                    placeholder="Calle"
                                    defaultValue={state.data.calle}
                                    control={control}
                                    render={({ field }) => (<Input {...field}/>)}/>
                                    {
                                        errors.calle && 
                                        <Text type="danger">
                                            {errors.calle.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} push={1}>
                                <Form.Item label="Colonia">
                                    <Controller
                                    name="colonia"
                                    placeholder="Colonia"
                                    defaultValue={state.data.colonia}
                                    control={control}
                                    render={({ field }) => (<Input {...field}/>)}/>
                                    {
                                        errors.colonia && 
                                        <Text type="danger">
                                            {errors.colonia.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} pull={1}>
                                <Form.Item label="Municipio">
                                    <Controller
                                    name="municipio"
                                    placeholder="Municipio"
                                    defaultValue={state.data.municipio}
                                    control={control}
                                    render={({ field }) => (<Input {...field}/>)}/>
                                    {
                                        errors.municipio && 
                                        <Text type="danger">
                                            {errors.municipio.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} push={1}>
                                <Form.Item label="Codigo Postal">
                                    <Controller
                                    name="codigoPostal"
                                    placeholder="Codigo Postal"
                                    defaultValue={state.data.codigoPostal}
                                    type="number"
                                    min="10000"
                                    max="99999"
                                    control={control}
                                    render={({ field }) => (<InputNumber {...field} min="10000" max="99999" />)}/>
                                    {
                                        errors.codigoPostal && 
                                        <Text type="danger">
                                            {errors.codigoPostal.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} pull={1}>
                                <Form.Item label="Piso">
                                    <Controller
                                    name="piso"
                                    placeholder="Piso"
                                    defaultValue={state.data.piso}
                                    type="number"
                                    min="1"
                                    max="50"
                                    control={control}
                                    render={({ field }) => (<InputNumber {...field} min="1" max="50" />)}/>
                                    {
                                        errors.piso && 
                                        <Text type="danger">
                                            {errors.piso.message}
                                        </Text>
                                    }
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10} push={1}>
                                <Form.Item label="Tiene ascensor?">
                                    <Radio.Group>
                                        <Controller
                                        name="ascensor"
                                        control={control}
                                        render={({ field }) => (
                                            <Space direction="horizontal">
                                                <Radio {...field} value={"no"} >No</Radio>
                                                <Radio {...field} value={"si"} >Si</Radio>
                                            </Space>
                                        )}/>
                                        {
                                            errors.ascensor && 
                                            <Text type="danger">
                                                {errors.ascensor.message}
                                            </Text>
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider>Detalles</Divider>
                        <Row  justify="center">
                            <Controller
                            name="zonabbq"
                            defaultValue={state.data.zonabbq}
                            control={control}
                            render={({ field }) => (
                                <Col xs={24} sm={6} pull={1}>
                                    <Checkbox {...field}>Zona BBQ</Checkbox>
                                </Col>
                            )}/>
                            {
                                errors.zonabbq && 
                                <Text type="danger">
                                    {errors.zonabbq.message}
                                </Text>
                            }
                            <Controller
                            name="salonComunal"
                            value={state.data.salonComunal}
                            control={control}
                            render={({ field }) => (
                                <Col xs={24} sm={6} pull={1}>
                                    <Checkbox {...field}>Salon Comunal</Checkbox>
                                </Col>
                            )}/>
                            {
                                errors.salonComunal && 
                                <Text type="danger">
                                    {errors.salonComunal.message}
                                </Text>
                            }
                            <Controller
                            name="parqueJuegos"
                            value={state.data.parqueJuegos}
                            control={control}
                            render={({ field }) => (
                                <Col xs={24} sm={6} pull={1}>
                                    <Checkbox {...field}>Parque de Juegos</Checkbox>
                                </Col>
                            )}/>
                            {
                                errors.parqueJuegos && 
                                <Text type="danger">
                                    {errors.parqueJuegos.message}
                                </Text>
                            }
                        </Row>
                        <Row justify="center">
                            <Col xs={24} sm={10}>
                                <Form.Item label="Tiene parqueadero?">
                                    <Radio.Group>
                                        <Controller
                                        name="parqueadero"
                                        control={control}
                                        render={({ field }) => (
                                            <Space direction="horizontal">
                                                <Radio {...field} value={"no"} >No</Radio>
                                                <Radio {...field} value={"si"} >Si</Radio>
                                            </Space>
                                        )}/>
                                        {
                                            errors.piso && 
                                            <Text type="danger">
                                                {errors.piso.message}
                                            </Text>
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={10}>
                                <Form.Item label="En caso de que si, el parqueadero es cubierto?">
                                    <Controller
                                    name="parqueaderoDetalles"
                                    defaultValue={state.data.parqueaderoDetalles}
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field}
                                            defaultValue="no"
                                        >
                                            <Option value="si">Si</Option>
                                            <Option value="no">No</Option>
                                        </Select>
                                    )}/>
                                </Form.Item>
                            </Col>
                        </Row>
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

export default withRouter(Step2);