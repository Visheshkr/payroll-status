import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { SnackbarProvider } from "./components/Snackbar";
import Header from "./layouts/Header";
import store from "./redux/store";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ColorModeContextProvider } from "./utils/ColorModeContext";
/*****Pages******/
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const ForgotPassword = lazy(() => import("./pages/Login/forgotPassword"));
const EmployeeType = lazy(() => import("./pages/Master Screens/EmployeeType"));
const FinancialYear = lazy(() => import("./pages/Master Screens/FinancialYear"));
const HraRate = lazy(() => import("./pages/Master Screens/HraRate"));
const PayHeadService = lazy(() => import("./pages/Master Screens/PayHeadService"));
const ServiceTypeList = lazy(() => import("./pages/Master Screens/ServiceTypeList"));
const ProfessionalTax = lazy(() => import("./pages/Master Screens/ProfessionalTax"));
const PayBand = lazy(() => import("./pages/Master Screens/PayBand"));
const PayCommission = lazy(() => import("./pages/Master Screens/PayCommission"));
const PayCommissionMapping = lazy(() => import("./pages/Master Screens/PayCommissionMapping"));
const PayHeadConfiguration = lazy(() => import("./pages/Master Screens/PayHeadConfiguration"));
const ManageServiceBook  = lazy(() => import("./pages/Manage Service Book/ManageServiceBook"));
const Majorhead = lazy(() => import("./pages/Master Screens/MajorHead"));
const SubMajorhead = lazy(() => import("./pages/Master Screens/SubMajorHead"));
const PayCommissionList = lazy(() => import("./pages/Master Screens/PayCommission"));
const IncomeTaxSlab = lazy(()=> import('./pages/Master Screens/IncomeTaxSlab'));
const GroupCreation = lazy(()=> import('./pages/Master Screens/GroupCreation'));
const DetailHead = lazy(()=> import('./pages/Master Screens/DetailHead'));
const SubDetailHead = lazy(()=> import('./pages/Master Screens/SubDetailHead'));
const GenderMaster = lazy(()=> import('./pages/Master Screens/GenderMaster'));
const MinorHead = lazy(()=> import('./pages/Master Screens/MinorHead'));
const SubHead = lazy(()=> import('./pages/Master Screens/SubHead'));
const OnBoardingEmployee= lazy(()=> import('./pages/Manage Service Book/OnBoardingEmployee'));
const RegularySalaryBill = lazy(() => import("./pages/RegularySalaryBill"));
const SalaryProcess = lazy(() => import("./pages/RegularySalary/SalaryProcess"));
const GroupDetails = lazy(() => import("./pages/RegularySalary/GroupDetails"));
const OpenGroup = lazy(() => import("./pages/RegularySalary/OpenGroup"));
const NotEligibleEmployees = lazy(() => import("./pages/RegularySalary/NotEligibleEmployees"));
const EmployeeDetailsFromGroup = lazy(() => import("./pages/RegularySalary/EmployeeDetailsFromGroup"));
const BloodGroup = lazy(()=> import('./pages/Master Screens/BloodGroup'));
const AssignEmployeeToGroup = lazy(()=> import('./pages/Master Screens/AssignEmployeeToGroup'));
const IncomeTaxSection = lazy(() => import('./pages/Master Screens/IncomeTaxSection'));
const IncomeTaxSactionLimit = lazy(() => import('./pages/Master Screens/IncomeTaxSanctionLimit'));
const ItDeclarationSetup = lazy(()=> import('./pages/Master Screens/ItDeclarationSetup'));
const TaxSectionHeadMapping = lazy(() => import('./pages/Master Screens/TaxSectionHeadMapping'));
const EmployeePayEntitlements = lazy(() => import('./pages/Master Screens/EmployeePayEntitlements'));
const Office = lazy(() => import('./pages/Master Screens/Office'));
const ItDeclarationTable = lazy(() => import('./pages/ItDeclarationAndPOD/Table'))
const ItDeclarationForm = lazy(() => import('./pages/ItDeclarationAndPOD/DeclarationForm'))
const FinancialYearPayMonth = lazy(() => import('./pages/Master Screens/FinancialYearPayMonth'));
const ViewOnboarding = lazy(() => import('./pages/Manage Service Book/ViewOnBoarding/ViewOnboarding'));
const ViewEmployeeOnboarding = lazy(() => import('./pages/Manage Service Book/ViewOnBoarding/ViewEmployeeOnboarding'));
const PayLevel = lazy(() => import('./pages/Master Screens/PayLevel'));
const PaySlipPdf = lazy(()=> import('./pages/PaySlipPdf'))
const PaySlip = lazy(()=> import('./pages/PaySlip'))
const PayMatrix = lazy(() => import('./pages/Master Screens/PayMatrix'));
const IncomeTaxDeductionHead = lazy(() => import('./pages/Master Screens/IncomeTaxDeductionHead'));

const PayHeadServiceTypeMapping = lazy(() => import('./pages/Master Screens/PayHeadServiceTypeMapping'));
const Form16 = lazy(() => import('./pages/Form16'));
const LoanApplication = lazy(() => import('./pages/Loan/LoanApplication'));
const LoanTypeScreen = lazy(() =>
  import("./pages/PayScreens/LoanType/LoanTypeScreen")
);

// const Test2 = lazy(() => import("./pages/Test/test2"));
const SalaryProcessReport = lazy(() => import('./pages/SalaryProcessReport/SalaryProcessReport'));
const Investment = lazy(() => import('./pages/Master Screens/Investment'));
const App = () => {
  return (
    <>
      <SnackbarProvider>
        <ColorModeContextProvider>
          {/* <AddBeneficiary /> */}
          <Provider store={store}>
            {/* <DDOBenefWorklist/> */}
            <AppRoutes />
          </Provider>
          {/* <BeneficiaryDetails /> */}
        </ColorModeContextProvider>
      </SnackbarProvider>
    </>
  );
};
const AppRoutes = () => {
  return (
    <Suspense fallback={<div />}>
      {/* <Router> */}
      <ScrollToTop />
      {/* <NavigateToTop /> */}
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        {/* <Route element={<Header setSelectedProjectId={setSelectedProjectId}/>}> */}
        <Route element={<Header />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/employee-type" element={<EmployeeType />} />
            <Route path="/financial-year" element={<FinancialYear />} />
            <Route path="/hra-rate" element={<HraRate />} />
            <Route path="/payhead-service" element={<PayHeadService />} />
            <Route
              path="/payhead-configuration"
              element={<PayHeadConfiguration />}
            />
            <Route path="/service-typelist" element={<ServiceTypeList />} />
            <Route path="/manageServiceBook" element={<ManageServiceBook />} />
            <Route path="/professional-tax" element={<ProfessionalTax />} />
            <Route path="/pay-commission" element={<PayCommission />} />
            <Route
              path="/pay-CommissionMapping"
              element={<PayCommissionMapping />}
            />
            <Route path="/pay-band" element={<PayBand />} />
            <Route path="/major-head" element={<Majorhead />} />
            <Route path="/sub-major-head" element={<SubMajorhead />} />
            <Route path="/payCommissionList" element={<PayCommissionList />} />
            <Route path="/IncomeTaxSlab" element={<IncomeTaxSlab />} />
            <Route path="/IncomeTaxSection" element={<IncomeTaxSection />} />
            <Route
              path="/incometaxsactionlimit"
              element={<IncomeTaxSactionLimit />}
            />
            <Route path="/GroupCreation" element={<GroupCreation />} />
            <Route path="/DetailHead" element={<DetailHead />} />
            <Route path="/SubDetailHead" element={<SubDetailHead />} />
            <Route path="/GenderMaster" element={<GenderMaster />} />
            <Route path="/MinorHead" element={<MinorHead />} />
            <Route path="/SubHead" element={<SubHead />} />
            <Route
              path="/OnBoardingEmployee"
              element={<ViewEmployeeOnboarding />}
            />
            <Route
              path="/regularysalarybill"
              element={<RegularySalaryBill />}
            />
            <Route path="/salaryprocess" element={<SalaryProcess />} />
            <Route path="/groupdetails" element={<GroupDetails />} />
            <Route path="/opengroup" element={<OpenGroup />} />
            <Route
              path="/noteligibleemployees"
              element={<NotEligibleEmployees />}
            />
            <Route
              path="/employeedetailsfromgroup"
              element={<EmployeeDetailsFromGroup />}
            />
            <Route path="/taxheadmapping" element={<TaxSectionHeadMapping />} />
            <Route path="/blood-group" element={<BloodGroup />} />
            <Route
              path="/assign-employee-to-group"
              element={<AssignEmployeeToGroup />}
            />
            <Route path="/office" element={<Office />} />
            <Route
              path="/ItDeclarationSetup"
              element={<ItDeclarationSetup />}
            />
            <Route path="/itdeclarationpod" element={<ItDeclarationTable />} />
            <Route
              path="/itdeclarationformsubmit"
              element={<ItDeclarationForm />}
            />
             <Route
              path="/employee-pay-entitlements"
              element={<EmployeePayEntitlements />}
            />
             <Route
              path="/FinancialYearPayMonth"
              element={<FinancialYearPayMonth />}
            />
             <Route path="/paylevel" element={<PayLevel />} />
             <Route
              path="/IncomeTaxDeductionHead"
              element={<IncomeTaxDeductionHead />}
            />
             <Route path="/ViewOnboarding" element={<ViewOnboarding />} />
             <Route path="/AddOnboarding" element={<OnBoardingEmployee />} />
             <Route path="/paySlipPdf" element={<PaySlipPdf />} />
             <Route path="/paySlip" element={<PaySlip />} />
             <Route path="/payMatrix" element={<PayMatrix />} />
            <Route path="/loan-type" element={<LoanTypeScreen />} />
            <Route path= "/openform16" element ={<Form16 />} />
           <Route path="/payhead-servicetype-mapping" element={<PayHeadServiceTypeMapping />}/>
            <Route path= "/LoanApplication" element ={<LoanApplication />} />
           <Route path="/salary-approval-report" element={<SalaryProcessReport />}/>
           <Route path="/investment" element={<Investment/>}/>
          </Route>
        </Route>
      </Routes>
      {/* </Router> */}
    </Suspense>
  );
};
export default App;
