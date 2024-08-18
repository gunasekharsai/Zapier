-- CreateTable
CREATE TABLE "Zaprun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "Zaprun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Zaprun" ADD CONSTRAINT "Zaprun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
