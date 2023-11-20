const clearTokenCookie = (res) => {
    console.log('토큰클리어?');
    res.cookie('access_token', '', { expires: new Date(0) });   
    res.cookie('expires_in', '', { expires: new Date(0) });
    res.cookie('refresh_token', '', { expires: new Date(0) });
    res.cookie('refresh_token_expires_in', '', { expires: new Date(0) });
};

module.exports = { clearTokenCookie };