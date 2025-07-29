"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Mail, Database, Bell, Users, Building2, Save, RefreshCw, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "Xperience",
    platformDescription: "Digital internship platform for students in Mongolia",
    supportEmail: "support@xperience.mn",
    maxFileSize: "10",
    registrationOpen: true,

    // User Settings
    autoApproveStudents: true,
    requireEmailVerification: true,
    allowGuestBrowsing: false,
    maxApplicationsPerStudent: "10",

    // Company Settings
    requireCompanyVerification: true,
    autoApproveJobs: false,
    jobPostingFee: "0",
    maxJobsPerCompany: "20",

    // Notification Settings
    emailNotifications: true,
    systemAlerts: true,
    weeklyReports: true,
    maintenanceMode: false,
    studentJobAlerts: true,
    companyApplicationAlerts: true,
    adminErrorAlerts: false,

    // Security Settings
    minPasswordLength: 8,
    require2FA: false,

    // Email Settings
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "user@example.com",
    smtpPass: "password123",
  })

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    })
  }

  const systemStats = [
    { label: "Database Size", value: "2.4 GB", status: "normal" },
    { label: "Active Sessions", value: "156", status: "normal" },
    { label: "Server Load", value: "23%", status: "normal" },
    { label: "Memory Usage", value: "67%", status: "warning" },
    { label: "Disk Space", value: "45%", status: "normal" },
    { label: "API Response Time", value: "120ms", status: "normal" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage platform configuration and system settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={settings.platformName}
                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformDescription">Platform Description</Label>
                <Textarea
                  id="platformDescription"
                  value={settings.platformDescription}
                  onChange={(e) => setSettings({ ...settings, platformDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Maximum File Upload Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
                  className="w-32"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="registrationOpen">Allow New Registrations</Label>
                <Switch
                  id="registrationOpen"
                  checked={settings.registrationOpen}
                  onCheckedChange={(checked) => setSettings({ ...settings, registrationOpen: checked })}
                />
              </div>

              <Button onClick={() => handleSave("General")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Settings
              </CardTitle>
              <CardDescription>Configure student account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Student Registrations</Label>
                    <p className="text-sm text-gray-500">Automatically approve new student accounts</p>
                  </div>
                  <Switch
                    checked={settings.autoApproveStudents}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoApproveStudents: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Email Verification</Label>
                    <p className="text-sm text-gray-500">
                      Students must verify their email before accessing the platform
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Guest Browsing</Label>
                    <p className="text-sm text-gray-500">Allow non-registered users to browse job listings</p>
                  </div>
                  <Switch
                    checked={settings.allowGuestBrowsing}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowGuestBrowsing: checked })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxApplications">Maximum Applications per Student</Label>
                <Input
                  id="maxApplications"
                  type="number"
                  value={settings.maxApplicationsPerStudent}
                  onChange={(e) => setSettings({ ...settings, maxApplicationsPerStudent: e.target.value })}
                  className="w-32"
                />
                <p className="text-sm text-gray-500">Set to 0 for unlimited applications</p>
              </div>

              <Button onClick={() => handleSave("User")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Company Settings
              </CardTitle>
              <CardDescription>Configure company account and job posting settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Company Verification</Label>
                    <p className="text-sm text-gray-500">Companies must be verified before posting jobs</p>
                  </div>
                  <Switch
                    checked={settings.requireCompanyVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireCompanyVerification: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-approve Job Postings</Label>
                    <p className="text-sm text-gray-500">Automatically approve new job postings</p>
                  </div>
                  <Switch
                    checked={settings.autoApproveJobs}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoApproveJobs: checked })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jobPostingFee">Job Posting Fee (₮)</Label>
                  <Input
                    id="jobPostingFee"
                    type="number"
                    value={settings.jobPostingFee}
                    onChange={(e) => setSettings({ ...settings, jobPostingFee: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">Set to 0 for free job postings</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxJobs">Maximum Jobs per Company</Label>
                  <Input
                    id="maxJobs"
                    type="number"
                    value={settings.maxJobsPerCompany}
                    onChange={(e) => setSettings({ ...settings, maxJobsPerCompany: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">Set to 0 for unlimited job postings</p>
                </div>
              </div>

              <Button onClick={() => handleSave("Company")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications to users</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-gray-500">Enable system-wide alerts and announcements</p>
                  </div>
                  <Switch
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, systemAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Send weekly analytics reports to admins</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => setSettings({ ...settings, weeklyReports: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Maintenance Mode
                    </Label>
                    <p className="text-sm text-gray-500">Enable maintenance mode to restrict platform access</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Job Alerts</Label>
                    <p className="text-sm text-gray-500">Send alerts to students about job postings</p>
                  </div>
                  <Switch
                    checked={settings.studentJobAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, studentJobAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Company Application Alerts</Label>
                    <p className="text-sm text-gray-500">Send alerts to companies about applications</p>
                  </div>
                  <Switch
                    checked={settings.companyApplicationAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, companyApplicationAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      Admin Error Alerts
                    </Label>
                    <p className="text-sm text-gray-500">Send alerts to admins about errors</p>
                  </div>
                  <Switch
                    checked={settings.adminErrorAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, adminErrorAlerts: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("Notification")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>Monitor system health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {systemStats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{stat.label}</p>
                        <p className="text-lg font-bold">{stat.value}</p>
                      </div>
                      <Badge className={getStatusColor(stat.status)}>{stat.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Actions</CardTitle>
                <CardDescription>Perform system maintenance and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <RefreshCw className="h-6 w-6" />
                    <span>Clear Cache</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Database className="h-6 w-6" />
                    <span>Backup Database</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Mail className="h-6 w-6" />
                    <span>Test Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col space-y-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <AlertTriangle className="h-6 w-6" />
                    <span>System Reset</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage password policies and session management.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="min-password-length">Minimum Password Length</Label>
                <Input
                  id="min-password-length"
                  type="number"
                  value={settings.minPasswordLength}
                  onChange={(e) => setSettings({ ...settings, minPasswordLength: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                <Switch
                  id="require-2fa"
                  checked={settings.require2FA}
                  onCheckedChange={(checked) => setSettings({ ...settings, require2FA: checked })}
                />
              </div>
              <Button onClick={() => handleSave("Security")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input
                  id="smtp-host"
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input
                  id="smtp-port"
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                  className="w-32"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-user">SMTP Username</Label>
                <Input
                  id="smtp-user"
                  value={settings.smtpUser}
                  onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="smtp-pass">SMTP Password</Label>
                <Input
                  id="smtp-pass"
                  type="password"
                  value={settings.smtpPass}
                  onChange={(e) => setSettings({ ...settings, smtpPass: e.target.value })}
                />
              </div>
              <Button onClick={() => handleSave("Email")}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
