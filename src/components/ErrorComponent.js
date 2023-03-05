import { Button, Container } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";

function ErrorComponent({ error, resetErrorBoundary}) {
  return (
    <Container className="d-flex justify-content-center mt-5">
      <div role="alert">
        <p>Někde nastala chyba:</p>
        <pre>{error.message}</pre>
        <Button onClick={resetErrorBoundary} variant="danger">
          Zkus to znovu
        </Button>
      </div>
    </Container>
  );
}

function MyErrorBoundary(props) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorComponent}
      onReset={() => {
        props.onReset();
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
}

export default MyErrorBoundary;
