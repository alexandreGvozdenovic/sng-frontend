export default function(status = false, action) {
    if(action.type === 'launchAnim') {
        let newStatus = action.status;
        console.log(newStatus)
        return newStatus;
    } else {
        return status
    }
};