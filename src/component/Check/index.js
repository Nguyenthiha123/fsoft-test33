import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'



const mb = {
    width: '500px',
    margin: 'auto'
};
const button = {
    margin: 'auto',
    marginTop: "125px"
};
const table = {
    width: "900px",
    margin: "auto",
    position: "relative",
    top: "100px"
};

const Check = props => {
    const history = useHistory()
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [checkData, setData] = useState(users)
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onSubmit = dataCheck => addCheck(dataCheck);

    const addCheck = async (e) => {
        const Data = new FormData();
        Data.append('image', e.image[0]);
        console.log(Data)
        const dataCheck = await axios.post('https://facedemo-api.dev.trandata.io/api/v1/facedemo/recognition', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        const res = dataCheck.data;
        console.log(res)

        if (res.ErrorCode === 0) {
            const data = res.Data;
            setData(data);
            console.log(data);

        } else {
            history.push('/check')
            Swal.fire(
                'Hinh anh khong chinh xac',
                'You clicked the button!',
                'error'
            )
        }
        console.log(dataCheck)
    }


    //upload file ảnh
    const onChangePicture = e => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            setPicture(e.target.files[0]);

            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);


        }
    }


    // canvas
    // var imagePaper = new Image();
    // imagePaper.onload = function () {
    //     context.drawImage(imagePaper, 100, 20, 500, 500);
    // };
    // imagePaper.src = "";

    window.onload = function () {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("scream");
        ctx.drawImage(img, 20, 10);
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');

        context.beginPath();
        context.rect(35, 40, 130, 100);
        // context.fillStyle = "hsl(0, 0%, 100%)";
        // context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();
        context.restore();
    }

    return (
        <div className="container">
            <h1 className="text-success">Recognize</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={mb}>

                    <label htmlFor="formFile" className="form-label">Hình ảnh</label>
                    <input ref="window" onChange={onChangePicture} name='image' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <div className="previewProfilePic" style={{ marginLeft: "90px" }}>
                        <img id="scream" className="playerProfilePic_home_tile" style={{ marginTop: '18px', objectFit: 'cover', zIndex: '1', position: 'absolute' }} width={200} height={260} src={imgData} />
                        <canvas id="myCanvas" style={{ position: 'relative', top: '30px', zIndex: '20' }} />
                    </div>

                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>

                <button style={button} type="submit" className="btn btn-success">Submit</button>
            </form>
            <table style={table} className="table">
                <thead style={{ 'background-color': '#28a745', color: 'white' }} >
                    <tr>

                        <th scope="col">Tên</th>
                        <th scope="col">Similarity</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        <tr >

                            <td>{checkData.name}</td>
                            <td>{checkData.similarity}</td>

                        </tr>

                    }
                </tbody>
            </table>
        </div>
    )
}
export default Check
