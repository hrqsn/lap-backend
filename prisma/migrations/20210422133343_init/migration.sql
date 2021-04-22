-- CreateTable
CREATE TABLE "Count" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Count.uid_unique" ON "Count"("uid");
