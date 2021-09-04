-- CreateEnum
CREATE TYPE "UserAccountType" AS ENUM ('Investment', 'Credit', 'Depository', 'Brokerage', 'Other');

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mask" TEXT,
    "plaidAccountId" TEXT NOT NULL,
    "type" "UserAccountType" NOT NULL,
    "subtype" TEXT,
    "userInstitutionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAccount" ADD FOREIGN KEY ("userInstitutionId") REFERENCES "UserInstitution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
