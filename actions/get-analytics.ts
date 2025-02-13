import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += 1;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedSales = groupByCourse(purchases);
    const groupedEarnings = groupByCourse(purchases);

    const earningsData = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total:
          total *
          purchases.find((purchase) => purchase.course.title === courseTitle)
            ?.course.price!,
      })
    );

    const salesData = Object.entries(groupedSales).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total: total,
      })
    );

    const totalRevenue = earningsData.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
    const totalSales = purchases.length;

    return {
      earningsData,
      salesData,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      earningsData: [],
      salesData: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
