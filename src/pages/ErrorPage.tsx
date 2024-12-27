import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';

import { PUBLIC_ROUTES } from '../routes/routes';

const ErrorPage: FC = (): JSX.Element => {
  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
    >
        <Typography variant="h3" gutterBottom>
            Oops! Something went wrong.
        </Typography>
        <Button
            variant="contained"
            color="primary"
            component={Link}
            to={PUBLIC_ROUTES.HOME}
            style={{ marginTop: 20 }}
        >
            Go to Home Page
        </Button>
    </Box>
  );
};

export default ErrorPage;