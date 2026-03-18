import { defineCollection, z } from 'astro:content';

const videoCollection = defineCollection({
  type: 'content', // 表明这是基于 Markdown 的内容
  schema: z.object({
    title: z.string(),
    pubDate: z.date(), // 用于后续判断是否超前发布（倒计时锁定功能）
    cover: z.string(),
    category: z.string(),
    rating: z.number().min(0).max(10).optional(),
    stats: z.object({
      views: z.string().optional(),
      likes: z.string().optional()
    }).optional(),
    platforms: z.object({
      bilibili: z.string().optional(), // 仅填 BV 号
      youtube: z.string().optional(), // 仅填视频 ID
      douyin: z.string().optional(), // 填完整链接
      xiaohongshu: z.string().optional(), // 填完整链接
      local: z.string().optional() // 本地视频路径，仅在无其他平台时兜底使用
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
  'videos': videoCollection, // 注册 videos 集合
};
