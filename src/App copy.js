import React, { useState, useEffect, createContext, useContext } from 'react';
import { Calendar, Book, Users, FileText, Bell, Settings, LogOut, Home, Award, MessageSquare, Video, Download, Upload, Clock, CheckCircle, AlertCircle, BarChart, User, Menu, X, ChevronRight, Plus, Edit, Trash2, Eye, Search, Filter, Star } from 'lucide-react';

// Auth Context
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

// Main App Component
export default function LMS() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    // Simulate logged in user
    setUser({
      id: 1,
      name: 'Sarah Johnson',
      role: 'student', // can be 'student', 'instructor', or 'admin'
      email: 'sarah.j@university.edu',
      avatar: null
    });
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <CoursesManagement />;
      case 'assignments':
        return <AssignmentsView />;
      case 'grades':
        return <GradesView />;
      case 'calendar':
        return <CalendarView />;
      case 'discussions':
        return <DiscussionsView />;
      case 'gradebook':
        return <GradebookView />;
      case 'students':
        return <StudentsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} onNavigate={handleNavigate} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {renderContent()}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

// Login Page
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({
      id: 1,
      name: role === 'instructor' ? 'Dr. Smith' : role === 'admin' ? 'Admin User' : 'Sarah Johnson',
      role: role,
      email: email || 'user@university.edu',
      avatar: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Book className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to EduHub</h2>
          <p className="text-gray-600 mt-2">Modern Learning Management System</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@university.edu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Demo Mode: Click Sign In with any credentials
        </p>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, setUser } = useAuth();
  const notificationSystem = NotificationCenter(); // Add this line
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Update the notifications count
  const notifications = notificationSystem.unreadCount;

  const handleLogout = () => {
    setUser(null);
    setShowProfile(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="ml-4 flex items-center">
              <Book className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduHub</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <NotificationItem
                      icon={<FileText className="w-4 h-4" />}
                      title="New Assignment Posted"
                      desc="CS101: Project 3 is now available"
                      time="2 hours ago"
                    />
                    <NotificationItem
                      icon={<MessageSquare className="w-4 h-4" />}
                      title="Discussion Reply"
                      desc="Someone replied to your post"
                      time="5 hours ago"
                    />
                    <NotificationItem
                      icon={<Award className="w-4 h-4" />}
                      title="Grade Posted"
                      desc="Your midterm exam has been graded"
                      time="1 day ago"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="w-4 h-4 inline mr-2" />
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 inline mr-2" />
                    Settings
                  </a>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Notification Item
function NotificationItem({ icon, title, desc, time }) {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full">
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar({ open, onNavigate }) {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');
  
  
  const studentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: Book },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
  ];

  
  const instructorMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: Book },
    { id: 'gradebook', label: 'Gradebook', icon: BarChart },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  const adminMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'courses', label: 'Course Management', icon: Book },
    { id: 'reports', label: 'Reports', icon: BarChart },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];
  
  const getMenu = () => {
    switch (user?.role) {
      case 'instructor':
        return instructorMenu;
      case 'admin':
        return adminMenu;
      default:
        return studentMenu;
    }
  };
  
  const menu = getMenu();
  
  return (
    <div className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
      open ? 'w-64' : 'w-0 overflow-hidden'
    }`}>
      <nav className="p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                onNavigate(item.id);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}



// Dashboard Component

function Dashboard() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  
  const courses = [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      instructor: 'Dr. Smith',
      progress: 75,
      nextDeadline: 'Assignment 3 - Due Tomorrow',
      students: 45,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      code: 'MATH201',
      name: 'Calculus II',
      instructor: 'Prof. Johnson',
      progress: 60,
      nextDeadline: 'Quiz 5 - Due in 3 days',
      students: 38,
      color: 'bg-green-500'
    },
    {
      id: 3,
      code: 'ENG102',
      name: 'Academic Writing',
      instructor: 'Dr. Williams',
      progress: 85,
      nextDeadline: 'Essay Draft - Due in 5 days',
      students: 32,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      code: 'PHY301',
      name: 'Quantum Mechanics',
      instructor: 'Prof. Chen',
      progress: 40,
      nextDeadline: 'Lab Report - Due in 1 week',
      students: 28,
      color: 'bg-orange-500'
    }
  ];
  
  const upcomingTasks = [
    { id: 1, title: 'CS101 Assignment 3', due: 'Tomorrow, 11:59 PM', type: 'assignment', status: 'pending' },
    { id: 2, title: 'MATH201 Quiz 5', due: 'Oct 25, 3:00 PM', type: 'quiz', status: 'pending' },
    { id: 3, title: 'ENG102 Essay Draft', due: 'Oct 27, 11:59 PM', type: 'assignment', status: 'in-progress' },
    { id: 4, title: 'PHY301 Lab Report', due: 'Oct 30, 5:00 PM', type: 'lab', status: 'not-started' },
  ];
  
  const announcements = [
    { id: 1, course: 'CS101', title: 'Office Hours Changed', time: '2 hours ago', priority: 'high' },
    { id: 2, course: 'MATH201', title: 'Extra Practice Problems Posted', time: '5 hours ago', priority: 'normal' },
    { id: 3, course: 'All Courses', title: 'University Holiday - Nov 1', time: '1 day ago', priority: 'high' },
  ];

  if (selectedCourse) {
    return <CourseView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }
  
  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Book className="w-6 h-6" />}
          label="Active Courses"
          value={courses.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label="Pending Tasks"
          value={upcomingTasks.filter(t => t.status === 'pending').length}
          color="bg-orange-500"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Average Grade"
          value="A-"
          color="bg-green-500"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label="Study Hours"
          value="24.5"
          color="bg-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">My Courses</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}`}>
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  viewMode={viewMode}
                  onClick={() => setSelectedCourse(course)}
                  isInstructor={user?.role === 'instructor'}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            </div>
            <div className="p-4 space-y-3">
              {upcomingTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
              <button className="w-full text-blue-600 text-sm font-medium hover:text-blue-700">
                View All Tasks →
              </button>
            </div>
          </div>
          
          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Announcements</h2>
            </div>
            <div className="p-4 space-y-3">
              {announcements.map((announcement) => (
                <AnnouncementItem key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
          <div className={`${color} bg-opacity-100 text-white rounded`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, viewMode, onClick, isInstructor }) {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-12 ${course.color} rounded-full`}></div>
          <div>
            <h3 className="font-semibold text-gray-900">{course.code} - {course.name}</h3>
            <p className="text-sm text-gray-600">
              {isInstructor ? `${course.students} students` : course.instructor}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-white to-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`${course.color} text-white px-3 py-1 rounded-lg text-sm font-semibold`}>
          {course.code}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Star className="w-4 h-4" />
        </button>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
      <p className="text-sm text-gray-600 mb-3">
        {isInstructor ? `${course.students} students` : course.instructor}
      </p>
      
      {!isInstructor && (
        <>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${course.color} h-2 rounded-full transition-all`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.nextDeadline}</span>
          </div>
        </>
      )}
    </div>
  );
}

// Task Item Component
function TaskItem({ task }) {
  const statusColors = {
    'pending': 'text-orange-600 bg-orange-50',
    'in-progress': 'text-blue-600 bg-blue-50',
    'not-started': 'text-gray-600 bg-gray-50'
  };
  
  const typeIcons = {
    'assignment': <FileText className="w-4 h-4" />,
    'quiz': <Edit className="w-4 h-4" />,
    'lab': <Users className="w-4 h-4" />
  };
  
  return (
    <div className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer">
      <div className="bg-gray-100 p-2 rounded">
        {typeIcons[task.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{task.title}</p>
        <p className="text-xs text-gray-600">{task.due}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
        {task.status.replace('-', ' ')}
      </span>
    </div>
  );
}

// Announcement Item Component
function AnnouncementItem({ announcement }) {
  return (
    <div className="p-2 rounded hover:bg-gray-50 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500">{announcement.course}</span>
            {announcement.priority === 'high' && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">Important</span>
            )}
          </div>
          <p className="text-sm font-medium text-gray-900 mt-1">{announcement.title}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
    </div>
  );
}

// Course View Component
function CourseView({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'content', label: 'Content', icon: Book },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'people', label: 'People', icon: Users },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className={`${course.color} text-white`}>
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-4"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{course.code}: {course.name}</h1>
              <p className="text-white/80 mt-2">{course.instructor}</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Join Class</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && <CourseOverview course={course} />}
        {activeTab === 'content' && <CourseContent />}
        {activeTab === 'assignments' && <AssignmentsTab isInstructor={user?.role === 'instructor'} />}
        {activeTab === 'discussions' && <DiscussionsTab />}
        {activeTab === 'grades' && <GradesTab isInstructor={user?.role === 'instructor'} />}
        {activeTab === 'people' && <PeopleTab />}
      </div>
    </div>
  );
}

// Course Overview Component
function CourseOverview({ course }) {
  const recentActivity = [
    { type: 'assignment', title: 'Project 3 Posted', time: '2 hours ago' },
    { type: 'grade', title: 'Midterm Exam Graded', time: '1 day ago' },
    { type: 'discussion', title: 'New Discussion: Final Project Ideas', time: '2 days ago' },
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Course Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Course Information</h2>
          <div className="prose max-w-none text-gray-600">
            <p>Welcome to {course.name}! This course provides a comprehensive introduction to fundamental concepts in computer science, including programming, algorithms, data structures, and computational thinking.</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">Learning Objectives</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Understand basic programming concepts and syntax</li>
              <li>Develop problem-solving skills using computational thinking</li>
              <li>Learn fundamental data structures and algorithms</li>
              <li>Build practical projects to reinforce learning</li>
            </ul>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'grade' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'assignment' ? <FileText className="w-4 h-4" /> :
                   activity.type === 'grade' ? <Award className="w-4 h-4" /> :
                   <MessageSquare className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Course Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Lectures</p>
                <p className="text-sm text-gray-600">Mon, Wed, Fri - 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Lab Sessions</p>
                <p className="text-sm text-gray-600">Tuesday - 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Office Hours</p>
                <p className="text-sm text-gray-600">Thursday - 3:00-5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Download className="w-4 h-4" />
              <span className="text-sm">Syllabus</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Book className="w-4 h-4" />
              <span className="text-sm">Textbook Resources</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <Video className="w-4 h-4" />
              <span className="text-sm">Recorded Lectures</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Content Component
function CourseContent() {
  const modules = [
    {
      id: 1,
      title: 'Module 1: Introduction to Programming',
      items: [
        { type: 'video', title: 'Welcome to CS101', duration: '15:30' },
        { type: 'reading', title: 'Chapter 1: Getting Started', pages: '1-25' },
        { type: 'assignment', title: 'Hello World Program', due: 'Completed' },
      ]
    },
    {
      id: 2,
      title: 'Module 2: Variables and Data Types',
      items: [
        { type: 'video', title: 'Understanding Variables', duration: '22:15' },
        { type: 'reading', title: 'Chapter 2: Data Types', pages: '26-54' },
        { type: 'quiz', title: 'Quiz: Variables and Types', questions: 10 },
      ]
    },
    {
      id: 3,
      title: 'Module 3: Control Structures',
      items: [
        { type: 'video', title: 'If Statements and Loops', duration: '28:45' },
        { type: 'reading', title: 'Chapter 3: Control Flow', pages: '55-89' },
        { type: 'assignment', title: 'Project: Calculator', due: 'Oct 28' },
      ]
    },
  ];
  
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-lg">{module.title}</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {module.items.map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {item.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                    {item.type === 'reading' && <Book className="w-5 h-5 text-green-600" />}
                    {item.type === 'assignment' && <FileText className="w-5 h-5 text-orange-600" />}
                    {item.type === 'quiz' && <Edit className="w-5 h-5 text-purple-600" />}
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.duration || item.pages || item.due || `${item.questions} questions`}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Assignments Tab Component
function AssignmentsTab({ isInstructor }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const assignments = [
    {
      id: 1,
      title: 'Project 1: Hello World',
      due: 'Oct 15, 2024',
      status: 'submitted',
      grade: '95/100',
      submissions: 42,
      type: 'project'
    },
    {
      id: 2,
      title: 'Assignment 2: Variables Practice',
      due: 'Oct 20, 2024',
      status: 'submitted',
      grade: '88/100',
      submissions: 44,
      type: 'homework'
    },
    {
      id: 3,
      title: 'Project 3: Calculator Application',
      due: 'Oct 28, 2024',
      status: 'pending',
      grade: null,
      submissions: 12,
      type: 'project'
    },
    {
      id: 4,
      title: 'Midterm Exam',
      due: 'Nov 5, 2024',
      status: 'upcoming',
      grade: null,
      submissions: 0,
      type: 'exam'
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        {isInstructor && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    assignment.type === 'project' ? 'bg-blue-100' :
                    assignment.type === 'exam' ? 'bg-red-100' :
                    'bg-green-100'
                  }`}>
                    {assignment.type === 'exam' ? <Edit className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">Due: {assignment.due}</p>
                    {isInstructor && (
                      <p className="text-sm text-gray-600">{assignment.submissions}/45 submitted</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {!isInstructor && (
                    <>
                      {assignment.status === 'submitted' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Submitted
                        </span>
                      )}
                      {assignment.status === 'pending' && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          In Progress
                        </span>
                      )}
                      {assignment.status === 'upcoming' && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          Upcoming
                        </span>
                      )}
                      {assignment.grade && (
                        <span className="font-semibold text-gray-900">{assignment.grade}</span>
                      )}
                    </>
                  )}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    {isInstructor ? 'View Submissions' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showCreateModal && (
        <CreateAssignmentModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// Create Assignment Modal
function CreateAssignmentModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    instructions: '',
    dueDate: '',
    points: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Creating assignment:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Assignment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea 
              rows="4" 
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input 
                type="datetime-local" 
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input 
                type="number" 
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Discussions Tab Component
function DiscussionsTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const discussions = [
    {
      id: 1,
      title: 'Questions about Project 3',
      author: 'John Doe',
      replies: 12,
      lastActivity: '2 hours ago',
      pinned: true
    },
    {
      id: 2,
      title: 'Study Group for Midterm',
      author: 'Jane Smith',
      replies: 8,
      lastActivity: '5 hours ago',
      pinned: false
    },
    {
      id: 3,
      title: 'Clarification on Variable Scope',
      author: 'Mike Johnson',
      replies: 5,
      lastActivity: '1 day ago',
      pinned: false
    },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button className="text-blue-600 font-medium">All Discussions</button>
            <button className="text-gray-600 hover:text-gray-900">Pinned</button>
            <button className="text-gray-600 hover:text-gray-900">My Posts</button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {discussion.pinned && (
                    <div className="mt-1">
                      <div className="bg-blue-100 p-1 rounded">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16a1 1 0 11-2 0V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Started by {discussion.author} • {discussion.replies} replies • Last activity {discussion.lastActivity}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <CreateDiscussionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// Create Discussion Modal
function CreateDiscussionModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating discussion:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Start New Discussion</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              rows="6" 
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Grades Tab Component - continues...
function GradesTab({ isInstructor }) {
 const grades = [
   { assignment: 'Project 1: Hello World', score: 95, total: 100, weight: '10%' },
   { assignment: 'Assignment 2: Variables', score: 88, total: 100, weight: '5%' },
   { assignment: 'Quiz 1', score: 18, total: 20, weight: '5%' },
   { assignment: 'Midterm Exam', score: null, total: 100, weight: '25%' },
 ];
 
 const students = [
   { name: 'John Doe', id: 'JD001', average: 92, submissions: 8 },
   { name: 'Jane Smith', id: 'JS002', average: 88, submissions: 7 },
   { name: 'Mike Johnson', id: 'MJ003', average: 95, submissions: 8 },
   { name: 'Sarah Williams', id: 'SW004', average: 85, submissions: 6 },
 ];
 
 if (isInstructor) {
   return (
     <div>
       <h2 className="text-2xl font-bold mb-6">Gradebook</h2>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead className="bg-gray-50 border-b border-gray-200">
               <tr>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Average</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Submissions</th>
                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200">
               {students.map((student) => (
                 <tr key={student.id} className="hover:bg-gray-50">
                   <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                   <td className="px-4 py-3 text-sm text-gray-600">{student.id}</td>
                   <td className="px-4 py-3 text-sm">
                     <span className={`font-semibold ${
                       student.average >= 90 ? 'text-green-600' :
                       student.average >= 80 ? 'text-blue-600' :
                       'text-orange-600'
                     }`}>
                       {student.average}%
                     </span>
                   </td>
                   <td className="px-4 py-3 text-sm text-gray-600">{student.submissions}/8</td>
                   <td className="px-4 py-3 text-sm">
                     <button className="text-blue-600 hover:text-blue-700">View Details</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
 }
 
 return (
   <div>
     <h2 className="text-2xl font-bold mb-6">My Grades</h2>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Current Grade</p>
         <p className="text-3xl font-bold text-green-600 mt-1">A-</p>
         <p className="text-sm text-gray-600 mt-1">90.3%</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Assignments Completed</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">3/4</p>
         <p className="text-sm text-gray-600 mt-1">75% completion</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Class Rank</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">5/45</p>
         <p className="text-sm text-gray-600 mt-1">Top 11%</p>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Grade Breakdown</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {grades.map((grade, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-gray-900">{grade.assignment}</p>
                 <p className="text-sm text-gray-600">Weight: {grade.weight}</p>
               </div>
               <div className="text-right">
                 {grade.score !== null ? (
                   <>
                     <p className="font-semibold text-gray-900">{grade.score}/{grade.total}</p>
                     <p className="text-sm text-gray-600">{((grade.score/grade.total) * 100).toFixed(1)}%</p>
                   </>
                 ) : (
                   <p className="text-gray-400">Not graded</p>
                 )}
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// People Tab Component
function PeopleTab() {
 const instructors = [
   { name: 'Dr. Robert Smith', role: 'Professor', email: 'r.smith@university.edu' },
   { name: 'Sarah Johnson', role: 'Teaching Assistant', email: 's.johnson@university.edu' },
 ];
 
 const students = [
   { name: 'Alice Anderson', email: 'a.anderson@university.edu', status: 'online' },
   { name: 'Bob Brown', email: 'b.brown@university.edu', status: 'offline' },
   { name: 'Charlie Chen', email: 'c.chen@university.edu', status: 'online' },
   { name: 'Diana Davis', email: 'd.davis@university.edu', status: 'offline' },
   { name: 'Eric Evans', email: 'e.evans@university.edu', status: 'online' },
 ];
 
 return (
   <div>
     <div className="flex justify-between items-center mb-6">
       <h2 className="text-2xl font-bold">People</h2>
       <div className="flex items-center space-x-2">
         <Search className="w-5 h-5 text-gray-400" />
         <input
           type="text"
           placeholder="Search people..."
           className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         />
       </div>
     </div>
     
     {/* Instructors */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Instructors</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {instructors.map((instructor, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                   <User className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">{instructor.name}</p>
                   <p className="text-sm text-gray-600">{instructor.role} • {instructor.email}</p>
                 </div>
               </div>
               <button className="text-blue-600 hover:text-blue-700">
                 <MessageSquare className="w-5 h-5" />
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
     
     {/* Students */}
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h3 className="font-semibold">Students ({students.length})</h3>
       </div>
       <div className="divide-y divide-gray-200">
         {students.map((student, index) => (
           <div key={index} className="p-4">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                 <div className="relative">
                   <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                     <User className="w-6 h-6 text-white" />
                   </div>
                   {student.status === 'online' && (
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                   )}
                 </div>
                 <div>
                   <p className="font-medium text-gray-900">{student.name}</p>
                   <p className="text-sm text-gray-600">{student.email}</p>
                 </div>
               </div>
               <button className="text-blue-600 hover:text-blue-700">
                 <MessageSquare className="w-5 h-5" />
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Enhanced Dashboard with dynamic state management
function EnhancedDashboard() {
 const { user } = useAuth();
 const [courses, setCourses] = useState([
   {
     id: 1,
     code: 'CS101',
     name: 'Introduction to Computer Science',
     instructor: 'Dr. Smith',
     progress: 75,
     nextDeadline: 'Assignment 3 - Due Tomorrow',
     students: 45,
     color: 'bg-blue-500',
     announcements: [
       { id: 1, title: 'Office Hours Changed', content: 'Office hours moved to Thursday 4-6 PM', date: new Date() }
     ]
   },
   // ... other courses
 ]);
 
 const [assignments, setAssignments] = useState([
   {
     id: 1,
     courseId: 1,
     title: 'Project 1: Hello World',
     description: 'Create your first program',
     dueDate: '2024-10-28',
     points: 100,
     submissions: [],
     type: 'project'
   }
 ]);
 
 const [discussions, setDiscussions] = useState([
   {
     id: 1,
     courseId: 1,
     title: 'Questions about Project 3',
     content: 'I need help with the calculator logic',
     author: user?.name || 'Anonymous',
     authorId: user?.id,
     replies: [],
     createdAt: new Date(),
     pinned: false
   }
 ]);

 const addAssignment = (newAssignment) => {
   setAssignments(prev => [...prev, {
     ...newAssignment,
     id: Date.now(),
     submissions: []
   }]);
 };

 const addDiscussion = (newDiscussion) => {
   setDiscussions(prev => [...prev, {
     ...newDiscussion,
     id: Date.now(),
     author: user?.name || 'Anonymous',
     authorId: user?.id,
     replies: [],
     createdAt: new Date(),
     pinned: false
   }]);
 };

 const submitAssignment = (assignmentId, submission) => {
   setAssignments(prev => prev.map(assignment => 
     assignment.id === assignmentId 
       ? {
           ...assignment,
           submissions: [...assignment.submissions, {
             id: Date.now(),
             studentId: user?.id,
             studentName: user?.name,
             content: submission,
             submittedAt: new Date(),
             grade: null
           }]
         }
       : assignment
   ));
 };

 return {
   courses,
   assignments,
   discussions,
   addAssignment,
   addDiscussion,
   submitAssignment,
   setCourses,
   setAssignments,
   setDiscussions
 };
}

// File Upload Component
function FileUpload({ onFileUpload, acceptedTypes = ".pdf,.doc,.docx,.txt", multiple = false }) {
 const [dragActive, setDragActive] = useState(false);
 const [uploadedFiles, setUploadedFiles] = useState([]);

 const handleDrag = (e) => {
   e.preventDefault();
   e.stopPropagation();
   if (e.type === "dragenter" || e.type === "dragover") {
     setDragActive(true);
   } else if (e.type === "dragleave") {
     setDragActive(false);
   }
 };

 const handleDrop = (e) => {
   e.preventDefault();
   e.stopPropagation();
   setDragActive(false);
   
   const files = Array.from(e.dataTransfer.files);
   handleFiles(files);
 };

 const handleChange = (e) => {
   const files = Array.from(e.target.files);
   handleFiles(files);
 };

 const handleFiles = (files) => {
   const newFiles = files.map(file => ({
     id: Date.now() + Math.random(),
     name: file.name,
     size: file.size,
     type: file.type,
     file: file
   }));
   
   setUploadedFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);
   onFileUpload(newFiles);
 };

 const removeFile = (fileId) => {
   setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
 };

 return (
   <div className="space-y-4">
     <div
       className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
         dragActive 
           ? 'border-blue-500 bg-blue-50' 
           : 'border-gray-300 hover:border-gray-400'
       }`}
       onDragEnter={handleDrag}
       onDragLeave={handleDrag}
       onDragOver={handleDrag}
       onDrop={handleDrop}
     >
       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
       <p className="text-sm text-gray-600 mb-2">
         Drag and drop files here, or{' '}
         <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
           browse
           <input
             type="file"
             multiple={multiple}
             accept={acceptedTypes}
             onChange={handleChange}
             className="hidden"
           />
         </label>
       </p>
       <p className="text-xs text-gray-500">
         Supported formats: {acceptedTypes.replace(/\./g, '').toUpperCase()}
       </p>
     </div>

     {uploadedFiles.length > 0 && (
       <div className="space-y-2">
         <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
         {uploadedFiles.map(file => (
           <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
             <div className="flex items-center space-x-2">
               <FileText className="w-4 h-4 text-gray-500" />
               <span className="text-sm text-gray-700">{file.name}</span>
               <span className="text-xs text-gray-500">
                 ({(file.size / 1024).toFixed(1)} KB)
               </span>
             </div>
             <button
               onClick={() => removeFile(file.id)}
               className="text-red-500 hover:text-red-700"
             >
               <X className="w-4 h-4" />
             </button>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}

// Assignment Submission Modal
function AssignmentSubmissionModal({ assignment, onClose, onSubmit }) {
 const [submission, setSubmission] = useState({
   text: '',
   files: []
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!submission.text.trim() && submission.files.length === 0) {
     alert('Please provide either text or file submission');
     return;
   }
   
   onSubmit(assignment.id, submission);
   onClose();
 };

 const handleFileUpload = (files) => {
   setSubmission(prev => ({
     ...prev,
     files: files
   }));
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Submit Assignment</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <div className="mb-4 p-4 bg-gray-50 rounded-lg">
         <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
         <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
         <p className="text-sm text-red-600 mt-2">
           Due: {new Date(assignment.dueDate).toLocaleDateString()}
         </p>
       </div>
       
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             Text Submission
           </label>
           <textarea
             value={submission.text}
             onChange={(e) => setSubmission(prev => ({ ...prev, text: e.target.value }))}
             rows="6"
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
             placeholder="Type your submission here or upload files below..."
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">
             File Upload
           </label>
           <FileUpload 
             onFileUpload={handleFileUpload}
             multiple={true}
             acceptedTypes=".pdf,.doc,.docx,.txt,.zip"
           />
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button 
             type="button" 
             onClick={onClose} 
             className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
           >
             Cancel
           </button>
           <button 
             onClick={handleSubmit} 
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
           >
             Submit Assignment
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

// Enhanced Notifications
function NotificationCenter() {
 const [notifications, setNotifications] = useState([
   {
     id: 1,
     type: 'assignment',
     title: 'New Assignment Posted',
     message: 'CS101: Project 3 is now available',
     time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
     read: false,
     courseId: 1
   },
   {
     id: 2,
     type: 'grade',
     title: 'Grade Posted',
     message: 'Your midterm exam has been graded: 88/100',
     time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
     read: false,
     courseId: 1
   }
 ]);

 const markAsRead = (notificationId) => {
   setNotifications(prev => 
     prev.map(notif => 
       notif.id === notificationId ? { ...notif, read: true } : notif
     )
   );
 };

 const markAllAsRead = () => {
   setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
 };

 const getTimeAgo = (date) => {
   const now = new Date();
   const diff = now - date;
   const hours = Math.floor(diff / (1000 * 60 * 60));
   const days = Math.floor(hours / 24);
   
   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
   if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
   return 'Just now';
 };

 return {
   notifications,
   markAsRead,
   markAllAsRead,
   getTimeAgo,
   unreadCount: notifications.filter(n => !n.read).length
 };
}

// Calendar Component
function Calendarr() {
 const [currentDate, setCurrentDate] = useState(new Date());
 const [events, setEvents] = useState([
   {
     id: 1,
     title: 'CS101 Lecture',
     date: new Date(2024, 9, 23), // October 23, 2024
     type: 'lecture',
     time: '10:00 AM'
   },
   {
     id: 2,
     title: 'Project 3 Due',
     date: new Date(2024, 9, 28),
     type: 'assignment',
     time: '11:59 PM'
   }
 ]);

 const getDaysInMonth = (date) => {
   const year = date.getFullYear();
   const month = date.getMonth();
   const firstDay = new Date(year, month, 1);
   const lastDay = new Date(year, month + 1, 0);
   const daysInMonth = lastDay.getDate();
   const startingDayOfWeek = firstDay.getDay();

   const days = [];
   
   // Add empty cells for days before the first day of the month
   for (let i = 0; i < startingDayOfWeek; i++) {
     days.push(null);
   }
   
   // Add days of the month
   for (let day = 1; day <= daysInMonth; day++) {
     days.push(new Date(year, month, day));
   }
   
   return days;
 };

 const getEventsForDay = (date) => {
   if (!date) return [];
   return events.filter(event => 
     event.date.toDateString() === date.toDateString()
   );
 };

 const navigateMonth = (direction) => {
   setCurrentDate(prev => {
     const newDate = new Date(prev);
     newDate.setMonth(prev.getMonth() + direction);
     return newDate;
   });
 };

 const days = getDaysInMonth(currentDate);
 const monthNames = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
 ];
 const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <div className="flex justify-between items-center mb-4">
       <h2 className="text-xl font-semibold">
         {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
       </h2>
       <div className="flex space-x-2">
         <button
           onClick={() => navigateMonth(-1)}
           className="p-2 hover:bg-gray-100 rounded"
         >
           <ChevronRight className="w-5 h-5 rotate-180" />
         </button>
         <button
           onClick={() => navigateMonth(1)}
           className="p-2 hover:bg-gray-100 rounded"
         >
           <ChevronRight className="w-5 h-5" />
         </button>
       </div>
     </div>
     
     <div className="grid grid-cols-7 gap-1 mb-2">
       {dayNames.map(day => (
         <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
           {day}
         </div>
       ))}
     </div>
     
     <div className="grid grid-cols-7 gap-1">
       {days.map((day, index) => {
         const dayEvents = getEventsForDay(day);
         const isToday = day && day.toDateString() === new Date().toDateString();
         
         return (
           <div
             key={index}
             className={`min-h-20 p-1 border border-gray-200 ${
               day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
             } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
           >
             {day && (
               <>
                 <div className={`text-sm font-medium ${
                   isToday ? 'text-blue-600' : 'text-gray-900'
                 }`}>
                   {day.getDate()}
                 </div>
                 <div className="space-y-1">
                   {dayEvents.slice(0, 2).map(event => (
                     <div
                       key={event.id}
                       className={`text-xs p-1 rounded truncate ${
                         event.type === 'lecture' 
                           ? 'bg-blue-100 text-blue-700'
                           : 'bg-red-100 text-red-700'
                       }`}
                       title={`${event.title} - ${event.time}`}
                     >
                       {event.title}
                     </div>
                   ))}
                   {dayEvents.length > 2 && (
                     <div className="text-xs text-gray-500 text-center">
                       +{dayEvents.length - 2} more
                     </div>
                   )}
                 </div>
               </>
             )}
           </div>
         );
       })}
     </div>
   </div>
 );
}

// Continue with remaining components...

// Student Progress Tracker
function StudentProgressTracker({ studentId, courseId }) {
 const [progressData, setProgressData] = useState({
   completedAssignments: 8,
   totalAssignments: 12,
   averageGrade: 87.5,
   attendance: 94,
   weeklyProgress: [
     { week: 'Week 1', score: 85 },
     { week: 'Week 2', score: 88 },
     { week: 'Week 3', score: 92 },
     { week: 'Week 4', score: 87 },
     { week: 'Week 5', score: 90 }
   ]
 });

 const progressPercentage = (progressData.completedAssignments / progressData.totalAssignments) * 100;

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
     
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
       <div className="text-center">
         <div className="text-2xl font-bold text-blue-600">{progressData.completedAssignments}</div>
         <div className="text-sm text-gray-600">Assignments Done</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-green-600">{progressData.averageGrade}%</div>
         <div className="text-sm text-gray-600">Average Grade</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-purple-600">{progressData.attendance}%</div>
         <div className="text-sm text-gray-600">Attendance</div>
       </div>
       <div className="text-center">
         <div className="text-2xl font-bold text-orange-600">{progressPercentage.toFixed(0)}%</div>
         <div className="text-sm text-gray-600">Course Progress</div>
       </div>
     </div>

     <div className="mb-4">
       <div className="flex justify-between text-sm mb-1">
         <span>Course Completion</span>
         <span>{progressData.completedAssignments}/{progressData.totalAssignments}</span>
       </div>
       <div className="w-full bg-gray-200 rounded-full h-2">
         <div 
           className="bg-blue-500 h-2 rounded-full transition-all duration-500"
           style={{ width: `${progressPercentage}%` }}
         ></div>
       </div>
     </div>

     <div>
       <h4 className="font-medium mb-2">Weekly Performance</h4>
       <div className="space-y-2">
         {progressData.weeklyProgress.map((week, index) => (
           <div key={index} className="flex items-center justify-between">
             <span className="text-sm text-gray-600">{week.week}</span>
             <div className="flex items-center space-x-2">
               <div className="w-24 bg-gray-200 rounded-full h-2">
                 <div 
                   className="bg-green-500 h-2 rounded-full"
                   style={{ width: `${week.score}%` }}
                 ></div>
               </div>
               <span className="text-sm font-medium">{week.score}%</span>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Grade Calculator
function GradeCalculator({ assignments }) {
 const [weights, setWeights] = useState({
   assignments: 40,
   quizzes: 20,
   midterm: 20,
   final: 20
 });

 const [predictions, setPredictions] = useState({
   midterm: 85,
   final: 85
 });

 const calculateCurrentGrade = () => {
   // Mock calculation based on completed assignments
   const completedAssignments = assignments.filter(a => a.grade !== null);
   if (completedAssignments.length === 0) return 0;
   
   const assignmentAvg = completedAssignments.reduce((acc, a) => acc + (a.score / a.total * 100), 0) / completedAssignments.length;
   return assignmentAvg;
 };

 const calculateProjectedGrade = () => {
   const currentGrade = calculateCurrentGrade();
   const projectedGrade = (
     (currentGrade * weights.assignments / 100) +
     (85 * weights.quizzes / 100) + // Assuming 85% for quizzes
     (predictions.midterm * weights.midterm / 100) +
     (predictions.final * weights.final / 100)
   );
   return projectedGrade;
 };

 return (
   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
     <h3 className="text-lg font-semibold mb-4">Grade Calculator</h3>
     
     <div className="space-y-4">
       <div>
         <h4 className="font-medium mb-2">Category Weights</h4>
         <div className="space-y-2">
           {Object.entries(weights).map(([category, weight]) => (
             <div key={category} className="flex items-center justify-between">
               <span className="text-sm capitalize">{category}</span>
               <div className="flex items-center space-x-2">
                 <input
                   type="range"
                   min="0"
                   max="50"
                   value={weight}
                   onChange={(e) => setWeights(prev => ({ ...prev, [category]: parseInt(e.target.value) }))}
                   className="w-20"
                 />
                 <span className="text-sm font-medium w-10">{weight}%</span>
               </div>
             </div>
           ))}
         </div>
       </div>

       <div>
         <h4 className="font-medium mb-2">Predictions</h4>
         <div className="space-y-2">
           <div className="flex items-center justify-between">
             <span className="text-sm">Midterm Score</span>
             <input
               type="number"
               min="0"
               max="100"
               value={predictions.midterm}
               onChange={(e) => setPredictions(prev => ({ ...prev, midterm: parseInt(e.target.value) }))}
               className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
             />
           </div>
           <div className="flex items-center justify-between">
             <span className="text-sm">Final Score</span>
             <input
               type="number"
               min="0"
               max="100"
               value={predictions.final}
               onChange={(e) => setPredictions(prev => ({ ...prev, final: parseInt(e.target.value) }))}
               className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
             />
           </div>
         </div>
       </div>

       <div className="border-t pt-4">
         <div className="flex justify-between items-center">
           <span className="font-medium">Current Grade:</span>
           <span className="text-lg font-bold text-blue-600">{calculateCurrentGrade().toFixed(1)}%</span>
         </div>
         <div className="flex justify-between items-center mt-2">
           <span className="font-medium">Projected Final Grade:</span>
           <span className="text-lg font-bold text-green-600">{calculateProjectedGrade().toFixed(1)}%</span>
         </div>
       </div>
     </div>
   </div>
 );
}

// Courses Management View
function CoursesManagement() {
 const { user } = useAuth();
 const [courses, setCourses] = useState([
   { id: 1, code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Dr. Smith', students: 45, term: 'Fall 2024', status: 'active' },
   { id: 2, code: 'MATH201', name: 'Calculus II', instructor: 'Prof. Johnson', students: 38, term: 'Fall 2024', status: 'active' },
   { id: 3, code: 'ENG102', name: 'Academic Writing', instructor: 'Dr. Williams', students: 32, term: 'Fall 2024', status: 'active' },
 ]);
 const [showCreateModal, setShowCreateModal] = useState(false);
 const [searchTerm, setSearchTerm] = useState('');

 const filteredCourses = courses.filter(course => 
   course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   course.code.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">Course Management</h1>
       {(user?.role === 'instructor' || user?.role === 'admin') && (
         <button 
           onClick={() => setShowCreateModal(true)}
           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
         >
           <Plus className="w-4 h-4" />
           <span>Create Course</span>
         </button>
       )}
     </div>

     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
       <div className="flex items-center space-x-4">
         <div className="flex-1 relative">
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
           <input
             type="text"
             placeholder="Search courses..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           />
         </div>
         <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
           <Filter className="w-4 h-4" />
           <span>Filter</span>
         </button>
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {filteredCourses.map(course => (
         <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
           <div className="flex justify-between items-start mb-3">
             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-semibold">{course.code}</span>
             <span className={`px-2 py-1 rounded text-xs ${
               course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
             }`}>
               {course.status}
             </span>
           </div>
           <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
           <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>
           <div className="flex justify-between items-center text-sm text-gray-500">
             <span>{course.students} students</span>
             <span>{course.term}</span>
           </div>
           <div className="mt-4 flex space-x-2">
             <button className="flex-1 px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">View</button>
             {user?.role !== 'student' && (
               <button className="flex-1 px-3 py-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 text-sm">Edit</button>
             )}
           </div>
         </div>
       ))}
     </div>

     {showCreateModal && (
       <CreateCourseModal onClose={() => setShowCreateModal(false)} onCreate={(newCourse) => {
         setCourses([...courses, { ...newCourse, id: Date.now() }]);
         setShowCreateModal(false);
       }} />
     )}
   </div>
 );
}

// Create Course Modal
function CreateCourseModal({ onClose, onCreate }) {
 const [formData, setFormData] = useState({
   code: '',
   name: '',
   instructor: '',
   term: 'Fall 2024',
   maxStudents: 50
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   onCreate({ ...formData, students: 0, status: 'active' });
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-2xl p-6">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Create New Course</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
             <input
               type="text"
               value={formData.code}
               onChange={(e) => setFormData({...formData, code: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
             <select
               value={formData.term}
               onChange={(e) => setFormData({...formData, term: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             >
               <option>Fall 2024</option>
               <option>Spring 2025</option>
               <option>Summer 2025</option>
             </select>
           </div>
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
             <input
               type="text"
               value={formData.instructor}
               onChange={(e) => setFormData({...formData, instructor: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
             <input
               type="number"
               value={formData.maxStudents}
               onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
               required
             />
           </div>
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
             Cancel
           </button>
           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
             Create Course
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

// Assignments View
function AssignmentsView() {
 const { user } = useAuth();
 const [assignments] = useState([
   { id: 1, title: 'Project 1', course: 'CS101', due: '2024-10-28', status: 'pending', grade: null },
   { id: 2, title: 'Essay Draft', course: 'ENG102', due: '2024-10-30', status: 'submitted', grade: '88/100' },
   { id: 3, title: 'Lab Report', course: 'PHY301', due: '2024-11-01', status: 'not-started', grade: null },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">All Assignments</h1>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <div className="flex space-x-4">
           <button className="text-blue-600 font-medium">All</button>
           <button className="text-gray-600 hover:text-gray-900">Pending</button>
           <button className="text-gray-600 hover:text-gray-900">Submitted</button>
           <button className="text-gray-600 hover:text-gray-900">Graded</button>
         </div>
       </div>
       
       <div className="divide-y divide-gray-200">
         {assignments.map(assignment => (
           <div key={assignment.id} className="p-4 hover:bg-gray-50">
             <div className="flex items-center justify-between">
               <div>
                 <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                 <p className="text-sm text-gray-600">{assignment.course} • Due: {assignment.due}</p>
               </div>
               <div className="flex items-center space-x-4">
                 <span className={`px-3 py-1 rounded-full text-sm ${
                   assignment.status === 'submitted' ? 'bg-green-100 text-green-700' :
                   assignment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                   'bg-gray-100 text-gray-700'
                 }`}>
                   {assignment.status}
                 </span>
                 {assignment.grade && <span className="font-semibold">{assignment.grade}</span>}
                 <button className="text-blue-600 hover:text-blue-700">View</button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
}

// Grades View
function GradesView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">My Grades</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Overall GPA</p>
         <p className="text-3xl font-bold text-green-600 mt-1">3.7</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Credits Earned</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">45</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Current Semester</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">Fall 2024</p>
       </div>
     </div>
     
     <GradeCalculator assignments={[]} />
   </div>
 );
}

// Calendar View
function CalendarView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Calendar</h1>
     <Calendarr />
   </div>
 );
}

// Discussions View
function DiscussionsView() {
 const [discussions] = useState([
   { id: 1, title: 'General Questions', posts: 45, lastActivity: '2 hours ago', category: 'General' },
   { id: 2, title: 'Study Groups', posts: 23, lastActivity: '5 hours ago', category: 'Study' },
   { id: 3, title: 'Project Collaboration', posts: 67, lastActivity: '1 day ago', category: 'Projects' },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Discussion Forums</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {discussions.map(discussion => (
         <div key={discussion.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
           <div className="flex justify-between items-start mb-3">
             <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
             <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{discussion.category}</span>
           </div>
           <div className="flex justify-between items-center text-sm text-gray-600">
             <span>{discussion.posts} posts</span>
             <span>{discussion.lastActivity}</span>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
}

// Gradebook View (Instructor)
function GradebookView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Gradebook</h1>
     <GradesTab isInstructor={true} />
   </div>
 );
}

// Students View (Instructor)
function StudentsView() {
 const [students] = useState([
   { id: 1, name: 'John Doe', email: 'john@university.edu', courses: 4, gpa: 3.5 },
   { id: 2, name: 'Jane Smith', email: 'jane@university.edu', courses: 5, gpa: 3.8 },
   { id: 3, name: 'Mike Johnson', email: 'mike@university.edu', courses: 4, gpa: 3.2 },
 ]);

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Students</h1>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Courses</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">GPA</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {students.map(student => (
               <tr key={student.id} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{student.courses}</td>
                 <td className="px-4 py-3 text-sm font-semibold">{student.gpa}</td>
                 <td className="px-4 py-3 text-sm">
                   <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                   <button className="text-gray-600 hover:text-gray-700">Message</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}

// Analytics View (Instructor)
function AnalyticsView() {
 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Analytics</h1>
     
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Average Grade</p>
         <p className="text-3xl font-bold text-green-600 mt-1">85.3%</p>
         <p className="text-xs text-green-600 mt-1">↑ 2.3% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Attendance Rate</p>
         <p className="text-3xl font-bold text-blue-600 mt-1">92%</p>
         <p className="text-xs text-blue-600 mt-1">↑ 1.5% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Assignment Completion</p>
         <p className="text-3xl font-bold text-purple-600 mt-1">78%</p>
         <p className="text-xs text-red-600 mt-1">↓ 3.2% from last month</p>
       </div>
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
         <p className="text-sm text-gray-600">Active Students</p>
         <p className="text-3xl font-bold text-orange-600 mt-1">156</p>
         <p className="text-xs text-gray-600 mt-1">Total enrolled: 180</p>
       </div>
     </div>
     
     <StudentProgressTracker studentId={1} courseId={1} />
   </div>
 );
}

// User Management (Admin) - continues next...// User Management (Admin) - continues next...
function UserManagement() {
 const [users, setUsers] = useState([
   { id: 1, name: 'Dr. Smith', email: 'smith@university.edu', role: 'instructor', status: 'active' },
   { id: 2, name: 'Sarah Johnson', email: 'sarah@university.edu', role: 'student', status: 'active' },
   { id: 3, name: 'Admin User', email: 'admin@university.edu', role: 'admin', status: 'active' },
 ]);
 const [showCreateModal, setShowCreateModal] = useState(false);

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">User Management</h1>
       <button 
         onClick={() => setShowCreateModal(true)}
         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
       >
         <Plus className="w-4 h-4" />
         <span>Add User</span>
       </button>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <div className="flex items-center space-x-4">
           <Search className="w-5 h-5 text-gray-400" />
           <input
             type="text"
             placeholder="Search users..."
             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           />
           <select className="px-3 py-2 border border-gray-300 rounded-lg">
             <option>All Roles</option>
             <option>Students</option>
             <option>Instructors</option>
             <option>Admins</option>
           </select>
         </div>
       </div>
       
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {users.map(user => (
               <tr key={user.id} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                 <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                 <td className="px-4 py-3 text-sm">
                   <span className={`px-2 py-1 rounded-full text-xs ${
                     user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                     user.role === 'instructor' ? 'bg-blue-100 text-blue-700' :
                     'bg-green-100 text-green-700'
                   }`}>
                     {user.role}
                   </span>
                 </td>
                 <td className="px-4 py-3 text-sm">
                   <span className={`px-2 py-1 rounded-full text-xs ${
                     user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                   }`}>
                     {user.status}
                   </span>
                 </td>
                 <td className="px-4 py-3 text-sm">
                   <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                   <button className="text-red-600 hover:text-red-700">Deactivate</button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>

     {showCreateModal && (
       <CreateUserModal onClose={() => setShowCreateModal(false)} onCreate={(newUser) => {
         setUsers([...users, { ...newUser, id: Date.now(), status: 'active' }]);
         setShowCreateModal(false);
       }} />
     )}
   </div>
 );
}

// Create User Modal
function CreateUserModal({ onClose, onCreate }) {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   role: 'student',
   password: ''
 });

 const handleSubmit = (e) => {
   e.preventDefault();
   onCreate(formData);
 };

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-md p-6">
       <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-semibold">Add New User</h2>
         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
           <X className="w-5 h-5" />
         </button>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
           <input
             type="email"
             value={formData.email}
             onChange={(e) => setFormData({...formData, email: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
           <select
             value={formData.role}
             onChange={(e) => setFormData({...formData, role: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
           >
             <option value="student">Student</option>
             <option value="instructor">Instructor</option>
             <option value="admin">Admin</option>
           </select>
         </div>
         
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
           <input
             type="password"
             value={formData.password}
             onChange={(e) => setFormData({...formData, password: e.target.value})}
             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
             required
           />
         </div>
         
         <div className="flex justify-end space-x-3 pt-4">
           <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
             Cancel
           </button>
           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
             Add User
           </button>
         </div>
       </form>
     </div>
   </div>
 );
}

// Reports View (Admin)
function ReportsView() {
 const [reportType, setReportType] = useState('enrollment');
 
 const reports = {
   enrollment: {
     title: 'Enrollment Report',
     data: [
       { course: 'CS101', enrolled: 45, capacity: 50, percentage: 90 },
       { course: 'MATH201', enrolled: 38, capacity: 40, percentage: 95 },
       { course: 'ENG102', enrolled: 32, capacity: 35, percentage: 91 },
     ]
   },
   performance: {
     title: 'Performance Report',
     data: [
       { course: 'CS101', avgGrade: 85.2, passRate: 92, completion: 88 },
       { course: 'MATH201', avgGrade: 78.5, passRate: 85, completion: 90 },
       { course: 'ENG102', avgGrade: 88.7, passRate: 95, completion: 93 },
     ]
   },
   attendance: {
     title: 'Attendance Report',
     data: [
       { course: 'CS101', avgAttendance: 92, lastWeek: 95, trend: 'up' },
       { course: 'MATH201', avgAttendance: 88, lastWeek: 85, trend: 'down' },
       { course: 'ENG102', avgAttendance: 90, lastWeek: 91, trend: 'stable' },
     ]
   }
 };

 return (
   <div className="p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">Reports</h1>
       <div className="flex space-x-2">
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
           <Download className="w-4 h-4" />
           <span>Export PDF</span>
         </button>
         <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
           <Download className="w-4 h-4" />
           <span>Export Excel</span>
         </button>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
       <div className="flex space-x-4">
         <button
           onClick={() => setReportType('enrollment')}
           className={`px-4 py-2 rounded-lg ${reportType === 'enrollment' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Enrollment
         </button>
         <button
           onClick={() => setReportType('performance')}
           className={`px-4 py-2 rounded-lg ${reportType === 'performance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Performance
         </button>
         <button
           onClick={() => setReportType('attendance')}
           className={`px-4 py-2 rounded-lg ${reportType === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
         >
           Attendance
         </button>
       </div>
     </div>
     
     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
       <div className="p-4 border-b border-gray-200">
         <h2 className="text-lg font-semibold">{reports[reportType].title}</h2>
       </div>
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead className="bg-gray-50 border-b border-gray-200">
             <tr>
               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course</th>
               {reportType === 'enrollment' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Enrolled</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Capacity</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Fill Rate</th>
                 </>
               )}
               {reportType === 'performance' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg Grade</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pass Rate</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Completion</th>
                 </>
               )}
               {reportType === 'attendance' && (
                 <>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Avg Attendance</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Week</th>
                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Trend</th>
                 </>
               )}
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {reports[reportType].data.map((row, index) => (
               <tr key={index} className="hover:bg-gray-50">
                 <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.course}</td>
                 {reportType === 'enrollment' && (
                   <>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.enrolled}</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.capacity}</td>
                     <td className="px-4 py-3 text-sm">
                       <div className="flex items-center">
                         <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                           <div className="bg-blue-500 h-2 rounded-full" style={{width: `${row.percentage}%`}}></div>
                         </div>
                         <span className="font-medium">{row.percentage}%</span>
                       </div>
                     </td>
                   </>
                 )}
                 {reportType === 'performance' && (
                   <>
                     <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.avgGrade}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.passRate}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.completion}%</td>
                   </>
                 )}
                 {reportType === 'attendance' && (
                   <>
                     <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.avgAttendance}%</td>
                     <td className="px-4 py-3 text-sm text-gray-600">{row.lastWeek}%</td>
                     <td className="px-4 py-3 text-sm">
                       <span className={`flex items-center ${
                         row.trend === 'up' ? 'text-green-600' : 
                         row.trend === 'down' ? 'text-red-600' : 
                         'text-gray-600'
                       }`}>
                         {row.trend === 'up' ? '↑' : row.trend === 'down' ? '↓' : '→'} {row.trend}
                       </span>
                     </td>
                   </>
                 )}
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   </div>
 );
}

// Settings View
function SettingsView() {
 const { user } = useAuth();
 const [activeTab, setActiveTab] = useState('profile');
 const [settings, setSettings] = useState({
   emailNotifications: true,
   pushNotifications: false,
   weeklyReports: true,
   twoFactorAuth: false,
   language: 'English',
   timezone: 'UTC-5',
   theme: 'light'
 });

 return (
   <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Settings</h1>
     
     <div className="flex space-x-6">
       <div className="w-64">
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
           <nav className="space-y-1">
             <button
               onClick={() => setActiveTab('profile')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Profile
             </button>
             <button
               onClick={() => setActiveTab('notifications')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Notifications
             </button>
             <button
               onClick={() => setActiveTab('security')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Security
             </button>
             <button
               onClick={() => setActiveTab('preferences')}
               className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
             >
               Preferences
             </button>
             {user?.role === 'admin' && (
               <button
                 onClick={() => setActiveTab('system')}
                 className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'system' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
               >
                 System
               </button>
             )}
           </nav>
         </div>
       </div>
       
       <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         {activeTab === 'profile' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                 <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                 <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                 <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
               </div>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
             </div>
           </div>
         )}
         
         {activeTab === 'notifications' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
             <div className="space-y-4">
               <label className="flex items-center justify-between">
                 <span>Email Notifications</span>
                 <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})} className="w-4 h-4" />
               </label>
               <label className="flex items-center justify-between">
                 <span>Push Notifications</span>
                 <input type="checkbox" checked={settings.pushNotifications} onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})} className="w-4 h-4" />
               </label>
               <label className="flex items-center justify-between">
                 <span>Weekly Reports</span>
                 <input type="checkbox" checked={settings.weeklyReports} onChange={(e) => setSettings({...settings, weeklyReports: e.target.checked})} className="w-4 h-4" />
               </label>
             </div>
           </div>
         )}
         
         {activeTab === 'security' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                 <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                 <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <label className="flex items-center justify-between">
                 <span>Two-Factor Authentication</span>
                 <input type="checkbox" checked={settings.twoFactorAuth} onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})} className="w-4 h-4" />
               </label>
               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Update Security</button>
             </div>
           </div>
         )}
         
         {activeTab === 'preferences' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">Preferences</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                 <select value={settings.language} onChange={(e) => setSettings({...settings, language: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>English</option>
                   <option>Spanish</option>
                   <option>French</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                 <select value={settings.timezone} onChange={(e) => setSettings({...settings, timezone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>UTC-5 (Eastern)</option>
                   <option>UTC-6 (Central)</option>
                   <option>UTC-7 (Mountain)</option>
                   <option>UTC-8 (Pacific)</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                 <select value={settings.theme} onChange={(e) => setSettings({...settings, theme: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>Light</option>
                   <option>Dark</option>
                   <option>Auto</option>
                 </select>
               </div>
             </div>
           </div>
         )}
         
         {activeTab === 'system' && user?.role === 'admin' && (
           <div>
             <h2 className="text-xl font-semibold mb-4">System Settings</h2>
             <div className="space-y-4">
               <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                 <p className="text-sm text-yellow-800">⚠️ Changes to system settings affect all users</p>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                 <input type="text" defaultValue="University" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>2024-2025</option>
                   <option>2025-2026</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Registration Status</label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option>Open</option>
                   <option>Closed</option>
                 </select>
               </div>
               <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Save System Settings</button>
             </div>
           </div>
         )}
       </div>
     </div>
   </div>
 );
}

// Export all components
export { 
 EnhancedDashboard, 
 FileUpload, 
 AssignmentSubmissionModal, 
 NotificationCenter, 
 Calendarr,
 StudentProgressTracker,
 GradeCalculator,
 CoursesManagement,
 AssignmentsView,
 GradesView,
 CalendarView,
 DiscussionsView,
 GradebookView,
 StudentsView,
 AnalyticsView,
 UserManagement,
 ReportsView,
 SettingsView
};