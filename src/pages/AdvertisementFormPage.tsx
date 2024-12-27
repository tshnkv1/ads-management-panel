import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { initialFromValue } from '../constants';
import { getAdvertisements, saveAdvertisements } from '../utils/storage';
import { TAdvertisement } from '../types/types';
import { PRIVATE_ROUTES } from '../routes/routes';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const AdvertisementFormPage: React.FC = () => {
  const [validateError, setValidateError] = useState('');

  const { id }: {id: string} = useParams();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialFromValue,
  });

  useEffect(() => {
    if (id) {
      const storedAdvertisements = getAdvertisements();
      const advertisement = storedAdvertisements.find((advertisement) => advertisement.id === id);

      if (advertisement) {
        setValue('name', advertisement.name);
        setValue('content', advertisement.content);
        setValue('startDate', advertisement.startDate);
        setValue('endDate', advertisement.endDate);
      }
    }
  }, [id, setValue]);

  const validateDates = (data: TAdvertisement): boolean => {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);

    if (data.startDate < today) {
      setValidateError('Start date cannot be in the past.');
      return false;
    }
    if (data.startDate > data.endDate) {
      setValidateError('End date must be after the start date.');
      return false;
    }
    setValidateError('');
    return true;
  };
/* eslint-disable  @typescript-eslint/no-explicit-any */

  const onSubmit = (data: any): void => {
    console.log(data);
    if (!validateDates(data)) return;

    const storedAdvertisements = getAdvertisements();
    if (id) {
      const updatedAdvertisements = storedAdvertisements.map((advertisement) => 
        (advertisement.id === id ? { ...advertisement, ...data } : advertisement)
      );
      saveAdvertisements(updatedAdvertisements);
    } else {
      const newAdvertisement = { ...data, id: crypto.randomUUID() };
      saveAdvertisements([...storedAdvertisements, newAdvertisement]);
    }

    history.push(PRIVATE_ROUTES.ADVERTISEMENTS);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Advertisement' : 'Create Advertisement'}
        </Typography>
        {validateError && 
          <Typography variant="h6" gutterBottom style={{ color: 'red' }}>{validateError}</Typography>
        }
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Ad Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required', maxLength: { value: 500, message: 'Content cannot exceed 500 characters' } }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Content"
                error={!!errors.content}
                helperText={errors.content?.message}
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            rules={{ required: 'Start date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{ required: 'End date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                margin="normal"
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdvertisementFormPage;