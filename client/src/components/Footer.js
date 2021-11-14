import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "black",
    color: "white",
    padding: "20px 0px",
    position: "absolute",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      marginTop: "30px",
    },
  },
  lowerLinks: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  footerButtons: {
    fontSize: "42px",
    color: "white",
    "&:hover": {
      color: "#b6b6b6",
    },
  },
  footerCopyright: {
    fontSize: "24px",
    textAlign: "center",
    paddingTop: "15px",
    [theme.breakpoints.down('sm')]: {
      paddingBottom: "10px",
    },
  },
}));

export default function Footer() {
  const { footer, lowerLinks, footerButtons, footerCopyright } = useStyles();
  return (
    <footer className={footer}>
      <Container>
        <div>
          <div className={lowerLinks}>
            <Link href="https://github.com/WebDeverDan/Public-Art-Finder" target="_blank">
              <GitHubIcon fontSize="42px" className={footerButtons} />
            </Link>
          </div>
          <div className={footerCopyright}>
            <div>© 2021 Copyright</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}