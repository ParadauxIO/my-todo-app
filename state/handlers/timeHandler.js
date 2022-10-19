const getRelativeTime = (d1) => {
    d1.setTime(unixtime * 1000);
    const dateString = d1.toUTCString();
};

export { getRelativeTime };
