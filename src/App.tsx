
import Footer from "./components/Footer/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./components/Shared/RouteGuard";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "./Store/bigPie";
import TaskDetails from "./Pages/TaskDetails/TaskDetails";
import CreateTask from "./Pages/CreateTask/CreateTask";
import EditTask from "./Pages/EditTask/EditTask";
import EditUserDetails from "./Pages/EditUserDetails/EditUserDetails";
import Crm from "./Pages/UsersCrm/UsersCrm";
import MyAssignedTasks from "./Pages/MyAssignedTasks/MyAssignedTasks";
import TasksCrm from "./Pages/TaskCrm/TaskCrm";
import DiscussionsCrm from "./Pages/DiscussionCrm/DiscussionCrm";
import MyCreatedTasks from "./Pages/MyCreatedTasks/MyCreatedTasks";
import MyCreatedDiscussions from "./Pages/MyCreatedDiscussions/MyCreatedDiscussions";
import DiscussionDetails from "./Pages/DiscussionDetails/DiscussionDetails";
import EditDiscussionDetails from "./Pages/EditDiscussion/EditDiscussion";
import CreateDiscussion from "./Pages/CreateDiscussion/CreateDiscussion";
import MyDiscussions from "./Pages/MyDiscussions/MyDiscussions";
import ShowComments from "./Pages/ShowComments/ShowComments";
import { useEffect, useState } from "react";
import { userActions } from "./Store/userSlice";
import axios from "axios";
import AddWorker from "./Pages/AddWorker/Addworker";
import MyWorkers from "./Pages/MyWorkers/MyWorkers";

const App = () => {

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);


  const { VITE_API_URL } = import.meta.env;
  const dispatch = useDispatch();
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem("token", "");
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          axios.defaults.headers.common["x-auth-token"] = token;
          const res = await axios.get(`${VITE_API_URL}/users/me`);
          dispatch(userActions.login(res.data));
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setIsCheckingAuth(false);
    };

    fetchUser();
  }, []);

  const user = useSelector((state: TRootState) => state.userSlice.user);

  if (isCheckingAuth) {
    return <div className="mt-10 text-xl text-white">Loading...</div>;
  }

  if (location.pathname === "/" && user !== null) {
    return <Navigate to="/profile" replace />
  }

  return (
    <>
      <header className="sticky">
        <Header />
      </header>
      <main className="flex flex-col items-center justify-start min-h-screen gap-4 dark:bg-gray-800">

        <Routes>

          <Route path="/" element={<Home />} />

          {user && <Route path="/profile" element={
            <RouteGuard user={user!}>
              <Profile />
            </RouteGuard>} />}

          <Route path="/about" element={<About />} />

          {user?.isManager && <Route path="/addworker" element={
            <RouteGuard user={user!}>
              <AddWorker />
            </RouteGuard>} />}

          {user?.isManager && <Route path="/myworkers" element={
            <RouteGuard user={user!}>
              <MyWorkers />
            </RouteGuard>} />}

          <Route path="/myassignedtasks" element={
            <RouteGuard user={user!}>
              <MyAssignedTasks />
            </RouteGuard>} />

          <Route path="/mytasks" element={
            <RouteGuard user={user!}>
              <MyCreatedTasks />
            </RouteGuard>} />

          {user?.isManager && <Route path="/createtask" element={
            <RouteGuard user={user!}>
              <CreateTask />
            </RouteGuard>} />}

          <Route path="/edittask/:id" element={
            <RouteGuard user={user!}>
              <EditTask />
            </RouteGuard>} />

          <Route path="/mycreateddiscussions" element={
            <RouteGuard user={user!}>
              <MyCreatedDiscussions />
            </RouteGuard>} />

          <Route path="/mydiscussions" element={
            <RouteGuard user={user!}>
              <MyDiscussions />
            </RouteGuard>} />

          <Route path="/creatediscussion" element={
            <RouteGuard user={user!}>
              <CreateDiscussion />
            </RouteGuard>} />

          <Route path="/edituser/:id" element={
            <RouteGuard user={user!}>
              <EditUserDetails />
            </RouteGuard>} />

          <Route path="/editdiscussion/:id" element={
            <RouteGuard user={user!}>
              <EditDiscussionDetails />
            </RouteGuard>} />

          <Route path="/discussion/:id/comments" element={
            <RouteGuard user={user!}>
              <ShowComments />
            </RouteGuard>} />

          {user?.isAdmin && <Route path="/crm" element={
            <RouteGuard user={user!}>
              <Crm />
            </RouteGuard>} />}

          {user?.isAdmin && <Route path="/taskscrm" element={
            <RouteGuard user={user!}>
              <TasksCrm />
            </RouteGuard>} />}

          {user?.isAdmin && <Route path="/discussionscrm" element={
            <RouteGuard user={user!}>
              <DiscussionsCrm />
            </RouteGuard>} />}



          <Route path="/*" element={<Error />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/discussion/:id" element={<DiscussionDetails />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
