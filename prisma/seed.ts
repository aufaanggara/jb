import { PrismaClient, Role, ListingStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Buat Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@rekberin.com" },
    update: {},
    create: {
      email: "superadmin@rekberin.com",
      username: "superadmin",
      fullName: "Super Admin Rekberin",
      whatsapp: "081234567890",
      password: await bcrypt.hash("password123", 10),
      role: Role.SUPER_ADMIN,
      isVerified: true,
    },
  });

  // 2. Buat Admin Rekber
  const admin = await prisma.user.upsert({
    where: { email: "admin@rekberin.com" },
    update: {},
    create: {
      email: "admin@rekberin.com",
      username: "admin_rekber",
      fullName: "Admin Rekber 1",
      whatsapp: "081234567891",
      password: await bcrypt.hash("password123", 10),
      role: Role.ADMIN,
      isVerified: true,
      adminProfile: {
        create: {
          bio: "Admin rekber berpengalaman sejak 2024",
          fee: 5000,
          bankAccounts: [
            { bank: "BCA", accountNumber: "1234567890", accountName: "Admin Rekber 1" }
          ],
          activeHours: "08:00 - 22:00",
          trustScore: 95.0,
          totalSuccess: 42,
          isActive: true,
        },
      },
    },
  });

  // 3. Buat Seller (user biasa)
  const seller = await prisma.user.upsert({
    where: { email: "seller@test.com" },
    update: {},
    create: {
      email: "seller@test.com",
      username: "seller_test",
      fullName: "Seller Test",
      whatsapp: "081234567892",
      password: await bcrypt.hash("password123", 10),
      role: Role.USER,
    },
  });

  // 4. Buat Buyer (user biasa)
  const buyer = await prisma.user.upsert({
    where: { email: "buyer@test.com" },
    update: {},
    create: {
      email: "buyer@test.com",
      username: "buyer_test",
      fullName: "Buyer Test",
      whatsapp: "081234567893",
      password: await bcrypt.hash("password123", 10),
      role: Role.USER,
    },
  });

  // 5. Buat Listing contoh
  const listing = await prisma.listing.create({
    data: {
      sellerId: seller.id,
      title: "Akun eFootball Rating 2300 - Full Legends",
      game: "eFootball",
      price: 250000,
      description: "Akun premium dengan koleksi legends lengkap. Sudah main 2 tahun, rating stabil di 2300+.",
      details: {
        rating: 2300,
        totalPlayers: 150,
        legends: ["Messi", "Ronaldo", "Zidane"],
        division: "Division 1",
        platform: "PC",
      },
      images: [],
      status: ListingStatus.AVAILABLE,
      isFeatured: true,
    },
  });

  console.log("✅ Seed selesai!");
  console.log("📋 Akun test:");
  console.log("  superadmin@rekberin.com / password123 [SUPER_ADMIN]");
  console.log("  admin@rekberin.com / password123 [ADMIN]");
  console.log("  seller@test.com / password123 [USER - Seller]");
  console.log("  buyer@test.com / password123 [USER - Buyer]");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
