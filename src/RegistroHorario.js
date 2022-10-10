import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
import "./styles/RegistroHorario.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useForm, Controller } from "react-hook-form";

function RegistroHorario() {
  const [show, setShow] = useState(false);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 140,
      height: 160,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h3>Registro de Entrada de la Corporación Venezolana de Minería</h3>
      <Container id="btn-container">
        <InputGroup className="mb-3" id="input-buscar">
          <InputGroup.Text id="basic-addon1">
            <BsSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Buscar"
            aria-label="Buscar"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button variant="success" id="btn-agregarregistro" onClick={handleShow}>
          Agregar Registro
        </Button>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Añadir registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Container id="form-container">
              <Form.Group className="mb-3" controlId="formNombres">
                <Form.Label>Nombres y Apellidos</Form.Label>
                <Controller
                  control={control}
                  name="nombres"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      autoFocus
                      placeholder="Nombres y Apellidos"
                    />
                  )}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formCedula">
                    <Form.Label>Documento de Identidad</Form.Label>
                    <Controller
                      control={control}
                      name="cedula"
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Form.Control
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder="V-12.345.678"
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Número de teléfono</Form.Label>
                    <Controller
                      control={control}
                      name="telefono"
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <Form.Control
                          type="text"
                          onChange={onChange}
                          value={value}
                          placeholder="Número de teléfono"
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formEmpresa">
                <Form.Label>Empresa</Form.Label>
                <Controller
                  control={control}
                  name="empresa"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      type="text"
                      onChange={onChange}
                      value={value}
                      placeholder="Corporación Venezolana de Minería"
                    />
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDireccion">
                <Form.Label>A dónde se dirige</Form.Label>
                <Form.Select
                  aria-label="Elija hacia dónde se dirige"
                  {...register("direccion")}
                >
                  <option>Elija hacia dónde se dirige</option>
                  <option value="comercializacion">Comercialización</option>
                  <option value="produccion">Producción</option>
                  <option value="vicepresidencia">Vicepresidencia</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formObservaciones">
                <Form.Label>Observaciones</Form.Label>
                <Controller
                  control={control}
                  name="observaciones"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Form.Control
                      as="textarea"
                      onChange={onChange}
                      value={value}
                      rows={3}
                      placeholder="Observaciones"
                    />
                  )}
                />
              </Form.Group>
              {imgSrc && <img src={imgSrc} id="webcam-photo" />}
              <Button variant="primary" type="submit" id="form-btn">
                Guardar
              </Button>
            </Container>
          </Form>
          <Container id="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="300px"
              id="webcam"
            />
            <Button onClick={capture}>Tomar foto</Button>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover id="tabla-registro">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres y Apellidos</th>
            <th>Documento de identidad</th>
            <th>Número de Teléfono</th>
            <th>Fecha</th>
            <th>Hora de entrada</th>
            <th>Hora de salida</th>
            <th>Observaciones</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>Germán Enrique Moreno Cuervo</th>
            <th>27376369</th>
            <th>04140210028</th>
            <th>28/09/2022</th>
            <th>14:24</th>
            <th>17:30</th>
            <th>Viene de parte del Comandante</th>
            <th>PNG</th>
            <th>
              <Button variant="warning" id="btn-edit">
                Editar
              </Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default RegistroHorario;
