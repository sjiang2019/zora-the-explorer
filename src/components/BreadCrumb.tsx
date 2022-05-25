import { Box } from "grommet";
import { Link } from "react-router-dom";

interface BreadCrumbProps {
  prevPageName: string;
  prevPageLink: string;
  currentPageName: string;
}

export default function BreadCrumb(props: BreadCrumbProps): JSX.Element {
  return (
    <Box
      style={{
        fontSize: "18px",
        padding: "16px",
        border: "dashed",
        fontFamily: "papyrus",
      }}
    >
      <span>
        <Link to={props.prevPageLink} style={{ textDecoration: "none" }}>
          {props.prevPageName}
        </Link>{" "}
        / {props.currentPageName}
      </span>
    </Box>
  );
}
