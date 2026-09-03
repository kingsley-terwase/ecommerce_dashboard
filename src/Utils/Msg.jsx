/**
 * @param {{ response: { data: any; status: number; }; code: string; message: any; }} error
 * @param {string} fallback
 */
export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
    const serverData = error.response?.data;

    if (error.code === "ECONNABORTED") {
        return "The server is taking too long to respond. Please try again later.";
    }

    if (error.code === "ERR_NETWORK") {
        return "Network error: Unable to connect to the server. Please check your internet connection.";
    }

    if (error.response?.status === 500) {
        if (serverData?.message?.includes("value too long")) {
            return "One of your input values exceeds the maximum allowed length.";
        }
        return "Server error occurred. Please try again later.";
    }

    return serverData?.message || error.message || fallback;
}