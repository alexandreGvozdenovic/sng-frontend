export default function (userType=null, action) {
    if(action.type === 'updateUserType') {
        let newUserType = action.userType;
        return newUserType;
    } else {
        return userType;
    }
};