import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const form = {
    width: '500px',
    height: '500px',
    margin: 'auto',
    position: 'relative',
    top: '50px'
};
const label = {
    float: 'left',
};
const button = {
    position: 'relative',
    top: '20px'
};
const DangNhap = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => login(data);
    const history = useHistory()

    const login = async (e) => {
        const Data = new FormData();
        console.log(e.idNumber[0]);
        Data.append('idNumber', e.idNumber[0]);

    }
    // history.push('/report')


    return (
        <div className='container'>
            <h1>Đăng Nhập</h1>
            <form style={form} onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label style={label} htmlFor="exampleInputEmail1">Số căn cước công dân</label>
                    <input type="number" name='idNumber' ref={register({ required: true })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone Number" />

                </div>

                <button style={button} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

DangNhap.propTypes = {
}

export default DangNhap
