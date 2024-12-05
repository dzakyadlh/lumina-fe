import { Alert } from '@mui/material';

export const ErrorAlert = ({ alertText }) => {
  return (
    <Alert
      variant="filled"
      severity="error"
      className="fixed bottom-10 right-10 bg-black"
    >
      {alertText}
    </Alert>
  );
};

export const SuccessAlert = ({ alertText }) => {
  return (
    <Alert
      variant="filled"
      severity="success"
      className="fixed bottom-10 right-10"
    >
      {alertText}
    </Alert>
  );
};

export const WarningAlert = ({ alertText }) => {
  return (
    <Alert
      variant="filled"
      severity="warning"
      className="fixed bottom-10 right-10"
    >
      {alertText}
    </Alert>
  );
};
