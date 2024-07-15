import React, { useState, useContext } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { AppState } from './App';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(AppState);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    lastname: user.lastname,
    age: user.age,
    email: user.email,
    interests: user.interests,
    bio: user.bio,
    picture: user.picture,
  });

  const toggleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., update user profile
    console.log('Form data:', formData);
    // Add logic to update the user profile
    toggleEditMode(); // Exit edit mode after submission
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          My Account {editMode ? 'Edit' : ''}
        </Heading>
        <FormControl id="picture" >
          <FormLabel>{formData.name}</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={formData.picture}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      picture: '', // Clear picture when remove button is clicked
                    }));
                  }}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" disabled={!editMode}>
                Edit Profile
              </Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" >
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            _placeholder={{ color: 'primary' }}
            color={'black'}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FormControl>
        <FormControl id="lastname" >
          <FormLabel>Lastname</FormLabel>
          <Input
            placeholder="Lastname"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FormControl>
        <FormControl id="age" >
          <FormLabel>Age</FormLabel>
          <Input
            placeholder="Age"
            _placeholder={{ color: 'gray.500' }}
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FormControl>
        <FormControl id="email" >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Your email"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FormControl>
        <FormControl id="interests" >
          <FormLabel>Interests</FormLabel>
          <Input
            placeholder="Interests"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            disabled={!editMode}
          />
        </FormControl>
        {editMode && (
          <FormControl id="bio" >
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </FormControl>
        )}
        <Stack spacing={2} direction={['column', 'row']}>
          <Button
            bg={editMode ? 'red.400' : 'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: editMode ? 'red.500' : 'blue.500',
            }}
            onClick={editMode ? toggleEditMode : handleSubmit}
          >
            {editMode ? 'Cancel' : 'Submit'}
          </Button>
          {!editMode && (
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.200',
              }}
              onClick={toggleEditMode}
            >
              Edit
            </Button>
          )}
          <Button bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.200',
              }}><Link to={'/'}>Back</Link></Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
