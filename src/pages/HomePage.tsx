import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Typography } from '@material-ui/core';
import axios from 'axios';

import { API_KEYS, API_URL } from '../constants';
import { PRIVATE_ROUTES } from '../routes/routes';

const HomePage: FC = (): JSX.Element => {
  const [quote, setQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchQuote = () => {
    axios
        .get(API_URL, {
          headers: { 'X-Api-Key': API_KEYS.QUOTES_API_KEY },
        })
        .then((response) => {
          setQuote(response.data[0].quote);
        })
        .catch(() => {
          setQuote('Stay positive');
        })
        .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchQuote();
    }, []);

    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          {isLoading ? <CircularProgress /> : <Typography variant="h6">{quote}</Typography>}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            component={Link}
            to={PRIVATE_ROUTES.ADVERTISEMENTS}
            >
            Go to Advertisement Panel
          </Button>
        </Box>
      </Container>
      
    );
}

export default HomePage;