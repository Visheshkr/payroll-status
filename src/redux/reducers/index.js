import { combineReducers } from "redux";
import showMessageReducer from "./showMessageReducer"
import saveRoleReducer from "./SaveRoleReducer"
import deleteRoleReducer from "./DeleteRoleReducer";
import getAllRoleReducer from "./GetAllRolesReducer";
import getAllUsersReducer from "./GetAllUsersReducer";
import deleteUserReducer from "./DeleteUserReducer";
import getSchemeReducer from "./GetSchemeReducer";
import createDeptReducer from "./CreateDeptReducer";
import getDeptsReducer from "./GetDepartmentsReducer";
import deleteDeptReducer from "./DeleteDeptReducer";
import getAllDesignationReducer from "./GetAllDesignationsReducer";
import saveDesignationReducer from "./SaveDesignationReducer";
import deleteDesignationReducer from "./DeleteDesignationReducer";
import getAllBankReducer from "./GetAllBanksReducer";
import saveBankReducer from "./SaveBankReducer";
import deleteBankReducer from "./DeleteBankReducer";
import updateBankReducer from "./UpdateBankReducer";
import createUserReducer from "./CreateUserReducer";
import userRoleMapeducer from "./UserRoleMapReducer";
import userRoleMapSaveReducer from "./UserRoleMapSaveReducer";
import getRoleByIdReducer from "./GetRolesByIdReducer";
import getRoleMenuRightMapReducer from "./GetRoleMenuRightMapReducer";
import deleteUserRoleReducer from "./DeleteUserRoleReducer";
import saveUserRoleReducer from "./SaveUserRoleMap";import getAllBankDropdownReducer from "./GetBankDropdownReducer";
import getAllBranchReducer from "./GetAllBranchsReducer";
import saveBranchReducer from "./SaveBranchReducer";
import deleteBranchReducer from "./DeleteBranchReducer";
import updateBranchReducer from "./UpdateBranchReducer";
import loginReducer from "./LoginReducer";
import userReducer from "../../redux/store/userSlice"
const reducers = combineReducers({
    state:(state={})=>state,
    showMessageReducer,
    saveRoleReducer,
    getAllRoleReducer,
    getAllUsersReducer,
    deleteUserReducer,
    getSchemeReducer,
    createDeptReducer,
    getDeptsReducer,
    deleteDeptReducer,
    saveDesignationReducer,
    getAllDesignationReducer,
    getAllBankReducer,
    saveBankReducer,
    updateBankReducer,
    deleteBankReducer,
    createUserReducer,
    userRoleMapeducer,
    userRoleMapSaveReducer,
    getRoleByIdReducer,
    getRoleMenuRightMapReducer,
    deleteUserRoleReducer,
    saveUserRoleReducer,
    getAllBankDropdownReducer,
    getAllBranchReducer,
    saveBranchReducer,
    deleteBranchReducer,
    loginReducer,
    user: userReducer,
 
});

const rootReducer=(state,Action)=>{
    return reducers(state,Action);
};
export default rootReducer;