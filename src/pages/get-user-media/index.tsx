import React, { useState, useRef, useEffect } from 'react';
import { getLocalStream } from '@/utils/media';
import './index.less';

const Basic: React.FC = () => {
    const videoRef = useRef({} as HTMLVideoElement);
    const canvasRef = useRef({} as HTMLCanvasElement);

    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isShowSnapshot, setIsShowSnapshot] = useState(false);

    const getStream = async () => {
        const stream = await getLocalStream({
            audio: false,
            video: {
                width: 1280,
                height: 720,
            },
        });
        videoRef.current.srcObject = stream;
        setIsVideoOpen(true);
    };

    const stopStream = () => {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream?.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });
        videoRef.current.srcObject = null;
        setIsVideoOpen(false);
    };

    const toggleCamera = () => {
        if (isVideoOpen) {
            stopStream();
        } else {
            getStream();
        }
    };

    const takeSnapshot = () => {
        if (!isShowSnapshot) {
            setIsShowSnapshot(true);
        }
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        return () => {
            console.log('unmount');
        };
    }, []);

    return (
        <div className="page-get-user-media">
            <div className="btn mar-b-20" onClick={toggleCamera}>
                {isVideoOpen ? 'Close camera' : 'Open camera'}
            </div>
            <div className="btn mar-b-20 mar-l-10" onClick={takeSnapshot}>
                Take snapshot
            </div>
            <div className="video-container mar-b-10">
                <video autoPlay playsInline muted ref={videoRef}></video>
            </div>
            <canvas
                className="canvas"
                style={{ visibility: isShowSnapshot ? 'visible' : 'hidden' }}
                ref={canvasRef}
            ></canvas>
        </div>
    );
};
export default Basic;
