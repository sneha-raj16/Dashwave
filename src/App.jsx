import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const chartData = [
    { name: "Jan", students: 40 },
    { name: "Feb", students: 55 },
    { name: "Mar", students: 70 },
    { name: "Apr", students: 90 },
    { name: "May", students: 120 },
    { name: "Jun", students: 150 },
  ];
  const pieData = [
    { name: "BCA", value: 400 },
    { name: "B.Tech", value: 300 },
    { name: "BBA", value: 200 },
    { name: "MBA", value: 150 },
  ];

  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#A855F7",
    "#F97316",
  ];
  const [showStudentForm, setShowStudentForm] = useState(false);

  const [students, setStudents] = useState([
    {
      id: 101,
      name: "Aayush Tiwari",
      course: "BCA",
      year: "2nd Year",
      email: "aayush@gmail.com",
      phone: "9876543210",
      attendance: "88%",
      feeStatus: "Paid",
      status: "Active",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    course: "",
    year: "",
    email: "",
    phone: "",
  });

  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = () => {
    if (
      !signupData.name ||
      !signupData.email ||
      !signupData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "dashboardUser",
      JSON.stringify(signupData)
    );

    alert("Account created successfully!");

    setShowSignup(false);
  };

  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("dashboardUser")
    );

    if (!savedUser) {
      alert("No account found. Please Sign Up first.");
      return;
    }

    if (
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      setUser(savedUser);

      alert("Login Successful");

      setShowLogin(false);

      setLoginData({
        email: "",
        password: "",
      });
    } else {
      alert("Invalid Email or Password");
    }
  };

  const [settings, setSettings] = useState({
    adminName: "",
    adminEmail: "",
    emailNotifications: false,
    smsNotifications: false,
    attendanceAlerts: false,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboardSettings");

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleAddStudent = () => {

    if (
      !newStudent.name ||
      !newStudent.course ||
      !newStudent.year
    ) {
      alert("Please fill all required fields");
      return;
    }


    setStudents([
      ...students,
      {
        ...newStudent,
        attendance: "80%",
        feeStatus: "Pending",
        status: "Active",
      },
    ]);

    setNewStudent({
      id: "",
      name: "",
      course: "",
      year: "",
      email: "",
      phone: "",
    });

    setShowStudentForm(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "dashboardSettings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully");
  };

  return (
    <div
      className={`min-h-screen overflow-hidden transition-all duration-300 ${darkMode
        ? "bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900"
        : "bg-gray-100"
        }`}
    >
      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          sidebar={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content */}
        <div
          className={`flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:ml-64" : "ml-0"
            }`}
        >

          {/* Header */}
          <Header
            user={user}
            setSidebarOpen={setSidebarOpen}
            sidebar={isSidebarOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setShowProfile={setShowProfile}
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
          />

          {/* Main Dashboard */}
          <main
            className={`p-4  md:p-6 transition-all duration-300 ${darkMode ? "text-white" : "text-black"
              }`}
          >

            {/* Dashboard */}
            {activeTab === "Dashboard" && (
              <div className="space-y-8">

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                  <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-2xl shadow-xl text-white">
                    <h2 className="text-lg font-semibold">
                      Total Students
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      1,250
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-700 p-6 rounded-2xl shadow-xl text-white">
                    <h2 className="text-lg font-semibold">
                      Teachers
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      85
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-2xl shadow-xl text-white">
                    <h2 className="text-lg font-semibold">
                      Courses
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      32
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-2xl shadow-xl text-white">
                    <h2 className="text-lg font-semibold">
                      Attendance
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      87%
                    </p>
                  </div>

                </div>


                {/* Charts */}
                {/* Dashboard Middle Section */}
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                  {/* Bar Chart */}
                  <div
                    className={`rounded-2xl p-4 md:p-6 shadow-xl border min-h-[320px] ${darkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-white border-gray-200"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Student Growth
                    </h2>

                    <div className="w-full h-[300px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={chartData}>

                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />

                          <Bar
                            dataKey="students"
                            fill="#3B82F6"
                            radius={[10, 10, 0, 0]}
                          />

                        </BarChart>

                      </ResponsiveContainer>

                    </div>

                  </div>



                  {/* Performance Card */}
                  <div
                    className={`rounded-2xl p-4 md:p-6 shadow-xl border min-h-[320px] ${darkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-white border-gray-200"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Performance Overview
                    </h2>

                    <div className="space-y-6">

                      <div>

                        <div className="flex justify-between mb-2">
                          <span>Placement Rate</span>
                          <span>92%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full w-[92%]"></div>
                        </div>

                      </div>

                      <div>

                        <div className="flex justify-between mb-2">
                          <span>Course Completion</span>
                          <span>81%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full w-[81%]"></div>
                        </div>

                      </div>

                      <div>

                        <div className="flex justify-between mb-2">
                          <span>Student Satisfaction</span>
                          <span>95%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full w-[95%]"></div>
                        </div>

                      </div>

                    </div>

                  </div>




                  {/* Quick Actions */}
                  <div
                    className={`rounded-2xl p-6 shadow-xl min-h-[320px] ${darkMode
                      ? "bg-white/10"
                      : "bg-white"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Quick Actions
                    </h2>

                    <div className="space-y-4">

                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all">
                        Add Student
                      </button>

                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all">
                        Generate Fee Report
                      </button>

                      <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl transition-all">
                        Send Announcement
                      </button>

                    </div>

                  </div>

                </div>

                {/* Bottom Dashboard Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {/* Fee Collection Status */}
                  <div
                    className={`rounded-2xl p-6 shadow-xl min-h-[320px] ${darkMode
                      ? "bg-white/10"
                      : "bg-white"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Fee Collection Status
                    </h2>

                    <div className="space-y-15">

                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Collected Fees</span>
                          <span>75%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-4">
                          <div className="bg-green-500 h-4 rounded-full w-[75%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Pending Fees</span>
                          <span>25%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-4">
                          <div className="bg-red-500 h-4 rounded-full w-[25%]"></div>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Notifications */}
                  <div
                    className={`rounded-2xl p-6 shadow-xl min-h-[320px] ${darkMode
                      ? "bg-white/10"
                      : "bg-white"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Notifications & Alerts
                    </h2>

                    <div className="space-y-4">

                      <div className="bg-red-500/20 border border-red-500 p-4 rounded-xl">
                        <h3 className="font-semibold text-red-400">
                          Fee Deadline
                        </h3>

                        <p className="text-sm mt-1">
                          Last date for fee submission is tomorrow.
                        </p>
                      </div>

                      <div className="bg-yellow-500/20 border border-yellow-500 p-4 rounded-xl">
                        <h3 className="font-semibold text-yellow-400">
                          Attendance Alert
                        </h3>

                        <p className="text-sm mt-1">
                          12 students have attendance below 75%.
                        </p>
                      </div>

                      <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-xl">
                        <h3 className="font-semibold text-blue-400">
                          New Admission
                        </h3>

                        <p className="text-sm mt-1">
                          25 new students registered today.
                        </p>
                      </div>

                    </div>

                  </div>


                  {/* Pie Chart */}
                  <div
                    className={`rounded-2xl p-4 md:p-6 shadow-xl border ${darkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-white border-gray-200"
                      }`}
                  >

                    <h2 className="text-2xl font-bold mb-6">
                      Student Distribution
                    </h2>

                    <div className="w-full h-[320px]">

                      <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={70}
                            dataKey="value"
                            label
                          >

                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}

                          </Pie>

                          <Tooltip />
                          <Legend />

                        </PieChart>

                      </ResponsiveContainer>

                    </div>

                  </div>

                </div>

                {/* Student Table */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode ? "bg-white/10" : "bg-white"
                    }`}
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Recent Students
                  </h2>

                  <table className="w-full min-w-[700px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">
                        <th className="py-4">Name</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {students.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-white/10 hover:bg-white/5 transition-all"
                        >

                          <td className="py-4">{student.id}</td>
                          <td>{student.name}</td>
                          <td>{student.course}</td>
                          <td>{student.year}</td>
                          <td>{student.email}</td>
                          <td>{student.phone}</td>
                          <td>{student.attendance}</td>

                          <td>
                            <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                              {student.feeStatus}
                            </span>
                          </td>

                          <td>
                            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
                              {student.status}
                            </span>
                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

              </div>
            )}

            {/* Students Page */}
            {activeTab === "Students" && (
              <div className="space-y-8">

                {/* Top Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Total Students
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      1,250
                    </p>
                  </div>

                  <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Active Students
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      1,120
                    </p>
                  </div>

                  <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Pending Fees
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      130
                    </p>
                  </div>

                  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      New Admissions
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      45
                    </p>
                  </div>

                </div>

                {/* Student Records */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode ? "bg-white/10" : "bg-white"
                    }`}
                >

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <h2 className="text-3xl font-bold">
                      Student Records
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">

                      <input
                        type="text"
                        placeholder="Search student..."
                        className="px-4 py-2 rounded-xl border border-gray-300 text-black"
                      />

                      <button
                        onClick={() => setShowStudentForm(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition-all"
                      >
                        Add Student
                      </button>

                    </div>

                  </div>

                  {/* Table */}
                  <table className="w-full min-w-[1000px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">

                        <th className="py-4">ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Attendance</th>
                        <th>Fee Status</th>
                        <th>Status</th>

                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">101</td>
                        <td>Aayush Tiwari</td>
                        <td>BCA</td>
                        <td>2nd Year</td>
                        <td>aayush@gmail.com</td>
                        <td>9876543210</td>
                        <td>88%</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Paid
                          </span>
                        </td>

                        <td>
                          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">102</td>
                        <td>Rahul Sharma</td>
                        <td>B.Tech</td>
                        <td>3rd Year</td>
                        <td>rahul@gmail.com</td>
                        <td>9123456780</td>
                        <td>74%</td>

                        <td>
                          <span className="bg-red-500 px-3 py-1 rounded-full text-sm text-white">
                            Pending
                          </span>
                        </td>

                        <td>
                          <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm text-white">
                            Warning
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">103</td>
                        <td>Sneha Verma</td>
                        <td>BBA</td>
                        <td>1st Year</td>
                        <td>sneha@gmail.com</td>
                        <td>9988776655</td>
                        <td>93%</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Paid
                          </span>
                        </td>

                        <td>
                          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>
            )}
            {/* Add Student Modal */}
            {showStudentForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                <div
                  className={`w-full max-w-lg rounded-2xl p-6 ${darkMode ? "bg-slate-900 text-white" : "bg-white text-white"
                    }`}
                >

                  <h2 className="text-2xl font-bold mb-6">
                    Add Student
                  </h2>

                  <div className="space-y-4">

                    <input
                      type="text"
                      placeholder="Student ID"
                      value={newStudent.id}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          id: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                    <input
                      type="text"
                      placeholder="Student Name"
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          name: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                    <input
                      type="text"
                      placeholder="Course"
                      value={newStudent.course}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          course: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                    <input
                      type="text"
                      placeholder="Year"
                      value={newStudent.year}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          year: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={newStudent.email}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          email: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                    <input
                      type="text"
                      placeholder="Phone"
                      value={newStudent.phone}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          phone: e.target.value,
                        })
                      }
                      className="w-full sm:w-auto px-4 py-2 rounded-xl"
                    />

                  </div>

                  <div className="flex justify-end gap-4 mt-6">

                    <button
                      onClick={() => setShowStudentForm(false)}
                      className="px-5 py-2 rounded-xl bg-gray-500 text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleAddStudent}
                      className="px-5 py-2 rounded-xl bg-blue-500 text-white"
                    >
                      Save Student
                    </button>

                  </div>

                </div>

              </div>

            )}
            {/* Teachers Section */}
            {activeTab === "Teachers" && (
              <div className="space-y-8">

                {/* Top Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Total Teachers
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      85
                    </p>
                  </div>

                  <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Active Staff
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      78
                    </p>
                  </div>

                  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Departments
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      12
                    </p>
                  </div>

                  <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      New Hires
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      5
                    </p>
                  </div>

                </div>

                {/* Teacher Records */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode ? "bg-white/10" : "bg-white"
                    }`}

                >

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <h2 className="text-3xl font-bold">
                      Teacher Records
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">

                      <input
                        type="text"
                        placeholder="Search teacher..."
                        className="w-full sm:w-auto px-4 py-2 rounded-xl"
                      />

                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition-all">
                        Add Teacher
                      </button>

                    </div>

                  </div>

                  {/* Table */}
                  <table className="w-full min-w-[1100px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">

                        <th className="py-4">ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Subject</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Experience</th>
                        <th>Salary Status</th>
                        <th>Status</th>

                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">T101</td>
                        <td>Mr. Sharma</td>
                        <td>Computer Science</td>
                        <td>React.js</td>
                        <td>sharma@gmail.com</td>
                        <td>9876543210</td>
                        <td>5 Years</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Paid
                          </span>
                        </td>

                        <td>
                          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">T102</td>
                        <td>Mrs. Verma</td>
                        <td>Mathematics</td>
                        <td>Statistics</td>
                        <td>verma@gmail.com</td>
                        <td>9988776655</td>
                        <td>8 Years</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Paid
                          </span>
                        </td>

                        <td>
                          <span className="bg-blue-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">T103</td>
                        <td>Mr. Khan</td>
                        <td>Physics</td>
                        <td>Quantum Physics</td>
                        <td>khan@gmail.com</td>
                        <td>9123456780</td>
                        <td>10 Years</td>

                        <td>
                          <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm text-white">
                            Pending
                          </span>
                        </td>

                        <td>
                          <span className="bg-red-500 px-3 py-1 rounded-full text-sm text-white">
                            Leave
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>
            )}
            {/* Courses Section */}
            {activeTab === "Courses" && (
              <div className="space-y-8">

                {/* Top Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Total Courses
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      32
                    </p>
                  </div>

                  <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Active Courses
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      28
                    </p>
                  </div>

                  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Departments
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      12
                    </p>
                  </div>

                  <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      New Courses
                    </h2>

                    <p className="text-4xl font-bold mt-4">
                      4
                    </p>
                  </div>

                </div>

                {/* Course Records */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode ? "bg-white/10" : "bg-white"
                    }`}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <h2 className="text-3xl font-bold">
                      Course Records
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">

                      <input
                        type="text"
                        placeholder="Search course..."
                        className="w-full sm:w-auto px-4 py-2 rounded-xl"
                      />

                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition-all">
                        Add Course
                      </button>

                    </div>

                  </div>

                  {/* Table */}
                  <table className="w-full min-w-[1100px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">

                        <th className="py-4">Course ID</th>
                        <th>Course Name</th>
                        <th>Department</th>
                        <th>Duration</th>
                        <th>Teacher</th>
                        <th>Total Students</th>
                        <th>Fees</th>
                        <th>Status</th>

                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">C101</td>
                        <td>Bachelor of Computer Applications</td>
                        <td>Computer Science</td>
                        <td>3 Years</td>
                        <td>Mr. Sharma</td>
                        <td>320</td>
                        <td>₹45,000</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">C102</td>
                        <td>Bachelor of Technology</td>
                        <td>Engineering</td>
                        <td>4 Years</td>
                        <td>Mrs. Verma</td>
                        <td>450</td>
                        <td>₹80,000</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-sm text-white">
                            Active
                          </span>
                        </td>

                      </tr>

                      <tr className="border-b border-white/10 hover:bg-white/5 transition-all">

                        <td className="py-4">C103</td>
                        <td>Bachelor of Business Administration</td>
                        <td>Management</td>
                        <td>3 Years</td>
                        <td>Mr. Khan</td>
                        <td>280</td>
                        <td>₹50,000</td>

                        <td>
                          <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm text-white">
                            Pending
                          </span>
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>
            )}
            {/* Attendance Section */}
            {activeTab === "Attendance" && (
              <div className="space-y-8">

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Total Students
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      1250
                    </p>
                  </div>

                  <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Present Today
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      1105
                    </p>
                  </div>

                  <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Absent
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      145
                    </p>
                  </div>

                  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Attendance Rate
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      88%
                    </p>
                  </div>

                </div>

                {/* Attendance Table */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode ? "bg-white/10" : "bg-white"
                    }`}
                >

                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

                    <h2 className="text-3xl font-bold">
                      Attendance Records
                    </h2>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl">
                      Mark Attendance
                    </button>

                  </div>

                  <table className="w-full min-w-[900px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">
                        <th className="py-4">Student ID</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Attendance %</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b border-white/10">
                        <td className="py-4">101</td>
                        <td>Aayush Tiwari</td>
                        <td>BCA</td>
                        <td>06 May 2026</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-white text-sm">
                            Present
                          </span>
                        </td>

                        <td>88%</td>
                      </tr>

                      <tr className="border-b border-white/10">
                        <td className="py-4">102</td>
                        <td>Rahul Sharma</td>
                        <td>B.Tech</td>
                        <td>06 May 2026</td>

                        <td>
                          <span className="bg-red-500 px-3 py-1 rounded-full text-white text-sm">
                            Absent
                          </span>
                        </td>

                        <td>74%</td>
                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>
            )}
            {/* Results Section */}
            {activeTab === "Results" && (
              <div className="space-y-8">

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                  <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Passed Students
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      1120
                    </p>
                  </div>

                  <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Failed Students
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      130
                    </p>
                  </div>

                  <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Top Score
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      98%
                    </p>
                  </div>

                  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-lg font-semibold">
                      Average Result
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                      82%
                    </p>
                  </div>

                </div>

                {/* Results Table */}
                <div
                  className={`rounded-2xl p-4 md:p-6 shadow-xl overflow-x-auto w-full ${darkMode
                    ? "bg-white/10"
                    : "bg-white"
                    }`}
                >

                  <div className="flex items-center justify-between mb-6">

                    <h2 className="text-3xl font-bold">
                      Student Results
                    </h2>

                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl">
                      Generate Results
                    </button>

                  </div>

                  <table className="w-full min-w-[900px]">

                    <thead>
                      <tr className="border-b border-white/20 text-left">
                        <th className="py-4">Roll No</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Total Marks</th>
                        <th>Percentage</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr className="border-b border-white/10">
                        <td className="py-4">101</td>
                        <td>Aayush Tiwari</td>
                        <td>BCA</td>
                        <td>490</td>
                        <td>98%</td>

                        <td>
                          <span className="bg-green-500 px-3 py-1 rounded-full text-white text-sm">
                            Pass
                          </span>
                        </td>
                      </tr>

                      <tr className="border-b border-white/10">
                        <td className="py-4">102</td>
                        <td>Rahul Sharma</td>
                        <td>B.Tech</td>
                        <td>320</td>
                        <td>64%</td>

                        <td>
                          <span className="bg-yellow-500 px-3 py-1 rounded-full text-white text-sm">
                            Average
                          </span>
                        </td>
                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>
            )}
            {/* Settings Section */}
            {activeTab === "Settings" && (
              <div
                className={`rounded-2xl p-6 shadow-xl ${darkMode ? "bg-white/10" : "bg-white"
                  }`}
              >


                <h2 className="text-3xl font-bold mb-8">
                  Dashboard Settings
                </h2>

                <div className="space-y-8">

                  {/* Profile Settings */}
                  <div>

                    <h3 className="text-2xl font-semibold mb-4">
                      Profile Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <input
                        type="text"
                        placeholder="Admin Name"
                        value={settings.adminName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            adminName: e.target.value,
                          })
                        }
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-black"
                      />

                      <input
                        type="email"
                        placeholder="Admin Email"
                        value={settings.adminEmail}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            adminEmail: e.target.value,
                          })
                        }
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-black"
                      />

                    </div>

                  </div>

                  {/* Security */}
                  <div>

                    <h3 className="text-2xl font-semibold mb-4">
                      Security
                    </h3>

                    <div className="space-y-4">

                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-black"
                      />

                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-black"
                      />

                    </div>

                  </div>

                  {/* Notifications */}
                  <div>

                    <h3 className="text-2xl font-semibold mb-4">
                      Notifications
                    </h3>

                    <div className="space-y-4">

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              emailNotifications: e.target.checked,
                            })
                          }
                        />
                        Email Notifications
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              smsNotifications: e.target.checked,
                            })
                          }
                        />
                        SMS Notifications
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={settings.attendanceAlerts}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              attendanceAlerts: e.target.checked,
                            })
                          }
                        />
                        Attendance Alerts
                      </label>

                    </div>

                  </div>

                  {/* Save Button */}
                  <button
                    onClick={saveSettings}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-all"
                  >
                    Save Settings
                  </button>

                </div>

              </div>
            )}
            {/* Profile Modal */}
            {showProfile && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                <div
                  className={`w-full max-w-md md:max-w-lg rounded-2xl p-6 ${darkMode
                    ? "bg-slate-900 text-white"
                    : "bg-white text-black"
                    }`}
                >

                  <h2 className="text-2xl font-bold mb-6">
                    Admin Profile
                  </h2>

                  <div className="space-y-4">

                    <div>
                      <p className="font-semibold">Name</p>
                      <p>{user?.name || "Guest User"}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Role</p>
                      <p>Administrator</p>
                    </div>

                    <div>
                      <p className="font-semibold">Email</p>
                      <p>{user?.email || "Not Logged In"}</p>
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setUser(null);
                      setShowProfile(false);
                    }}
                    className="mt-4 bg-red-500 text-white px-5 py-2 rounded-xl"
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => setShowProfile(false)}
                    className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-xl"
                  >
                    Close
                  </button>

                </div>

              </div>
            )}

            {/* Login Modal */}
            {showLogin && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                <div
                  className={`w-full max-w-md md:max-w-lg rounded-2xl p-6 shadow-2xl ${darkMode
                    ? "bg-slate-900 text-white"
                    : "bg-white text-black"
                    }`}
                >

                  <h2 className="text-2xl font-bold mb-6">
                    Login
                  </h2>

                  <div className="space-y-4">

                    <input
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={handleLogin}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setShowLogin(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl transition-all"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </div>
            )}
            {/* Signup Modal */}
            {showSignup && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                <div
                  className={`w-full max-w-md md:max-w-lg rounded-2xl p-6 shadow-2xl ${darkMode
                    ? "bg-slate-900 text-white"
                    : "bg-white text-black"
                    }`}
                >

                  <h2 className="text-2xl font-bold mb-6">
                    Create Account
                  </h2>

                  <div className="space-y-4">

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          name: e.target.value,
                        })
                      }
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={handleSignup}
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
                    >
                      Sign Up
                    </button>

                    <button
                      onClick={() => setShowSignup(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl transition-all"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              </div>
            )}


          </main>

        </div>

      </div >
    </div >
  );
}

export default App;