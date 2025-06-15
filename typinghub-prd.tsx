"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Target,
  Users,
  Zap,
  Trophy,
  Settings,
  BarChart3,
  Globe,
  Shield,
  Smartphone,
  Calendar,
  DollarSign,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

export default function Component() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "features", label: "Features", icon: Zap },
    { id: "users", label: "Users", icon: Users },
    { id: "technical", label: "Technical", icon: Settings },
    { id: "phases", label: "Development", icon: Calendar },
    { id: "business", label: "Business", icon: DollarSign },
    { id: "metrics", label: "Metrics", icon: TrendingUp },
  ]

  const features = [
    {
      category: "Core Practice",
      items: [
        { name: "Multiple Test Modes", priority: "Must-Have", description: "Time-based and word-based typing tests" },
        { name: "Real-time Analytics", priority: "Must-Have", description: "WPM, accuracy, and error tracking" },
        { name: "Theme Customization", priority: "Must-Have", description: "15+ themes with custom options" },
        { name: "Code Typing Mode", priority: "Could-Have", description: "Syntax highlighting for developers" },
      ],
    },
    {
      category: "Multiplayer Racing",
      items: [
        { name: "Quick Race", priority: "Must-Have", description: "Instant skill-based matchmaking" },
        { name: "Private Rooms", priority: "Must-Have", description: "Custom rooms with shareable codes" },
        { name: "Tournament Mode", priority: "Should-Have", description: "Organized competitive brackets" },
        { name: "Team Racing", priority: "Could-Have", description: "Collaborative typing challenges" },
      ],
    },
    {
      category: "Community",
      items: [
        { name: "Global Leaderboards", priority: "Must-Have", description: "Daily, weekly, monthly rankings" },
        { name: "Achievement System", priority: "Must-Have", description: "Unlockable badges and milestones" },
        { name: "Social Features", priority: "Should-Have", description: "Friends, followers, messaging" },
        { name: "Live Streaming", priority: "Could-Have", description: "Platform integration for content creators" },
      ],
    },
  ]

  const personas = [
    {
      name: "Alex the Competitor",
      age: 22,
      role: "College Student",
      goals: "Achieve 100+ WPM, compete in tournaments",
      painPoints: "Limited competitive platforms, inconsistent challenges",
      behavior: "Practices daily, shares achievements",
    },
    {
      name: "Sarah the Professional",
      age: 28,
      role: "Software Developer",
      goals: "Improve coding speed, reduce errors",
      painPoints: "Generic tests don't match coding scenarios",
      behavior: "Practices during breaks, values analytics",
    },
    {
      name: "Mike the Educator",
      age: 35,
      role: "High School Teacher",
      goals: "Help students improve typing skills",
      painPoints: "Need classroom tools with progress tracking",
      behavior: "Assigns homework, monitors progress",
    },
  ]

  const phases = [
    {
      phase: "Phase 1: Foundation",
      duration: "Months 1-4",
      progress: 100,
      features: ["Core typing engine", "Basic customization", "User auth", "Simple multiplayer"],
      criteria: "1,000 users, 60% retention, <50ms latency",
    },
    {
      phase: "Phase 2: Enhancement",
      duration: "Months 5-8",
      progress: 75,
      features: ["Advanced analytics", "Extended customization", "Scaled multiplayer", "Mobile PWA"],
      criteria: "5,000 users, 70% retention, <100ms latency",
    },
    {
      phase: "Phase 3: Community",
      duration: "Months 9-12",
      progress: 25,
      features: ["Ranked system", "Tournaments", "Social features", "Content management"],
      criteria: "15,000 users, 100+ tournaments monthly",
    },
    {
      phase: "Phase 4: Intelligence",
      duration: "Months 13-16",
      progress: 0,
      features: ["AI coaching", "Advanced analytics", "Enterprise accounts", "Public API"],
      criteria: "Premium features, enterprise adoption",
    },
  ]

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic typing tests", "Limited multiplayer (10/day)", "Standard analytics", "Community access"],
    },
    {
      name: "Premium",
      price: "$6.99/month",
      features: ["Unlimited multiplayer", "Advanced analytics", "Priority matchmaking", "Ad-free experience"],
    },
    {
      name: "Pro",
      price: "$12.99/month",
      features: ["All Premium features", "Tournament hosting", "AI coaching", "API access"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["White-label solutions", "Advanced reporting", "SSO integration", "Dedicated support"],
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Must-Have":
        return "bg-red-100 text-red-800"
      case "Should-Have":
        return "bg-yellow-100 text-yellow-800"
      case "Could-Have":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TypingHub</h1>
          <p className="text-xl text-gray-600 mb-4">Advanced Typing Platform - Product Requirements Document</p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              10,000 users in 6 months
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              {"<"}100ms multiplayer latency
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              70% user retention
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                onClick={() => setActiveSection(section.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </Button>
            )
          })}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeSection === "overview" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Product Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    TypingHub is a comprehensive typing platform that combines precision practice tools with competitive
                    multiplayer racing. Our goal is to create the ultimate typing improvement platform that serves both
                    casual learners and competitive typists.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Objectives:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comprehensive typing practice with detailed analytics</li>
                      <li>• Competitive multiplayer typing races</li>
                      <li>• Engaging community around typing improvement</li>
                      <li>• Customizable experiences for different skill levels</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Success Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>User Retention (7 days)</span>
                        <span>70% target</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Multiplayer Latency</span>
                        <span>{"<"}100ms</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Registered Users</span>
                        <span>10,000 in 6 months</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uptime</span>
                        <span>99.5%</span>
                      </div>
                      <Progress value={99.5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "users" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Target Audience
                  </CardTitle>
                  <CardDescription>
                    Primary users include typing enthusiasts, students, and professionals seeking to improve their
                    typing skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {personas.map((persona, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div>
                          <h4 className="font-semibold text-lg">{persona.name}</h4>
                          <p className="text-sm text-gray-600">
                            {persona.role}, Age {persona.age}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-green-700">Goals:</h5>
                          <p className="text-sm text-gray-600">{persona.goals}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-red-700">Pain Points:</h5>
                          <p className="text-sm text-gray-600">{persona.painPoints}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-blue-700">Behavior:</h5>
                          <p className="text-sm text-gray-600">{persona.behavior}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "features" && (
            <div className="space-y-6">
              {features.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{item.name}</h4>
                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeSection === "technical" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Performance Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Input Response</span>
                      <span className="text-sm font-mono">{"<"}20ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Multiplayer Latency</span>
                      <span className="text-sm font-mono">{"<"}100ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Concurrent Users</span>
                      <span className="text-sm font-mono">50,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Uptime</span>
                      <span className="text-sm font-mono">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>End-to-end HTTPS with HSTS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>WebSocket security with auth tokens</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Input validation and sanitization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>GDPR and CCPA compliance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Browser Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Chrome 100+, Firefox 95+, Safari 15+, Edge 100+</div>
                    <div>Progressive Web App with offline capabilities</div>
                    <div>Mobile-first responsive design</div>
                    <div>WCAG 2.1 AA accessibility compliance</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Mobile Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>Native app-like PWA experience</div>
                    <div>Optimized virtual keyboard integration</div>
                    <div>Simplified UI preserving core functionality</div>
                    <div>Offline mode for practice sessions</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "phases" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Development Roadmap
                  </CardTitle>
                  <CardDescription>16-month development plan across 4 major phases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {phases.map((phase, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-lg">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{phase.progress}%</span>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">Key Features:</h5>
                          <div className="flex flex-wrap gap-2">
                            {phase.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-1">Success Criteria:</h5>
                          <p className="text-sm text-gray-600">{phase.criteria}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "business" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing Strategy
                  </CardTitle>
                  <CardDescription>Freemium model with premium features and enterprise options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {pricingTiers.map((tier, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="text-center">
                          <h4 className="font-semibold text-lg">{tier.name}</h4>
                          <p className="text-2xl font-bold text-blue-600">{tier.price}</p>
                        </div>
                        <div className="space-y-2">
                          {tier.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$125K</div>
                      <div className="text-sm text-gray-600">Year 1</div>
                      <div className="text-xs text-gray-500">1,500 Premium + 200 Pro</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$450K</div>
                      <div className="text-sm text-gray-600">Year 2</div>
                      <div className="text-xs text-gray-500">5,000 Premium + 800 Pro</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$900K</div>
                      <div className="text-sm text-gray-600">Year 3</div>
                      <div className="text-xs text-gray-500">8,000 Premium + 1,500 Pro + Enterprise</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "metrics" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    User Engagement KPIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>DAU/MAU Ratio</span>
                        <span>{">"} 0.3 target</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Avg Session Duration</span>
                        <span>{">"} 12 minutes</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekly Tests per User</span>
                        <span>{">"} 5 target</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Multiplayer Participation</span>
                        <span>{">"} 40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>7-day Retention</span>
                        <span>{">"} 70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>30-day Retention</span>
                        <span>{">"} 45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Race Completion Rate</span>
                        <span>{">"} 85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>WPM Improvement (1mo)</span>
                        <span>{">"} 15%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-700">Technical Risks</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                          <span>Real-time sync at scale</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            High
                          </Badge>
                          <span>WebSocket management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <span>Cross-platform consistency</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-orange-700">Business Risks</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            High
                          </Badge>
                          <span>User acquisition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <span>Long-term engagement</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <span>Premium conversion</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-blue-700">UX Risks</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                          <span>Feature complexity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">Low</Badge>
                          <span>Performance degradation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
