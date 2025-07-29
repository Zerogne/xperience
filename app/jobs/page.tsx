import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function JobsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-950">
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <BriefcaseIcon className="h-6 w-6" />
          <span className="sr-only">Xperience</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Jobs
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Applications
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Profile
          </Link>
          <Button size="sm" variant="outline">
            Logout
          </Button>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-8 p-6 md:p-10">
        <div className="flex items-center gap-4">
          <Input className="max-w-md flex-1" placeholder="Search jobs..." />
          <Button>Search</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Software Engineer Intern</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acme Inc. - New York, NY</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full-time</Badge>
                <Badge variant="secondary">Internship</Badge>
                <Badge variant="secondary">Remote</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We are looking for a highly motivated Software Engineer Intern to join our team.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$25/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Data Analyst Co-op</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Globex Corp. - San Francisco, CA</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Co-op</Badge>
                <Badge variant="secondary">Hybrid</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join our data team and help us analyze complex datasets to drive business decisions.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$22/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>UX Designer Intern</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Stark Industries - Los Angeles, CA</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Internship</Badge>
                <Badge variant="secondary">On-site</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We're seeking a creative UX Designer Intern to contribute to our innovative products.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$20/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Marketing Assistant</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Oscorp - New York, NY</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Part-time</Badge>
                <Badge variant="secondary">On-site</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Support our marketing team with various campaigns and content creation.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$18/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Graphic Design Intern</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">LexCorp - Metropolis, DE</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Internship</Badge>
                <Badge variant="secondary">Hybrid</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Design compelling visuals for our brand and marketing materials.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$19/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Business Development Rep</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tyrell Corporation - Los Angeles, CA</p>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full-time</Badge>
                <Badge variant="secondary">On-site</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drive new business opportunities and build client relationships.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-50">$28/hour</span>
                <Button size="sm">Apply</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
