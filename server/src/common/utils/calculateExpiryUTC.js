/**
 * Calculate the expiry of an access token using 90% of the token's lifespan.
 * @param {integer} expires_in - Time remaining (in seconds) until access token expires.
 * @returns Date of token expiry in UTC.
 */
const calculateExpiryUTC = (expires_in) => {
    const current_utc = new Date(new Date().toUTCString())
    return new Date(current_utc.getTime() + expires_in * 0.9 * 1000)
}

export default calculateExpiryUTC
