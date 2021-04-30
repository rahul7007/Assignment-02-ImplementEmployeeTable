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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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

    // console.log("2nd",myarr)

    //implmenting search
    const  search = (e) => {
        // if(e.target.value===''){
        //     setMyarr(myarr1)
        // }
        setNext(1)
        setStopPage(5)
        nextBtnState(true)
        prevBtnState(true)
        if(e.target.value.length === 0){
            setMyarr(myarr1)
            nextBtnState(false)
            // prevBtnState(false)
        }
        api.getEmpData(e.target.value).then(res =>{
           console.log("-->",res)
           console.log("<--",res.data.success)


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
            } catch{
                console.log("Not found");
            }
        })
    }


    const  searchName = (e) => {
        // if(e.target.value===''){
        //     setMyarr(myarr1)
        // }
        setNext(1)
        setStopPage(5)
        nextBtnState(true)
        prevBtnState(true)
        if(e.target.value.length === 0){
            setMyarr(myarr1)
            nextBtnState(false)
        }
        
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


    //search for id/name
    const  searchByIdAndName = (e) => {
        setNext(1)
        setStopPage(5)
        nextBtnState(true)
        prevBtnState(true)
        if(e.target.value.length === 0){
            setMyarr(myarr1)
            nextBtnState(false)
        }

        var input = +e.target.value



        if(isNaN(input)){
            // alert(input)
            // alert("its a string")
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
            // alert(input)
            // alert("its a number")
            api.getEmpDataById(e.target.value).then(res =>{
                console.log("-->",res)
                console.log("<--",res.data.success)
     
     
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
        
        // api.getEmpDataByName(e.target.value).then(res =>{
        //     try{
        //         console.log("Response against name:",res.data.data)
        //         if(res.data.data != null){
        //             let pqr = []
        //             pqr = [...pqr, ...res.data.data]
        //             setMyarr(pqr)
        //         } if(res.data.data.length === 0){
        //             const abc = [ 
        //                 { eid: 'NA', ename: 'NA', eage: 'NA' }
        //              ]
        //              setMyarr(abc)
        //         }
        //     } catch{
        //         console.log("Not found");
        //     }
        // })
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
        console.log("we'll display from",stopPage-5)

        setNext(next-1)
        nextBtnState(false)
        setStopPage(stopPage-5)
    
        api.getPrevPageStack(stopPage-5).then(res =>{
            console.log("page prev res:", res.data.data);
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
        api.getSortedAge(e.target.value).then(res =>{
            try{
                console.log("Response against age:",res.data.data)
                let pqr= res.data.data
                setMyarr(pqr)
                console.log("My Arr from sortAge", myarr)
            } catch{
                console.log("Not found");
            }
        })
        
    }


  

  return(
    <>
    {/* <input type="text" onChange={search} placeholder="Search for id/names" />
    <input type="text" onChange={searchName} placeholder="Search for names" />
    <select onChange={sortAge}>
        <option value='lowToHigh'>Low to High</option>
        <option value='highToLow'>High to Low</option>
    </select> */}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
            <TableRow>
            <StyledTableCell align="center">
            <input type="text" onChange={searchByIdAndName} placeholder="Search for id/names" />
            </StyledTableCell>
            <StyledTableCell align="center">
            <input type="text" onChange={searchName} placeholder="Search for names" />
            </StyledTableCell>
            <StyledTableCell align="center">
            <select onChange={sortAge}>
                <option value='lowToHigh'>Low to High</option>
                <option value='highToLow'>High to Low</option>
            </select>    
            </StyledTableCell>                
                
            </TableRow> 
          <TableRow>
            <StyledTableCell align="center">Emp ID</StyledTableCell>
            <StyledTableCell align="center">Emp Name</StyledTableCell>
            <StyledTableCell align="center">Emp Age</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {console.log("3rd myarr is:",myarr)} */}

          {myarr !== undefined ? myarr.slice(0, 5).map((row) => (
            <StyledTableRow key={row.eid}>
              <StyledTableCell align="center">{row.eid}</StyledTableCell>
              <StyledTableCell align="center">{row.ename}</StyledTableCell>
              <StyledTableCell align="center">{row.eage}</StyledTableCell>
            </StyledTableRow>
          )) : null}
        </TableBody>
      </Table> 
    </TableContainer>
       {/* pagination */}

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">
                <button onClick={paginationPrev} disabled={prevBtn}>Prev</button>
            </StyledTableCell>
            <StyledTableCell align="right">
                Page {next} of {maxPageLength} &emsp;&emsp;&emsp;
                <button onClick={paginationNext} disabled={nextBtn} >Next</button>
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