const EmpModelObj = require('../models/empModel')
var empCopy = []
var empSortedCopy = []


getAllEmpData = async (req, res) => {
    await EmpModelObj.find({}, (err, mbdetect) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mbdetect) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: mbdetect })
    }).catch(err => console.log(err))
}

getEmpDataById = async (req, res) => {
    await EmpModelObj.findOne({ eid: req.params.id }, (err, empData) => {
        if (!empData) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: empData })
    }).catch(err => console.log(err))

}

getEmpDataByName = async (req, res) => {
    console.log("Name is", req.params.name)
    let regexp = new RegExp(`^${req.params.name}$`, 'i')        //search full string
    let regexpL = new RegExp('^' + req.params.name.toLowerCase()) //search lowercase
    let regexpU = new RegExp('^' + req.params.name.toUpperCase()) //search uppercase
    let FirstLetterCapital = new RegExp('^' + req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1)) //search first letter capital


    await EmpModelObj.find({ $or: [{ ename: regexpL }, { ename: regexpU }, { ename: FirstLetterCapital }, { ename: regexp }] }, (err, empData) => {
        return res.status(200).json({ success: true, data: empData })
    }).catch(err => console.log(err))
}

getSortedSalary = async (req, res) => {
    if (req.params.filter == 'highToLow') {
        await EmpModelObj.find({}, (err, empData) => {
            empSortedCopy = empData
            return res.status(200).json({ success: true, data: empData })
        }).sort({ esalary: -1 }).catch(err => console.log(err))
    } else {

        await EmpModelObj.find({}, (err, empData) => {
            empSortedCopy = empData
            return res.status(200).json({ success: true, data: empData })
        }).sort({ esalary: 1 }).catch(err => console.log(err))
    }
}


getNextPageStack = async (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) + 5
    // console.log('fromPage ', fromPage)
    // console.log('topage ', toPage)
    let sendRes = []
    await EmpModelObj.find({}, (err, empData) => {

        for (let i = fromPage; i < toPage; i++) {
            if (i < empData.length)
                sendRes.push(empData[i])
        }

        return res.status(200).json({ success: true, data: sendRes })
    }).catch(err => console.log(err))
}

getPrevPageStack = async (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) - 5
    let sendRes = []
    await EmpModelObj.find({}, (err, empData) => {

        for (let i = fromPage - 1; i >= toPage; i--) {
            // console.log("i=", i)
            sendRes.push(empData[i])
        }

        return res.status(200).json({ success: true, data: sendRes })
    }).catch(err => console.log(err))
}

sendSearchResponse = async (req, res) => {
    // console.log("\n\n\t*************************************");
    empCopy = []
    for (let i = 0; i < req.body.responseContainer.length; i++) {
        empCopy.push(req.body.responseContainer[i])
    }
    // console.log("\t*************************************");
}

getNextSearchPageStack = (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) + 5
    let sendRes = []
    // console.log("N e x t")
    // console.log("fromPage-->>", fromPage)
    // console.log("toPage-->>", toPage)

    for (let i = fromPage; i <= toPage; i++) {
        if (i < empCopy.length)
            sendRes.push(empCopy[i])
    }

    return res.status(200).json({ success: true, data: sendRes })

}

getPrevSearchPageStack = (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) - 5
    let sendRes = []
    // console.log("P r e v")
    // console.log("fromPage-->>", fromPage)
    // console.log("toPage-->>", toPage)

    for (let i = fromPage - 1; i >= toPage; i--) {
        if (i < empCopy.length)
            sendRes.push(empCopy[i])
    }
    sendRes.reverse()

    return res.status(200).json({ success: true, data: sendRes })

}

getSortedNextPageStack = (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) + 5
    // console.log("Next sorted")
    // console.log("fromPage", fromPage);
    // console.log("toPage", toPage)
    let sendRes = []
    for (let i = fromPage; i <= toPage; i++) {
        if (i < empSortedCopy.length)
            sendRes.push(empSortedCopy[i])
    }
    return res.status(200).json({ success: true, data: sendRes })
}

getSortedPrevPageStack = (req, res) => {
    let fromPage = parseInt(req.params.page)
    let toPage = parseInt(req.params.page) - 5
    console.log("Prev sorted-----------")
    console.log("fromPage", fromPage);
    console.log("toPage", toPage)
    // console.log("empSortedCopy", empSortedCopy)
    let sendRes = []
    for (let i = fromPage - 1; i >= toPage; i--) {
        // if (i > empSortedCopy.length)
        sendRes.push(empSortedCopy[i])
        // console.log("i->", empSortedCopy[i])
    }
    // console.log("----->", sendRes)
    return res.status(200).json({ success: true, data: sendRes.reverse() })
}


module.exports = {
    getAllEmpData,
    getEmpDataById,
    getEmpDataByName,
    getSortedSalary,
    getNextPageStack,
    getPrevPageStack,
    sendSearchResponse,
    getNextSearchPageStack,
    getPrevSearchPageStack,
    getSortedNextPageStack,
    getSortedPrevPageStack
}