import React, { useContext, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
// import { Button, ChakraProvider, theme, CSSReset, Select, Box, Heading, Text } from '@chakra-ui/react';
import Chakra from './Chakra';
import { MdDelete } from 'react-icons/md';
import { Toaster as ToastContainer, toast } from 'react-hot-toast';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import { AppState } from './App';
import { FaDelete } from 'react-icons/fa';
import {
  ChakraProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Avatar,
  useColorMode,
  useColorModeValue,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import {
    Select,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
export default function Home() {
    const { colorMode, toggleColorMode } = useColorMode();
    const {login,user,loggedIn} = useContext(AppState);
    const bgColor = useColorModeValue('gray.200', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');
    const navHoverBg = useColorModeValue('gray.300', 'gray.700');
    console.log("home",login);
  function logout(){
    loggedIn(false,'','',{});
    toast.success("Logged Out Successfully!");
  }
    // const [fileName, setFileName] = useState('script.js');
    // const file = files[fileName];
    const [fname, setName] = useState('main.js');
    // const [project,setProject] = useState('');
    const { setProjects } = useContext(AppState);
    const [output, setOutput] = useState('Output');
    const [code, setCode] = useState('//write code here');
    const [language, setLanguage] = useState('javascript');
    const { userId, userName, projects } = useContext(AppState);
    const RunCode = async () => {
        try {
            console.log(code, " ", language)
            if (code === "//write code here") {
                toast("Nothing to Run!", {
                    icon: '🧿',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
                return;
            }
            const res = await axios.post('http://localhost:8000/file/runcode', { code, language });
            toast('Code Ran Successfully', {
                icon: '🚀',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            console.log(res.data);
            setOutput(res.data.output);
        }
        catch (e) {
            setOutput("Error Running Code!");
            console.log(e);
        }
    }
    const getFile = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/file/getfile', { userId: id });
            console.log(res.data);
            setProjects(res.data.files);
        }
        catch (e) {
            console.log(e);
        }
    }
    const deleteFile = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/file/deletefile', { userId: userId, fileId: id });
            console.log(res.data);
            setProjects(res.data.files);
            if (projects.length === 0) { setCode("//write code here"); }
        }
        catch (e) {
            console.log(e);
        }
    }
    const createAndUploadFile = () => {
        const content = code;
        const formData = new FormData();
        formData.append('file', new Blob([content], { type: `text/${language}` }), `main.${language}`);
        console.log("form: ", content);
        const project = prompt("Enter Project Name", `main.${language}`);
        formData.append('name', project);
        formData.append('userId', userId);
        formData.append('userName', userName);
        console.log(project);
        if(!project){
            toast.error("Couldn't saved file try again with valid project name");
            return;
        }
        axios.post('http://localhost:8000/file/savefile', formData)
            .then(response => {
                console.log(response.data);
                getFile(userId);
                toast.success("Saved File to Records!", { style: { backgroundColor: 'black', color: 'white' } })
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    return (
        <>

            <Routes>
                <Route path='/login' element={<Signin />} />
            </Routes>
            <ToastContainer />
            <Flex
                as="nav"
                align="center"
                wrap="wrap"
                padding="1.5rem"
                paddingLeft={4}
                bg={bgColor}
                color={color}
            >
                <Flex align="center" mr={5}>
                    <Text as={Link} to="/" fontSize="2xl" fontWeight="bold" letterSpacing="wide">
                        Code Manager
                    </Text>
                </Flex>
                {/* <button disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')}>
          script.js
        </button>
        <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')}>
          style.css
        </button>
        <button disabled={fileName === 'index.html'} onClick={() => setFileName('index.html')}>
          index.html
        </button> */}'
                <ChakraProvider theme={theme}>
                    {/* <Button colorScheme='teal' m='2' ml='2' onClick={() => setName(language === 'javascript' ? "main.js" : "main.py")}>
                        {language === 'javascript' ? "main.js" : "main.py"}
                    </Button> */}
                    <Button colorScheme='teal' m='2' onClick={() => {
                        RunCode()
                    }}>
                        Run
                    </Button>
                    {login && <Menu>
                        <MenuButton colorScheme='teal' as={Button}>
                            My Projects
                        </MenuButton>
                        <MenuList>
                            {projects.map((e, i) => {
                                return (
                                    <MenuItem onClick={() => {
                                        setCode(e.data);
                                        let str = e.contentType.substr(5, e.contentType.length);
                                        console.log(str);
                                        setLanguage(str);
                                    }} key={i}><Text w={'90%'}>{e.name}</Text> <MdDelete size={22} alignmentBaseline='end' onClick={() => {
                                        deleteFile(e._id);
                                    }} /></MenuItem>
                                )
                            })}
                        </MenuList>
                    </Menu>}
                    <Button colorScheme='teal' m='2' onClick={() => {
                        createAndUploadFile();
                    }}>
                        Save File
                    </Button>
                    <Button colorScheme='teal' onClick={() => {
                        setCode('//write code here');
                        toast.success("Opened New File !", { style: { backgroundColor: 'black', color: 'white' } })
                    }}>
                        + Create New File
                    </Button>
                    <label htmlFor='language'>
                        <Select display={'flex'} width={'10vw'} border={'1px solid grey'} m='2' ml='2' onChange={(e) => setLanguage(e.target.value)} value={language}>
                            <option>Select language</option>
                            <option value="javascript">javaScript</option>
                            <option value="python">python</option>
                        </Select>
                    </label>
                </ChakraProvider>
                <Spacer/>
                <Box display={{ base: 'none', md: 'flex' }}>
                    {login ? (
                        <Menu>
                            <MenuButton  >

                                <Avatar size="md" name="User Name" onClick={() => {
                                    console.log(user.picture);
                                }} src={user.picture} />
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Profile'>
                                    <MenuItem  ><Link to={'profile'}>My Account</Link></MenuItem>
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
                            <Button as={Link} to="/login" variant="ghost" _hover={{ bg: navHoverBg }}>
                                Sign In
                            </Button>
                            <Button as={Link} to="/register" colorScheme="teal" _hover={{ bg: 'teal.500' }}>
                                Sign Up
                            </Button>
                        </>
                    )}
            </Box>
            </Flex>
                <div style={{ display: 'flex' }}>
                    <div>
                        <Editor
                            height="93.4vh"
                            theme="vs-dark"
                            width={'60vw'}
                            value={code}
                            onChange={(newCode) => {
                                setCode(newCode)
                                console.log(newCode)
                            }}
                            path={fname}
                            language={language}
                        />
                    </div>
                    <div>

                        <Editor
                            height="93.4vh"
                            theme="vs-dark"
                            width={'40vw'}
                            value={output}
                            disabled
                            defaultLanguage={"txt"}
                        />
                    </div>
                </div>
                
            
            </>
            );
}
const NavLinks = ({ to, children }) => (
    <Link
        as={Link}
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
