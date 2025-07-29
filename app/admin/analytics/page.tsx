"use client"

import { CardDescription } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  ArrowUp,
  ArrowDown,
  BarChart,
  LineChart,
  PieChart,
} from "lucide-react"

export default function AdminAnalyticsPage() {
  const metrics = [
    {
      title: "Total Users",
      value: "1,336",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      description: "Students and companies combined",
    },
    {
      title: "Job Success Rate",
      value: "73.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Applications leading to hires",
    },
    {
      title: "Active Companies",
      value: "89",
      change: "+5.2%",
      changeType: "positive",
      icon: Building2,
      description: "Companies with active job postings",
    },
    {
      title: "Monthly Applications",
      value: "2,847",
      change: "-3.2%",
      changeType: "negative",
      icon: Briefcase,
      description: "Applications submitted this month",
    },
  ]

  const topUniversities = [
    { name: "National University of Mongolia", students: 342, percentage: 27.4 },
    { name: "Mongolian University of Science and Technology", students: 298, percentage: 23.9 },
    { name: "University of Finance and Economics", students: 187, percentage: 15.0 },
    { name: "Mongolian National University", students: 156, percentage: 12.5 },
    { name: "Others", students: 264, percentage: 21.2 },
  ]

  const topIndustries = [
    { name: "Technology", companies: 34, jobs: 89, percentage: 38.2 },
    { name: "Finance", companies: 18, jobs: 45, percentage: 20.2 },
    { name: "Education", companies: 12, jobs: 23, percentage: 13.5 },
    { name: "Healthcare", companies: 9, jobs: 18, percentage: 10.1 },
    { name: "Others", companies: 16, jobs: 31, percentage: 18.0 },
  ]

  const recentTrends = [
    {
      period: "This Week",
      newStudents: 23,
      newCompanies: 3,
      newJobs: 12,
      applications: 156,
    },
    {
      period: "Last Week",
      newStudents: 31,
      newCompanies: 2,
      newJobs: 8,
      applications: 189,
    },
    {
      period: "2 Weeks Ago",
      newStudents: 28,
      newCompanies: 4,
      newJobs: 15,
      applications: 203,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Platform Overview</CardTitle>
          <CardDescription>Key metrics for the Xperience platform.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <PieChart className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">125</div>
            <p className="text-sm text-muted-foreground">Total Companies</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
            <LineChart className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">345</div>
            <p className="text-sm text-muted-foreground">Active Job Postings</p>
          </div>
        </CardContent>
      </Card>

      {/* User Growth */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Growth</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+20%</div>
          <p className="text-xs text-muted-foreground">Compared to last quarter</p>
          <div className="mt-4 h-[150px] w-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
            {/* Placeholder for a chart */}
            Chart Placeholder
          </div>
        </CardContent>
      </Card>

      {/* Job Application Trends */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Job Application Trends</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5,000+</div>
          <p className="text-xs text-muted-foreground">Applications last month</p>
          <div className="mt-4 h-[150px] w-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
            {/* Placeholder for a chart */}
            Chart Placeholder
          </div>
        </CardContent>
      </Card>

      {/* Job Posting Distribution by Industry */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Job Posting Distribution by Industry</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Tech, Finance, Healthcare</div>
          <p className="text-xs text-muted-foreground">Most popular sectors</p>
          <div className="mt-4 h-[150px] w-full bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
            {/* Placeholder for a chart */}
            Chart Placeholder
          </div>
        </CardContent>
      </Card>

      {/* Student Registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Student Registrations</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          <div className="h-[200px] w-full">
            {/* Placeholder for a chart */}
            <div className="flex h-full items-center justify-center text-muted-foreground">Chart Placeholder</div>
          </div>
        </CardContent>
      </Card>

      {/* Job Applications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5,678</div>
          <p className="text-xs text-muted-foreground">+15.5% from last month</p>
          <div className="h-[200px] w-full">
            {/* Placeholder for a chart */}
            <div className="flex h-full items-center justify-center text-muted-foreground">Chart Placeholder</div>
          </div>
        </CardContent>
      </Card>

      {/* Company Engagement */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Company Engagement</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89%</div>
          <p className="text-xs text-muted-foreground">Average job posting views</p>
          <div className="h-[200px] w-full">
            {/* Placeholder for a chart */}
            <div className="flex h-full items-center justify-center text-muted-foreground">Chart Placeholder</div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-full">
        <CardHeader>
          <CardTitle>Top Performing Job Postings</CardTitle>
          <CardDescription>Jobs with the most applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>Software Engineer Intern - Innovate Corp (120 applications)</li>
            <li>Data Analyst Co-op - Data Insights Ltd. (95 applications)</li>
            <li>Marketing Assistant - Global Brands Co. (80 applications)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.changeType === "positive" ? (
                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>User registration trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Growth chart visualization</p>
                <p className="text-sm text-gray-400">Chart component would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Success Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Application Success Rate</CardTitle>
            <CardDescription>Monthly success rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Success rate chart</p>
                <p className="text-sm text-gray-400">Chart component would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Universities */}
        <Card>
          <CardHeader>
            <CardTitle>Top Universities</CardTitle>
            <CardDescription>Student distribution by university</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUniversities.map((university, index) => (
                <div key={university.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{university.name}</p>
                      <p className="text-xs text-gray-500">{university.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{university.percentage}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${university.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Industries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Industries</CardTitle>
            <CardDescription>Company distribution by industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topIndustries.map((industry, index) => (
                <div key={industry.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{industry.name}</p>
                      <p className="text-xs text-gray-500">
                        {industry.companies} companies • {industry.jobs} jobs
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{industry.percentage}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${industry.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trends</CardTitle>
          <CardDescription>Weekly activity breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Period</th>
                  <th className="text-center py-2">New Students</th>
                  <th className="text-center py-2">New Companies</th>
                  <th className="text-center py-2">New Jobs</th>
                  <th className="text-center py-2">Applications</th>
                </tr>
              </thead>
              <tbody>
                {recentTrends.map((trend, index) => (
                  <tr key={trend.period} className={index === 0 ? "bg-blue-50" : ""}>
                    <td className="py-3 font-medium">{trend.period}</td>
                    <td className="text-center py-3">{trend.newStudents}</td>
                    <td className="text-center py-3">{trend.newCompanies}</td>
                    <td className="text-center py-3">{trend.newJobs}</td>
                    <td className="text-center py-3">{trend.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
