import React, { useState, useRef } from 'react';
import { getLocalStream } from '@/utils/media';
import './index.less';

const PeerConnection: React.FC = () => {
    const localVideoRef = useRef({} as HTMLVideoElement);
    const remoteVideoRef = useRef({} as HTMLVideoElement);

    const localPeerConnection = useRef({} as RTCPeerConnection);
    const remotePeerConnection = useRef({} as RTCPeerConnection);

    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const getStream = async () => {
        const stream = await getLocalStream({
            audio: false,
            video: {
                width: 1280,
                height: 720,
            },
        });
        localVideoRef.current.srcObject = stream;
        setIsVideoOpen(true);
    };

    const stopStream = () => {
        const stream = localVideoRef.current.srcObject as MediaStream;
        const tracks = stream?.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });
        localVideoRef.current.srcObject = null;
        setIsVideoOpen(false);
    };

    const toggleCamera = () => {
        if (isVideoOpen) {
            stopStream();
        } else {
            getStream();
        }
    };

    const call = async () => {
        const configuration = {};
        localPeerConnection.current = new RTCPeerConnection(configuration);
        remotePeerConnection.current = new RTCPeerConnection(configuration);
        localPeerConnection.current.addEventListener('icecandidate', (e) => {
            remotePeerConnection.current.addIceCandidate(e.candidate);
        });
        remotePeerConnection.current.addEventListener('icecandidate', (e) => {
            localPeerConnection.current.addIceCandidate(e.candidate);
        });
        remotePeerConnection.current.addEventListener('track', (e) => {
            if (remoteVideoRef.current.srcObject !== e.streams[0]) {
                remoteVideoRef.current.srcObject = e.streams[0];
            }
        });
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => localPeerConnection.current.addTrack(track, stream));
        createOfferAndAnswer();
    };

    const createOfferAndAnswer = async () => {
        const offer = await localPeerConnection.current.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        });
        await localPeerConnection.current.setLocalDescription(offer);
        await remotePeerConnection.current.setRemoteDescription(offer);

        const answer = await remotePeerConnection.current.createAnswer();
        await remotePeerConnection.current.setLocalDescription(answer);
        await localPeerConnection.current.setRemoteDescription(answer);
    };

    const hangup = () => {
        localPeerConnection.current.close();
        remotePeerConnection.current.close();
    };

    return (
        <div className="page-peer-connection">
            <div className="btn mar-b-20" onClick={toggleCamera}>
                {isVideoOpen ? 'Close camera' : 'Open camera'}
            </div>
            <div className="btn mar-b-20 mar-l-10" onClick={call}>
                Call
            </div>
            <div className="btn mar-b-20 mar-l-10" onClick={hangup}>
                Hangup
            </div>
            <div className="video-container mar-b-10">
                <video autoPlay playsInline muted ref={localVideoRef}></video>
            </div>
            <div className="video-container mar-b-10">
                <video autoPlay playsInline muted ref={remoteVideoRef}></video>
            </div>
        </div>
    );
};
export default PeerConnection;
