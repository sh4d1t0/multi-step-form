import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { DevTool } from 'little-state-machine-devtools';
import { Row, Col } from "antd";
import 'antd/dist/antd.css';
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Resume from './components/Resume';

createStore({
  data: {
    nombreCompleto: "",
    email: "",
    calle: "",
    colonia: "",
    municipio: "",
    codigoPostal: "",
    piso: "",
    zonabbq: false,
    salonComunal: false,
    parqueJuegos: false,
    parqueadero: "no",
    parqueaderoDetalles: "no",
    ascensor: "no",
    montoDepartamento: 1000,
  }
});

function App() {
  return (
    <StateMachineProvider>
      <DevTool />
      <Row justify="center">
        <Col span={20} style={{ textAlign: 'center' }}><h1>Registro</h1></Col>
      </Row>
      <Row justify="center">
          <Col span={20}>
            <Router>
              <Route exact path="/" component={Step1} />
              <Route path="/datos-cliente" component={Step1} />
              <Route path="/direccion-apartamento" component={Step2} />
              <Route path="/datos-apartamento" component={Step3} />
              <Route path="/envio-exitoso" component={Resume} />
            </Router>
          </Col>
      </Row>
    </StateMachineProvider>
  );
}

export default App;
