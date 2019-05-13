import React, { useEffect, useRef, useState } from 'react'
import './Scanner.css'
import QR from 'jsqr'


export const Scanner = (props) => {
    let canvasRef = useRef()
    let onSuccess = props.onSuccess

    useEffect(() => {
        const video = document.createElement('video')
        let id = ''
        let mediaStream
        navigator
            .mediaDevices
            .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
            .then(stream => {
                mediaStream = stream
                video.srcObject = stream
                video.setAttribute('playsinline', true)
                video.play()
                id = requestAnimationFrame(tick)

            })

        const tick = () => {
            try {
                let canvas = canvasRef.current
                let context = canvas.getContext('2d')
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.height = video.videoHeight
                    canvas.width = video.videoWidth
                    context.drawImage(video, 0, 0, canvas.width, canvas.height)
                    let imgData = context.getImageData(0, 0, canvas.width, canvas.height)
                    let code = QR(imgData.data, imgData.width, imgData.height, {
                        inversionAttempts: "dontInvert",
                    })
                    console.log('code', code)
                    if (code) {
                        if (onSuccess) {
                            onSuccess(code)
                        }
                    }
                }
                id = requestAnimationFrame(tick)
            } catch (error) {
                console.log(error)
                cancelAnimationFrame(id)
                if (mediaStream) {
                    console.log(mediaStream)
                    mediaStream.getTracks().forEach(track => track.stop())
                }
            }
        }
        return () => {
            cancelAnimationFrame(id)
            if (mediaStream) {
                console.log(mediaStream)
                mediaStream.getTracks().forEach(track => track.stop())
            }
        }
    }, [onSuccess])




    return (
        <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="canvas"></canvas>
        </div>
    )
}

export const DeviceSelect = (props) => {
    let [deviceList = [], setDevice] = useState([])
    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(function (devices) {
                devices.forEach(function (device) {
                    console.log(device.kind + ": " + device.label +
                        " id = " + device.deviceId);
                    setDevice(device)
                });
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }, [])
    return (<select onChange={(val) => props.onChange && props.onChange(val)}>
        {deviceList.map(d => {
            return <option value={d.id}>{d.label}</option>
        })}
    </select>)
}