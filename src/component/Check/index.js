import React, { useState } from 'react'
import axios from 'axios'
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
    const { register, handleSubmit, watch, errors } = useForm();
    const users = [];
    const [checkData, setData] = useState(users);
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const onSubmit = dataCheck => addCheck(dataCheck);

    const addCheck = async (e) => {
        const Data = new FormData();
        Data.append('image', e.image[0]);
        const dataCheck = await axios.post('https://facedemo-api.dev.trandata.io/api/v1/facedemo/recognition', Data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        const res = dataCheck.data;
        if (res.ErrorCode === 0) {
            const data = res.Data;
            setData(data.faces);
            console.log(data);
            drawImage(data.faces[0].box[0], data.faces[0].box[1], data.faces[0].box[2], data.faces[0].box[3]);

        } else {
            Swal.fire(
                'The image is not correct',
                'You clicked the button!',
                'error'
            )
        }
    }

    //upload file ảnh
    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // ve anh truoc khi submit
    const handleImageLoad = (event) => {
        const { target } = event;
        let counter = 0;
        //khi submit sẽ upload ảnh của hàm done
        const done = () => {
            // const imageHeight = target.clientHeight;
            // const imageWidth = target.clientWidth;
            const img = document.getElementById("scream");
            const imageHeight = img.height;
            const imageWidth = img.width;
            loadImage(imageHeight, imageWidth, img)
        };
        done();
    };

    //ve anh
    const loadImage = (imageHeight, imageWidth, img) => {
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        c.width = imageWidth;
        c.height = imageHeight;
        ctx.drawImage(img, 0, 0);
    }

    // ve anh sau khi co data
    const drawImage = (x_min, y_min, x_max, y_max) => {
        const c = document.getElementById("myCanvas");
        const ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.rect(x_min, y_min, x_max - x_min, y_max - y_min);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    return (
        <div className="container">
            <h1 className="text-dark">Recognize</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" style={mb}>

                    <label htmlFor="formFile" className="form-label">Images</label>
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
                <button style={button} type="submit" className="btn btn-dark">Submit</button>
            </form>
            <table style={table} className="table">
                <thead style={{ 'background-color': 'black', color: 'white' }} >
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Similarity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        checkData.map((el, index) => (
                            <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.similarity}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


        </div>
    )
}
export default Check
