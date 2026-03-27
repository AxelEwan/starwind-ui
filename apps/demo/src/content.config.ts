import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// === 你要的视频集合（核心字段已全部加上）===
const videos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),                    // 支持未来日期
    cover: z.string(),
    recommend: z.boolean().optional().default(false),
    enableComments: z.boolean().default(true),
    showRating: z.boolean().default(true),
    hide: z.boolean().optional().default(false),
    category: z.string(),
    intro: z.string(),
    tags: z.array(z.string()).default([]),
    location: z.string().optional(),
    platforms: z.object({
      bilibili: z.string().optional(),   // 只填 BV 号，例如 BV1xx1234abc
      douyin: z.string().optional(),
      xiaohongshu: z.string().optional(),
      youtube: z.string().optional(),
      local: z.string().optional(),      // 本地视频直链
    }).optional(),
    rating: z.number().min(0).max(10).optional(),
    views: z.number().optional().default(0),
    likes: z.number().optional().default(0),
    comments: z.array(z.object({
      avatar: z.string(),
      nickname: z.string(),
      content: z.string(),
    })).optional().default([]),
  }),
});

export const collections = { pages, videos };
