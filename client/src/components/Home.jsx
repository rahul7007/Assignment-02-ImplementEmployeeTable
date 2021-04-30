import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import api from '../api/index'
import './Style.css'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.red,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Alatsi',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
});

const TableBg = {
    backgroundColor: '#a2cf6e',
    fontFamily: 'Alatsi',
    fontSize:'1.3em',
    width: '33%',
    borderBottom: 'none'
}

const inputBox = {
    fontFamily: 'Alatsi',
    backgroundPosition: '10px 12px', /* Position the search icon */
    backgroundRepeat: 'no-repeat', /* Do not repeat the icon image */
    width: '100%', /* Full-width */
    fontSize: '1em', /* Increase font-size */
    padding: '12px 0px 12px 1rem', /* Add some padding */
    border: '1px solid #ddd', /* Add a grey border */
  }

  const prvNxtStyle = {
    color: '#101010',
    borderRadius: '50%',
    display: 'inline-block',
    padding: '13px 19px',
    border: 'none'
  }

export default function CustomizedTables() {

    const classes = useStyles();
    var [myarr, setMyarr] = useState()
    const [myarr1, setMyarr1] = useState()
    const [next, setNext] = useState(1)
    const [maxPageLength, setMaxPageLength] = useState(0)
    const [startPage, setStartPage] = useState()
    const [stopPage, setStopPage] = useState()
    var [nextBtn,nextBtnState] = useState(false)
    var [prevBtn,prevBtnState] = useState(true)


    useEffect(() => {
        api.getAllEmpData().then(response => {
            setMyarr(response.data.data)
            setMyarr1(response.data.data)
            setMaxPageLength(Math.ceil(response.data.data.length/5))
            setStartPage(0)
            setStopPage(0+5)
        })
    }, [])


    //search by id/name
    const  searchByIdAndName = (e) => {
        setNext(1)
        setStopPage(5)
        nextBtnState(true)
        prevBtnState(true)
        if(e.target.value.length === 0){
            setMyarr(myarr1)
            nextBtnState(false)
        }

        let input = +e.target.value

        if(isNaN(input)){
            api.getEmpDataByName(e.target.value).then(res =>{
                try{
                    console.log("Response against name:",res.data.data)
                    if(res.data.data != null){
                        let pqr = []
                        pqr = [...pqr, ...res.data.data]
                        setMyarr(pqr)
                    } if(res.data.data.length === 0){
                        const abc = [ 
                            { eid: 'NA', ename: 'NA', eage: 'NA' }
                         ]
                         setMyarr(abc)
                    }
                } catch{
                    console.log("Not found");
                }
            })            
        }
        else{
            api.getEmpDataById(e.target.value).then(res =>{
     
     
                 try{
                     console.log("Response against id:",res.data.data)
                     if(res.data.data != null){
                         const pqr = []
                         pqr.push(res.data.data)
                         setMyarr(pqr)
                     } else{
                         const abc = [ 
                             { eid: 'NA', ename: 'NA', eage: 'NA' }
                          ]
                          setMyarr(abc)
                     }
                 } catch(err){
                     console.log("Not found", err);
                 }
             })            
        }
    }




    const paginationNext = () => {
        setNext(next+1)
        prevBtnState(false)
        setStopPage(stopPage+5)
        api.getNextPageStack(stopPage).then(res =>{
            try{
                let pqr= res.data.data
                setMyarr(pqr)
            } catch{
                console.log("Not found");
            }
            res.data.data.map((val)=>{
                if(parseInt(val.eid) === myarr1.length)
                    nextBtnState(true)
            })
        })
    }


    const paginationPrev = () => {

        setNext(next-1)
        nextBtnState(false)
        setStopPage(stopPage-5)
    
        api.getPrevPageStack(stopPage-5).then(res =>{
            try{
                let pqr= res.data.data.sort((argOne, argTwo) => parseInt(argOne.eid) - parseInt(argTwo.eid))
                setMyarr(pqr)
            } catch{
                console.log("Not found");
            }   
            res.data.data.map((val)=>{
                let temp = parseInt(val.eid)
                console.log(temp);
                if(temp === 1)
                    prevBtnState(true)
            })         
        })
    }

    const sortAge = (e) => {
        setNext(1)
        setStopPage(5)
        api.getSortedAge(e.target.value).then(res =>{
            try{
                let pqr= res.data.data
                setMyarr(pqr)
            } catch{
                console.log("Not found");
            }
        })
        
    }


  

  return(
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
            <TableRow>
            <StyledTableCell align="center" style={{backgroundColor:'white'}}>
                <input type="text" onChange={searchByIdAndName} placeholder="Search for id/names" style={inputBox}/>
                </StyledTableCell>
                <StyledTableCell align="center" style={{backgroundColor:'white'}}>
                {/* <input type="text" onChange={searchName} placeholder="Search for names" /> */}
                </StyledTableCell>
                <StyledTableCell align="center" style={{backgroundColor:'white'}}>
                <select onChange={sortAge} style={inputBox} defaultValue="Sort">
                    <option value='lowToHigh'>Low to High</option>
                    <option value='highToLow'>High to Low</option>
                </select>    
            </StyledTableCell>                
                
            </TableRow> 
          <TableRow>
            <StyledTableCell align="center" style={TableBg}>Emp ID</StyledTableCell>
            <StyledTableCell align="center" style={TableBg}>Emp Name</StyledTableCell>
            <StyledTableCell align="center" style={TableBg}>Emp Age</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {myarr && myarr.slice(0, 5).map((row) => (
            <StyledTableRow key={row.eid}>
              <StyledTableCell align="center">{row.eid}</StyledTableCell>
              <StyledTableCell align="center">{row.ename}</StyledTableCell>
              <StyledTableCell align="center">{row.eage}</StyledTableCell>
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
                <button onClick={paginationPrev} style={prvNxtStyle} disabled={prevBtn}>&#8249;</button>
            </StyledTableCell>
            <StyledTableCell align="center" style={TableBg}>
                Page {next} of {maxPageLength}
            </StyledTableCell>
            <StyledTableCell align="right" style={TableBg}>
                <button onClick={paginationNext} style={prvNxtStyle} disabled={nextBtn} >&#8250;</button>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table> 
    </TableContainer>

    </>
  );
}