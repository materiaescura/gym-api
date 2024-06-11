-- AlterTable
ALTER TABLE "checkins" RENAME CONSTRAINT "chekins_pkey" TO "checkins_pkey";

-- RenameForeignKey
ALTER TABLE "checkins" RENAME CONSTRAINT "chekins_gym_id_fkey" TO "checkins_gym_id_fkey";

-- RenameForeignKey
ALTER TABLE "checkins" RENAME CONSTRAINT "chekins_user_id_fkey" TO "checkins_user_id_fkey";
