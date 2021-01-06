import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
const form = {
    padding: '30px',
    position: 'relative',
    left: '380px'
};
const mb = {
    width: '500px'
};
const label = {
    float: 'left'
};
const button = {
    float: 'left',
    position: 'relative',
    top: '20px'
};
const span = {
    color: 'red'
};

const Register = props => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => addRegister(data);
    const history = useHistory()

    const addRegister = async (e) => {
        const Data = new FormData();
        console.log(e.images1[0])
        Data.append('id', 64646);
        Data.append('image1', e.images1[0]);
        Data.append('image2', e.images2[0]);
        Data.append('image3', e.images3[0]);
        Data.append('name', e.name);
        Data.append('dob', e.dob);
        console.log(Data)
        const data = await axios.post('http://52.221.58.53:2020/api/register', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        console.log(data)

        history.push('/register')
        Swal.fire(
            'Thành công',
            'You clicked the button!',
            'success'
        )
    }
    return (
        <div className="container">

            <form style={form} onSubmit={handleSubmit(onSubmit)}>``
                <h1 style={{ position: 'relative', left: '-370px' }} className="text-success">Register</h1>
                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Hình ảnh<span style={span}>*</span></label>
                    <input name='images1' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Hình ảnh<span style={span}>*</span></label>
                    <input name='images2' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="formFile" className="form-label">Hình ảnh<span style={span}>*</span></label>
                    <input name='images3' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="exampleInputEmail1" className="form-label">Họ tên<span style={span}>*</span></label>
                    <input name='name' ref={register({ required: true, minLength: 3 })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                    </small>
                </div>

                <div className="mb-3" style={mb}>
                    <label style={label} htmlFor="exampleInputPassword1" className="form-label">Ngày sinh<span style={span}>*</span></label>
                    <input name='dob' type='date' ref={register({ required: true, minLength: 3 })} className="form-control" />
                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                        {errors.name && errors.name.type === "minLength" && <span>Tên phải lớn hơn hoặc bằng 3 ký tự</span>}
                    </small>
                </div>

                <button style={button} type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

Register.propTypes = {
}

export default Register
