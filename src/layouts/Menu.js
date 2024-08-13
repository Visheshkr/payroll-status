import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import DescriptionIcon from '@mui/icons-material/Description';
import Person2Icon from '@mui/icons-material/Person2';
import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';
import TransportBooking from '../pages/LeaveManagement/essentialServices/TransportBooking';
const Rolemaster = lazy(() => import("../pages/RoleMaster"));
const Bankmaster = lazy(() => import("../pages/BankMaster"));
const Designationmaster = lazy(() => import("../pages/DesignationMaster"));
const Departmentmaster = lazy(() => import("../pages/DepartmentMaster"));

// import Sentbox from '../pages/sentbox/Sentbox';
const RoleMenuRightMap = lazy(() => import("../pages/RoleMenuRightMap"));


const UserRoleMapPage1 = lazy(() => import("../pages/UserRoleMapPage1"));
const HospitalMaster1 = lazy(() => import("../pages/HospitalMaster1"));


const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const UserPage = lazy(() => import('../pages/UserCreation/UserPage'));
const BranchMaster = lazy(() => import('../pages/BranchMaster'));
const Leave = lazy(() => import("../pages/LeaveManagement/Leave"));
const IndentRequest = lazy(() => import("../pages/LeaveManagement/IndentRequest"))
//Masters
const AsriDoctorMaster = lazy(() => import("../pages/MasterScreens/AsriDoctorMaster"));
const AsriAttachmentMaster = lazy(() => import("../pages/MasterScreens/AsriAttachmentMaster"));

const AsriChemicalSubGroupMaster = lazy(() => import("../pages/MasterScreens/AsriChemicalSubGroupMaster"));
const AsriChemicalSubstanceMaster = lazy(() => import("../pages/MasterScreens/AsriChemicalSubstanceMaster"));

const AsriExpertiseMaster = lazy(() => import("../pages/MasterScreens/AsriExpertiseMaster"));

const AsriGeneralMaster = lazy(() => import("../pages/MasterScreens/AsriGeneralMaster"));
const AsriGrievanceSourceRoleMappingMaster = lazy(() => import("../pages/MasterScreens/AsriGrievanceSourceRoleMappingMaster"));
const AsriInvDiaComMaster = lazy(() => import("../pages/MasterScreens/AsriInvDiaComMaster"));
const AsriMainGroupMaster = lazy(() => import("../pages/MasterScreens/AsriMainGroupMaster"));

const AsriPharmacologicalSubgroupMaster = lazy(() => import("../pages/MasterScreens/AsriPharmacologicalSubgroupMaster"));
const AsriProcedureMaster = lazy(() => import("../pages/MasterScreens/AsriProcedureMaster"));
const AsriSpecialInvestigationMaster = lazy(() => import("../pages/MasterScreens/AsriSpecialInvestigationMaster"));
const AsriStrengthMaster = lazy(() => import("../pages/MasterScreens/AsriStrengthMaster"));
const AsriStrengthQuantityMaster = lazy(() => import("../pages/MasterScreens/AsriStrengthQuantityMaster"));
const AsriSubrouteMaster = lazy(() => import("../pages/MasterScreens/AsriSubrouteMaster"));
const AsriTherapeuticMainGroupMaster = lazy(() => import("../pages/MasterScreens/AsriTherapeuticMainGroupMaster"));
const AsriSubcategoryMaster = lazy(() => import("../pages/MasterScreens/AsriSubcategoryMaster"));
const MasterVillage = lazy(() => import("../pages/MasterScreens/MasterVillage"));

const YsrConstituencyMaster = lazy(() => import("../pages/MasterScreens/YsrConstituencyMaster"));


const YsrGeneralTypeMaster = lazy(() => import("../pages/MasterScreens/YsrGeneralTypeMaster"));
const YsrHealthCampMaster = lazy(() => import("../pages/MasterScreens/YsrHealthCampMaster"));
// const YsrMenuMaster = lazy(() => import("../pages/MasterScreens/YsrMenuMaster"));
const YsrNearestCityMaster = lazy(() => import("../pages/MasterScreens/YsrNearestCityMaster"));
const YsrPhcMaster = lazy(() => import("../pages/MasterScreens/YsrPhcMaster"));

const YsrSchemeMaster = lazy(() => import("../pages/MasterScreens/YsrSchemeMaster"));
const YsrSpecialitiesMaster = lazy(() => import("../pages/MasterScreens/YsrSpecialitiesMaster"));
// const YsrUserMaster = lazy(() => import("../pages/MasterScreens/YsrUserMaster"));


const MasterState = lazy(() => import("../pages/MasterScreens/Masterstate"));
const MasterDistrict = lazy(() => import("../pages/MasterScreens/MasterDistrict"));
const MasterMandal = lazy(() => import("../pages/MasterScreens/MasterMandal"));
const MasterHamlet = lazy(() => import("../pages/MasterScreens/MasterHamlet"));
const MasterSachiwalayam = lazy(() => import("../pages/MasterScreens/MasterSachiwalayam"));
const EmpanelmentAttachmentTypeMaster = lazy(() => import("../pages/MasterScreens/EmpnlAttachmentTypeMaster"));
const EmpanelmentDocumentTypeMaster = lazy(() => import("../pages/MasterScreens/EmpnlDocumentTypeMaster"));
const EmpanelmentHospitalInfraLabelMaster = lazy(() => import("../pages/MasterScreens/EmpnlHospInfraLabelMaster"));
const EmpanelmentLabelMaster = lazy(() => import("../pages/MasterScreens/EmpnlLableMaster"));
const EmpanelmentValueMaster = lazy(() => import("../pages/MasterScreens/EmpnlValueMaster"));
const EmpnlQstMaster = lazy(() => import("../pages/MasterScreens/EmpnlQstMaster"));
const EmpnlSpecialityQstMaster = lazy(() => import("../pages/MasterScreens/EmpnlSpecialityQstMaster.js"));


export const menu = [
  {
    icon: <DashboardSharpIcon />,
    title: "Dashboard",
    pageLink: '/home',
    view: <Home />,
  },

  {
    icon: <Person2Icon />,
    title: "User Management",
    items: [
      {
        title: "Department Master",
        pageLink: '/departmentmaster',
        view: <Departmentmaster />,
      },
      {
        title: "Designation Master",
        pageLink: '/designationmaster',
        view: <Designationmaster />,
      },
      {
        title: "Role Master",
        pageLink: '/rolemaster',
        view: <Rolemaster />,
      },
      {
        title: "Role Menu Right Map",
        pageLink: "/rolemenurightmap",
        view: <RoleMenuRightMap />,
      },
      {

        title: "User Creation",
        pageLink: '/userpage',
        view: <UserPage />,
      },
      {

        title: "User Role Map",
        pageLink: '/userRoleMapPage1',
        view: <UserRoleMapPage1 />,

      },
      {
        // icon: <DashboardSharpIcon />,
        title: "Leave",
        pageLink: "/leave",
        view: <Leave />,
      },
      {
        // icon: <DashboardSharpIcon />,
        title: "Indent Request",
        pageLink: "/indentRequest",
        view: <IndentRequest />,
      },
      {
        // icon: <DashboardSharpIcon />,
        title: "Transport Booking",
        pageLink: "/transportBooking",
        view: <TransportBooking />,
      },
    ]
  },
  {
    icon: <DescriptionIcon />,
    title: "Master Data Management",
    items: [

      {
        title: "YSR Scheme Master",
        pageLink: "/YsrSchemeMaster",
        view: <YsrSchemeMaster />,
      },
      {
        title: "YSR Constituency Master",
        pageLink: "/YsrConstituencyMaster",
        view: <YsrConstituencyMaster />,
      },
      {
        title: "YSR General Type Master",
        pageLink: "/YsrGeneralTypeMaster",
        view: <YsrGeneralTypeMaster />,
      },
      {
        title: "YSR HealthCamp Master",
        pageLink: "/YsrHealthCampMaster",
        view: <YsrHealthCampMaster />,
      },
      // {
      //   title: "YSR Menu Master",
      //   pageLink: "/YsrMenuMaster",
      //   view: <YsrMenuMaster />,
      // },
      {
        title: "YSR Nearest City Master",
        pageLink: "/YsrNearestCityMaster",
        view: <YsrNearestCityMaster />,
      },
      {
        title: "YSR PHC Master",
        pageLink: "/YsrPhcMaster",
        view: <YsrPhcMaster />,
      },
      {
        title: "YSR Specialities Master",
        pageLink: "/YsrSpecialitiesMaster",
        view: <YsrSpecialitiesMaster />,
      },
      // {
      //   title: "YSR User Master",
      //   pageLink: "/YsrUserMaster",
      //   view: <YsrUserMaster />,
      // },
      {
        title: "YSR Hamlet Master",
        pageLink: "/MasterHamlet",
        view: <MasterHamlet />,
      },
      {
        title: "YSR Village Master",
        pageLink: "/MasterVillage",
        view: <MasterVillage />,
      },
      {
        title: "YSR Sachivalayam Master",
        pageLink: "/MasterSachivalayam",
        view: <MasterSachiwalayam />,
      },
      {
        title: "YSR Mandal Master",
        pageLink: "/MasterMandal",
        view: <MasterMandal />,
      },
      {
        title: "YSR District Master",
        pageLink: "/MasterDistrict",
        view: <MasterDistrict />,
      },
      {
        title: "YSR State Master",
        pageLink: "/MasterState",
        view: <MasterState />,
      },
      {
        title: "Empanelment Attachment Type Master",
        pageLink: "/EmpanelmentAttachmentTypeMaster",
        view: <EmpanelmentAttachmentTypeMaster />,
      },
      {
        title: "Empanelment Document Type Master",
        pageLink: "/EmpanelmentDocumentTypeMaster",
        view: <EmpanelmentDocumentTypeMaster />,
      },
      {
        title: "Empanelment Hospital Infra Label Master",
        pageLink: "/EmpanelmentHospitalInfraLabelMaster",
        view: <EmpanelmentHospitalInfraLabelMaster />,
      },
      {
        title: "Empanelment Label Master",
        pageLink: "/EmpanelmentLabelMaster",
        view: <EmpanelmentLabelMaster />,
      },
      {
        title: "Empanelment Question Master",
        pageLink: "/EmpnlQstMaster",
        view: <EmpnlQstMaster />,
      },
      {
        title: "Empanelment Speciality Question Master",
        pageLink: "/EmpnlSpecialityQstMaster",
        view: <EmpnlSpecialityQstMaster />,
      },
      {
        title: "Empanelment Value Master",
        pageLink: "/EmpanelmentValueMaster",
        view: <EmpanelmentValueMaster />,
      },
      {
        title: "User Hospital Map",
        pageLink: '/HospitalMaster1',
        view: <HospitalMaster1 />,
      },
      {
        title: "Bank Master",
        pageLink: '/BankMaster',
        view: <Bankmaster />,

      },
      {
        title: "Branch Master",
        pageLink: '/branchmaster',
        view: <BranchMaster />,
      },
      {
        title: "ASRI Doctor Master",
        pageLink: "/AsriDoctorMaster",
        view: <AsriDoctorMaster />,
      },

      {
        title: "ASRI Attachment Master",
        pageLink: "/AsriAttachmentMaster",
        view: <AsriAttachmentMaster />,
      },
      {
        title: "ASRI Subcategory Master",
        pageLink: "/AsriSubcategoryMaster",
        view: <AsriSubcategoryMaster />,
      },
      {
        title: "ASRI Chemical SubGroup Master",
        pageLink: "/AsriChemicalSubGroupMaster",
        view: <AsriChemicalSubGroupMaster />,
      },
      {
        title: "ASRI Chemical Substance Master",
        pageLink: "/AsriChemicalSubstanceMaster",
        view: <AsriChemicalSubstanceMaster />,
      },
      {
        title: "ASRI Expertise Master",
        pageLink: "/AsriExpertiseMaster",
        view: <AsriExpertiseMaster />,
      },
      {
        title: "ASRI General Master",
        pageLink: "/AsriGeneralMaster",
        view: <AsriGeneralMaster />,
      },
      {
        title: "ASRI Grievance Source Role Mapping Master",
        pageLink: "/AsriGrievanceSourceRoleMappingMaster",
        view: <AsriGrievanceSourceRoleMappingMaster />,
      },
      {
        title: "ASRI Investigation Diagnosis Complain Master",
        pageLink: "/AsriInvDiaComMaster",
        view: <AsriInvDiaComMaster />,
      },

      {
        title: "Asri Main Group Master",
        pageLink: "/AsriMainGroupMaster",
        view: <AsriMainGroupMaster />,
      },
      {
        title: "ASRI Pharmacological Subgroup Master ",
        pageLink: "/AsriPharmacologicalSubgroupMaster",
        view: <AsriPharmacologicalSubgroupMaster />,
      },
      {
        title: "ASRI Procedure Master",
        pageLink: "/AsriProcedureMaster",
        view: <AsriProcedureMaster />,
      },
      {
        title: "ASRI Special Investigation Master",
        pageLink: "/AsriSpecialInvestigationMaster",
        view: <AsriSpecialInvestigationMaster />,
      },
      {
        title: "ASRI Strength Master",
        pageLink: "/AsriStrengthMaster",
        view: <AsriStrengthMaster />,
      },
      {
        title: "ASRI Strength Quantity Master",
        pageLink: "/AsriStrengthQuantityMaster",
        view: <AsriStrengthQuantityMaster />,
      },
      {
        title: "ASRI Subroute Master",
        pageLink: "/AsriSubrouteMaster",
        view: <AsriSubrouteMaster />,
      },
      {
        title: "ASRI Therapeutic Main Group Master",
        pageLink: "/AsriTherapeuticMainGroupMaster",
        view: <AsriTherapeuticMainGroupMaster />,
      }
    ]
  },

];

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/home" element={<Home />} />

        {/* {menu.map((page, index) => {
            return (
              <Route
                exact
                element={page.pageLink}
                render={({match}) => <page.view />}
                key={index}
              />
            );
          })} */}
        {/* <Navigate to="/" /> */}
      </Routes>
    </Suspense>
  );
}
