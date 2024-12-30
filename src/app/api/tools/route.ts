import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const reqPage = parseInt(searchParams.get("page") || "1", 10)
  const page = isNaN(reqPage) || reqPage < 1 ? 1 : reqPage
  const perPage = 20
  const search = searchParams.get("search") || ""
  const categories = searchParams.get("categories")?.split(",") || []
  const tags = searchParams.get("tags")?.split(",") || []
  const sort = searchParams.get("sort") || "recent"

  try {
    const skip = (page - 1) * perPage
    const take = perPage

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (categories.length > 0) {
      where.categories = {
        hasSome: categories,
      }
    }

    if (tags.length > 0) {
      where.tags = {
        hasSome: tags,
      }
    }

    let orderBy: any = {}
    switch (sort) {
      case "popular":
        orderBy = { stars: "desc" }
        break
      case "alphabetical":
        orderBy = { name: "asc" }
        break
      case "recent":
      default:
        orderBy = { lastUpdated: "desc" }
    }

    const [tools, totalTools] = await Promise.all([
      prisma.tool.findMany({
        where,
        orderBy,
        skip,
        take,
      }),
      prisma.tool.count({ where }),
    ])

    const totalPages = Math.ceil(totalTools / perPage)

    if (tools.length === 0) {
      return NextResponse.json({ message: "No tools found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        tools,
        totalPages,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in API:", error.response?.data || error.message)
    return NextResponse.json(
      { error: "Error processing request. Please try again." },
      { status: error.response?.status || 500 }
    )
  }
}

export async function POST() {
  try {
    const tools = [
      {
        name: "Neon",
        headline:
          "The database you love, on a serverless platform designed to help you build reliable and scalable applications faster.",
        description:
          "Neon is an open-source database company. Our mission is to take everything that developers love about Postgres — reliability, performance, extensibility — and deliver it as a serverless product that helps teams confidently ship reliable and scalable applications faster than ever before. eon is open-source and we chose the most permissive open-source license, Apache 2.0, and invited the world to participate. You can build and run your own self-hosted instance of Neon. Focus on building applications with time and money-saving features like instant provisioning, autoscaling according to load, and scale to zero. Instantly branch your data and schema to access isolated DB copies for development, CI/CD, and schema migrations with copy-on-write storage.",
        categories: ["open-source", "database"],
        tags: ["postgres", "serverless", "api"],
        features: [
          "Launch databases in milliseconds with no setup delays",
          "Automatically adjust resources for peak performance",
          "Instantly create isolated database copies for testing",
          "Scale down to zero during idle periods to save costs",
          "Execute fast, edge-ready queries over HTTP",
          "Boost performance with scalable read replicas",
          "Restore databases to anypoint within the last 30 days",
          "Programmatically manage databases with API and CLI",
          "Enable efficient AI-driven vector searches with HNSW indexing",
          "Integrates seamlessly with popular frameworks and ORMs",
        ],
        stars: 15400,
        forks: 454,
        githubUrl: "https://github.com/neondatabase/neon",
        websiteUrl: "https://neon.tech/",
        documentation: "https://neon.tech/docs/introduction",
      },
      {
        name: "Supabase",
        headline:
          "Open-source Firebase alternative that enables you to create secured and scalable software applications within a few minutes.",
        description:
          "Supabase provides a secured Postgres database, a complete user management system that handles various forms of authentication, including email and password, email sign-in, and social authentication, a file storage system that enables us to store and serve files of any size, real-time communication, and many others. Supbase is an amazing software that enables us to build full-stack applications. However, let’s see some unique features that make Supabase stand out from other BaaS (Backend as a Service) software. Supabase documentation is simple and developer-friendly. Each concept is explained with code examples, making it easy for developers to understand and implement its various features. Whether you’re a new or existing user, Supabase’s documentation ensures a smooth and efficient experience, allowing you to navigate and leverage its powerful capabilities. Supabase is a complete backend resource for your software applications. It provides an extendable and secured Postgres database that enables you to create complex relationships among data and perform CRUD and various query operations.   It also provides file storage for storing and serving any file type, a complete authentication system for managing users within your application, real-time communication between a server and multiple clients, edge functions, and a vector database for AI applications. Supabase is open-source, meaning its source code is freely available for inspection, modification, and contribution by the developer community. This openness fosters collaboration, growth, and transparency, allowing its users (developers) to contribute, fix and share any issues. Supabase client SDK is available in various languages, such as JavaScript, Flutter, C#, Swift, and Python. You can leverage Supabase to build modern and scalable software applications if you are using any of the programming languages.   Supabase also allows you to easily migrate your existing data, auth, and storage from other platforms (Firebase, Heroku, Render, MySQL, Postgres, etc). You can also integrate APIs, authentication, dev tools, and data platforms into Supabase.   Depending on your backend resource, Supabase provides a simple how-to guide that enables you to migrate and integrate your resources into the platform.",
        features: [
          "Dedicated Postgres for every project",
          "Secure user sign-ups with row-level security",
          "Instant RESTful and GraphQL APIs",
          "Real-time updates for reactive apps",
          "Custom serverless functions made easy",
          "ML-ready vector embeddings for search",
          "Store and serve large files effortlessly",
          "Built-in authentication system",
          "Auto-generated API documentation",
          "Seamless data migrations",
          "Server-side Row-Level Security",
        ],
        categories: ["open-source", "backend"],
        tags: ["postgreSQL", "cloud-native"],
        stars: 4900,
        forks: 7300,
        githubUrl: "https://github.com/supabase/supabase",
        websiteUrl: "https://supabase.com/",
        documentation: "https://supabase.com/docs",
      },
      {
        name: "Aiven",
        headline:
          "Streaming | Database Optimization | Analytics | Search | Data Warehousing | In-Memory Caching",
        description:
          "Aiven is a fully managed cloud data platform that simplifies the deployment, management, and scaling of open-source data tools. It provides developers and businesses with a seamless way to integrate and manage various data technologies like PostgreSQL, Apache Kafka, MySQL, Cassandra, Elasticsearch, Redis, and more. By automating the operational aspects of these services, Aiven allows users to focus on application development and data insights without worrying about infrastructure complexity.  Aiven operates across major cloud providers, including AWS, Google Cloud, Microsoft Azure, DigitalOcean, and more, offering multi-cloud and hybrid cloud options. Its platform ensures high availability, security, and scalability by default, with built-in monitoring and automatic backups. Aiven also emphasizes environmental sustainability, supporting carbon-offset initiatives for its services.  Developers benefit from an intuitive web interface, comprehensive API support, and Terraform integration for Infrastructure-as-Code (IaC) workflows. Aiven supports a wide range of use cases, including real-time data streaming, database management, analytics, and application development, making it a versatile choice for startups, enterprises, and organizations of all sizes.  By focusing on open-source technologies and offering enterprise-grade performance, Aiven empowers teams to build resilient and scalable data-driven applications while reducing operational overhead.",
        features: [
          "Managed open-source cloud services",
          "Multi-cloud support: AWS, Azure, Google",
          "Automatic scaling and updates",
          "Built-in disaster recovery",
          "Real-time metrics and alerts",
          "Seamless database integrations",
          "Secure access controls",
          "Cost-effective with dynamic scaling",
          "Flexible service configurations",
          "Simplified infrastructure management",
        ],
        categories: ["open-source", "devops"],
        tags: ["postgreSQL", "devops", "redis"],
        stars: 129,
        forks: 70,
        githubUrl: "https://github.com/aiven",
        websiteUrl: "https://aiven.io/",
        documentation: "https://aiven.io/docs",
      },
      {
        name: "MindsDB",
        headline:
          "Your LLM with the built-in power to answer data questions for agents & apps.",
        description:
          "MindDB is an open-source, machine learning platform designed to simplify the integration of predictive AI models into databases. It enables developers and data scientists to build, train, and deploy machine learning models directly within databases, significantly reducing the complexity of model development and deployment. With MindDB, users can create models that predict outcomes based on historical data, leveraging the power of machine learning without requiring extensive programming or data science expertise.  The platform supports integration with a variety of relational and NoSQL databases, such as PostgreSQL, MySQL, and MongoDB, making it easy for teams to embed machine learning directly into their existing data workflows. MindDB allows users to perform tasks like anomaly detection, forecasting, classification, and regression by simply running SQL queries, enabling predictive analytics without needing to move data outside the database.  MindDB's powerful autoML capabilities allow for automatic feature selection, model tuning, and evaluation, streamlining the process of selecting the best model for a given task. It also offers a user-friendly interface for interacting with models, simplifying the process of making predictions on new data.",
        features: [
          "Create and fine-tune AI models",
          "Seamlessly integrate with ML frameworks",
          "Connect diverse enterprise data sources",
          "Automate tasks using JOBS and TRIGGERS",
          "Schedule and trigger AI workflows easily",
          "Access predictive insights via SQL",
          "Unified environment for AI operations",
          "Support for popular database systems",
          "Scalable and extensible AI platform",
          "Simplify AI deployment for businesses",
        ],
        categories: ["open-source", "ai"],
        tags: ["postgreSQL", "AutoML"],
        stars: 26900,
        forks: 4900,
        githubUrl: "https://github.com/mindsdb/mindsdb",
        websiteUrl: "https://mindsdb.com/",
        documentation: "https://docs.mindsdb.com/what-is-mindsdb",
      },
      {
        name: "HarperDB",
        headline:
          "HarperDB is a data management system that supports both SQL and NoSQL functionality",
        description:
          "HarperDB is a data management system that supports both SQL and NoSQL functionality.  It’s fully indexed, doesn’t duplicate data, and can be used on any device, from the edge to the cloud and with the addition of Custom Functions, HarperDB grew from a distributed database to a distributed application development platform. You now can host your database and server API on the same platform with full CRUD functionality. SQL and NoSQL contribute to the industry for their individual use cases. HarperDB was designed to meet the needs of both use cases by combining the strengths of both technologies.  It supports both SQL and NoSQL queries. It also offers access to the database instance directly inside the client-side application. Most flexible DB on the market. HarperDB is 38X faster than competitors. HarperDB globally replicates the data at the speed of the internet. Custom functions make it more powerful. Its SQL/NoSQL capabilities make it a game-changer. To support complex SQL queries, most NoSQL databases use a multi-model architecture. Under the hood, a multi-model is analogous to running two separate databases. Whereas HarperDB is intended to handle both SQL and NoSQL use cases out of the box.  Data inserted into HarperDB via SQL statements or NoSQL objects is mapped to a single model.  Data is never replicated, and nothing needs to be transformed after it is inserted.",
        features: [
          "Handle distributed workloads with ease",
          "Integrate seamlessly with various APIs",
          "Ensure high availability and scalability",
          "Enable edge computing with low latency",
          "Offer flexible schema for dynamic data",
          "Perform analytics directly on live data",
          "Provide cloud and on-prem deployment options",
          "Maintain data consistency across nodes",
          "Designed for IoT and edge environments",
          "Built-in support for SQL and NoSQL",
        ],
        categories: ["backend"],
        tags: ["NoSQL", "api"],
        stars: 10,
        forks: 661,
        githubUrl: "https://github.com/HarperDB",
        websiteUrl: "https://www.harperdb.io/",
        documentation: "https://docs.harperdb.io/docs",
      },
      {
        name: "Clerk",
        headline:
          "Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.",
        description:
          "Clerk is an identity management platform designed to help developers add authentication and user management features to their applications. It simplifies the process of managing user data and authentication flows, offering solutions like multi-factor authentication, social login, and email verification. Clerk is fully customizable and integrates with various frontend frameworks, providing SDKs and a variety of integrations to streamline user management tasks. Clerk offers a secure and easy-to-implement user management system that helps developers handle authentication, authorization, and user profile management. With Clerk, developers can set up authentication for apps quickly, enabling features such as passwordless login, user profiles, session management, and much more. It's designed to scale and provides a seamless experience for both developers and end-users.  Clerk supports multiple authentication methods, including password-based login, social login integrations (like Google and Twitter), and more, to provide flexibility depending on user needs. Its features make it suitable for apps across industries such as healthcare, finance, and e-commerce. Clerk also offers a rich set of tools for managing user data and ensuring compliance with privacy regulations.",
        features: [
          "Social sign-on with 20+ providers",
          "Passwordless auth via email or SMS",
          "Multifactor authentication and bot detection",
          "Customizable user profiles and session management",
          "Role-based and multi-tenancy access controls",
          "Auto-join teams by email domain",
          "Pre-built UI components for quick integration",
          "SDKs for React, Next.js, and more",
          "SOC 2 Type 2 and CCPA compliance",
          "Regular security audits for robust protection",
        ],
        categories: ["authentication", "tools"],
        tags: ["api", "authentication"],
        stars: 1200,
        forks: 279,
        githubUrl: "https://github.com/clerk",
        websiteUrl: "https://clerk.com/",
        documentation: "https://clerk.com/docs",
      },
      {
        name: "FireBase",
        headline:
          "A platform designed to support you throughout your app development journey",
        description:
          "Firebase is a Backend-as-a-Service (Baas) owned by Google that enables us to build full-stack web applications in a few minutes. Services like Firebase make it very easy for front-end developers to build full-stack web applications with little or no backend programming skills.  Firebase provides various authentication methods, a NoSQL database, a real-time database, file storage, cloud functions, hosting services, and many more. Firebase is an exceptional platform that empowers developers to build full-stack applications effortlessly. Let’s explore some unique features that set Firebase apart from other Backend as a Service (BaaS) platforms.  Complete Authentication System:  Firebase offers a complete authentication system that allows you to easily manage user authentication in your application. With Firebase Authentication, you can authenticate users using email/password, phone numbers, Google, Facebook, and more.  Cloud Firestore Firebase Firestore is a flexible, scalable database for mobile, web, and server development. It allows you to store and sync data between your users in real-time, making it ideal for applications that require CRUD operations and complex data queries.  File Storage - Firebase provides an efficient Cloud Storage that enables you to upload and download files easily within your application. It seamlessly integrates with Firebase Authentication and Firebase Firestore, making it easy to build complex applications that requires serving and retrieving various file formats.  Hosting - Firebase provides hosting services that allow you to deploy web apps and static content with a single command. It provides SSL encryption, global CDN delivery, and continuous deployment, ensuring fast and reliable performance for your users.",
        features: [
          "Real-time database for instant updates",
          "Cloud Firestore for scalable NoSQL databases",
          "Authentication with multiple provider options",
          "Hosting for fast, secure web apps",
          "Machine learning with AI-powered tools",
          "Crashlytics for real-time crash monitoring",
          "Dynamic links for deep-linking experiences",
          "Remote Config for feature personalization",
          "Cloud Messaging for reliable notifications",
        ],
        categories: ["backend", "cloud"],
        tags: ["NoSQL"],
        stars: 8900,
        forks: 7300,
        githubUrl: "https://github.com/firebase",
        websiteUrl: "https://firebase.google.com/",
        documentation: "https://firebase.google.com/docs",
      },
      {
        name: "Appwrite",
        headline:
          "Build your entire backend within minutes and scale effortlessly using Appwrite's open-source platform",
        description:
          "Software development transforms our everyday lives, relying heavily on the creativity and innovation of developers. At Appwrite, we enable them to develop products the world loves by removing technical barriers with our backend products. At Appwrite it is our mission to eliminate friction and abstract complexity for every creator. Giving developers all the tools they need with the best experience possible to have all the capabilities to create and innovate without limits and with minimum concerns.  We do this by building the most complete development platform created for developers, backed by the open source community. A platform that has all the solutions you need in one place, with maximum flexibility and minimum friction. A platform that moves with you on your journey, from ideation to scale. A platform that allows you to succeed in the challenges of today, and those of tomorrow.",
        features: [
          "Secure login with 30+ methods",
          "Scalable database with advanced querying and permissions",
          "Deploy serverless functions in 13+ languages",
          "Manage files with encryption and image transformations",
          "Unified messaging across push, email, and SMS",
          "React to events with Realtime API and permissions",
        ],
        tags: ["backend", "cloud", "authentication"],
        stars: 45900,
        forks: 4100,
        githubUrl: "https://github.com/appwrite/appwrite",
        websiteUrl: "https://appwrite.io/",
        documentation: "https://appwrite.io/docs",
      },
      {
        name: "Hygraph",
        headline:
          "The Headless CMS that simplifies complexity for demanding digital projects and speeds up content velocity",
        description:
          "As the first GraphQL native Headless CMS, our mission is to remove traditional content management pain points by using the power of GraphQL, and take the idea of a Headless CMS to the next level. Michael and Daniel met in 2015, while working for a DAM company. They quickly realized that they share the same mindset on software development, keeping a close eye on the disruptive JavaScript technologies that came to life. A couple of weeks later, the idea of a GraphQL CMS came to their minds, so they built it.  Today, most of Hygraph's team operate remotely from different parts of the world, while around 30% works out of the Berlin HQ. As an international and remote friendly company, we're fortunate enough to have some exceptional colleagues joining us in building the best Headless CMS from across the world. With our HQs in Germany, the rest of our team joins in from the UK, India, the US, Brazil, and Argentina.",
        features: [
          "Industry-leading content API",
          "Flexible and elegant content modeling",
          "Manage granular permissions effortlessly",
          "Global content localization capabilities",
          "Seamless frontend framework compatibility",
          "Unify data with content federation",
          "Build with customizable layout components",
          "Real-time live content previews",
          "Enterprise-grade security and compliance",
          "High availability with 99.97% uptime",
        ],
        categories: ["cloud"],
        tags: ["GraphQL", "api"],
        stars: 614,
        forks: 158,
        githubUrl: "https://github.com/hygraph/hygraph-examples",
        websiteUrl: "https://hygraph.com/",
        documentation: "https://hygraph.com/docs",
      },
      {
        name: "AppoloGraphQL",
        headline:
          "AI Ready | Scalable, Intelligent APIs | Real-Time Data Access | Trusted by Industry Leaders",
        description:
          "Apollo GraphQL is a comprehensive suite of tools for building and managing GraphQL APIs across both client and server sides. It consists of several key components, including Apollo Server, which is used to create GraphQL servers, and Apollo Client, which simplifies data management in frontend applications. The Apollo ecosystem makes it easier for developers to interact with APIs and manage data efficiently.  Apollo Server: A flexible and community-driven GraphQL server, which supports a variety of data sources like REST APIs, databases, and more. It is designed for ease of use and extensibility, offering features like middleware, caching, and subscriptions.  Apollo Client: A powerful state management library that integrates GraphQL into frontend applications. It enables developers to fetch, cache, and manage data with ease, supporting real-time updates through subscriptions and automated data fetching strategies.  Real-time capabilities: Apollo allows for real-time data synchronization, making it ideal for apps that need to reflect live data changes.  Apollo simplifies building scalable and efficient APIs, providing developers with the tools to manage both data fetching on the client side and API construction on the server side.",
        features: [
          "Deliver features faster with GraphQL",
          "Streamline backend team collaboration",
          "Self-service for frontend teams",
          "Fetch data from a single endpoint",
          "Reduce latency with fewer requests",
          "Optimize performance using GraphOS",
          "GraphQL-native metrics for diagnostics",
          "Export metrics to DataDog or OpenTelemetry",
        ],
        categories: ["api", "backend"],
        tags: ["GraphQL", "api"],
        stars: 19400,
        forks: 2700,
        githubUrl: "https://github.com/apollographql/apollo-client",
        websiteUrl: "https://www.apollographql.com/",
        documentation: "https://www.apollographql.com/docs",
      },
      {
        name: "Oneentry",
        headline:
          "Secure, private cloud space and ready-to-use backend for easy management of any Apps",
        description:
          "OneEntry is a headless content management system (CMS) designed to empower businesses and developers with advanced tools for organizing, managing, and delivering content. Unlike traditional CMS platforms, it separates the frontend presentation layer from the backend content repository, making it highly adaptable to various frameworks and digital experiences. Its core functionality centers on providing developers with powerful APIs and SDKs to manage and structure content flexibly. OneEntry allows users to create and manage structured content with an attribute-based system, where attributes can be customized for pages, blocks, or specific use cases like catalogs, news, or forms. This system provides unparalleled flexibility in defining and organizing content elements. With its framework-agnostic architecture, OneEntry seamlessly integrates with modern frontend frameworks like React, Angular, and Vue. Its NPM package simplifies the setup and ensures robust integration through well-documented APIs and in-code guidance.",
        features: [
          "Scalable backend for applications",
          "Flexible API and SDK support",
          "Multilingual admin panel usability",
          "Autonomous content management tools",
          "Modern virtual storage solutions",
          "SSL and mTLS for security",
          "Daily backups for data safety",
          "Technical support and updates",
        ],
        categories: ["api", "tools"],
        tags: ["api"],
        stars: 100,
        forks: 100,
        githubUrl: "https://github.com/OneEntry",
        websiteUrl: "https://oneentry.cloud/",
        documentation:
          "https://doc.oneentry.cloud/docs/category/usage-examples/",
      },
      {
        name: "Sanity",
        headline:
          "Treat content as data—actionable, scalable, and ready to drive your business forward with Sanity Content Operating System.",
        description:
          "Sanity is a modern headless content management system (CMS) that allows developers and content creators to build and deliver flexible, scalable, and real-time digital experiences. At its core, Sanity offers an API-first approach that empowers teams to structure and manage content efficiently while enabling seamless integration with various frontend frameworks. With its customizable content studio, developers can tailor the editing environment to fit project-specific needs. Sanity's real-time collaboration tools, powerful query language (GROQ), and extensive plugin ecosystem make it a preferred choice for developers and enterprises building complex digital solutions. Sanity is a highly customizable, API-first headless CMS designed to streamline the process of managing and delivering structured content for modern web and mobile applications. It empowers developers with a fully adaptable Content Studio that can be tailored to project-specific requirements, while its robust APIs facilitate dynamic and real-time content delivery across multiple platforms. Sanity supports real-time collaboration, allowing teams to edit content simultaneously, and integrates seamlessly with various tools and frameworks to provide a unified digital experience. With features like GROQ query language, a plugin ecosystem, and enterprise-grade scalability, Sanity is a powerful solution for creating flexible, scalable, and developer-friendly content workflows.",
        features: [
          "Real-time collaborative editing",
          "Drag-and-drop page builder",
          "AI-assisted content workflows",
          "Scalable backend infrastructure",
          "Omnichannel content delivery",
          "Flexible APIs for developers",
          "Structured data management tools",
          "Integrated scheduling and previews",
          "Highly customizable CMS interface",
          "Supports React, Vue, Next.js, etc",
          "Instant updates via Content Lake",
          "Secure and optimized for teams",
        ],
        categories: ["cloud", "api", "tools"],
        tags: ["api", "CMS"],
        stars: 5400,
        forks: 432,
        githubUrl: "https://github.com/sanity-io/sanity",
        websiteUrl: "https://www.sanity.io/",
        documentation: "https://www.sanity.io/docs",
      },
      {
        name: "Strapi",
        headline:
          "Customize and host your projects in the cloud or on your own servers.",
        description:
          "Strapi is a leading open-source headless CMS that enables developers and businesses to create, manage, and deliver content across multiple platforms with ease and flexibility. It provides a developer-centric environment that emphasizes customization, scalability, and robust API integrations. Strapi allows users to define content structures dynamically through an intuitive admin panel, while offering full control over the backend code for advanced customizations.  With built-in support for REST and GraphQL APIs, Strapi facilitates seamless integration with frontend frameworks like React, Vue, Angular, or even mobile applications. It is database-agnostic, supporting popular databases such as MySQL, PostgreSQL, SQLite, and MongoDB. Strapi's extensibility is further enhanced by its plugin ecosystem, which allows developers to add features like authentication, media management, and role-based access control effortlessly.  Strapi supports self-hosting and provides the flexibility to deploy on popular cloud platforms or on-premises infrastructure. It also ensures fast development cycles with features like API auto-generation and developer-friendly documentation. Designed for teams of all sizes, Strapi powers a wide range of use cases, from blogs and e-commerce platforms to enterprise-grade applications.",
        features: [
          "Minimal editor for dynamic content blocks",
          "Open-source and fully extensible platform",
          "Upload, crop, and optimize media effortlessly",
          "Flexible content types and workflows",
          "Sort and filter thousands of entries",
          "User-friendly, intuitive interface",
          "Manage SEO metadata and media captions",
          "Support for SQLite, MySQL, PostgreSQL",
          "Secure API access with JWT authentication",
          "Built-in emailing with default SMTP server",
        ],
        categories: ["open-source", "api"],
        tags: ["GraphQL", "CMS"],
        stars: 64200,
        forks: 8200,
        githubUrl: "https://github.com/strapi/strapi/",
        websiteUrl: "https://strapi.io/",
        documentation: "https://docs.strapi.io/",
      },
      {
        name: "Airtable",
        headline:
          "Create modern business apps to manage and automate critical processes.",
        description:
          "Airtable is a flexible collaboration tool combining the simplicity of a spreadsheet with the relational power of a database. It enables teams to organize their data, workflows, and projects seamlessly. Airtable provides custom views, automation, and integration capabilities, making it versatile for various industries like marketing, design, project management, and more. Users can create bases (databases) with tables, fields, and relationships, and collaborate in real time. It also features visual tools, such as kanban boards, calendars, and Gantt charts, to enhance project tracking and data visualization.",
        features: [
          "Visual database for easy data management",
          "Customizable templates for various use cases",
          "Collaborate in real time with team members",
          "Flexible views: grid, calendar, kanban, gallery",
          "Powerful filtering, sorting, and grouping options",
          "Integration with popular apps and services",
          "Automate workflows with no-code automation",
          "Attach files, images, and links directly in records",
          "Rich field types for diverse data storage",
          "API access for advanced integrations",
          "Permission controls for secure collaboration",
          "Mobile app for on-the-go data management",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 2000,
        forks: 407,
        githubUrl: "https://github.com/Airtable/airtable.js",
        websiteUrl: "https://www.airtable.com/",
        documentation:
          "https://support.airtable.com/?_gl=1*1b6jp5u*_gcl_au*MTM4MDE0ODUzNy4xNzM0MTExOTg1*_ga*MTU2NjIzODUxNi4xNzM0MTExOTg2*_ga_VJY8J9RFZM*MTczNDExMTk4NS4xLjAuMTczNDExMjAxNy4yOC4wLjA.",
      },
      {
        name: "NocoDB",
        headline:
          "NocoDB allows building no-code database solutions with ease of spreadsheets.",
        description:
          "NocoDB is a no-code database platform that allows teams to collaborate and build applications with ease of a familiar and intuitive spreadsheet interface. This allows even non-developers or business users to become software creators.  NocoDB works by connecting to any relational database and transforming them into a smart spreadsheet interface! This allows you to build no-code applications collaboratively with teams. NocoDB currently works with MySQL, PostgreSQL & SQLite (only in Open Source) databases.  Also, NocoDB's app store allows you to build business workflows on views with combination of Slack, Microsoft Teams, Discord, Twilio, Whatsapp, Email & any 3rd party APIs too. Plus NocoDB provides programmatic access to APIs so that you can build integrations with Zapier / Integromat and custom applications too. Our mission is to provide the most powerful no-code interface for databases which is Open Source to every single internet business in the world. This would not only democratise access to a powerful computing tool but also bring forth a billion+ people who will have radical tinkering-and-building abilities on internet. Most internet businesses equip themselves with either spreadsheet or a database to solve their business needs. Spreadsheets are used by a Billion+ humans collaboratively every single day. However, we are way off working at similar speeds on databases which are way more powerful tools when it comes to computing. Attempts to solve this with SaaS offerings has meant horrible access controls, vendor lockin, data lockin, abrupt price changes & most importantly a glass ceiling on what's possible in the future.",
        features: [
          "Full data ownership with no limits",
          "Open-source platform for businesses of all sizes",
          "Scales to millions of rows without enterprise plans",
          "High API throughput for automation",
          "Community-driven innovation and development",
          "New paradigm in no-code platforms",
          "Flexible for agencies, startups, and enterprises",
          "Efficient infrastructure for smooth operations",
          "No-sales talk required for large-scale use",
          "Enables businesses to control all data",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 50200,
        forks: 3500,
        githubUrl: "https://github.com/nocodb/nocodb",
        websiteUrl: "https://www.nocodb.com/",
        documentation: "https://docs.nocodb.com/",
      },
      {
        name: "Appsmith",
        headline:
          "Build custom applications more quickly and securely with the leader in open-source low-code development.",
        description:
          "Organizations build internal applications such as dashboards, database GUIs, admin panels, approval apps, customer support tools, etc. to help improve their business operations. Appsmith is an open-source developer tool that enables the rapid development of these applications. You can drag and drop pre-built widgets to build UI. Connect securely to your databases & APIs using its datasources. Write business logic to read & write data using queries & JavaScript. Appsmith makes it easy to build a UI that talks to any datasource. You can create anything from simple CRUD apps to complicated multi-step workflows with a few simple steps:  Connect Datasource: Integrate with a database or API. Appsmith supports the most popular databases and REST APIs. Build UI: Use built-in widgets to build your app layout. Write Logic: Express your business logic using queries and JavaScript anywhere in the editor. Collaborate, Deploy, Share: Appsmith supports version control using Git to build apps in collaboration using branches to track and roll back changes. Deploy the app and share it with other users.",
        features: [
          "Drag and drop pre-built widgets",
          "Create responsive UIs without HTML/CSS",
          "Easily integrate with data sources",
          "Power apps with live data",
          "Add custom logic using JavaScript",
          "Write and test JS in-platform",
          "Manage versions with Git integration",
          "Automatically deploy updates quickly",
          "Scale securely with enterprise SSO",
          "Protect data with role-based access",
          "Track changes with audit logs",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 34900,
        forks: 3800,
        githubUrl: "https://github.com/appsmithorg/appsmith",
        websiteUrl: "https://www.appsmith.com/",
        documentation: "https://docs.appsmith.com/",
      },
      {
        name: "Plausible",
        headline:
          "HelloPlausible is intuitive, lightweight and open source web analytics.",
        description:
          "Plausible is intuitive, lightweight and open source web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. Made and hosted in the EU, powered by European-owned cloud infrastructure 🇪🇺. Plausible is simple analytics. It is easy to understand and it cuts through the noise. Check your site traffic and get all the essential insights on one page in one minute. There are no layers of menus, there is no need for you to build custom reports, custom dashboards or PowerPoint documents. You can even import your Google Analytics stats. Plausible is lightweight analytics. Our script is 75 times smaller than Google Analytics. Your page weight will be cut down, your site will load faster and you'll reduce your carbon footprint for a greener and more sustainable web. A site with 100,000 monthly visitors can save 8.2 kg of CO2 emissions per year by switching. Plausible is privacy-friendly analytics. All the site measurement is carried out absolutely anonymously. Cookies are not used and no personal data is collected. There are no persistent identifiers. No cross-site or cross-device tracking either. Your site data is not used for any other purposes. All visitor data is exclusively processed with servers owned and operated by European companies and it never leaves the EU.",
        features: [
          "Single-page dashboard with essential insights",
          "No complex menus, easy navigation",
          "Fully GDPR/CCPA compliant, no cookies",
          "Anonymous data collection, no personal info stored",
          "Lightweight script, improves site speed",
          "Reduces carbon footprint, faster load times",
          "Open-source code available on GitHub",
          "Track goal conversions and revenue",
          "Analyze campaigns with UTM parameters",
          "Create custom events and dimensions",
          "Funnel analysis to optimize conversions",
          "Invite team members with customizable roles",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 20800,
        forks: 1100,
        githubUrl: "https://github.com/plausible/analytics",
        websiteUrl: "https://plausible.io/",
        documentation: "https://plausible.io/docs",
      },
      {
        name: "PostHog",
        headline:
          "The single platform to analyze, test, observe, and deploy new features.",
        description:
          "PostHog is an open-source platform focused on product analytics, designed to help teams understand and optimize user interactions within their applications. By providing tools for session replays, product analytics, feature flags, and A/B testing, PostHog enables developers and product teams to gather deep insights into user behavior and make data-driven decisions to enhance the product experience. One of the key benefits of PostHog is its ability to be self-hosted, allowing companies to maintain full control over their data, while also offering a cloud-hosted solution for teams that prefer managed services. With its comprehensive suite of features, including event tracking, funnel analysis, and user segmentation, PostHog is ideal for companies looking to improve user engagement and optimize their products over time.  PostHog is known for its ease of use, flexibility, and scalability, making it a popular choice among engineering teams that prioritize performance and privacy. Whether you are running A/B tests to validate new features or analyzing user behavior across various touchpoints, PostHog offers a robust and integrated solution for tracking, analyzing, and acting on user data.",
        features: [
          "Track product events, funnels, and retention",
          "Session recording to analyze user interactions",
          "Controlled rollouts with feature flags",
          "Run A/B tests with experimentation tools",
          "Gather feedback with user surveys",
          "Basic site metrics with web analytics",
          "Open-source with self-hosting options",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 22600,
        forks: 1400,
        githubUrl: "https://github.com/posthog/posthog",
        websiteUrl: "https://posthog.com/",
        documentation: "https://posthog.com/docs",
      },
      {
        name: "UseFathom",
        headline:
          "A Google Analytics alternative that’s simple & privacy-first.",
        description:
          "Fathom is a privacy-focused, simple website analytics tool. It's designed to give you essential insights into website traffic without compromising user privacy. The project is open-source and initially developed using Golang and Preact, offering an easy-to-use platform for website owners to track visitor interactions while maintaining high privacy standards. Fathom Lite is the free version of this tool, which allows users to install it on their own server, although it lacks some of the advanced features present in the paid version, Fathom Analytics.  Fathom Lite is suitable for users who want a basic analytics solution, with a focus on simplicity and privacy. It operates without cookies, ensuring compliance with privacy regulations like GDPR. However, the paid version offers more advanced capabilities such as event tracking, email reports, and enhanced data security. It's designed to scale easily and includes a CDN for fast delivery of analytics data globally.",
        features: [
          "Track custom user events for insights",
          "Receive weekly or monthly email reports",
          "Use UTMs for campaign data and conversions",
          "Keep customer data for 20 years",
          "Lightweight script, SEO-friendly",
          "Handle traffic spikes without performance loss",
          "Independent, customer-focused small team",
          "Developer-friendly API for easy integration",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 7700,
        forks: 372,
        githubUrl: "https://github.com/usefathom/fathom",
        websiteUrl: "https://usefathom.com/",
        documentation: "https://usefathom.com/api",
      },
      {
        name: "Liveblocks",
        headline:
          "Liveblocks is the platform for adding collaborative editing, comments, and notifications into your application.",
        description:
          "Liveblocks is the platform for adding collaborative editing, comments, and notifications into your application. At Liveblocks, we firmly believe that flexible office policies are here to stay, and that as a result, all SaaS products will eventually need realtime collaboration. Every project we undertake at Liveblocks stems from this belief, and the belief that we can empower people to work better together, and feel more closely connected with one another. Liveblocks is a realtime collaboration infrastructure for building performant collaborative experiences. We focus on the following five core pillars to enable companies to build awesome collaborative experiences in a matter of days, not months. Liveblocks is a complete modular toolkit for embedding collaborative experiences into your product, enabling you to pick and choose the parts you need depending on the type of collaborative experience you’re trying to build and its requirements. Liveblocks integrates deeply with popular frontend frameworks and libraries, making it easy to embed real‑time collaborative experiences into any product quickly.",
        features: [
          "Add real-time collaboration features",
          "Enable feedback with comments",
          "Notify users with updates",
          "Collaborative document editing support",
          "Build custom real-time experiences",
          "Use pre-built React components",
          "Debug easily with DevTools",
          "Jumpstart with starter kits",
          "Scale with zero-configuration infrastructure",
          "Reliable WebSocket edge infrastructure",
          "Built-in security and SOC 2.",
          "Monitor with a comprehensive dashboard",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 3600,
        forks: 296,
        githubUrl: "https://github.com/liveblocks/liveblocks",
        websiteUrl: "https://liveblocks.io/",
        documentation: "https://liveblocks.io/docs",
      },
      {
        name: "Livekit",
        headline:
          "Instantly transport audio and video between LLMs and your users.",
        description:
          "LiveKit is a realtime platform that enables developers to build video, voice, and data capabilities into their applications. Building on WebRTC, it supports a broad range of frontend and backend platforms. LiveKit's architecture is composed of several key components that enable real-time communication and media streaming. The core component is the LiveKit Server, which acts as a Selective Forwarding Unit (SFU) and handles signaling, media processing, and other real-time communication tasks. To simplify integration, LiveKit provides a range of SDKs for web, native, and backend environments, abstracting the complexities of WebRTC. Additionally, Egress enables the recording or live streaming of rooms and individual participant tracks, while Ingress allows external streams, such as RTMP and WHIP, to be ingested into LiveKit rooms. For building intelligent, real-time applications, LiveKit also features AI Agents, a server-side framework for integrating AI capabilities. Lastly, the CLI tool helps manage LiveKit services, whether they are cloud-hosted or self-hosted. This modular approach makes it easier to implement robust, scalable, real-time communication solutions.",
        features: [
          "Ultra-low latency for real-time streaming",
          "Seamless voice AI integration with LLMs",
          "Support for voice, video, and AI interactions",
          "Native SDKs for major platforms",
          "Open-source foundation with Apache 2.0 license",
          "Low-latency audio/video for immersive experiences",
          "Easily integrate AI models into apps",
          "Build multimodal applications with voice/video",
          "Vendor lock-in prevention with open-source tools",
          "Flexible SDKs for cross-platform development",
          "Scalable solutions for voice and video processing",
          "Secure, customizable, and extensible ecosystem",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 10800,
        forks: 918,
        githubUrl: "https://github.com/livekit/livekit",
        websiteUrl: "https://livekit.io/",
        documentation: "https://docs.livekit.io/home/",
      },
      {
        name: "Cal",
        headline:
          "A fully customizable scheduling experience for individuals, businesses taking calls and developers building scheduling platforms where users meet users.",
        description:
          "Being open-source has a lot of tradeoffs. It has been an incredible growth journey so far thanks to its word-of-mouth nature and developer interest, but OSS is known for making it hard to capture the generated value early on.  A SaaS business can capture a higher % of revenue per customer, but ultimately they will be capped by the people they can reach. Governments, Healthcare, and other highly regulated industries not only prefer but are often required to self-host, which open source makes possible in the most secure and trusted manner.  Our hunch is that SaaS infrastructure is only scratching the surface of the scheduling space and CEOs in the industries agree that the entire market is still in its infancy.  Going head-to-head as a SaaS company against existing market leaders is a fool's errand, hence we are doing similar things in a fundamentally different category: Open Scheduling.",
        features: [
          "Customizable booking flows",
          "Integrated payments for appointments",
          "Multiple calendar integration options",
          "Advanced team scheduling tools",
          "Open-source platform for flexibility",
          "Salesforce integration for enhanced workflow",
          "Automated no-show management",
          "Recurring booking options",
          "Flexible event types with detailed settings",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 33000,
        forks: 8200,
        githubUrl: "https://github.com/calcom/cal.com",
        websiteUrl: "https://cal.com/",
        documentation: "https://cal.com/docs/developing/introduction",
      },
      {
        name: "Typeform",
        headline:
          "Collect all the data you need to understand customers with forms designed to be refreshingly different.",
        description:
          "Typeform is an online platform that specializes in creating interactive surveys, forms, and quizzes. The platform allows users to design engaging, conversational forms that can collect data in a visually appealing and user-friendly way. Typeform's goal is to provide an experience where forms do not feel like traditional static questionnaires but rather interactive and engaging tools that improve response rates and user engagement. Typeform provides user-friendly forms, surveys, and quizzes designed to gather deeper insights from customers. It offers customizable designs and the ability to ask follow-up questions based on previous answers, enabling businesses to collect valuable data in a more engaging way. The platform integrates with popular tools like Zapier, Slack, and HubSpot, enhancing its functionality for various use cases including lead generation, market research, and customer feedback. Typeform is widely used by marketers, product teams, and HR departments to improve customer experience and gather actionable insights.",
        features: [
          "Interactive and customizable forms",
          "Seamless integration with over 300 apps",
          "Engage users with dynamic surveys",
          "Powerful analytics for data insights",
          "User-friendly interface with drag-and-drop",
          "Supports quizzes, polls, and feedback",
          "Automated workflows to streamline processes",
          "AI-driven analysis for smarter decisions",
          "Mobile-optimized for responsive experiences",
          "Create personalized, branded forms easily",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 289,
        forks: 122,
        githubUrl: "https://github.com/Typeform",
        websiteUrl: "https://www.typeform.com/",
      },
      {
        name: "Formbricks",
        headline:
          "Gather feedback on websites, apps and everywhere else to understand what your customers need.",
        description:
          "The foundation of Formbricks is an open source (AGPLv3) survey platform. Our objective is to built a survey tool which can be used to survey any stakeholder of an organisation (user, customer, employee, etc.) at any point on any platform. The surveying platform is largely free, also for commercial use. As we further develop the product offering, all surveying capacity will move into the forever free Community Edition. Formbricks offers fine-grained user targeting and event-based triggers to help you display your surveys to the most relevant audience. Using the platform, you can define user segments based on attributes and behaviors, and set up triggers to show your surveys at specific moments within your product. This ensures that you're capturing the most accurate and valuable feedback possible. Integrating Formbricks into your web is a breeze. With SDKs for popular web frameworks like React, and an HTML snippet for non-framework based websites, you can quickly add Formbricks to your project. The provided code snippets make it easy to initialize the Formbricks widget and configure it to communicate with your backend.",
        features: [
          "Customizable surveys with easy integration",
          "GDPR-compliant for user privacy",
          "Pre-segment surveys based on attributes",
          "Works with React, Vue, Svelte",
          "Trigger surveys with user actions",
          "Centralized data for better insights",
          "Supports no-code survey setups",
          "Open-source and developer-friendly",
          "Seamless feedback collection across platforms",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 9400,
        forks: 1700,
        githubUrl: "https://github.com/formbricks/formbricks",
        websiteUrl: "https://formbricks.com/",
        documentation:
          "https://formbricks.com/docs/introduction/what-is-formbricks",
      },
      {
        name: "Typebot",
        headline:
          "Typebot gives you powerful blocks to create unique chat experiences.",
        description:
          "Typebot is an fair source chatbot builder. It allows you to create conversational apps/forms (Lead qualification, Customer support, Product launch, User onboarding, AI chats), deploy it on your website or WhatsApp number, and collect results in real-time. Typebot.io is a powerful tool for building conversational applications such as chatbots, lead qualification forms, customer support bots, and more. It is designed to allow users to create bots and deploy them across various platforms, including websites and WhatsApp. Typebot offers an easy-to-use interface with a flow-based design, enabling users to design chatbot conversations using blocks for variables, messages, actions, and integrations. It also supports real-time data collection, analytics, and can be customized with various themes and settings.",
        features: [
          "Hidden fields for user segmentation",
          "Collaborate with teammates on typebots",
          "Link and reuse sub-typebots",
          "Add custom JavaScript & CSS",
          "Connect to custom domains",
          "Organize typebots with folder management",
          "Segment users through form URLs",
          "Streamline workflows with team collaboration",
          "Keep typebots organized by client",
          "Customize forms with powerful code options",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 7700,
        forks: 2200,
        githubUrl: "https://github.com/baptisteArno/typebot.io",
        websiteUrl: "https://typebot.io/",
        documentation: "https://docs.typebot.io/get-started/introduction",
      },
      {
        name: "Medusa",
        headline:
          "A commerce platform with a built-in framework for customizations.",
        description:
          "Medusa is a customizable, open-source headless eCommerce platform designed to help businesses build tailored, scalable digital commerce solutions. With Medusa, users can create their own eCommerce stack by choosing from a variety of tools and SDKs, including custom API routes, workflows, data models, and integrations. The platform offers flexibility for both developers and business owners to build complex use cases such as marketplaces, subscription models, or digital product stores. Additionally, Medusa’s modular architecture allows you to extend commerce functionalities like cart management, payment processing, customer management, inventory control, and more.",
        features: [
          "Open-source headless eCommerce platform",
          "Flexible API for custom integrations",
          "Built-in support for multiple stores",
          "Product, order, and customer management",
          "Multi-currency and multi-language support",
          "Easy to extend with plugins",
          "Customizable storefront and admin dashboard",
          "Integrated payment gateway options",
          "Real-time inventory management",
          "Scalable architecture for growth",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 26400,
        forks: 2700,
        githubUrl: "https://github.com/medusajs/medusa",
        websiteUrl: "https://medusajs.com/",
        documentation: "https://docs.medusajs.com/",
      },
      {
        name: "Shopify",
        headline:
          "Shopify is a powerful e-commerce platform that allows businesses to create and manage online stores.",
        description:
          "Shopify is a leading e-commerce platform that empowers businesses of all sizes to create, manage, and scale online stores with ease. Offering customizable themes, secure payment processing, and powerful tools for marketing, shipping, and inventory management, Shopify enables businesses to sell across various channels such as social media and marketplaces. With its user-friendly interface, Shopify enables users to set up personalized, professional-looking online stores without requiring any technical knowledge. The platform provides a wide range of features, including customizable themes, a secure payment gateway, inventory management, and integrated shipping solutions. Shopify also supports multi-channel selling, allowing businesses to extend their reach to popular platforms like Instagram, Facebook, and Amazon. Additionally, Shopify provides advanced marketing tools, detailed analytics, SEO features, and a vast marketplace of third-party apps for further enhancing the store's functionality. Whether you're starting a small online shop or scaling up an enterprise, Shopify offers the tools and flexibility to grow and thrive in the digital marketplace.",
        features: [
          "Easy-to-use online store builder",
          "Secure payment processing",
          "Inventory management tools",
          "Customizable themes and design",
          "Mobile-responsive storefronts",
          "Integrated shipping options",
          "Marketing and SEO tools",
          "24/7 customer support",
          "Multiple sales channels integration",
          "Analytics and reporting features",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 18100,
        forks: 1100,
        githubUrl: "https://github.com/Shopify",
        websiteUrl: "https://www.shopify.com/",
      },
      {
        name: "Twilio",
        headline:
          "Cloud platform for messaging, voice, video, and authentication APIs.",
        description:
          "Twilio is a leading cloud communications platform that empowers developers to build various real-time communication applications. By providing robust APIs, Twilio simplifies the process of adding messaging, voice, video, and authentication services to apps. Whether it's sending SMS messages, making voice calls, or enabling video communication, Twilio's platform supports a wide range of features designed to improve customer interactions. The platform is known for its scalability and reliability, making it a preferred choice for developers building both small-scale projects and enterprise-level applications. Twilio’s focus on flexibility and easy-to-use APIs has made it a go-to tool for businesses aiming to engage customers through seamless, global communication.  Twilio enables developers to integrate communications solutions into their applications using simple code interfaces. The platform’s solutions are widely adopted in industries like healthcare, finance, e-commerce, and customer service. Twilio provides infrastructure for automated messaging systems, real-time voice and video services, and multi-factor authentication (MFA) solutions. Its APIs are designed to be both powerful and simple, allowing for easy integration with other platforms and services.",
        features: [
          "Multichannel messaging via SMS, WhatsApp, Messenger",
          "Build interactive voice experiences with programmable voice",
          "Reliable email delivery with SendGrid API",
          "Implement secure phone verification and 2FA",
          "RESTful APIs and SDKs for integration",
          "Carrier-grade infrastructure for global communication",
          "AI-powered tools for personalized interactions",
          "Scale communications globally with ease",
          "Transactional and marketing email delivery",
          "Secure account management with authentication",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 1900,
        forks: 715,
        githubUrl: "https://github.com/twilio/",
        websiteUrl: "https://www.twilio.com/en-us",
        documentation: "https://www.twilio.com/docs",
      },
      {
        name: "Stream",
        headline: "APIs and SDKs to Build In-App Chat  Video  & Feeds  Faster.",
        description:
          "Stream is a platform designed for developers to seamlessly integrate chat, activity feeds, and video messaging into applications. It offers scalable APIs that allow companies to build robust, real-time communication features without the complexity of handling infrastructure. The service is particularly popular for creating personalized social experiences, engaging communities, and real-time notifications.  With its high-performance architecture, Stream supports apps with millions of users and promises minimal latency, with 99.999% uptime. The platform provides easy-to-use SDKs for various frameworks such as React, Flutter, and iOS, simplifying integration into apps. Key features include user engagement tools like reactions, comments, likes, and the ability to aggregate posts. Furthermore, it supports URL enrichment, enabling richer content within feeds.",
        features: [
          "Launch quickly with pre-built UI components",
          "Fully customizable SDKs for flexible development",
          "Scale to millions with enterprise-grade infrastructure",
          "Support real-time messaging, video/audio calls",
          "Add social feeds for enhanced user engagement",
          "Use flexible APIs to meet specific needs",
          "Effortless scalability with reliable infrastructure",
          "Enhance UX with seamless real-time features",
          "Customize platform features for unique requirements",
          "Accelerate development with ready-to-use tools",
          "Deliver high-performance services to millions",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 8900,
        forks: 636,
        githubUrl: "https://github.com/GetStream/",
        websiteUrl: "https://getstream.io/",
        documentation: "https://getstream.io/activity-feeds/docs/",
      },
      {
        name: "RisingWave",
        headline:
          "Build Real-Time Pipelines and Applications Faster Than Ever.",
        description:
          "RisingWave is a cloud-native, open-source streaming database designed for real-time event-driven applications. It provides efficient data processing by continuously ingesting and transforming streaming data. With its distributed architecture, it ensures scalability and fault tolerance. RisingWave enables real-time analytics, leveraging incremental computations for up-to-date insights. It integrates seamlessly with PostgreSQL and offers features like real-time ETL, continuous analytics, and high availability. It's well-suited for industries such as financial services and e-commerce that rely on fast, continuous data streams. Its open-source nature makes it highly adaptable for various use cases.",
        features: [
          "Monitor real-time events for anomalies",
          "Trigger instant alerts to notification services",
          "Transform real-time events into AI features",
          "Store and share AI features within a unified system",
          "Inspect historical versions of AI features",
          "Extract real-time insights from event streams",
          "Handle millions of concurrent queries with low latency",
          "Securely store historical data in cost-effective storage",
          "Develop scalable real-time data pipelines with SQL",
          "Ingest data efficiently using multi-way joins",
          "Support automatic schema evolution and out-of-order processing",
          "Process real-time data streams with high efficiency",
        ],
        categories: ["ai", "tools"],
        tags: ["GraphQL", "CMS"],
        stars: 7100,
        forks: 589,
        githubUrl: "https://github.com/risingwavelabs/risingwave",
        websiteUrl: "https://risingwave.com/",
        documentation: "https://docs.risingwave.com/get-started/intro",
      },
    ]
    if (!Array.isArray(tools)) {
      return NextResponse.json(
        { error: "Invalid data format. Expected an array of tools." },
        { status: 400 }
      )
    }

    const createdTools = await Promise.all(
      tools.map(async (tool) => {
        return prisma.tool.create({
          data: {
            name: tool.name,
            description: tool.description,
            headline: tool.headline,
            features: tool.features,
            logo: tool.name,
            categories: tool.categories || [],
            tags: tool.tags || [],
            stars: tool.stars || 0,
            forks: tool.forks || 0,
            lastUpdated: new Date(),
            websiteUrl: tool.websiteUrl,
            githubUrl: tool?.githubUrl,
            documentation: tool?.documentation,
          },
        })
      })
    )

    return NextResponse.json(
      { message: "Tools created successfully", createdTools },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error in API:", error.message)
    return NextResponse.json(
      { error: "Error processing request. Please try again." },
      { status: error.response?.status || 500 }
    )
  }
}
