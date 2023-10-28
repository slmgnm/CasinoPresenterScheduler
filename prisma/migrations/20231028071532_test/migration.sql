-- CreateTable
CREATE TABLE "Duty" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "gamePresenterId" INTEGER,
    "tableId" INTEGER,
    "breakSlot" BOOLEAN NOT NULL,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);
