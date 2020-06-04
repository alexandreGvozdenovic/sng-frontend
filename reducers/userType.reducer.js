export default function (userType='', action) {
    if(action.type === 'updateUserType') {
        let newUserType = action.userType;
        return newUserType;
    } else {
        return userType;
    }
};