import { Fragment, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Stack from "@mui/material/Stack";
import { common, grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import { FiBookOpen, FiGrid, FiUser } from "react-icons/fi";
import Image from "next/legacy/image";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import {
  MdFace,
  MdLogout,
  MdOutlineContactSupport,
  MdLogin
} from "react-icons/md";
import { makeStyles } from "@mui/styles";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Typography from "@mui/material/Typography";

//app components
import LeftNavigationMenuItem from "@/components/ui/LeftNavigation/LeftNavigationMenuItem";
import { useAdmin } from "@/components/hooks/useAdmin";
import UserContext from "@/components/contexts/UserContext";
import Color from "@/components/styles/color";
import { handleSignOut } from "@/utils/helpers";

const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: Color.hex.liberty,
    color: common.white,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%"
  },
  bottomMenu: {
    display: "flex",
    flexDirection: "column"
  },
  link: {
    background: common.white,
    color: Color.hex.liberty
  },
  menuList: { display: "flex", flexFlow: "column", flexGrow: 1 },
  logout: {
    display: "flex",
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    paddingBottom: theme.spacing(5)
  },
  selectedMenuItem: {
    background: Color.hex.brightpurple,
    color: grey[200],

    "&:hover": {
      background: grey[200],
      color: Color.hex.liberty
    }
  }
}));

const LeftNavigation = ({ drawerWidth }) => {
  const classes = styles();
  const router = useRouter();
  const { pathname } = router;
  const { data: session, status } = useSession();
  const isUserAdmin = useAdmin();

  const [user, setUser] = useContext(UserContext);
  const [isUserPublisher, setUserAsPublisher] = useState(
    user?.roles?.includes("publisher") || false
  );
  const [isUserAtomAdmin, setUserAsAtomAdmin] = useState(
    user?.roles?.includes("atom-admin") || false
  );
  const [isUserTeacher, setUserAsTeacher] = useState(
    user?.roles?.includes("teacher") || false
  );

  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  useEffect(() => {
    setUserAsPublisher(user?.roles?.includes("publisher"));
    setUserAsAtomAdmin(user?.roles?.includes("atom-admin"));
    setUserAsTeacher(user?.roles?.includes("teacher"));

    const userProfile = localStorage.getItem("user");
    if (localStorage && userProfile) {
      setUser({ ...JSON.parse(userProfile) });
    }
  }, [session, setUser]);

  const navMenuItems = {
    "Account Details": {
      icon: <FiUser />,
      path: "/account/me"
    },
    Books: {
      icon: <FiGrid />,
      path: "/books"
    }
    // "My Kids": {
    //   icon: <MdFace />,
    //   path: "/account/child"
    // },
    // "My Books": {
    //   icon: <FiGrid />,
    //   path: "/account/purchases"
    // }
  };

  const publisherNavMenuItems = {
    // "Payments and Billing": {
    //   icon: <FaFileInvoiceDollar />,
    //   path: "/account/publishers"
    // }
  };

  const teacherNavMenuItems = {
    // "Manage Events": {
    //   icon: <FiBookOpen />,
    //   path: "/account/teachers"
    // }
  };

  const adminNavMenuItems = {
    "Admin - Upload Books": {
      icon: <FiUser />,
      path: "/account/admin"
    },
    "Admin - Verify Uploaded Books": {
      icon: <FiUser />,
      path: "/account/admin/books"
    },
    "Admin - Verify By Publisher": {
      icon: <FiUser />,
      path: "/account/admin/books-by-publisher"
    }
  };

  const menuList = Object.keys(navMenuItems);
  const teacherMenuList = Object.keys(teacherNavMenuItems);
  const publisherMenuList = Object.keys(publisherNavMenuItems);
  const adminMenuList = Object.keys(adminNavMenuItems);

  const handleSelectedMenuItem = (item) => {
    setSelectedMenuItem(item);
  };

  return (
    <>
      <Stack className={classes.root} sx={{ width: drawerWidth || 100 }}>
        <Link
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: "column",
            py: 2
          }}
          href="/"
        >
          <Image
            width="96"
            height="96"
            src="/static/logo/white/apple-icon-180x180.png"
            alt="atom logo"
          />
        </Link>
        <List className={classes.menuList}>
          {menuList &&
            menuList.map((text, index) => (
              <LeftNavigationMenuItem
                key={`${index}${text}`}
                isSelected={
                  // selectedMenuItem === index &&
                  pathname === navMenuItems[text].path
                }
                color={common.white}
                icon={navMenuItems[text].icon}
                className={
                  pathname === navMenuItems[text].path
                    ? classes.selectedMenuItem
                    : ""
                }
                text={text}
                to={navMenuItems[text].path}
                onClick={(e) => handleSelectedMenuItem(index)}
              />
            ))}
          {isUserTeacher &&
            teacherMenuList.map((text, index) => (
              <LeftNavigationMenuItem
                key={`${index}${text}`}
                isSelected={
                  // selectedMenuItem === index &&
                  pathname === teacherNavMenuItems[text].path
                }
                color={common.white}
                icon={teacherNavMenuItems[text].icon}
                className={
                  pathname === teacherNavMenuItems[text].path
                    ? classes.selectedMenuItem
                    : ""
                }
                text={text}
                to={teacherNavMenuItems[text].path}
                onClick={(e) => handleSelectedMenuItem(index)}
              />
            ))}
          {isUserPublisher &&
            publisherMenuList.map((text, index) => (
              <LeftNavigationMenuItem
                key={`${index}${text}`}
                isSelected={
                  // selectedMenuItem === index &&
                  pathname === publisherNavMenuItems[text].path
                }
                color={common.white}
                icon={publisherNavMenuItems[text].icon}
                className={
                  pathname === publisherNavMenuItems[text].path
                    ? classes.selectedMenuItem
                    : ""
                }
                text={text}
                to={publisherNavMenuItems[text].path}
                onClick={(e) => handleSelectedMenuItem(index)}
              />
            ))}
          {isUserAtomAdmin && (
            <Typography
              sx={{ borderTop: 1, p: 2, mt: 2 }}
              variant="body1"
            ></Typography>
          )}
          {isUserAtomAdmin &&
            adminMenuList.map((text, index) => (
              <LeftNavigationMenuItem
                key={text}
                isSelected={
                  // selectedMenuItem === index &&
                  pathname === adminNavMenuItems[text].path
                }
                color={common.white}
                icon={adminNavMenuItems[text].icon}
                className={
                  pathname === adminNavMenuItems[text].path
                    ? classes.selectedMenuItem
                    : ""
                }
                text={text}
                to={adminNavMenuItems[text].path}
                onClick={(e) => handleSelectedMenuItem(index)}
              />
            ))}

          {/* {user?.roles?.includes("publisher") && (
            <>
              <Divider sx={{ pt: 5 }} />
              <NextLink href="/publishers/admin/">
                <MaterialLink color="primary">
                  <Typography variant="h6" className={classes.link}>
                    Publishers - Set Up Stripe
                  </Typography>
                </MaterialLink>
              </NextLink>
            </>
          )}
          {user?.roles?.includes("atom-admin") && (
            <>
              <Divider sx={{ pt: 5 }} />
              <NextLink href="/admin/">
                <MaterialLink color="primary">
                  <Typography variant="h6" className={classes.link}>
                    Admin - Upload Books
                  </Typography>
                </MaterialLink>
              </NextLink>
              <NextLink href="/admin/books/">
                <MaterialLink color="primary">
                  <Typography variant="h6" className={classes.link}>
                    Admin - Verify Uploaded
                  </Typography>
                </MaterialLink>
              </NextLink>
              <NextLink href="/admin/books-by-publisher/">
                <MaterialLink color="primary">
                  <Typography variant="h6" className={classes.link}>
                    Admin - Verify By Publisher
                  </Typography>
                </MaterialLink>
              </NextLink>
            </>
          )} */}
        </List>
        <List className={classes.bottomMenu}>
          <LeftNavigationMenuItem
            className={classes.logout}
            color={common.white}
            icon={<MdOutlineContactSupport />}
            text="Support"
            to="mailto:support@atom.live"
            // onClick={(e) => handleSelectedMenuItem(index)}
          />
          {session && (
            <LeftNavigationMenuItem
              className={classes.logout}
              color={common.white}
              icon={<MdLogout />}
              text="Log Out"
              to="/books/"
              onClick={handleSignOut(session, "/books")}
            />
          )}
          {!session && (
            <LeftNavigationMenuItem
              className={classes.logout}
              color={common.white}
              icon={<MdLogin />}
              text="Log In"
              to="/sign/in?redirect=/account/"
            />
          )}
        </List>
      </Stack>
    </>
  );
};

export default LeftNavigation;
