import React, { useContext, useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  Flex,
  Text,
  Link,
  Button,
  IconButton,
  Avatar,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Link as RouterLink, Route, Switch } from 'react-router-dom';
import { AppState } from './App';
import toast from 'react-hot-toast';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {login,user,loggedIn} = useContext(AppState);
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');
  const navHoverBg = useColorModeValue('gray.300', 'gray.700');
  function logout(){
    loggedIn(false,'','',{});
    toast.success("Logged Out Successfully!");
  }
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={bgColor}
      color={color}
    >
      <Flex align="center" mr={5}>
        <Text as={RouterLink} to="/" fontSize="2xl" fontWeight="bold" letterSpacing="wide">
          My App
        </Text>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle Color Mode"
          variant="ghost"
        />
      </Box>

      <Box
        display={{ base: 'block', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <NavLinks to="/">Home</NavLinks>
        <NavLinks to="/about">About</NavLinks>
        <NavLinks to="/services">Services</NavLinks>
        <NavLinks to="/contact">Contact</NavLinks>
      </Box>

      {/* <Box
        display={{ base: 'block', md: 'none' }}
        mt={{ base: 4, md: 0 }}
      >
        {login ? (
          <Avatar size="sm" name="User Name" src={user.picture} />
        ) : (
          <ColorModeSwitcher />
        )}
      </Box> */}

      <Box display={{ base: 'none', md: 'block' }}>
        {login ? (
            <Menu>
            <MenuButton >
              
          <Avatar size="md" name="User Name" onClick={()=>{
            console.log(user.picture);
          }} src={user.picture}/>
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem>My Account</MenuItem>
                <MenuItem>Payments </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Help'>
                <MenuItem>Docs</MenuItem>
                <MenuItem><Button colorScheme='whatsapp' onClick={logout}>Logout</Button></MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button as={RouterLink} to="/login" variant="ghost" _hover={{ bg: navHoverBg }}>
              Sign In
            </Button>
            <Button as={RouterLink} to="/register" colorScheme="teal" _hover={{ bg: 'teal.500' }}>
              Sign Up
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

const NavLinks = ({ to, children }) => (
  <Link
    as={RouterLink}
    to={to}
    p={2}
    mx={2}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.300', 'gray.700'),
    }}
  >
    {children}
  </Link>
);

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label="Toggle Color Mode"
      variant="ghost"
    />
  );
};
export default NavBar;