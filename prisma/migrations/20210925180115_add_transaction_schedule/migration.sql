-- AlterTable
ALTER TABLE "UserAccount" ADD COLUMN     "currentBalance" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TransactionSchedule" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "recurrenceRule" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionException" (
    "id" SERIAL NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "originalDate" TIMESTAMP(3) NOT NULL,
    "newDate" TIMESTAMP(3),
    "amount" INTEGER,
    "transactionScheduleId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionException" ADD FOREIGN KEY ("transactionScheduleId") REFERENCES "TransactionSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
