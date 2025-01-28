"use client"

import React, { useState, useEffect } from "react"
import { Link } from "next-view-transitions"
import { motion, useAnimation } from "motion/react"
import {
  Github,
  GitBranch,
  GitCommit,
  GitPullRequest,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ContributionStepProps {
  icon: React.ReactNode
  title: string
  description?: React.ReactNode
  index: number
}

const ContributionStep: React.FC<ContributionStepProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const controls = useAnimation()

  return (
    <motion.div
      className="mb-6 flex items-start space-x-4"
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
      onViewportEnter={() => controls.start({ opacity: 1, x: 0 })}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <motion.div
        className="rounded-full bg-purple-500 p-2"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-neutral-300">{description}</p>
      </div>
    </motion.div>
  )
}

const ContributePage: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
    })
  }, [controls])

  const sections = [
    {
      title: "Fork the Repository",
      icon: <Github className="text-white" size={24} />,
      description: (
        <a
          href="https://github.com/tyaga001/devtoolsacademy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline hover:text-purple-300"
        >
          Go to the repository
        </a>
      ),
    },
    {
      title: "Create a New Branch",
      icon: <GitBranch className="text-white" size={24} />,
    },
    {
      title: "Make Changes and Commit",
      icon: <GitCommit className="text-white" size={24} />,
    },
    {
      title: "Submit a Pull Request",
      icon: <GitPullRequest className="text-white" size={24} />,
    },
  ]

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black to-pink-900/20" />
      <motion.div className="absolute inset-0 opacity-50" animate={controls}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </motion.div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-6xl font-extrabold leading-tight text-transparent md:text-7xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
        >
          Join the Community
        </motion.h2>

        <motion.p
          className="mb-12 text-center text-2xl text-neutral-300 md:text-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          How to Contribute
        </motion.p>

        {sections.map((section, index) => (
          <Card
            key={index}
            className="mb-4 border border-purple-500/30 bg-neutral-950/50"
          >
            <CardContent className="p-4">
              <motion.div
                className="flex cursor-pointer items-center justify-between"
                onClick={() =>
                  setExpandedSection(expandedSection === index ? null : index)
                }
              >
                <ContributionStep
                  icon={section.icon}
                  title={section.title}
                  description={
                    expandedSection === index ? section.description : ""
                  }
                  index={index}
                />
                <motion.div
                  animate={{ rotate: expandedSection === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="text-white" />
                </motion.div>
              </motion.div>
              {expandedSection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-neutral-300"
                >
                  {section.description}
                </motion.div>
              )}
            </CardContent>
          </Card>
        ))}

        <motion.div
          className="mt-8 rounded-lg border border-purple-500/30 bg-neutral-950/50 p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-white">
            Need More Help?
          </h3>
          <p className="mb-4 text-neutral-300">
            For more detailed instructions, please check the{" "}
            <Link
              href="https://github.com/tyaga001/devtoolsacademy/blob/main/CONTRIBUTING.md"
              className="text-purple-400 underline hover:text-purple-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribution Guidelines
            </Link>
          </p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg"
            >
              <a
                href="https://github.com/tyaga001/devtoolsacademy/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HelpCircle size={20} className="mr-2" />
                <span>Open an Issue</span>
              </a>
            </Button>
          </motion.div>
          {isHovering && (
            <motion.p
              className="mt-2 text-sm text-neutral-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Don&apos;t hesitate to ask for help.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ContributePage
