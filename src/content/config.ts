import { defineCollection, z } from 'astro:content';

const videoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // 使用 z.coerce.date() 强制将字符串转换为日期对象，防止报错
    pubDate: z.coerce.date(), 
    cover: z.string(),
    category: z.string(),
    rating: z.number().min(0).max(10).optional(),
    stats: z.object({
      views: z.string().optional(),
      likes: z.string().optional()
    }).optional(),
    platforms: z.object({
      bilibili: z.string().optional(),
      youtube: z.string().optional(),
      douyin: z.string().optional(),
      xiaohongshu: z.string().optional(),
      local: z.string().optional()
    }).optional(),
    location: z.string().optional(),
    isRecommend: z.boolean().default(false),
    comments: z.array(z.object({
      user: z.string(),
      avatar: z.string().optional(),
      content: z.string()
    })).optional()
  })
});

export const collections = {
  'videos': videoCollection,
};
