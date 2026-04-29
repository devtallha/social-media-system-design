-- DropIndex
DROP INDEX "Follows_followerId_idx";

-- DropIndex
DROP INDEX "Follows_followingId_idx";

-- DropIndex
DROP INDEX "Like_postId_idx";

-- CreateIndex
CREATE INDEX "Follows_followerId_createdAt_idx" ON "Follows"("followerId", "createdAt");

-- CreateIndex
CREATE INDEX "Follows_followingId_createdAt_idx" ON "Follows"("followingId", "createdAt");

-- CreateIndex
CREATE INDEX "Like_postId_createdAt_idx" ON "Like"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
