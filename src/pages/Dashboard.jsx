import { MdWork, MdBusiness, MdImage, MdArticle } from "react-icons/md";
import PageHeader from "../components/admin/PageHeader";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { jobAPI } from "../services/jobAPI";
import { blogAPI } from "../services/blogAPI";
import { companyAPI } from "../services/companyAPI";
import { sliderAPI } from "../services/sliderAPI";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    blogs: 0,
    sliders: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [jobs, companies, blogs, sliders] = await Promise.all([
          jobAPI.fetchJobs(),
          companyAPI.fetchCompanies(),
          blogAPI.fetchBlogs(),
          sliderAPI.fetchSliders(),
        ]);
        setStats({
          jobs: jobs.length,
          companies: companies.length,
          blogs: blogs.length,
          sliders: sliders.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    loadData();
  }, []);

  const chartData = [
    { name: "Jobs", value: stats.jobs },
    { name: "Companies", value: stats.companies },
    { name: "Blogs", value: stats.blogs },
    { name: "Sliders", value: stats.sliders },
  ];

  const colors = ["#8B5CF6", "#3B82F6", "#F87171", "#FBBF24"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <PageHeader title="Dashboard" breadcrumb={["Dashboard", "Overview"]} />

      {/* ==== Kartu ringkasan di atas ==== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={stats.jobs}
          icon={<MdWork className="text-3xl" />}
          color="purple"
          onClick={() => navigate("/job")}
        />
        <StatCard
          title="Active Companies"
          value={stats.companies}
          icon={<MdBusiness className="text-3xl" />}
          color="blue"
          onClick={() => navigate("/company")}
        />
        <StatCard
          title="Blog Articles"
          value={stats.blogs}
          icon={<MdArticle className="text-3xl" />}
          color="green"
          onClick={() => navigate("/blog")}
        />
        <StatCard
          title="Sliders"
          value={stats.sliders}
          icon={<MdImage className="text-3xl" />}
          color="yellow"
          onClick={() => navigate("/slider")}
        />
      </div>

      {/* ==== Bagian tengah: Grafik Line dan Donut ==== */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kiri: Line Chart + angka ringkasan */}
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500">Portal Overview</p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.jobs + stats.companies + stats.blogs + stats.sliders} Items
              </p>
              <p className="text-gray-500 mt-1">
                Active Jobs: <span className="font-semibold">{stats.jobs}</span>
              </p>
            </div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-600">
              View Reports
            </button>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ stroke: "#8B5CF6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan di bawah chart */}
          <div className="grid grid-cols-4 gap-4 mt-6 text-center">
            <div>
              <p className="text-gray-500 text-sm">Total Jobs</p>
              <p className="font-bold text-gray-800">{stats.jobs}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Companies</p>
              <p className="font-bold text-gray-800">{stats.companies}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Blogs</p>
              <p className="font-bold text-gray-800">{stats.blogs}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Sliders</p>
              <p className="font-bold text-gray-800">{stats.sliders}</p>
            </div>
          </div>
        </div>

        {/* Kanan: Pie/Donut Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Jobs Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-3xl font-bold text-gray-800">
              {stats.jobs + stats.companies + stats.blogs + stats.sliders}
            </p>
            <p className="text-gray-500 text-sm">Total Items</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen StatCard pengganti SummaryCard
function StatCard({ title, value, icon, color, onClick }) {
  const colorMap = {
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl shadow hover:shadow-md transition ${colorMap[color]} flex items-center justify-between`}
    >
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div>{icon}</div>
    </div>
  );
}
