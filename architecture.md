      [ Public Internet ]

              |
              ▼
    +-----------------------+
    |     NGINX (RP/LB)     | (Container Port: 80/443)
    +-----------|-----------+

                |
        ________|____________________________________
       |                |                            |
       ▼                ▼                            ▼
+--------------+  +--------------+          +------------------+

| Next.js App  |  | NestJS API   |          | Temporal Web UI  |
|  (Frontend)  |  |  (Backend)   |          |  (Ops Console)   |
+--------------+  +------|-------+          +------------------+

       |                |                            |
       |                |       gRPC (Port: 7233)    |
       |                +----------------------------+

       |                            |
       |                            ▼

       |                +----------------------------+
       |                |      Temporal Server       | (Multi-container Cluster)
       |                | (Frontend, Matching, Hist) |
       +----------------+-------------|--------------+

       |                              |
       |      ________________________|________________________
       |     |                        |                        |
       ▼     ▼                        ▼                        ▼
+--------------+             +-----------------+      +-----------------+

| NestJS Worker|             |   PostgreSQL    |      |  Elasticsearch  |
| (Temporal)   |             | (State Store)   |      | (Vis./Search)   |
+--------------+             +-----------------+      +-----------------+

[ All services networked via Docker Compose bridge network ]

# Components and Connectivity
NGINX (Reverse Proxy/Load Balancer): Acts as the single entry point. It routes traffic to the Next.js frontend (/) or the NestJS API (/api) using an upstream block to balance multiple backend instances.
Next.js (Frontend): Serves the UI and communicates with the NestJS backend via server-side fetches or client-side calls.
NestJS (Backend API): Receives requests and triggers Temporal Workflows using the Temporal Client. It is typically containerized separately from the worker to allow independent scaling.
Temporal Orchestration:
Temporal Server: A cluster of services (Frontend, History, Matching) that maintains workflow state.
NestJS Worker: A separate container running the NestJS framework that "polls" the Temporal server for tasks. This is where your actual business logic lives.
Data Tier: Includes PostgreSQL for workflow state and Elasticsearch for advanced visibility and searching of workflow history.
Docker Containerization: Every component is defined in a docker-compose.yml file, ensuring consistent networking and environment variables across all services.