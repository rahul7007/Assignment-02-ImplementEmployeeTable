const obj = require('../models/empModel')

insertData = (req, res) => {
    const prodData = {
        eid: req.body.eid,
        ename: req.body.ename,
        eage: req.body.eage,
    }
    obj.create(prodData)
    .then(user => {
        res.json({ status: 'Data inserted!' })
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}

getAllEmpData = async (req, res) => {
    await obj.find({}, (err, mbdetect) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mbdetect) {
            return res
                .status(404)
                .json({ success: false, error: `obj not found@` })
        }
        return res.status(200).json({ success: true, data: mbdetect })
    }).catch(err => console.log(err))
}

getEmpDataById = async (req, res) => {
    await obj.findOne({eid: req.params.id}, (err, empData) => {
    //   if (!empData) {
    //       return res
    //           .status(404)
    //           .json({ success: false, error: `Chip not found` })
    //   }
      return res.status(200).json({ success: true, data: empData })
    }).catch(err => console.log(err))
    // })
    
  }

  getEmpDataByName = async (req, res) => {
    var regexp = new RegExp("^"+ req.params.name);
    await obj.find({ename: regexp}, (err, empData) => {
      return res.status(200).json({ success: true, data: empData })
    }).catch(err => console.log(err))
    
  }

  getSortedAge = async (req, res) =>{
    if(req.params.filter == 'highToLow'){
        await obj.find({}, (err, empData) => {
            return res.status(200).json({ success: true, data: empData })
        }).sort({ eage: -1 }).catch(err => console.log(err))        
    } else{ 
        await obj.find({}, (err, empData) => {
            return res.status(200).json({ success: true, data: empData })
        }).sort({ eage: 1 }).catch(err => console.log(err))         
    }
  }

  getNextPageStack = async (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page)+5
    console.log('fromPage ',fromPage)
    console.log('topage ',toPage)
    let sendRes = []
    await obj.find({}, (err, empData) => {
        
            for(let i=fromPage; i<toPage;i++){
                if(i<empData.length)
                    sendRes.push(empData[i])
            }
        
        return res.status(200).json({ success: true, data: sendRes })
    }).catch(err => console.log(err))
}

getPrevPageStack = async (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page)-5
    console.log('fromPage ',fromPage)
    console.log('topage ',toPage)
    let sendRes = []
    await obj.find({}, (err, empData) => {
        console.log("arr len",empData.length)
        
            for(let i=fromPage-1; i>=toPage;i--){
                console.log("i=",i)
                    sendRes.push(empData[i])
            }
        
        return res.status(200).json({ success: true, data: sendRes })
    }).catch(err => console.log(err))
}


module.exports = {
    getAllEmpData,
    insertData,
    getEmpDataById,
    getEmpDataByName,
    getSortedAge,
    getNextPageStack,
    getPrevPageStack
}