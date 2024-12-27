import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import { Box, Button, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';

import { initialAdvertisements } from '../constants';
import { TAdvertisement } from '../types/types';
import { getAdvertisements, saveAdvertisements } from '../utils/storage';
import { PRIVATE_ROUTES } from '../routes/routes';


const AdvertisementListPage: FC = () => {
  const [advertisements, setAdvertisements] = useState<TAdvertisement[]>([]);

  const history = useHistory();

  const handleDeleteItem = (id: string): void => {
    const updatedAdvertisements = advertisements.filter((advertisement) => advertisement.id !== id);
    setAdvertisements(updatedAdvertisements);

    saveAdvertisements(updatedAdvertisements);
  };

  const fetchSampleData = (): void => {
    setAdvertisements(initialAdvertisements);
    saveAdvertisements(initialAdvertisements);
  };

  const handleNavigateToAddPage = () => history.push(PRIVATE_ROUTES.NEW_ADVERTISEMENT);
  const handleNavigateToEditPage = (id: string) => history.push(PRIVATE_ROUTES.EDIT_ADVERTISEMENT(id));

  useEffect(() => {
    const storedAdvertisements = getAdvertisements();
    setAdvertisements(storedAdvertisements);
  }, []);

  const renderAdvertisementList = (): JSX.Element[] => 
    advertisements.map(({id, name, content, startDate, endDate}) => (
      <ListItem key={id} divider>
        <ListItemText
          primary={name}
          secondary={`From ${startDate} to ${endDate}\n${content}`}
        />
        <ListItemSecondaryAction>
          {/* <Button onClick={() => handleNavigateToEditPage(id)}>
            <Edit />
          </Button> */}
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Advertisements
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNavigateToAddPage}
          style={{ marginBottom: 20 }}
        >
          Create New Advertisement
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={fetchSampleData}
          style={{ marginLeft: 20, marginBottom: 20 }}
        >
          Load Sample Data
        </Button>
        <List>{renderAdvertisementList()}</List>
      </Box>
    </Container>
  );

}

export default AdvertisementListPage;