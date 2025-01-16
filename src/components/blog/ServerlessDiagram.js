import React from "react"
import dynamic from "next/dynamic"

const SimplifiedMermaidDiagram = dynamic(
  () => import("../SimplifiedMermaidDiagram")
)

const ServerlessDiagram = () => {
  const chartContent = `
graph TD
    A[Client] -->|HTTP Request| B(API Gateway)
    B -->|Trigger| C{Serverless Functions}
    C -->|Read/Write| D[(Serverless Database)]
    C -->|Process| E[Serverless Compute]
    E -->|Store| F[Object Storage]
    C -->|Log| G[Monitoring & Logging]
    H[Auto Scaling] -->|Manage| C
    I[Authentication] -->|Secure| B
    J[CDN] -->|Cache| A
    K[Event Queue] -->|Trigger| C
  `

  return <SimplifiedMermaidDiagram chartContent={chartContent} />
}

export default ServerlessDiagram
