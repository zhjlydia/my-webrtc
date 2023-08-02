export const getLocalStream = (constraints: MediaStreamConstraints) => {
    return navigator.mediaDevices.getUserMedia(constraints);
};

export const getDisplayMedia = (options: DisplayMediaStreamOptions) => {
    return navigator.mediaDevices.getDisplayMedia(options);
};
