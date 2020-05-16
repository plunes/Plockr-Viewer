import  axios from 'axios';
//import {resolved} from './resolvePromise'

export  function getReports()  {
    let token = localStorage.getItem('auth')
 return axios.get('https://devapi.plunes.com/v5/report/', { 'headers': { 'Authorization': token } })
}

export function sendReport(userId,phone, reportId , reasonDiagnosis, precautions, remarks) {
    let token = localStorage.getItem('auth')
    let body = {
        userId: userId,
        self: false,
        mobileNumber: phone,
        reportId: reportId,
        problemAreaDiagnosis:reasonDiagnosis,
        precautions: precautions,
        remarks: remarks
    }
  return axios.post('https://devapi.plunes.com/v5/report/sendReport', body, { 'headers': { 'Authorization': token } })
}
