import React, { useState, useRef } from 'react';
import { getDisplayMedia } from '@/utils/media';
import './index.less';

const ScreenSharing: React.FC = () => {
    const videoRef = useRef({} as HTMLVideoElement);
    const [isScreenSharingOpen, setIsScreenSharingOpen] = useState(false);

    const getStream = async () => {
        const stream = await getDisplayMedia({
            audio: true,
            video: true,
        });
        videoRef.current.srcObject = stream;
        setIsScreenSharingOpen(true);
    };

    const stopStream = () => {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream?.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });
        videoRef.current.srcObject = null;
        setIsScreenSharingOpen(false);
    };

    const toggleScreenSharing = () => {
        if (isScreenSharingOpen) {
            stopStream();
        } else {
            getStream();
        }
    };

    return (
        <div className="page-screen-sharing">
            <div className="btn mar-b-20" onClick={toggleScreenSharing}>
                {isScreenSharingOpen ? 'Stop sharing' : 'Start sharing'}
            </div>
            <div className="video-container mar-b-10">
                <video autoPlay playsInline muted ref={videoRef}></video>
            </div>
        </div>
    );
};
export default ScreenSharing;
