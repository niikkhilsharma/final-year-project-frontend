"use client"

import type React from "react"

import { useState } from "react"
import {
  Bell,
  Home,
  HelpCircle,
  LogOut,
  Package,
  Search,
  ShoppingBag,
  Users,
  Wallet,
  Megaphone,
  ChevronDown,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("home")

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-[230px] border-r bg-muted/10 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-white"></div>
            </div>
            <span className="text-xl font-semibold">Duka</span>
          </div>

          <nav className="flex-1 px-2 py-2">
            <NavItem
              icon={<Home className="h-5 w-5" />}
              label="Home"
              active={activeNav === "home"}
              onClick={() => setActiveNav("home")}
            />
            <NavItem
              icon={<Package className="h-5 w-5" />}
              label="Products"
              active={activeNav === "products"}
              onClick={() => setActiveNav("products")}
              hasDropdown
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="Customers"
              active={activeNav === "customers"}
              onClick={() => setActiveNav("customers")}
              hasDropdown
            />
            <NavItem
              icon={<ShoppingBag className="h-5 w-5" />}
              label="Shop"
              active={activeNav === "shop"}
              onClick={() => setActiveNav("shop")}
              hasDropdown
            />
            <NavItem
              icon={<Wallet className="h-5 w-5" />}
              label="Income"
              active={activeNav === "income"}
              onClick={() => setActiveNav("income")}
              hasDropdown
            />
            <NavItem
              icon={<Megaphone className="h-5 w-5" />}
              label="Promote"
              active={activeNav === "promote"}
              onClick={() => setActiveNav("promote")}
              hasDropdown
            />
          </nav>

          <div className="mt-auto px-2 py-4">
            <NavItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help"
              active={activeNav === "help"}
              onClick={() => setActiveNav("help")}
            />
            <NavItem
              icon={<LogOut className="h-5 w-5" />}
              label="Logout"
              active={activeNav === "logout"}
              onClick={() => setActiveNav("logout")}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b flex items-center px-4 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search or type a command" className="pl-10 bg-muted/40 border-none" />
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.5 8.5L8.5 15.5M8.5 8.5L15.5 15.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Button>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          {/* Overview Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Overview</h2>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="border border-blue-200">
              <CardContent className="p-6 flex justify-between">
                <div className="flex flex-col">
                  <span className="text-muted-foreground mb-1">Customers</span>
                  <span className="text-2xl font-bold">10,243</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full h-fit text-sm">8%</div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground mb-1">Income</span>
                  <span className="text-2xl font-bold">$39,403,450</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full h-fit text-sm">8%</div>
              </CardContent>
            </Card>
          </div>

          {/* Welcome Section */}
          <div className="mb-6">
            <p className="mb-4">Welcome to our new online experience</p>

            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "Johnson D.", image: "/placeholder.svg?height=80&width=80" },
                { name: "Didinya J.", image: "/placeholder.svg?height=80&width=80" },
                { name: "Penny L.", image: "/placeholder.svg?height=80&width=80" },
                { name: "Elon M.", image: "/placeholder.svg?height=80&width=80" },
              ].map((person, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm">{person.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Income Chart */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Total Income</h2>
              <Select defaultValue="all-time">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-64 w-full">
              <IncomeChart />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Popular Products */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground pb-2 border-b">
                      <span>Product</span>
                      <span>Earnings</span>
                    </div>

                    {[
                      {
                        name: "Product A",
                        type: "UI Kit",
                        price: "$5461",
                        image: "/placeholder.svg?height=48&width=48",
                      },
                      {
                        name: "Product B",
                        type: "UI Kit",
                        price: "$5461",
                        image: "/placeholder.svg?height=48&width=48",
                      },
                      {
                        name: "Product C",
                        type: "UI Kit",
                        price: "$5461",
                        image: "/placeholder.svg?height=48&width=48",
                      },
                      {
                        name: "Product D",
                        type: "UI Kit",
                        price: "$5461",
                        image: "/placeholder.svg?height=48&width=48",
                      },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded-md overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.type}</div>
                          </div>
                        </div>
                        <div className="font-medium">{product.price}</div>
                      </div>
                    ))}

                    <Button variant="ghost" className="w-full mt-2">
                      All Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comments */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Comments</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground pb-2 border-b">
                      <span>Comments</span>
                      <span>Date</span>
                    </div>

                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      laborum ad minim veniam, quis nostrud.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({
  icon,
  label,
  active,
  onClick,
  hasDropdown = false,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  hasDropdown?: boolean
}) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 ${
        active ? "bg-muted/80 font-medium" : "text-muted-foreground hover:bg-muted/50"
      }`}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {icon}
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="h-4 w-4 ml-auto" />}
    </Link>
  )
}

function IncomeChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const values = [300, 150, 350, 250, 80, 180, 100, 200, 170, 320, 340, 0]
  const maxValue = Math.max(...values)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-end">
        {months.map((month, index) => {
          const height = values[index] ? `${(values[index] / maxValue) * 100}%` : "0%"
          return (
            <div key={month} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="w-4/5 bg-blue-500 rounded-sm" style={{ height }}></div>
            </div>
          )
        })}
      </div>
      <div className="h-8 flex">
        {months.map((month) => (
          <div key={month} className="flex-1 text-center text-xs text-muted-foreground">
            {month}
          </div>
        ))}
      </div>
      <div className="absolute left-0 flex flex-col justify-between h-[calc(100%-32px)]">
        <div className="text-xs text-muted-foreground">400K</div>
        <div className="text-xs text-muted-foreground">300K</div>
        <div className="text-xs text-muted-foreground">200K</div>
        <div className="text-xs text-muted-foreground">100K</div>
        <div className="text-xs text-muted-foreground">0K</div>
      </div>
    </div>
  )
}