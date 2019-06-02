import Dashboard from "./UserSpace/Dashboard";
import UserProfile from "./UserSpace/UserProfile";
import JobList from "./UserSpace/Listes/JobList";
import Postes from "./UserSpace/Postes";
import AddJob from "./UserSpace/Job/AddJob";
import SignIn from "./Welcom/SignIn";
import SignUp from "./Welcom/SignUp";
import Welcom from "Welcom/Welcom";
import SignUpForm from "Welcom/SignUpForm";
import Wait from "Welcom/Wait";
import UserList from "AdminSpace/UserList";
import Confirm from "Welcom/Confirm";
import Blog from "Welcom/Blog";
import AboutAs from "Welcom/AboutAs";
import WorkSpaceList from "UserSpace/Listes/WorkSpaceList";
import FreelanceList from "UserSpace/Listes/FreelanceList";
import ClientList from "UserSpace/Listes/ClientList";
import CompanyList from "UserSpace/Listes/CompanyList";
import AssociationList from "UserSpace/Listes/AssociationList";
import Account from "UserSpace/Account";
import Job from "UserSpace/Job/Job";
import AddWorkSpace from "WorkSpace/AddWorkSpace";
import WorkSpace from "WorkSpace/WorkSpace";

const dashboardRoutes = [
  {
    private: false,
    visible: true,
    path: "/profile",
    name: "Dashboard",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/addjob",
    name: "Add job",
    icon: "pe-7s-portfolio",
    component: AddJob,
    layout: "/user"
  },
  {
    private: false,
    visible: false,
    path: "/account/:id",
    name: "",
    icon: "",
    component: Account,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/job-list",
    name: "Job list",
    icon: "pe-7s-note2",
    component: JobList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/workspaces",
    name: "Workspace list",
    icon: "pe-7s-note2",
    component: WorkSpaceList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/freelances",
    name: "Freelance List",
    icon: "pe-7s-study",
    component: FreelanceList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/clients",
    name: "Client list",
    icon: "pe-7s-users",
    component: ClientList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/companies",
    name: "company list",
    icon: "pe-7s-culture",
    component: CompanyList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/associations",
    name: "Association list",
    icon: "pe-7s-network",
    component: AssociationList,
    layout: "/user"
  },
  {
    private: false,
    visible: true,
    path: "/postes",
    name: "Postes",
    icon: "pe-7s-news-paper",
    component: Postes,
    layout: "/user"
  },
  {
    private: false,
    visible: false,
    path: "/job/:job",
    name: "Jobs",
    icon: "pe-7s-news-paper",
    component: Job,
    layout: "/user"
  },
  {
    private: false,
    visible: false,
    path: "/addSpace/:job",
    name: "WorkSpace",
    icon: "pe-7s-news-paper",
    component: AddWorkSpace,
    layout: "/user"
  },
  {
    private: false,
    visible: false,
    path: "/workspace/:job",
    name: "WorkSpace",
    icon: "pe-7s-news-paper",
    component: WorkSpace,
    layout: "/user"
  }
];
/********************************************************* */
const adminRoutes = [
  {
    private: false,
    visible: true,
    path: "/dashboard",
    name: "admin",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    private: false,
    visible: true,
    path: "/account",
    name: "admin",
    icon: "pe-7s-graph",
    component: Account,
    layout: "/admin"
  },
  {
    private: false,
    visible: true,
    path: "/user-list",
    name: "User list",
    icon: "pe-7s-users",
    component: UserList,
    layout: "/admin"
  },
  {
    private: false,
    visible: true,
    path: "/job-list",
    name: "Job list",
    icon: "pe-7s-note2",
    component: JobList,
    layout: "/admin"
  },
  {
    private: false,
    visible: true,
    path: "/postes",
    name: "Postes",
    icon: "pe-7s-news-paper",
    component: Postes,
    layout: "/admin"
  },

  {
    private: false,
    visible: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: AddJob,
    layout: "/admin"
  }
];
/********************************************************* */
const homeRoutes = [
  {
    private: false,
    visible: true,
    path: "/sign-in",
    name: "Sign IN ",
    icon: "",
    component: SignIn,
    layout: "/home"
  },
  {
    private: false,
    visible: true,
    path: "/sign-up/",
    name: "Sign Up ",
    icon: " ",
    component: SignUp,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/welcom",
    name: "Welcom ",
    icon: "",
    component: Welcom,
    layout: "/home"
  },
  {
    private: false,
    visible: true,
    path: "/sign-up-form/:category",
    name: "Sign Up ",
    icon: " ",
    component: SignUpForm,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/wait",
    name: "wait ",
    icon: "",
    component: Wait,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/confirmation/:token",
    name: "confirm ",
    icon: "",
    component: Confirm,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/welcom",
    name: "Home ",
    icon: "",
    component: Welcom,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/blog",
    name: "Blog ",
    icon: "",
    component: Blog,
    layout: "/home"
  },
  {
    private: false,
    visible: false,
    path: "/about-as",
    name: "About As ",
    icon: "",
    component: AboutAs,
    layout: "/home"
  }
];
const routes = { dashboardRoutes, homeRoutes, adminRoutes };
export default routes;
