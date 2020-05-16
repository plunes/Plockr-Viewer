import React from "react";
import CornerstoneViewer from "../cornerstoneViewer";
import * as api from '../../services/plockrServices'
import * as Constant from './../../contants/plockrStrings'

class PlockerAppComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            businessReceivedReports: [],
            businessSentReports: []
        }
        this.getPlockrReports = this.getPlockrReports.bind(this)
    }

    async getPlockrReports() {
        await api.getReports().then(res => {
            if (res.status == 201) {
                let sharedReports = res.data.sharedReports
                let uploadedReports = res.data.uploadedReports
                sharedReports.forEach((r) => {
                    var datetime = new Date(r.createdTime);
                    var now = datetime.toLocaleString();
                    r.createdTime = now;
                    r.reportName = r.reportName ? r.reportName.split('_').join(' ') : '';
                    r.reportType = 'received'
                    // console.log(r.reportUrl, 'report url')
                })
                uploadedReports.forEach((r) => {
                    var datetime = new Date(r.createdTime);
                    var now = datetime.toLocaleString();
                    r.createdTime = now
                    r.reportName = r.reportName.split('_').join(' ');
                    r.reportType = 'sent'
                })
                this.setState({
                    businessReceivedReports: uploadedReports,
                    businessSentReports: sharedReports
                })
            }
        })
    }

    componentWillMount() {
        this.getPlockrReports();
    }

    render() {
        return (
            <section>
                <div>
                    <h1>{Constant.PLOCKER_VIEWER}</h1>
                    <div className="dicom">
                        <CornerstoneViewer />
                    </div>
                </div>
                <style jsx>{`
               .dicom{
                 justify-content:space-between;                   
               }
               h1{
                   margin:3rem;
                   justify-content: center;
                    display: flex;
                    font-size: 32px;
                    color: green;
                    font-weight: bold;
               }
            `}

                </style>
            </section>
        );


    }


}

export default PlockerAppComponent
