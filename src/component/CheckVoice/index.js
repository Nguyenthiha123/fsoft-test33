import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'


const form = {
    // padding: '30px',
    // position: 'relative',
    // left: '380px'
    margin: 'auto'
};
const mb = {
    width: '500px'
};
const label = {
    float: 'left'
};
const button = {
    position: 'relative',
    left: '-370px',
    top: '30px'
};
const table = {
    width: "900px",
    margin: "auto",
    position: "relative",
    top: "100px"
};

const CheckVoice = props => {
    const history = useHistory()
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [reportData, setData] = useState(users)
    const onSubmit = dataCheck => Check(dataCheck);
    const makeId = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const Check = async (e) => {
        const Data = new FormData();
        Data.append('requestId', makeId(16));
        Data.append('audious', e.audious1[0]);
        // console.log(Data)
        const dataCheck = await axios.post('http://52.221.81.214:4556/api/v1/voice/identify', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })

        const res = dataCheck.data;
        if (res.ErrorCode === 0) {
            const data = res.Data;
            console.log(data);
        }
        else {
            history.push('/checkvoice')
            Swal.fire(
                'Giong noi khong chinh xac',
                'You clicked the button!',
                'error'
            )
        }
        console.log(dataCheck)
    }
    return (
        <div className='container'>



            <h1 className="text-success">Recognize Voice</h1>
            <form style={form} onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Giọng nói</label>
                    <input name='audious1' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>
                <button style={button} type="submit" className="btn btn-success">Submit</button>
            </form>

            <table style={table} className="table">
                <thead style={{ 'background-color': '#198754', color: 'white' }} className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>hà</td>
                    </tr>
                </tbody>
            </table>



        </div>
    )
}

CheckVoice.propTypes = {

}

export default CheckVoice
