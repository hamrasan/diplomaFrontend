import { Container, CardDeck, Card, Button, Accordion } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import ErrorComponent from "../components/ErrorComponent";
import appContext from "../appContext";
import { useErrorHandler } from "react-error-boundary";


function TheHome() {
  let context = useContext(appContext);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(false);
  const handleError = useErrorHandler();

  useEffect(() => {
  }, [error]);

  return (
    <ErrorComponent onReset={ () => setError(true)}>
      <Container fluid className="pt-3 w-75">
        HELLO
      </Container>
    </ErrorComponent>
  );
}

export default TheHome;
