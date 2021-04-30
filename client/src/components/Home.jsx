import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import api from "../api/index";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.red,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontFamily: "Alatsi",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const TableBg = {
  backgroundColor: "#a2cf6e",
  fontFamily: "Alatsi",
  fontSize: "1.3em",
  width: "33%",
  borderBottom: "none",
};

const inputBox = {
  fontFamily: "Alatsi",
  backgroundPosition: "10px 12px",
  backgroundRepeat: "no-repeat",
  width: "100%",
  fontSize: "1em",
  padding: "12px 0px 12px 1rem",
  border: "1px solid #ddd",
};

const prvNxtStyle = {
  color: "#101010",
  borderRadius: "50%",
  display: "inline-block",
  padding: "13px 19px",
  border: "none",
};

export default function CustomizedTables() {
  const classes = useStyles();
  var [empData, setEmpData] = useState();
  const [empDataCopy, setEmpDataCopy] = useState();
  const [next, setNext] = useState(1);
  const [maxPageLength, setMaxPageLength] = useState(0);
  const [startPage, setStartPage] = useState();
  const [stopPage, setStopPage] = useState();
  var [nextBtn, nextBtnState] = useState(false);
  var [prevBtn, prevBtnState] = useState(true);
  const pageLimit = 5;

  useEffect(() => {
    api.getAllEmpData().then((response) => {
      setEmpData(response.data.data);
      setEmpDataCopy(response.data.data);
      setMaxPageLength(Math.ceil(response.data.data.length / pageLimit));
      setStartPage(0);
      setStopPage(0 + pageLimit);
    });
  }, []);

  //search by id/name
  const searchByIdAndName = (e) => {
    setNext(1);
    setStopPage(pageLimit);
    nextBtnState(true);
    prevBtnState(true);
    if (e.target.value.length === 0) {
      setEmpData(empDataCopy);
      nextBtnState(false);
    }

    let input = +e.target.value;

    if (isNaN(input)) {
      api.getEmpDataByName(e.target.value).then((res) => {
        try {
          if (res.data.data != null) {
            let responseContainer = [];
            responseContainer = [...responseContainer, ...res.data.data];
            setEmpData(responseContainer);
          }
          if (res.data.data.length === 0) {
            const NA = [{ eid: "NA", ename: "NA", esalary: "NA" }];
            setEmpData(NA);
          }
        } catch (err) {
          console.log("Not found", err);
        }
      });
    } else {
      api.getEmpDataById(e.target.value).then((res) => {
        try {
          if (res.data.data != null) {
            const responseContainer = [];
            responseContainer.push(res.data.data);
            setEmpData(responseContainer);
          } else {
            const NA = [{ eid: "NA", ename: "NA", esalary: "NA" }];
            setEmpData(NA);
          }
        } catch (err) {
          console.log("Not found", err);
        }
      });
    }
  };

  const paginationNext = () => {
    setNext(next + 1);
    prevBtnState(false);
    setStopPage(stopPage + pageLimit);
    api.getNextPageStack(stopPage).then((res) => {
      try {
        let responseContainer = res.data.data;
        setEmpData(responseContainer);
      } catch (err) {
        console.log("Not found", err);
      }
      res.data.data.map((val) => {
        if (parseInt(val.eid) === empDataCopy.length) nextBtnState(true);
      });
    });
  };

  const paginationPrev = () => {
    setNext(next - 1);
    nextBtnState(false);
    setStopPage(stopPage - pageLimit);

    api.getPrevPageStack(stopPage - pageLimit).then((res) => {
      try {
        let responseContainer = res.data.data.sort(
          (argOne, argTwo) => parseInt(argOne.eid) - parseInt(argTwo.eid)
        );
        setEmpData(responseContainer);
      } catch (err) {
        console.log("Not found", err);
      }
      res.data.data.map((val) => {
        if (parseInt(val.eid) === 1) prevBtnState(true);
      });
    });
  };

  const sortAge = (e) => {
    setNext(1);
    setStopPage(pageLimit);
    api.getSortedSalary(e.target.value).then((res) => {
      try {
        let responseContainer = res.data.data;
        setEmpData(responseContainer);
      } catch (err) {
        console.log("Not found", err);
      }
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "white" }}
              >
                <input
                  type="text"
                  onChange={searchByIdAndName}
                  placeholder="Search for id/names"
                  style={inputBox}
                />
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "white" }}
              >
                {/* <input type="text" onChange={searchName} placeholder="Search for names" /> */}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ backgroundColor: "white" }}
              >
                <select onChange={sortAge} style={inputBox}>
                  <option value="none" selected disabled hidden>
                    Filter salary
                  </option>
                  <option value="lowToHigh">Min to Max</option>
                  <option value="highToLow">Max to Min</option>
                </select>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" style={TableBg}>
                Emp ID
              </StyledTableCell>
              <StyledTableCell align="center" style={TableBg}>
                Emp Name
              </StyledTableCell>
              <StyledTableCell align="center" style={TableBg}>
                Emp Salary
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empData &&
              empData.slice(0, pageLimit).map((row) => (
                <StyledTableRow key={row.eid}>
                  <StyledTableCell align="center">{row.eid}</StyledTableCell>
                  <StyledTableCell align="center">{row.ename}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.esalary}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* pagination */}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left" style={TableBg}>
                <button
                  onClick={paginationPrev}
                  style={prvNxtStyle}
                  disabled={prevBtn}
                >
                  &#8249;
                </button>
              </StyledTableCell>
              <StyledTableCell align="center" style={TableBg}>
                Page {next} of {maxPageLength}
              </StyledTableCell>
              <StyledTableCell align="right" style={TableBg}>
                <button
                  onClick={paginationNext}
                  style={prvNxtStyle}
                  disabled={nextBtn}
                >
                  &#8250;
                </button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
