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
    marginTop: "15px"
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
            console.log(e.target.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });

            reader.readAsDataURL(e.target.files[0]);
            const img = document.getElementById("scream");
            // console.log(img.width, img.height)


        }
    }

    const handleImageLoad = (event) => {
        const { target } = event;
        let counter = 0;
        const done = () => {
            // const imageHeight = target.clientHeight;
            // const imageWidth = target.clientWidth;
            const img = document.getElementById("scream");
            const imageHeight = img.height;
            const imageWidth = img.width;

            console.log(`Height: ${imageHeight} (clientWidth: ${imageWidth})`);
            drawIamge(imageHeight, imageWidth, img)
        };
        const maybeDone = () => {
            done();
            // if (target.clientHeight) {
            //     done();
            // } else if (++counter < 3) {
            //     requestAnimationFrame(maybeDone);
            // } else {
            //     console.log("Couldn't get height");
            // }
        };
        maybeDone();
    };
    // canvas
    // var imagePaper = new Image();
    // imagePaper.onload = function () {
    //     context.drawImage(imagePaper, 100, 20, 500, 500);
    // };
    // imagePaper.src = "";

    const drawIamge = (imageHeight, imageWidth, img) => {
        console.log('inittttttttttttttttttttt')
        const x_min = 361;
        const y_min = 444;
        const x_max = 982;
        const y_max = 1222;
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        c.width = imageWidth;
        c.height = imageHeight;
        ctx.drawImage(img, 0, 0);
        ctx.beginPath();
        ctx.rect(x_min, y_min, x_max - x_min, y_max - y_min);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    window.onload = function () {
        // console.log('inittttttttttttttttttttt')
        // var x_min = 361;
        // var y_min = 444;
        // var x_max = 982;
        // var y_max = 1222;
        // var c = document.getElementById("myCanvas");
        // var ctx = c.getContext("2d");
        // var img = document.getElementById("scream");
        // c.width = img.width;
        // c.height = img.height;
        // ctx.drawImage(img, 0, 0);
        // ctx.beginPath();
        // ctx.rect(x_min, y_min, x_max - x_min, y_max - y_min);
        // ctx.lineWidth = 7;
        // ctx.strokeStyle = 'black';
        // ctx.stroke();
    }

    return (
        <div className="container">
            <h1 className="text-success">Recognize</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={mb}>

                    <label htmlFor="formFile" className="form-label">Hình ảnh</label>
                    <input ref="window" onChange={onChangePicture} name='image' ref={register({ required: true })} className="form-control" type="file" id="formFile" />
                    <div className="previewProfilePic" style={{ marginLeft: "90px" }}>
                        {/* <img className="playerProfilePic_home_tile" style={{ marginTop: '18px', objectFit: 'cover' }} width={200} height={260} src={imgData} /> */}
                    </div>

                    <small className="form-text text-danger">
                        {errors.name && errors.name.type === "required" && <span>Vui lòng không để trống</span>}
                    </small>
                </div>
                <div >
                    <img id="scream" style={{ display: 'none' }} src={imgData} onLoad={handleImageLoad} />
                    <canvas style={{ width: '150px' }} id="myCanvas" />
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
