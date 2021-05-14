function GetOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Windows NT 10.0") !== -1) return "Windows 10";
    if (userAgent.indexOf("Windows NT 6.3")  !== -1) return "Windows 8.1";
    if (userAgent.indexOf("Windows NT 6.2")  !== -1) return "Windows 8";
    if (userAgent.indexOf("Windows NT 6.1")  !== -1) return "Windows 7";
    if (userAgent.indexOf("Windows NT 6.0")  !== -1) return "Windows Vista";
    if (userAgent.indexOf("Windows NT 5.1")  !== -1) return "Windows XP";
    if (userAgent.indexOf("Windows NT 5.0")  !== -1) return "Windows 2000";
    if (userAgent.indexOf("Mac")             !== -1) return "Mac/iOS";
    if (userAgent.indexOf("X11")             !== -1) return "UNIX";
    if (userAgent.indexOf("Linux")           !== -1) return "Linux";
    if (userAgent.indexOf("Android")         !== -1) return "Android";
    return undefined
}

const GetDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

export { GetOS, GetDeviceType };

