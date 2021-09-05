-- CreateEnum
CREATE TYPE "PaymentChannel" AS ENUM ('InStore', 'Online', 'Other');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "plaidTransactionId" TEXT NOT NULL,
    "merchantName" TEXT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPending" BOOLEAN NOT NULL,
    "paymentChannel" "PaymentChannel" NOT NULL,
    "userAccountId" INTEGER NOT NULL,
    "category" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction.plaidTransactionId_unique" ON "Transaction"("plaidTransactionId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
