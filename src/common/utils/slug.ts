import slugify from 'slugify';

/**
 * Tự động tạo slug chuẩn SEO từ chuỗi văn bản (hỗ trợ tiếng Việt tốt nhất).
 * 
 * @param text Chuỗi đầu vào (tên loài cá, tiêu đề bài viết, tên danh mục,...)
 * @param fallbackPrefix Tiền tố fallback nếu chuỗi đầu vào rỗng/không hợp lệ
 */
export function createSlug(text: string, fallbackPrefix: string = 'item'): string {
  if (!text || typeof text !== 'string') {
    return `${fallbackPrefix}-${Date.now().toString(36)}`;
  }

  const cleanText = text.trim();
  if (!cleanText) {
    return `${fallbackPrefix}-${Date.now().toString(36)}`;
  }

  const slug = slugify(cleanText, {
    locale: 'vi',
    lower: true,
    strict: true,
    trim: true,
  });

  return slug || `${fallbackPrefix}-${Date.now().toString(36)}`;
}
