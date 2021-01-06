import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const form = {
    margin: "auto",


};
const h1 = {
    "text-align": "center",
    "padding-top": "50px"
};
const align = {
    position: "relative",
    top: "50px",
    left: "85px"
};
const col = {
    "margin-top": "8px",
    position: "relative",
    left: "300px",
    top: "-82px"
};
const table = {
    width: "900px",
    margin: "auto",
    position: "relative",
    top: "100px"
};
const input = {
    width: "270px",
    position: "relative",
    left: "25px"
}
const label = {
    float: "left"
}



const Report = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [reportData, setData] = useState(users)
    const onSubmit = data => search(data)

    // const onSubmit = valueFrom => console.log(valueFrom);
    const history = useHistory()
    // useEffect(() => {
    //     const getReport = async () => {
    //         try {
    //             const dataPayload = {
    //                 from: 0,
    //                 to: 0
    //             }
    //             const data = await axios.post('https://ekyc-demo-api.trandata.io/api/v1/user/verifyHistory', dataPayload, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //             })
    //             // console.log(data.data.Data);
    //             setData(data.data.Data)
    //             // console.log(reportData);
    //         } catch (error) {
    //         }
    //     }
    //     getReport();
    // }, []);


    const search = async (e) => {
        console.log(e);
        const dateFrom = new Date(e.from);
        const dateTo = new Date(e.to);
        const unixFrom = dateFrom.getTime() / 1000;
        const unixTo = dateTo.getTime() / 1000;
        console.log('key');
        console.log(unixFrom, unixTo);
        const dataPayload = {
            from: unixFrom,
            to: unixTo + 86400
        }
        const token = e.key;
        const data = await axios.post('https://ekyc-demo-api.trandata.io/api/v1/user/verifyHistory', dataPayload, {
            headers: {
                'Content-Type': 'application/json',
                'apiKey': token
            },
        })
        setData(data.data.Data)
    }

    return (
        <div className="container">
            <form style={form} onSubmit={handleSubmit(onSubmit)}>
                <h1 style={h1} className="text-dark">Report</h1>
                <div style={align} className="form-row align-items-center">

                    <div style={{ 'margin-left': '340px' }}>
                        <div className="form-group">
                            <label style={label} htmlFor="formFile">Authen Key</label>
                            <input style={input} name='key' type="text" className="form-control" ref={register} />
                        </div>
                    </div>

                    <div className="row" style={{ 'margin-left': '120px', 'margin-top': '50px' }}>
                        <div className="col-4">
                            <div className="form-group">
                                <label style={label} htmlFor="formFile">Form date</label>
                                <input style={input} name='from' type="date" className="form-control" ref={register} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label style={label} htmlFor="formFile">To date</label>
                                <input style={input} name='to' type="date" className="form-control" ref={register} />
                            </div>
                        </div>
                        <div className="col-1">
                            <button type="submit" className="btn btn-dark mb-2">Search</button>
                        </div>
                    </div>
                </div>
            </form>


            <table style={table} className="table">
                <thead style={{ 'background-color': 'black', color: 'white' }} className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số CMT</th>
                        <th scope="col">So sánh</th>
                        <th scope="col">Xác nhận</th>
                        <th scope="col">Ngày tháng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reportData.map((el) => (
                            <tr>
                                <th scope="row">{el.id}</th>
                                <td>{el.name}</td>
                                <td>{el.idNumber}</td>
                                <td>{el.idMatched}</td>
                                <td>{el.confirm}</td>
                                <td>{el.createdDate}</td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div >

    )
}

Report.propTypes = {

}

export default Report
