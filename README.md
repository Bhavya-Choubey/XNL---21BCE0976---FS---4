## NEXT-GEN DECENTRALIZED FREELANCE MARKETPLACE 

This is a website where freelancers and clients can connect. Clients can post jobs, and freelancers can apply for them. It have the following feautures:
1. Decentralized – No middleman! Everything runs on blockchain, making it super secure.
2. AI-Powered – The system matches jobs to freelancers automatically based on skills.
3. Escrow Payments – Payments are locked safely in a smart contract until the work is done.
4. Reputation System – Trustworthy freelancers and clients get better visibility based on past work.

## TECH STACK USED

Frontend (User Interface) → Built using Next.js (React)
Backend (Brain of the Site) → Uses Nest.js (Node.js)
Blockchain (Smart Contracts & Security) → Uses Web3.js / ethers.js
Real-Time Features → WebSockets help update jobs instantly
Database → PostgreSQL

## WORKING

1. Client Posts a Job – They describe the work and budget.
2. AI Suggests Best Freelancers – Instead of browsing, freelancers get recommended jobs that fit them.
3. Freelancers Apply – They send proposals to clients.
4. Escrow Payment System – The client’s payment is held safely until the work is finished.
5. Work Completed & Rated – After delivery, the freelancer gets paid, and both parties can rate each other.

## DATABASE

1. Users – Stores client & freelancer info (name, email, wallet, etc.)
2. Jobs – Contains job details (title, description, budget, etc.)
3. Proposals – When freelancers apply for jobs
4. Contracts – When a client hires a freelancer
5. Payments – Tracks money flow using smart contracts
6. Reviews – Ratings & feedback after work is done

## API

1. Users
Sign Up → POST /api/auth/signup
Login → POST /api/auth/login
2. Jobs
Post Job → POST /api/jobs (Client posts work)
View Jobs → GET /api/jobs (Freelancers see jobs)
3. Proposals
Apply for Job → POST /api/proposals (Freelancer applies)
View Proposals → GET /api/proposals?job_id=123
4. Contracts
Hire Freelancer → POST /api/contracts (Client accepts proposal)
Mark as Complete → POST /api/contracts/complete
5. Payments
Release Payment → POST /api/payments/release
6. Reviews
Submit Review → POST /api/reviews

## CI/CD Pipeline Configuration

1. Code Push → GitHub
2. Continuous Integration (CI) → GitHub Actions
Checks Code → Runs tests to ensure everything works
Builds Project → Converts it into a deployable package
3. Continuous Deployment (CD) → Netlify
Backend → Deploys backend 
Frontend → Deploys Next.js UI (via Netlify)
Smart Contracts → Deploys to blockchain 
4. Automated Testing
Runs Unit Tests (Check small parts of code)
Runs Integration Tests (Check how parts work together)
5. Deployment & Monitoring
If tests pass, the app is deployed automatically
Uses logging & monitoring to track errors in real-time

## Security Audit Report

1. Authentication & Authorization
Enforce strong passwords (e.g., 8+ chars, symbols, uppercase).
Use JWT tokens for secure login.
2. API Security
Use rate limiting (e.g., 100 requests/min per user).
Protect endpoints with API keys.
3. Database Security
Use prepared statements (e.g., SELECT * FROM users WHERE id = ?).
Restrict DB access to admin accounts only.
4. Data Encryption
Hash passwords with bcrypt (bcrypt.hash(password, 10)).
Use HTTPS (SSL/TLS) for secure communication.
5. Smart Contract Security
Audit Solidity contracts with OpenZeppelin security patterns.
Use reentrancy guards to prevent double-spending.
6. Frontend Security
Escape user inputs to prevent XSS attacks.
Implement Content Security Policy (CSP).

## Blockchain Smart Contract Audits

1. Reentrancy Attacks (High Risk)
Use Reentrancy Guard (nonReentrant modifier).
2. Integer Overflow/Underflow
Use SafeMath or Solidity >=0.8.0 (which prevents overflow).
3. Access Control Issues
Only admins can withdraw escrow funds (onlyOwner).
4. Unchecked External Calls
Verify contract addresses before external calls.
5. Gas Limit & Loops
Optimized loops & batch processing.
6. Event Logging & Transparency
Implement events (JobPosted, PaymentReleased).

## System Architecture

1. Frontend (Next.js) – User-friendly interface for job posting & bidding.
2. Backend (NestJS) – Handles API calls, user auth, & business logic.
3. Blockchain – Smart contracts for secure payments & reputation tracking.
4. AI Engine – Matches freelancers with jobs using machine learning.
5. Database (PostgreSQL) – Stores user data, job details & chat history.

## Flow Diagram 

1. Job Posting & AI Matching
Client posts a job → AI suggests best freelancers → Job is listed.
2. Bidding & Selection
Freelancers bid → Client selects the best → Smart contract is created.
3. Secure Payment (Escrow)
Client funds are locked in escrow (blockchain) → Work starts.
4. Job Completion & Verification
Freelancer submits work → Client approves → Payment is released.
5. Reputation & Reviews
Freelancer gets rated → AI updates profile reputation.

