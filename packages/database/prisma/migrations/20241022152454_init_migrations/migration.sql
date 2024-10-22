-- CreateEnum
CREATE TYPE "Units" AS ENUM ('METRIC', 'IMPERIAL');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'NOVICE', 'INTERMEDIATE', 'ADVANCED', 'LEGENDARY', 'GRANDMASTER', 'MASTER', 'EXPERT');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('STRENGTH', 'AEROBIC', 'STRETCHING');

-- CreateEnum
CREATE TYPE "BodyPart" AS ENUM ('BICEPS', 'TRICEPS', 'CHEST', 'HAMSTRINGS', 'ABS', 'BACK', 'QUADS', 'GLUTES', 'SHOULDERS', 'TRAPS', 'FOREARMS', 'ADDUCTORS', 'ABDUCTORS', 'CALF', 'LOWERBACK');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('PUSH', 'PULL', 'CORE', 'LOWER');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FLEXIBILITY', 'STRENGTH', 'CARDIO');

-- CreateTable
CREATE TABLE "TextNotifications" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "time" TIMESTAMPTZ(0) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "TextNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionStatus" TEXT,
    "workoutsPerWeekGoal" INTEGER NOT NULL DEFAULT 3,
    "verifiedAuthor" BOOLEAN NOT NULL DEFAULT false,
    "preferredUnits" "Units" NOT NULL DEFAULT 'IMPERIAL',
    "tier" TEXT NOT NULL DEFAULT 'IGNITE',
    "nextTier" TEXT NOT NULL DEFAULT 'SILVER',
    "multiplier" TEXT NOT NULL DEFAULT 'SINGLE',
    "nextMultiplier" TEXT NOT NULL DEFAULT 'SINGLE',
    "workoutsUntilNextTier" INTEGER NOT NULL DEFAULT 10,
    "totalWorkouts" INTEGER NOT NULL DEFAULT 0,
    "timezoneId" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "profileId" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bodyPart" TEXT,
    "exRxLink" TEXT,
    "mode" "Mode",
    "type" "Type",
    "target" TEXT,
    "classification" TEXT,
    "synergists" TEXT[],
    "stabilizers" TEXT[],
    "dynamicStabilizers" TEXT[],
    "instructions" TEXT,
    "mediaUrl" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseId" TEXT NOT NULL,
    "reps" INTEGER,
    "interval" INTEGER,
    "duration" INTEGER,
    "distance" INTEGER,
    "restPeriod" INTEGER,
    "weight" INTEGER,
    "isInterval" BOOLEAN,
    "dateLogged" TIMESTAMP(3),
    "strengthGroupId" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrengthGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateWorkoutId" TEXT,
    "loggedWorkoutId" TEXT,

    CONSTRAINT "StrengthGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateWorkout" (
    "id" TEXT NOT NULL,
    "letterLabel" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),
    "profileId" TEXT NOT NULL,
    "units" "Units" NOT NULL,
    "splitId" TEXT,

    CONSTRAINT "TemplateWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedWorkout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "letterLabel" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3),
    "profileId" TEXT NOT NULL,
    "units" "Units" NOT NULL,
    "dateLogged" TIMESTAMP(3),
    "splitId" TEXT,

    CONSTRAINT "LoggedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Split" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "cadence" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT NOT NULL,
    "skipDays" INTEGER[],
    "rating" INTEGER,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Split_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveSplit" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "schedule" JSONB,
    "notes" TEXT,
    "splitId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ActiveSplit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EquipmentToExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TextNotifications_phone_key" ON "TextNotifications"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripeCustomerId_key" ON "Profile"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "idx_profile_email" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToExercise_AB_unique" ON "_EquipmentToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToExercise_B_index" ON "_EquipmentToExercise"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToProfile_AB_unique" ON "_EquipmentToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToProfile_B_index" ON "_EquipmentToProfile"("B");

-- AddForeignKey
ALTER TABLE "TextNotifications" ADD CONSTRAINT "TextNotifications_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_strengthGroupId_fkey" FOREIGN KEY ("strengthGroupId") REFERENCES "StrengthGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthGroup" ADD CONSTRAINT "StrengthGroup_templateWorkoutId_fkey" FOREIGN KEY ("templateWorkoutId") REFERENCES "TemplateWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthGroup" ADD CONSTRAINT "StrengthGroup_loggedWorkoutId_fkey" FOREIGN KEY ("loggedWorkoutId") REFERENCES "LoggedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateWorkout" ADD CONSTRAINT "TemplateWorkout_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateWorkout" ADD CONSTRAINT "TemplateWorkout_splitId_fkey" FOREIGN KEY ("splitId") REFERENCES "Split"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedWorkout" ADD CONSTRAINT "LoggedWorkout_splitId_fkey" FOREIGN KEY ("splitId") REFERENCES "Split"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveSplit" ADD CONSTRAINT "ActiveSplit_splitId_fkey" FOREIGN KEY ("splitId") REFERENCES "Split"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveSplit" ADD CONSTRAINT "ActiveSplit_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD CONSTRAINT "_EquipmentToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD CONSTRAINT "_EquipmentToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProfile" ADD CONSTRAINT "_EquipmentToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProfile" ADD CONSTRAINT "_EquipmentToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
