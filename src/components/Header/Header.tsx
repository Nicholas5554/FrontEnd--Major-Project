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
        <Navbar fluid className="w-full overflow-x-auto list-none shadow bg-slate-200 dark:bg-gray-900">
            <Navbar.Link className="flex flex-row gap-2">
                <img src="/dark-mouse.jpeg" alt="dark-mouse" className="w-[40px] h-[40px]" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">NEX</span>
            </Navbar.Link>

            <Navbar.Toggle />
            <Navbar.Collapse>

                {loc !== "/" && loc !== "/about" && loc !== "/profile" && loc !== "/createtask" && loc !== "/creatediscussion" && loc !== "/login" && loc !== "/register" && loc !== "/addworker" && <Navbar.Brand >
                    <TextInput rightIcon={FaSearch} onChange={search} />
                </Navbar.Brand>}

                <DarkThemeToggle className="mt-1" />

                {!user && <Navbar.Link as={Link} href="/" to="/" active={loc === '/'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 text-lg mt-2">
                    Home
                </Navbar.Link>}

                <Navbar.Link as={Link} href="/about" to="/about" active={loc === '/about'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 text-lg mt-2">
                    About
                </Navbar.Link>

                {user && (<Navbar.Link as={Link} href="/profile" to="/profile" active={loc === '/profile'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 text-lg mt-2">
                    Profile
                </Navbar.Link>)}


                {user && <Dropdown label="Workers" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user?.isManager && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/addworker" to="/addworker" active={loc === '/addworker'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                Add Worker
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                    {user?.isManager && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/myworkers" to="/myworkers" active={loc === '/myworkers'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                My Assigned Workers
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                </Dropdown>}

                {user && <Dropdown label="Tasks" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user?.isManager && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/createtask" to="/createtask" active={loc === '/createtask'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                Create Task
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                    {user?.isManager && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/mytasks" to="/mytasks" active={loc === '/mytasks'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                My Created Tasks
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/myassignedtasks" to="/myassignedtasks" active={loc === '/myassignedtasks'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                My Assigned Tasks
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                </Dropdown>}

                {user && <Dropdown label="Discussions" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user.isManager && <DropdownItem>
                        <Navbar.Link as={Link} href="/creatediscussion" to="/creatediscussion" active={loc === '/creatediscussion'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                            Create Discussion
                        </Navbar.Link>
                    </DropdownItem>}

                    {user.isManager && <DropdownItem>
                        <Navbar.Link as={Link} href="/mycreateddiscussions" to="/mycreateddiscussions" active={loc === '/mycreateddiscussions'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                            My Created Discussions
                        </Navbar.Link>
                    </DropdownItem>}

                    {user && <DropdownItem className="">
                        <Navbar.Link as={Link} href="/mydiscussions" to="/mydiscussions" active={loc === '/mydiscussions'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                            My Discussions
                        </Navbar.Link>
                    </DropdownItem>}
                </Dropdown>}

                {user?.isAdmin && <Dropdown label="Crm's" style={{
                    background: "#3b4450", color: "white", fontWeight: "bold"
                }}>
                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/crm" to="/crm" active={loc === '/crm'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                Users Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/taskscrm" to="/taskscrm" active={loc === '/taskscrm'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                Tasks Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}

                    {user?.isAdmin && (
                        <DropdownItem>
                            <Navbar.Link as={Link} href="/discussionscrm" to="/discussionscrm" active={loc === '/discussionscrm'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 text-lg">
                                Discussions Crm
                            </Navbar.Link>
                        </DropdownItem>
                    )}
                </Dropdown>}

                {!user && (<Navbar.Link as={Link} href="/register" to="/register" active={loc === '/register'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 text-lg mt-2">
                    Register
                </Navbar.Link>)}

                {!user && (
                    <Navbar.Link as={Link} href="/login" to="/login" active={loc === '/login'} className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 text-lg mt-2">
                        Login
                    </Navbar.Link>
                )}

                {user && (
                    <Navbar.Link className="relative hover:after:w-full after:absolute after:left-0 after:-bottom-1 
           after:h-[2px] after:w-0 after:bg-red-600 after:transition-all after:duration-300 text-lg cursor-pointer mt-2"
                        onClick={logout}
                        style={{
                            color: "crimson", fontWeight: "bold"
                        }}>
                        Logout
                    </Navbar.Link>
                )}

            </Navbar.Collapse>

        </Navbar >
    );
};

export default Header;