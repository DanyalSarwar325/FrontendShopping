// cookieUtils.js

/**
 * Function to parse a specific cookie from the document.cookie string.
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {string | null} - Decoded cookie value or null if not found.
 */
export const getCookieValue = (cookieName) => {
    const cookieString = document.cookie; // Get all cookies as a single string
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
            return decodeURIComponent(value); // Decode the value
        }
    }
    return null; // Return null if the cookie is not found
};

/**
 * Function to retrieve and parse the `userInfo` cookie.
 * @returns {object | null} - Parsed `userInfo` object or null if not found.
 */
export const getUserInfoFromCookies = () => {
    const userInfoCookie = getCookieValue("userInfo");
    if (userInfoCookie) {
        try {
            return JSON.parse(userInfoCookie); // Convert the JSON string into an object
        } catch (error) {
            console.error("Error parsing userInfo cookie:", error);
        }
    }
    return null; // Return null if the cookie doesn't exist or cannot be parsed
};
