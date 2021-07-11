import React, { Fragment } from "react";
import { Row, Col, Steps, Divider, Typography } from 'antd';
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Resume = (props) => {
    const { state } = useStateMachine(updateAction);
    const { Step } = Steps;
    const { Paragraph } = Typography;
    
    return (
    <Fragment>
        {
            //<pre>{JSON.stringify(state, null, 2)}</pre>
        }
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
                <Steps size="small" current={3}>
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
                <Paragraph>
                    <Divider>Datos del Cliente</Divider>
                    <Row justify="center">
                        <Col xs={24} sm={20}>Nombre: {state.data.nombreCompleto}</Col>
                        <Col xs={24} sm={20}>Correo Electronico: {state.data.email}</Col>
                    </Row>
                    <Divider>Direccion del departamento</Divider>
                    <Row justify="center">
                        <Col xs={24} sm={10}>Colonia: {state.data.colonia}</Col>
                        <Col xs={24} sm={10}>Municipio: {state.data.municipio}</Col>
                        <Col xs={24} sm={10}>Calle {state.data.calle}</Col>
                        <Col xs={24} sm={10}>Codigo Postal{state.data.codigoPostal}</Col>
                        <Col xs={24} sm={20}>Piso: {state.data.piso}</Col>
                    </Row>
                    <Divider>Detalles del departamento</Divider>
                    <Row justify="center">
                        <Col xs={24} sm={10}>Zona de BBQ: {state.data.zonabbq ? "Si" : "No"}</Col>
                        <Col xs={24} sm={10}>Salon Comunal: {state.data.salonComunal ? "Si" : "No"}</Col>
                        <Col xs={24} sm={10}>Parque de Juegos: {state.data.parqueJuegos ? "Si" : "No"}</Col>
                        <Col xs={24} sm={10}>Parqueadero: {state.data.parqueadero}</Col>
                        <Col xs={24} sm={10}>Parqueadero es Techado: {state.data.parqueaderoDetalles}</Col>
                        <Col xs={24} sm={10}>Cuenta con ascensor: {state.data.ascensor}</Col>
                    </Row>
                    <Divider>Costos</Divider>
                    <Row justify="center">
                        <Col xs={24} sm={20}>Precio: {state.data.montoDepartamento}</Col>
                    </Row>
                </Paragraph>
            </Col>
        </Row>
    </Fragment>
    );
};

export default Resume;
