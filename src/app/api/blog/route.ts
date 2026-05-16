import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { defaultLocale } from "@/i18n/routing";
import { normalizeLocale } from "@/lib/localized-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const locale = normalizeLocale(searchParams.get("locale"));

    const where: Record<string, unknown> = { status: "PUBLISHED", locale };
    if (category) where.category = category;

    let [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          category: true,
          tags: true,
          author: true,
          publishedAt: true,
          readTime: true,
        },
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    if (posts.length === 0 && locale !== defaultLocale) {
      const fallbackWhere = { ...where, locale: defaultLocale };
      [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where: fallbackWhere,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            featuredImage: true,
            category: true,
            tags: true,
            author: true,
            publishedAt: true,
            readTime: true,
          },
          orderBy: { publishedAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.blogPost.count({ where: fallbackWhere }),
      ]);
    }

    return NextResponse.json({ posts, locale, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}
