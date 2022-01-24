import { Container, Row, Col, Image } from "react-bootstrap";

export default function Auth() {
  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <Image
              // src={ImgDumbMerch}
              className="img-fluid"
              style={{ width: "264px", height: "264px" }}
            />
            <div className="text-auth-header mt-4">Easy, Fast and Reliable</div>
            <p className="text-auth-parag mt-3">
              Go shopping for merchandise, just go to dumb merch <br />{" "}
              shopping. the biggest merchandise in <b>Indonesia</b>
            </p>
            <div className="mt-5">
              <button
                // onClick={switchLogin}
                className="btn btn-login px-5"
              >
                Login
              </button>
              <button
                // onClick={switchRegister}
                className="btn btn-register px-5"
              >
                Register
              </button>
            </div>
          </Col>
          {/* <Col md="6">{isRegister ? <Register /> : <Login />}</Col> */}
        </Row>
      </Container>
    </div>
  );
}
