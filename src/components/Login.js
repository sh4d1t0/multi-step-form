import React, { Fragment } from "react";
import { withRouter } from 'react-router';
import { Row, Col, Button, Typography } from 'antd';

const Login = (props) => {

    const { Paragraph } = Typography;

    return (
        <Fragment>
            <Row justify="center">
                <Col>
                    <Paragraph>Esto es una landing page</Paragraph>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <a href="/datos-cliente">
                    <Button type="primary" htmlType="submit">Registrar</Button>
                    </a>
                </Col>
            </Row>
        </Fragment>
    );
};

export default withRouter(Login);