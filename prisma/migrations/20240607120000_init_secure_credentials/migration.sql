◇ injected env (4) from .env.local // tip: ⌘ suppress logs { quiet: true }
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "adminagent";

-- CreateTable
CREATE TABLE "StoredCredential" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "encrypted" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoredCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionState" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "state" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoredCredential_domain_key" ON "StoredCredential"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "SessionState_domain_key" ON "SessionState"("domain");

