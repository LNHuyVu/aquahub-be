-- ========================================================
-- AQUAHUB SAMPLE DATASEED FOR POSTGRESQL
-- Database: aquahub
-- Mật khẩu tài khoản mẫu (admin/user): 123456
-- ========================================================

-- Enable UUID Extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS SAMPLE DATA
-- Password for all accounts: 123456 (Hash: $2b$10$XKX0uZAdgjGURwbuMKYqae1Wo4vrKGCBALSuEz4fm7qGkcAJtMN9S)
INSERT INTO users (id, username, email, password, "displayName", avatar, bio, role, "isActive", "createdAt", "updatedAt")
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'admin', 'admin@aquahub.vn', '$2b$10$XKX0uZAdgjGURwbuMKYqae1Wo4vrKGCBALSuEz4fm7qGkcAJtMN9S', 'Quản trị viên AquaHub', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', 'Quản trị viên hệ thống AquaHub Việt Nam.', 'ADMIN', true, NOW(), NOW()),
  ('a2222222-2222-2222-2222-222222222222', 'aquaman', 'aquaman@gmail.com', '$2b$10$XKX0uZAdgjGURwbuMKYqae1Wo4vrKGCBALSuEz4fm7qGkcAJtMN9S', 'Minh Thủy Sinh', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Đam mê cá Betta và phong cách thủy sinh Iwagumi.', 'USER', true, NOW(), NOW()),
  ('a3333333-3333-3333-3333-333333333333', 'koi_master', 'koilover@gmail.com', '$2b$10$XKX0uZAdgjGURwbuMKYqae1Wo4vrKGCBALSuEz4fm7qGkcAJtMN9S', 'Bảo Koi Nhật', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 'Chuyên thiết kế hồ Koi sân vườn và tư vấn hệ thống lọc Drum.', 'MODERATOR', true, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET password = EXCLUDED.password;

-- 2. FISH CATEGORIES SAMPLE DATA
INSERT INTO fish_categories (id, name, slug, description, "order", "createdAt")
VALUES 
  ('c1111111-1111-1111-1111-111111111111', 'Cá thủy sinh', 'ca-thuy-sinh', 'Các loài cá kích thước nhỏ, hiền lành thích hợp nuôi hồ thủy sinh', 1, NOW()),
  ('c2222222-2222-2222-2222-222222222222', 'Cá Betta', 'ca-betta', 'Cá chọi Betta với bộ vây rực rỡ và tính cách độc lập', 2, NOW()),
  ('c3333333-3333-3333-3333-333333333333', 'Cá Guppy (Bảy màu)', 'ca-guppy', 'Dòng cá đẻ con phổ biến, màu sắc phong phú', 3, NOW()),
  ('c4444444-4444-4444-4444-444444444444', 'Cá Koi & Cá Vàng', 'ca-koi-ca-vang', 'Các loài cá cảnh phong thủy hồ ngoài trời và bể kính', 4, NOW()),
  ('c5555555-5555-5555-5555-555555555555', 'Cá nước ngọt', 'ca-nuoc-nghot', 'Các loài cá sinh sống trong môi trường nước ngọt thiên nhiên', 5, NOW()),
  ('c6666666-6666-6666-6666-666666666666', 'Tép cảnh', 'tep-canh', 'Các loại tép màu, tép Sulawesi và tép Ong', 6, NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. FISH SAMPLE DATA
INSERT INTO fish (id, slug, "nameVi", "nameEn", "scientificName", images, "categoryId", "sizeMin", "sizeMax", lifespan, difficulty, "tempMin", "tempMax", "phMin", "phMax", "minTankSize", "swimLevel", temperament, diet, "compatibleFish", "incompatibleFish", "commonDiseases", description, "isPublished", "createdAt", "updatedAt")
VALUES 
  ('f1111111-1111-1111-1111-111111111111', 'ca-neon-xanh', 'Cá Neon Xanh', 'Neon Tetra', 'Paracheirodon innesi', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800', 'c1111111-1111-1111-1111-111111111111', 2, 4, '3–5 năm', 'EASY', 21, 27, 6.0, 7.0, 40, 'MIDDLE', 'Hiền lành, bơi theo đàn', 'Cám hạt nhỏ, trùn chỉ, atemia', 'Cá Bảy màu, cá Sọc ngựa, cá Mây trắng, tép cảnh', 'Cá La Hán, cá Rồng, cá Cichlid lớn', 'Bệnh nấm trắng, bệnh Neon Tetra Disease', 'Cá Neon Xanh là loài cá thủy sinh cực kỳ phổ biến nhờ dải màu dạ quang phát sáng quyến rũ dưới ánh đèn hồ cá.', true, NOW(), NOW()),
  
  ('f2222222-2222-2222-2222-222222222222', 'ca-betta-halfmoon', 'Cá Betta Halfmoon', 'Siamese Fighting Fish', 'Betta splendens', 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800', 'c2222222-2222-2222-2222-222222222222', 5, 7, '2–3 năm', 'EASY', 24, 30, 6.5, 7.5, 10, 'TOP', 'Hung dữ với cùng loài đực, độc lập', 'Cám Betta chuyên dụng, lăng quăng, trùn sấy', 'Cá lau kính nhỏ, ốc mút rêu', 'Cá Betta đực khác, cá Bảy màu đực vây dài', 'Thối vây, xù vảy, nấm gòn', 'Cá Betta Halfmoon sở hữu bộ đuôi xòe rộng 180 độ như nửa vầng trăng tuyệt đẹp, là lựa chọn số 1 cho các bể cá để bàn.', true, NOW(), NOW()),
  
  ('f3333333-3333-3333-3333-333333333333', 'ca-guppy-full-red', 'Cá Guppy Full Red', 'Full Red Guppy', 'Poecilia reticulata', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'c3333333-3333-3333-3333-333333333333', 3, 5, '1.5–2 năm', 'EASY', 22, 28, 7.0, 8.0, 20, 'TOP', 'Hiền lành, sinh sản nhanh', 'Cám Thái Inve, Artemia ấp nở', 'Cá Neon, cá Trâm, cá Chuột, tép', 'Cá săn mồi lớn', 'Túm vây, lắc người, nấm', 'Dòng Guppy Full Red nổi tiếng với màu đỏ rực toàn thân từ mắt, vây đến thân, sinh sản dễ dàng.', true, NOW(), NOW()),
  
  ('f4444444-4444-4444-4444-444444444444', 'ca-chuot-panda', 'Cá Chuột Panda', 'Panda Corydoras', 'Corydoras panda', 'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800', 'c1111111-1111-1111-1111-111111111111', 3, 5, '4–6 năm', 'EASY', 20, 25, 6.0, 7.2, 40, 'BOTTOM', 'Hiền lành, dọn thức ăn thừa đáy bể', 'Cám chìm, trùn chỉ, wafer rêu', 'Tất cả các loài cá hiền lành tầng trung và tầng mặt', 'Cá lớn dữ dội', 'Mòn râu do nền sỏi sắc nhọn', 'Cá Chuột Panda có họa tiết vệt đen quanh mắt và vây lưng giống gấu trúc, chuyên dọn sạch thức ăn thừa tầng đáy.', true, NOW(), NOW()),

  ('f5555555-5555-5555-5555-555555555555', 'ca-koi-nhat-kohaku', 'Cá Koi Kohaku', 'Kohaku Nishikigoi', 'Cyprinus rubrofuscus', 'https://images.unsplash.com/photo-1517363898874-d377584290f7?w=800', 'c4444444-4444-4444-4444-444444444444', 20, 80, '25–35 năm', 'MEDIUM', 18, 26, 7.0, 8.5, 1000, 'ALL', 'Thân thiện, nhận diện chủ', 'Cám Koi tăng màu, cám chìm', 'Cá Koi dòng khác, cá Vàng', 'Cá nhỏ (sẽ bị ăn nhầm)', 'Nấm mang, rận cá, xù vảy', 'Dòng Koi Kohaku cổ điển với thân màu trắng tuyết cùng các khoang đỏ rực rỡ phong thủy.', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. TANKS SAMPLE DATA
INSERT INTO tanks (id, name, "ownerId", "coverImage", length, width, height, volume, ph, temperature, "isPublic", description, "createdAt", "updatedAt")
VALUES
  ('t1111111-1111-1111-1111-111111111111', 'Hồ Thủy Sinh Iwagumi 60cm', 'a2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 60, 30, 36, 64.8, 6.8, 25.5, true, 'Bể kính siêu trong chơi nền Trái Đất và trồng thảm ngưu mao chiên.', NOW(), NOW()),
  ('t2222222-2222-2222-2222-222222222222', 'Hồ Koi Sân Vườn 5 Khối', 'a3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1517363898874-d377584290f7?w=800', 300, 200, 100, 5000, 7.5, 24.0, true, 'Hồ Koi ngoài trời tích hợp dàn lọc Drum filter tự động.', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. QUESTIONS SAMPLE DATA
INSERT INTO questions (id, title, slug, content, "authorId", tags, "answersCount", "viewsCount", "isSolved", "createdAt", "updatedAt")
VALUES
  ('q1111111-1111-1111-1111-111111111111', 'Hồ 60x30x36cm nên thả bao nhiêu con cá Neon Xanh là vừa?', 'ho-60x30x36cm-nen-tha-bao-nhieu-con-ca-neon-xanh-la-vua', 'Mình mới setup bể thủy sinh dung tích khoảng 64 lít. Mình muốn nuôi đàn Neon Xanh bơi đàn thì số lượng khoảng bao nhiêu con là hợp lý để không bị bùng nổ vi sinh ạ?', 'a2222222-2222-2222-2222-222222222222', 'Neon,ThủySinh,MậtĐộ', 2, 45, true, NOW(), NOW()),
  ('q2222222-2222-2222-2222-222222222222', 'Cá Betta bị thối vây đuôi xử lý bằng muối hột được không?', 'ca-betta-bi-thoi-vay-duoi-xu-ly-bang-muoi-hot-duoc-khong', 'Bể cá Betta của mình dạo này vây đuôi bị tưa nhẹ và xuất hiện viền trắng. Mình nghe nói ngâm muối hột hoặc ngâm lá bàng có hiệu quả không mọi người?', 'a2222222-2222-2222-2222-222222222222', 'Betta,BệnhCá,LáBàng', 1, 30, false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 6. ARTICLES SAMPLE DATA
INSERT INTO articles (id, title, slug, content, excerpt, "coverImage", "authorId", tags, "viewsCount", "isPublished", "publishedAt", "createdAt", "updatedAt")
VALUES
  ('art11111-1111-1111-1111-111111111111', 'Hướng dẫn khởi tạo hệ vi sinh chuẩn cho hồ cá mới', 'huong-dan-khoi-tao-he-vi-sinh-chuan-cho-ho-ca-moi', 'Khi bắt đầu nuôi cá cảnh, chu trình Nitơ (Nitrogen Cycle) là bước quan trọng nhất quyết định cá sống hay chết...', 'Tìm hiểu 4 bước khởi tạo vi sinh an toàn giúp cá mới không bị sốc nước và ngộ độc khí Ammonia.', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800', 'a1111111-1111-1111-1111-111111111111', 'ViSinh,NướcHồ,CẩmNang', 128, true, NOW(), NOW()),
  ('art22222-2222-2222-2222-222222222222', 'Bí quyết chọn đèn và phân nền chơi hồ thủy sinh', 'bi-quyet-chon-den-va-phan-nen-choi-ho-thuy-sinh', 'Đèn và phân nền là hai yếu tố cốt lõi giúp cây thủy sinh nhả ngọc và duy trì sắc tố đỏ xanh rực rỡ...', 'Kinh nghiệm chọn đèn RGB và chất nền thủy sinh phù hợp cho từng dòng cây cắt cắm.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'a1111111-1111-1111-1111-111111111111', 'ThủySinh,ĐènRGB,ChấtNền', 95, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 7. POSTS SAMPLE DATA
INSERT INTO posts (id, content, images, "authorId", "likesCount", "commentsCount", "isPublished", "createdAt", "updatedAt")
VALUES
  ('p1111111-1111-1111-1111-111111111111', 'Bể Iwagumi tròn 3 tháng tuổi sau khi cắt tỉa ngưu mao chiên lá nhỏ. Mọi người cho mình xin ý kiến nhé! 🌿🐠', '{"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"}', 'a2222222-2222-2222-2222-222222222222', 12, 3, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Complete Notification
SELECT 'AquaHub Sample Data Inserted Successfully!' AS status;
