"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Bot, Mail, Video, FileText, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const agents = [
    {
      name: "Agent Dev",
      description: "Gmail automation and email management",
      icon: Mail,
      color: "from-gray-700 to-gray-800",
      bgColor: "bg-gray-500/10",
    },
    {
      name: "Agent Bob",
      description: "Zoom meetings and calendar scheduling",
      icon: Video,
      color: "from-gray-700 to-gray-800",
      bgColor: "bg-gray-500/10",
    },
    {
      name: "Agent Flow",
      description: "Notion workspace organization",
      icon: FileText,
      color: "from-gray-700 to-gray-800",
      bgColor: "bg-gray-500/10",
    },
  ]

  const features = [
    {
      icon: Bot,
      title: "Multi-Agent System",
      description: "Command multiple specialized AI agents from one interface",
    },
    {
      icon: Zap,
      title: "Natural Language",
      description: "Interact with your tools using simple, conversational commands",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      {/* Hero Section */}
      <div className="relative text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 border border-gray-500/20 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Multi-Agent Command Center</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
            AI Assistant
            <br />
            <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automate your productivity with specialized AI agents for Gmail, Zoom, Notion, and more. One interface to rule
            them all.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/chat/dev">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold bg-black hover:bg-gray-800 text-white shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-500/30 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>


      {/* Agents Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Meet Your AI Agents</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 bg-white/40 dark:bg-black/20 backdrop-blur-xl border-white/20 dark:border-white/10 rounded-3xl hover:bg-white/60 dark:hover:bg-black/30 transition-all duration-300">
                <div
                  className={`w-16 h-16 ${agent.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center`}
                  >
                    <agent.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{agent.name}</h3>
                <p className="text-muted-foreground">{agent.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Why Choose AgentCore?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <Card className="p-12 bg-card backdrop-blur-xl border-border rounded-3xl max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who&apos;ve automated their productivity with AgentCore.
          </p>
          <Link href="/chat/dev">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg font-semibold bg-black hover:bg-gray-800 text-white shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-500/30 transition-all duration-300"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  )
}
