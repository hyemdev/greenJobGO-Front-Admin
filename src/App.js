import "./App.css";
import { Route, Routes } from "react-router";
import Loading from "./components/Loading";
import { Suspense, lazy } from "react";
import { PrivateRoutes } from "./components/PrivateRoutes";

const Login = () => lazy(() => import("./pages/Login"));
const AdminLayout = () => lazy(() => import("./pages/AdminLayout"));
const Home = () => lazy(() => import("./pages/Home"));
const ClassMgmt = () => lazy(() => import("./pages/ClassMgmt"));
const StudentMgmt = () => lazy(() => import("./pages/StudentMgmt"));
const CompanyMgmt = () => lazy(() => import("./pages/CompanyMgmt"));
const PortfolioMgmt = () => lazy(() => import("./pages/PortfolioMgmt"));
const Register = () => lazy(() => import("./pages/Register"));
const JobManager = () => lazy(() => import("./pages/JobManager"));
const PermanentlyDelete = () => lazy(() => import("./pages/PermanentlyDelete"));
const BulkDelete = () => lazy(() => import("./pages/BulkDelete"));
const NotFound = () => lazy(() => import("./pages/NotFound"));
const StudentInfo = () =>
  lazy(() => import("./components/studentmgmt/StudentInfo"));
const StudentPortF = () =>
  lazy(() => import("./components/studentmgmt/StudentPortF"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/admin/" element={<Login />} />
          {/* <Route element={<PrivateRoutes element={<AdminLayout />} />}> */}
          <Route element={<PrivateRoutes element={<AdminLayout />} />}>
            {/* 관리자 인트로 */}
            <Route path="/admin/home" element={<Home />} />
            {/* 수업 과정 관리 */}
            <Route path="/admin/class" element={<ClassMgmt />} />
            {/* 취업담당자 관리 */}
            <Route path="/admin/jobmanager" element={<JobManager />} />
            {/* 수강생 등록 */}
            <Route path="/admin/register" element={<Register />} />
            {/* 수강생 관리 */}
            <Route path="/admin/student" element={<StudentMgmt />} />
            <Route path="/admin/student/:istudent" element={<StudentInfo />} />
            <Route
              path="/admin/student/portfolioEdit"
              element={<StudentPortF />}
            />
            {/* 수강생 포트폴리오 관리 */}
            <Route path="/admin/portfolio" element={<PortfolioMgmt />} />
            {/* 기업 관리 */}
            <Route path="/admin/company" element={<CompanyMgmt />} />
            {/* 일괄 삭제 */}
            <Route path="/admin/bulk" element={<BulkDelete />} />
            {/* 영구 삭제 */}
            <Route path="/admin/permanently" element={<PermanentlyDelete />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
