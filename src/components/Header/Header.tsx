import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { header } from "../../Hooks/header";
import { Dropdown, DropdownItem } from "flowbite-react";


const Header = () => {

    const {
        loc,
        logout,
        search,
        user
    } = header();

    return (
        <Navbar fluid className="list-none shadow bg-slate-200 dark:bg-gray-900">
            <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="flex flex-row gap-2">
                <img src="/dark-mouse.jpeg" alt="dark-mouse" className="w-[40px] h-[40px]" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">NEX</span>
            </Navbar.Link>

            <Navbar.Toggle />
            <Navbar.Collapse>

                <Navbar.Brand>
                    <TextInput rightIcon={FaSearch} onChange={search} />
                </Navbar.Brand>

                <DarkThemeToggle />

                <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="text-lg">
                    Home
                </Navbar.Link>

                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'} className="text-lg">
                    About
                </Navbar.Link>

                {user && (<Navbar.Link as={Link} href="/profile" to="/profile" active={loc === '/profile'} className="text-lg">
                    Profile
                </Navbar.Link>)}

                {user && <Dropdown label="Tasks" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user?.isManager && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/mytasks" to="/mytasks" active={loc === '/mytasks'} className="text-lg">
                                My Created Tasks
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/myassignedtasks" to="/myassignedtasks" active={loc === '/myassignedtasks'} className="text-lg">
                                my Assigned Tasks
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                </Dropdown>}

                {user && <Dropdown label="Discussions" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user && <DropdownItem>
                        <Navbar.Link as={Link} href="/mycreateddiscussions" to="/mycreateddiscussions" active={loc === '/mycreateddiscussions'} className="text-lg">
                            My Created Discussions
                        </Navbar.Link>
                    </DropdownItem>}

                    {user && <DropdownItem>
                        <Navbar.Link as={Link} href="/mydiscussions" to="/mydiscussions" active={loc === '/mydiscussions'} className="text-lg">
                            My Discussions
                        </Navbar.Link>
                    </DropdownItem>}
                </Dropdown>}

                {user && <Dropdown label="Crm's" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/crm" to="/crm" active={loc === '/crm'} className="text-lg">
                                Users Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/taskscrm" to="/taskscrm" active={loc === '/taskscrm'} className="text-lg">
                                Tasks Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/discussionscrm" to="/discussionscrm" active={loc === '/discussionscrm'} className="text-lg">
                                Discussions Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                </Dropdown>}

                {!user && (<Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'} className="text-lg">
                    Register
                </Navbar.Link>)}

                {!user && (
                    <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'} className="text-lg">
                        Login
                    </Navbar.Link>
                )}

                {user && (
                    <Navbar.Link className="text-lg cursor-pointer"
                        onClick={logout}
                        style={{
                            color: "crimson", fontWeight: "bold"
                        }}>
                        Logout
                    </Navbar.Link>
                )}

            </Navbar.Collapse>

        </Navbar>
    );
};

export default Header;