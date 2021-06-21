import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { sideNavActions } from "../../store/navigation";
import ComposeToolbarItems from "../compose/TopToolbar";
import ComposeSideSheetItems from "../interaction/compose/Side";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import { GiHamburgerMenu } from "react-icons/gi";
import { CgArrowLeftR } from "react-icons/cg";

// const searchClient = algoliasearch(
//   "7VD37OIZBX",
//   "075e3727b35d845338b30a28b5a54562"
// );

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    height: theme.mixins.toolbar.minHeight,
  },
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const [sheetOpen, setSheetOpen] = useState(false);
  const { setNavOpen } = sideNavActions;
  const dispatch = useDispatch();

  const getToolbarContent = () => {
    if (router.pathname === "/") {
      return <ComposeToolbarItems />;
    }
  };

  const getSideSheetContent = () => {
    let content = null;
    if (router.pathname === "/") {
      content = <ComposeSideSheetItems />;
    }

    if (content != null) {
      return (
        <>
          <Drawer
            anchor="right"
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
          >
            {content}
          </Drawer>
          <IconButton
            color="inherit"
            aria-label="open more information"
            onClick={() => setSheetOpen(true)}
            edge="end"
          >
            <CgArrowLeftR />
          </IconButton>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(setNavOpen(true))}
            edge="start"
          >
            <GiHamburgerMenu />
          </IconButton>
          {getToolbarContent()}
          {getSideSheetContent()}
        </Toolbar>
      </AppBar>
      <div className={classes.drawerHeader} />
    </>
  );
}