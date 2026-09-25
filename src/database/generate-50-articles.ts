export interface ArticleSeedData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  viewsCount: number;
}

export function generate50Articles(): ArticleSeedData[] {
  const images = [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800',
    'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800',
  ];

  const topics = [
    // 1-50
    { title: 'Kỹ thuật Cycle bể cá mới tạo hệ vi sinh chuẩn chỉ sau 7 ngày', tag: 'Chăm sóc bể' },
    { title: 'Cẩm nang nuôi cá Betta rực rỡ vây dài cho người mới bắt đầu', tag: 'Cá Betta' },
    { title: 'Bí quyết nuôi cá Guppy 7 màu sinh sản bầy đàn không lo suy hao', tag: 'Cá Guppy' },
    { title: 'Hướng dẫn điều trị bệnh nấm trắng và nấm mang trên cá cảnh', tag: 'Bệnh cá' },
    { title: 'Cách kiểm soát nồng độ pH và khí độc NH3/NH4 trong bể kính', tag: 'Chất lượng nước' },
    { title: 'Kỹ thuật trồng và chăm sóc cây thủy sinh hậu cảnh phát triển nhanh', tag: 'Thủy sinh' },
    { title: 'Cách phối chọn cá bơi chung tầng mặt, tầng giữa và tầng đáy', tag: 'Kỹ thuật nuôi' },
    { title: 'Hướng dẫn chọn vật liệu lọc nước: Đất nung, Nham thạch, Sứ lọc', tag: 'Thiết bị lọc' },
    { title: 'Bí quyết nuôi tép cảnh Neocaridina lên màu đẹp và đẻ sai', tag: 'Tép cảnh' },
    { title: 'Hướng dẫn nuôi cá Koi trong bể kính sân thượng an toàn chuẩn đẹp', tag: 'Cá Koi' },
    { title: 'Cách thay nước hồ cá định kỳ không làm cá bị sốc nhiệt hoặc sốc pH', tag: 'Thay nước' },
    { title: 'Phương pháp diệt rêu chùm đen và tảo hại bằng giải pháp sinh học', tag: 'Diệt rêu hại' },
    { title: 'Chế độ dinh dưỡng hoàn hảo: Kết hợp cám hạt, trùn chỉ và artemia', tag: 'Dinh dưỡng' },
    { title: 'Hướng dẫn nuôi cá Đĩa (Discus) căng màu, khỏe mạnh không bị nhát', tag: 'Cá Đĩa' },
    { title: 'Cách thiết lập hồ thủy sinh phong cách Iwagumi Nhật Bản', tag: 'Phong cách bể' },
    { title: 'Chăm sóc cá Rồng (Ngân Long, Huyết Long) trong bể kích thước lớn', tag: 'Cá Rồng' },
    { title: 'Hướng dẫn nuôi ốc Nerita dọn sạch rêu hại bám kính hiệu quả', tag: 'Ốc cảnh' },
    { title: 'Cách nhận biết và khắc phục tình trạng bể cá bị đục nước vẩn đục', tag: 'Xử lý nước' },
    { title: 'Hướng dẫn nuôi cá Thần Tiên (Angelfish) sinh sản trong bể thủy sinh', tag: 'Cá Thần Tiên' },
    { title: 'Bí quyết chọn đèn LED thủy sinh giúp cây phát triển quang hợp tốt', tag: 'Thiết bị đèn' },
    { title: 'Cách làm mát nước hồ cá mùa hè tránh cá bị đuối sức và nấm vây', tag: 'Nhiệt độ bể' },
    { title: 'Hướng dẫn tự trộn thức ăn đông lạnh cho cá cảnh dinh dưỡng cao', tag: 'Thức ăn cá' },
    { title: 'Cách chọn bơm lọc thác, lọc thùng phù hợp với thể tích bể', tag: 'Máy lọc' },
    { title: 'Chăm sóc cá Chuột Panda (Corydoras) dọn dẹp thức ăn thừa đáy bể', tag: 'Cá Chuột' },
    { title: 'Hướng dẫn phòng ngừa và điều trị bệnh xù vẩy trên cá cảnh', tag: 'Bệnh cá' },
    { title: 'Bí quyết nuôi cá Neon Xanh bơi đàn cực đẹp trong hồ cây', tag: 'Cá Neon' },
    { title: 'Cách làm sủi oxy bể cá mà không tạo luồng nước quá mạnh', tag: 'Oxy bể cá' },
    { title: 'Hướng dẫn sử dụng CO2 thủy sinh an toàn không làm cá ngộp', tag: 'Khí CO2' },
    { title: 'Cách phân biệt cá trống và cá mái cho các dòng cá cảnh phổ biến', tag: 'Sinh sản' },
    { title: 'Kỹ thuật ép cá Betta sinh sản và chăm sóc bầy cá bột mới nở', tag: 'Ép cá Betta' },
    { title: 'Bí quyết duy trì nước bể cá trong vắt như lavabo sang trọng', tag: 'Mẹo bể cá' },
    { title: 'Cách phòng tránh cá nhảy ra khỏi hồ và lựa chọn nắp đậy bể', tag: 'Bảo vệ hồ' },
    { title: 'Hướng dẫn thuần hóa cá mới mua về tránh sốc nước sủi bọt', tag: 'Thả cá mới' },
    { title: 'Cách kết hợp cá cảnh và tép cảnh nuôi chung không bị ăn thịt', tag: 'Tương thích' },
    { title: 'Hướng dẫn bổ sung vi lượng và canxi cho tép cảnh cứng vỏ', tag: 'Chăm tép' },
    { title: 'Bí quyết chọn cát thạch anh và sỏi trang trí hồ cá an toàn', tag: 'Phân nền' },
    { title: 'Cách trị nấm vây và thối đuôi bằng muối hột liều lượng chuẩn', tag: 'Mẹo chữa bệnh' },
    { title: 'Hướng dẫn nuôi cá La Hán lên đầu gù đẹp và sung mãn', tag: 'Cá La Hán' },
    { title: 'Bí quyết trồng rêu Java và rêu US Fissiden bám đá cổ thụ', tag: 'Rêu thủy sinh' },
    { title: 'Cách quản lý lượng thức ăn dư thừa tránh ô nhiễm nền hồ', tag: 'Vệ sinh bể' },
    { title: 'Hướng dẫn nuôi cá Vàng Ranchu đầu l Lionhead tròn mập dễ thương', tag: 'Cá Vàng' },
    { title: 'Cách vận hành hệ thống lọc tràn dưới Sump bể cá lớn', tag: 'Lọc Sump' },
    { title: 'Bí quyết tạo bố cục Hà Lan (Dutch Style) rực rỡ nhiều sắc màu', tag: 'Bố cục bể' },
    { title: 'Hướng dẫn điều trị cá bị đường ruột, bỏ ăn và đi phân trắng', tag: 'Bệnh ruột cá' },
    { title: 'Cách chọn chân kệ hồ cá chịu lực an toàn chống cong vênh', tag: 'Thiết bị hồ' },
    { title: 'Hướng dẫn nuôi cá Sặc Gấm (Gourami) đa sắc màu hiền lành', tag: 'Cá Sặc' },
    { title: 'Cách sử dụng cây sưởi bể cá mùa đông tránh giật điện an toàn', tag: 'Sưởi bể cá' },
    { title: 'Bí quyết nuôi cá Trâm (Boraras) tí hon bơi đàn hàng trăm con', tag: 'Cá Trâm' },
    { title: 'Hướng dẫn làm hồ cá mini để bàn làm việc giảm stress hiệu quả', tag: 'Hồ mini' },
    { title: 'Tổng hợp 10 lỗi sai phổ biến của người mới chơi cá cảnh cần tránh', tag: 'Lỗi thường gặp' },

    // 51-100
    { title: 'Bí quyết nuôi cây Thủy Cúc và Trúc Thủy Sinh mọc vươn cao rực rỡ', tag: 'Cây thủy sinh' },
    { title: 'Cách trị triệt để bệnh chướng bụng đốm đỏ ở cá vàng Ranchu và Oranda', tag: 'Trị bệnh cá' },
    { title: 'Kỹ thuật trồng cây Cỏ Thìa và Trân Châu Ngọc Bảo làm thảm nền siêu xanh', tag: 'Thảm thủy sinh' },
    { title: 'Bí quyết chọn đèn quang hợp RGB giúp cây thủy sinh lên màu đỏ đậm', tag: 'Đèn thủy sinh' },
    { title: 'Hướng dẫn tự chế lọc vi sinh Bio handmade hiệu quả chi phí 20k', tag: 'Lọc chế' },
    { title: 'Cách phân biệt và loại bỏ bọ nước, thủy tức hại tép trong bể kính', tag: 'Tép cảnh' },
    { title: 'Chăm sóc cá Ali châu Phi (Cichlid) màu sắc sặc sỡ năng động', tag: 'Cá Ali' },
    { title: 'Bí quyết thuần dưỡng cá Mây Trắng (White Cloud) khỏe mạnh mùa lạnh', tag: 'Cá Mây Trắng' },
    { title: 'Hướng dẫn nuôi cá Nô Lệ (Siamese Algae Eater) dọn sạch rêu tóc rêu chùm', tag: 'Cá dọn bể' },
    { title: 'Cách căn chỉnh độ cứng GH và KH chuẩn cho bể tép lạnh Caridina', tag: 'Thông số nước' },
    { title: 'Hướng dẫn làm lũa bonsai gắn rêu thủy sinh tạo cảnh quan rừng thu nhỏ', tag: 'Lũa thủy sinh' },
    { title: 'Cách khắc phục tình trạng cá bị đục mắt và lở loét thân', tag: 'Bệnh mắt cá' },
    { title: 'Phương pháp ươm cá con mới nở bằng con Bọ Nước Artemia ấp tươi', tag: 'Thức ăn cá bột' },
    { title: 'Hướng dẫn nuôi cá Cánh Buồm Dạ Quang bơi đàn rực rỡ dưới đèn neon', tag: 'Cá Cánh Buồm' },
    { title: 'Kỹ thuật chọn lũa Đỗ Quyên, lũa Linh Sam không làm đen nước bể', tag: 'Lũa cảnh' },
    { title: 'Cách trị rêu xanh bám kính bằng vi sinh và cua cảnh mini', tag: 'Diệt tảo bám' },
    { title: 'Bí quyết chăm sóc Dương Xỉ Mỹ Nhân và Dương Xỉ Trắc Bá bám đá', tag: 'Dương xỉ' },
    { title: 'Hướng dẫn nuôi cá Phượng Hoàng Lam (German Blue Ram) sinh sản', tag: 'Cá Phượng Hoàng' },
    { title: 'Cách cài đặt van điện CO2 hẹn giờ chuẩn khung giờ bật đèn', tag: 'Phụ kiện CO2' },
    { title: 'Kỹ thuật nuôi cá Neon Vua (Cardinal Tetra) sống thọ trên 3 năm', tag: 'Cá Neon Vua' },
    { title: 'Bí quyết chọn đất nền Aqua Soil duy trì dinh dưỡng bền lâu 2 năm', tag: 'Phân nền' },
    { title: 'Hướng dẫn xử lý rêu chùm đen Black Brush Algae bằng oxy già', tag: 'Mẹo diệt rêu' },
    { title: 'Cách nuôi cá Hồng Két đỏ tươi căng bôi không bị phai màu', tag: 'Cá Hồng Két' },
    { title: 'Kỹ thuật cắt tỉa cây Ráy Anubias không làm thối củ trôi nền', tag: 'Cây Ráy' },
    { title: 'Hướng dẫn sử dụng lọc phụ chứa bông ngăn cặn bẩn vào lọc chính', tag: 'Lọc thùng' },
    { title: 'Cách phòng tránh cá bị trúng độc thuốc trừ sâu từ cây thủy sinh mới mua', tag: 'An toàn bể' },
    { title: 'Kỹ thuật nuôi cá Bảy Màu Dumbo vây tai bướm bơi uyển chuyển', tag: 'Cá Guppy Dumbo' },
    { title: 'Bí quyết chọn đá Da Voi, đá Trầm Hương cho bố cục núi non', tag: 'Đá thủy sinh' },
    { title: 'Hướng dẫn nuôi tép Ong Đỏ (Crystal Red Shrimp) lên màu sứ cực chuẩn', tag: 'Tép Ong' },
    { title: 'Cách khắc phục sự cố cúp điện đột ngột cho hồ cá cảnh đông đúc', tag: 'Xử lý sự cố' },
    { title: 'Bí quyết nuôi cá Ngựa Vằn Dạ Quang khỏe mạnh sống dai', tag: 'Cá Ngựa Vằn' },
    { title: 'Hướng dẫn sử dụng vitamin C và khoáng chất tổng hợp cho bể cá', tag: 'Dinh dưỡng cá' },
    { title: 'Cách phòng bệnh giun tròn parasite bám mang cá rồng và cá koi', tag: 'Ký sinh trùng' },
    { title: 'Kỹ thuật trồng cây Tiêu Thảo (Cryptocoryne) không bị thối lá mượt mà', tag: 'Cây Tiêu Thảo' },
    { title: 'Bí quyết nuôi cá Tam Giác (Harlequin Rasbora) bơi đàn nhịp nhàng', tag: 'Cá Tam Giác' },
    { title: 'Hướng dẫn cách làm lọc vách hồ cá âm kính siêu thẩm mỹ', tag: 'Lọc vách' },
    { title: 'Cách trị cá bơi nghiêng, mất thăng bằng do lật bóng hơi (Swim Bladder)', tag: 'Bệnh bóng hơi' },
    { title: 'Bí quyết phối cảnh bể Biotop mô phỏng dòng sông Amazon tự nhiên', tag: 'Phong cách Biotop' },
    { title: 'Hướng dẫn nuôi cá Kim Long Quá Bối ánh kim vảy rực rỡ', tag: 'Cá Rồng Quá Bối' },
    { title: 'Cách tạo dòng chảy nhẹ nhàng trong bể thủy sinh nuôi cá vây dài', tag: 'Dòng chảy bể' },
    { title: 'Kỹ thuật gieo hạt mầm thủy sinh làm thảm nền xanh mát', tag: 'Hạt mầm nền' },
    { title: 'Hướng dẫn nuôi ốc Sát Thủ (Anentome Helena) diệt ốc hại cực nhạy', tag: 'Ốc diệt ốc hại' },
    { title: 'Cách nhận biết cá bị nhiễm vi khuẩn columnaris và cách cấp cứu', tag: 'Bệnh vi khuẩn' },
    { title: 'Bí quyết giữ nước bể luôn có độ trong suốt như không khí', tag: 'Độ trong nước' },
    { title: 'Hướng dẫn nuôi cá Mún Đỏ, cá Kiếm Đỏ sinh sản siêu nhanh', tag: 'Cá Mún' },
    { title: 'Cách chọn máy sủi oxy tích điện dự phòng rủi ro mất điện', tag: 'Sủi tích điện' },
    { title: 'Kỹ thuật nhân giống Rêu Xơ Dừa và Rêu Mini Taiwan bám lưới inox', tag: 'Gắn rêu' },
    { title: 'Hướng dẫn nuôi cá Két Panda mini dễ thương thân thiện', tag: 'Cá Panda' },
    { title: 'Cách dọn dẹp cặn phân cá bằng ống hút phân thủ công tiện lợi', tag: 'Vệ sinh bể' },
    { title: 'Bí quyết chơi hồ cá phong cách Wabi-Kusa nghệ thuật độc đáo', tag: 'Wabi-Kusa' },

    // 101-150
    { title: 'Kỹ thuật nuôi cá Betta Cống (Wild Betta) giữ bản tính nguyên bản', tag: 'Cá Betta Hoang Dã' },
    { title: 'Cách kiểm soát nồng độ Nitrate NO3 giúp cá rồng phát triển vảy', tag: 'Chất lượng nước' },
    { title: 'Bí quyết trồng cây Bucephalandra lên màu tím metallic quý hiếm', tag: 'Bucep' },
    { title: 'Hướng dẫn nuôi tép SuLaWeSi trong nước kiềm pH 8.0 chuẩn Indonesia', tag: 'Tép Sulawesi' },
    { title: 'Cách trị bệnh rùng mình, lắc đầu ở cá bảy màu Guppy cực nhạy', tag: 'Trị bệnh Guppy' },
    { title: 'Bí quyết chọn đèn UV diệt rêu xanh nước và vi khuẩn gây bệnh', tag: 'Đèn UV' },
    { title: 'Hướng dẫn làm tiểu cảnh thác nước chảy bằng cát trong bể kính', tag: 'Thác cát' },
    { title: 'Cách nuôi cá Thần Tiên Ai Cập (Altum Angelfish) đắt giá chuẩn kỹ thuật', tag: 'Cá Altum' },
    { title: 'Phương pháp nuôi trùng huyết (Bloodworm) và artemia tươi tại nhà', tag: 'Thức ăn tươi' },
    { title: 'Cách nhận biết và trị đỉa nước, giun trắng bám thành bể', tag: 'Trị giun nước' },
    { title: 'Kỹ thuật nuôi cá Phát Tài (Gourami Giant) ăn rau xanh cực sung', tag: 'Cá Phát Tài' },
    { title: 'Bí quyết thiết kế hệ thống cấp thoát nước tự động Auto Water Change', tag: 'Hệ thống tự động' },
    { title: 'Hướng dẫn chọn lọc Matrix, Nham thạch đỏ cho lọc thùng đắt tiền', tag: 'Vật liệu lọc' },
    { title: 'Cách nuôi cá Sọc Ngựa Cánh Buồm trong hồ thủy sinh mở', tag: 'Cá bơi đàn' },
    { title: 'Bí quyết xử lý rễ cây lũa bị nấm trắng bám sương mù', tag: 'Xử lý lũa mới' },
    { title: 'Hướng dẫn cách ép cá Koi đẻ trứng trên xơ dừa sân vườn', tag: 'Sinh sản cá Koi' },
    { title: 'Cách dùng lá đàng (lá bàng khô) tạo màu nước trà tốt cho cá Betta', tag: 'Lá bàng' },
    { title: 'Bí quyết chăm sóc cây Hẹ Thủy Sinh và Rau Đắng Biển hậu cảnh', tag: 'Cây hậu cảnh' },
    { title: 'Hướng dẫn chữa trị cá bị tổn thương mắt do va đập phụ kiện', tag: 'Cấp cứu cá' },
    { title: 'Cách phân biệt tép Rili Red, tép Cam và tép Socola thuần chủng', tag: 'Phân loại tép' },
    { title: 'Kỹ thuật nuôi cá Chuột Pygmy tí hon siêu đáng yêu bơi theo đàn', tag: 'Cá Chuột Pygmy' },
    { title: 'Bí quyết chọn cám thái Inve N5/N8 hạt mịn cho cá con ăn', tag: 'Cám cá con' },
    { title: 'Hướng dẫn gắn cây Dương Xỉ Lá Táo bám thân cây lũa tự nhiên', tag: 'Gắn dương xỉ' },
    { title: 'Cách hạ độ cứng dGH cho bể nuôi cá đĩa đẻ trứng', tag: 'Nước mềm' },
    { title: 'Bí quyết nuôi cá Thủy Tinh (Glass Catfish) trong suốt như pha lê', tag: 'Cá Thủy Tinh' },
    { title: 'Hướng dẫn làm sưởi bể cá bọc nhựa chống nổ vỡ an toàn cho trẻ em', tag: 'Sưởi an toàn' },
    { title: 'Cách phòng rêu vi khuẩn Lam (Cyanobacteria) bám thảm nền bốc mùi', tag: 'Diệt vi khuẩn lam' },
    { title: 'Kỹ thuật nuôi cá Đĩa Dã Ngoại (Heckel Discus) sống khỏe', tag: 'Cá Đĩa hoang dã' },
    { title: 'Bí quyết làm bộ trộn CO2 cánh quạt hòa tan 100% lượng khí', tag: 'Trộn CO2' },
    { title: 'Hướng dẫn nuôi cá Hổ Indonesia (Indo Tigerfish) lên vạch nét căng', tag: 'Cá Hổ' },
    { title: 'Cách nuôi cá Bống Vàng dọn rêu hại và thức ăn thừa đáy bể', tag: 'Cá Bống Vàng' },
    { title: 'Bí quyết bón phân nước vi lượng Iron & Potassium cho cây thủy sinh', tag: 'Phân nước' },
    { title: 'Hướng dẫn trị nấm ruột và nấm thân cho cá rồng huyết long', tag: 'Chữa cá Rồng' },
    { title: 'Cách chọn quạt làm mát 4 quạt siêu êm giảm 3 độ C cho hồ thủy sinh', tag: 'Quạt làm mát' },
    { title: 'Kỹ thuật nuôi cá Cichlid Nam Mỹ vàng rực rỡ năng động', tag: 'Cá Cichlid' },
    { title: 'Bí quyết gieo rêu Riccia làm thảm nhả bọt khí nhả oxy lấp lánh', tag: 'Rêu nhả oxy' },
    { title: 'Hướng dẫn chăm sóc tép Cảnh Amano dọn rêu chùm bá đạo nhất', tag: 'Tép Amano' },
    { title: 'Cách làm mát hồ cá ngày nắng nóng bằng chai đá đông lạnh', tag: 'Mẹo làm mát' },
    { title: 'Bí quyết ép cá Thần Tiên đẻ trên giá thể đĩa gốm', tag: 'Ép cá Thần Tiên' },
    { title: 'Hướng dẫn cách làm lọc dàn mưa Bakki Shower cho bể cá Koi', tag: 'Lọc Bakki' },
    { title: 'Cách nhận biết cá bị chấn thương do đâm lấn lãnh thổ', tag: 'Tập tính cá' },
    { title: 'Kỹ thuật trồng cây La Hán Xanh và La Hán Đỏ ngập nước', tag: 'Cây La Hán' },
    { title: 'Bí quyết chọn mua máy đo độ pH điện tử chính xác', tag: 'Thiết bị đo' },
    { title: 'Hướng dẫn nuôi cá Sọc Ngựa Dạ Quang đỏ rực trong bể mini', tag: 'Cá Ngựa Dạ Quang' },
    { title: 'Cách khắc phục bọt khí li ti bám thành bể sau khi mới thay nước', tag: 'Hiện tượng nước' },
    { title: 'Bí quyết nuôi tép Mũi Đỏ (Red Nose Shrimp) diệt tảo lam cực đỉnh', tag: 'Tép Mũi Đỏ' },
    { title: 'Hướng dẫn cách ghép lũa đá tạo chiều sâu hông hút thị giác', tag: 'Bố cục sâu' },
    { title: 'Cách phòng tránh cháy nổ cây sưởi khi rút cạn nước vệ sinh bể', tag: 'An toàn sưởi' },
    { title: 'Bí quyết nuôi cá Betta Giant khổng lồ thân dài 8cm', tag: 'Betta Khổng Lồ' },
    { title: 'Hướng dẫn tổng vệ sinh toàn bộ hồ thủy sinh định kỳ 6 tháng', tag: 'Vệ sinh định kỳ' },

    // 151-200
    { title: 'Kỹ thuật nuôi cá Hạc Dải (Hatchetfish) bơi sát mặt nước độc lạ', tag: 'Cá Hạc Dải' },
    { title: 'Cách nâng độ pH nước giếng khoan bằng san hô vụn và vỏ sò', tag: 'Tăng pH' },
    { title: 'Bí quyết trồng cây Tân Đế Tài Hồng màu đỏ thẩm sang trọng', tag: 'Cây đỏ' },
    { title: 'Hướng dẫn nuôi cá Sấu Hỏa Lực (Garfish) trong hồ cảnh đại', tag: 'Cá Sấu Hỏa Lực' },
    { title: 'Cách trị cá bảy màu bị quăn đuôi, túm vây bằng tetra Nhật', tag: 'Tetra Nhật' },
    { title: 'Bí quyết chọn mua muối sinh học chuyên dụng dành cho hồ cá cảnh', tag: 'Muối sinh học' },
    { title: 'Hướng dẫn cách làm lọc chế bằng chai nhựa đơn giản cho học sinh', tag: 'Mẹo học sinh' },
    { title: 'Cách chăm sóc cây Bắp Cải Thủy Sinh nổi bồng bềnh che nắng', tag: 'Cây nổi' },
    { title: 'Kỹ thuật nuôi cá Neon Kim Cương phản quang óng ánh', tag: 'Cá Neon Kim Cương' },
    { title: 'Bí quyết loại bỏ lớp màng váng dầu floating trên mặt nước hồ', tag: 'Xử lý váng dầu' },
    { title: 'Hướng dẫn nuôi ốc Táo Đỏ, ốc Táo Vàng dọn thức ăn thừa', tag: 'Ốc Táo' },
    { title: 'Cách trị bệnh đốm trắng trắng xóa khắp người cá (White Spot Ich)', tag: 'Bệnh đốm trắng' },
    { title: 'Bí quyết nuôi cá Pleco Plecostomus dọn bể dài 30cm', tag: 'Cá Pleco' },
    { title: 'Kỹ thuật trồng cây Rong đuôi chó và Rong la hán phát triển tự do', tag: 'Rong thủy sinh' },
    { title: 'Hướng dẫn bổ sung khoáng tép Liquid GH+ cho tép sinh sản tốt', tag: 'Khoáng tép' },
    { title: 'Cách tạo hệ vi sinh ổn định bằng men vi sinh dạng bột ExtraBio', tag: 'Men vi sinh' },
    { title: 'Bí quyết nuôi cá Chuột Mỹ (Clown Loach) hoa văn da sọc cam đen', tag: 'Cá Chuột Mỹ' },
    { title: 'Hướng dẫn cách cắt tỉa thảm cỏ trân châu mọc dày quá mức', tag: 'Tỉa thảm cỏ' },
    { title: 'Cách chọn máy bơm chìm tiết kiệm điện năng cho bể cá chạy 24h', tag: 'Bơm tiết kiệm' },
    { title: 'Bí quyết nuôi cá Tai Kính (Mono Fish) thích nghi nước lợ và ngọt', tag: 'Cá Tai Kính' },
    { title: 'Hướng dẫn nuôi cây Bèo Nhật dọn nitrate làm sạch nước cực nhanh', tag: 'Bèo Nhật' },
    { title: 'Cách sơ cứu cá bị văng ra khỏi bể khô vây phục hồi sức sống', tag: 'Sơ cứu cá' },
    { title: 'Kỹ thuật nuôi cá Betta Koi Dumbo phối sắc màu ấn tượng', tag: 'Betta Koi' },
    { title: 'Bí quyết giữ nhiệt độ nước hồ cá luôn ở mức 26 độ C chuẩn chỉ', tag: 'Ổn định nhiệt' },
    { title: 'Hướng dẫn cách làm chân đôn bê tông giả gỗ cho bể cá sân vườn', tag: 'Chân kệ bể' },
    { title: 'Cách phòng bệnh nấm thân cho cá bảy màu vào mùa mưa kéo dài', tag: 'Bệnh mùa mưa' },
    { title: 'Bí quyết nuôi cá Thần Tiên Đen Kim Sa vây chảy dài quý phái', tag: 'Thần Tiên Đen' },
    { title: 'Hướng dẫn cách đặt vị trí hồ cá theo phong thủy thu hút tài lộc', tag: 'Phong thủy hồ cá' },
    { title: 'Cách chọn bộ tép cảnh Neocaridina Mix nhiều màu rực rỡ', tag: 'Tép Mix' },
    { title: 'Kỹ thuật trồng cây Xà Lách Nước làm giá thể cá đẻ trứng', tag: 'Cây đẻ trứng' },
    { title: 'Bí quyết nuôi cá Koi Mini trong bể kính phòng khách sang trọng', tag: 'Koi Mini' },
    { title: 'Hướng dẫn cách nhận biết nước bể cá bị nhiễm chì và kim loại nặng', tag: 'Kim loại nặng' },
    { title: 'Cách trị cá bị thối mang gãy vây bằng lá bàng đun sôi', tag: 'Trị nấm tự nhiên' },
    { title: 'Bí quyết nuôi cá Hồng Nhung (Serpae Tetra) vây đỏ đậm', tag: 'Cá Hồng Nhung' },
    { title: 'Hướng dẫn chăm sóc cây Dương Xỉ Lá Hẹp bám lũa đá cổ điển', tag: 'Dương xỉ lá hẹp' },
    { title: 'Cách lắp đặt công tắc hẹn giờ Timer cơ tự động tắt mở đèn bể', tag: 'Timer tự động' },
    { title: 'Bí quyết nuôi cá Cánh Buồm Hồng Dạ Quang siêu kute', tag: 'Cánh Buồm Hồng' },
    { title: 'Hướng dẫn cách chọn sứ thanh hoa mai chứa vi sinh mật độ cao', tag: 'Sứ lọc hoa mai' },
    { title: 'Cách trị cá bị bỏ ăn do căng thẳng khi vận chuyển đường xa', tag: 'Cá bị stress' },
    { title: 'Bí quyết trồng cây Sao Nhỏ (Pogostemon helferi) mọc hình ngôi sao', tag: 'Cây Sao Nhỏ' },
    { title: 'Hướng dẫn nuôi cá Betta Cảnh trong hũ thủy tinh tròn nghệ thuật', tag: 'Betta Hũ' },
    { title: 'Cách duy trì độ pH ổn định 7.0 cho hồ nuôi nhiều dòng cá hỗn hợp', tag: 'pH chuẩn' },
    { title: 'Bí quyết chọn mua nhíp gấp thủy sinh inox 27cm chuyên dụng', tag: 'Dụng cụ thủy sinh' },
    { title: 'Hướng dẫn nuôi cá Ali Thái Vàng óng ánh bơi lội khỏe mạnh', tag: 'Ali Thái' },
    { title: 'Cách xử lý bể cá mới mua dính mùi keo silicon độc hại', tag: 'Khử mùi silicon' },
    { title: 'Bí quyết nuôi cá Rồng Ngân Long khỏe mạnh mượt mà vảy bạc', tag: 'Cá Ngân Long' },
    { title: 'Hướng dẫn cách làm đất nền trộn thủ công nuôi cây thủy sinh 3 năm', tag: 'Nền trộn' },
    { title: 'Cách phòng tránh cá bị đuối nước do thiếu oxy về đêm', tag: 'Oxy đêm' },
    { title: 'Bí quyết nuôi cá Bảy Màu Dumbo Mosaic đuôi xòe quạt quyến rũ', tag: 'Guppy Mosaic' },
    { title: 'Tổng hợp 50 kinh nghiệm đắt giá nhất của các nghệ nhân AquaHub', tag: 'Kinh nghiệm tổng hợp' },
  ];

  return topics.map((t, idx) => {
    const slug = t.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') + `-${idx + 1}`;

    const coverImage = images[idx % images.length];

    const content = buildDetailedArticleContent(t);

    return {
      title: t.title,
      slug,
      excerpt: buildExcerpt(t),
      content,
      coverImage,
      tags: [t.tag, 'Cẩm nang nuôi cá', 'AquaHub Guide'],
      viewsCount: Math.floor(Math.random() * 1250) + 180,
    };
  });
}

function buildExcerpt(t: { title: string; tag: string }): string {
  return `Cẩm nang hướng dẫn chi tiết về ${t.title.toLowerCase()}. Tổng hợp thông số môi trường chuẩn, các bước chăm sóc và kinh nghiệm thực chiến từ các nghệ nhân AquaHub.`;
}

function buildDetailedArticleContent(t: { title: string; tag: string }): string {
  const lowerTitle = t.title.toLowerCase();
  const lowerTag = t.tag.toLowerCase();

  // 1. Nhóm Bệnh cá & Trị bệnh
  if (lowerTitle.includes('bệnh') || lowerTitle.includes('trị') || lowerTitle.includes('nấm') || lowerTitle.includes('cấp cứu') || lowerTag.includes('bệnh') || lowerTag.includes('trị')) {
    return `
      <h2>1. Tổng quan về hiện tượng và nguyên nhân gây bệnh</h2>
      <p>Trong quá trình chăm sóc bể cá cảnh, <strong>${t.title}</strong> là một trong những vấn đề nguy hiểm đòi hỏi người chơi phải phát hiện và xử lý kịp thời. Nguyên nhân hàng đầu thường bắt nguồn từ suy giảm chất lượng nước, biến động nhiệt độ đột ngột hoặc môi trường chứa vi khuẩn/ký sinh trùng tích tụ lâu ngày.</p>
      
      <div style="background-color: #f8fafc; border-left: 4px solid #ef4444; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
        <strong style="color: #dc2626;">Dấu hiệu nhận biết sớm:</strong>
        <ul style="margin-top: 8px; margin-bottom: 0;">
          <li>Cá có biểu hiện bỏ ăn, bơi lờ đờ sát mặt nước hoặc ẩn nấp ở góc tối.</li>
          <li>Thân thể có đốm trắng, vệt đỏ, xù vảy, thối đuôi hoặc lớp màng nhầy bám bất thường.</li>
          <li>Cá hay cọ mình vào thân lũa, đá hoặc thành bể để gãi ngứa.</li>
        </ul>
      </div>

      <h2>2. Thông số môi trường lý tưởng khi điều trị</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <thead>
          <tr style="background-color: #0b74e5; color: white;">
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Thông số</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Mức điều trị chuẩn</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Ghi chú chuyên môn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Nhiệt độ nước</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>28°C - 30°C</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Sử dụng sưởi để ức chế sự phát triển của vi khuẩn/nấm.</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Nồng độ muối hột</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>1‰ - 3‰ (1-3g/lít)</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Giúp sát trùng nhẹ và giảm áp suất thẩm thấu cho cá.</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Thay nước định kỳ</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>20% - 30% mỗi ngày</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Hút sạch phân cặn và làm giảm mật độ mầm bệnh trong nước.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Quy trình 4 bước xử lý dứt điểm</h2>
      <ol style="line-height: 1.8;">
        <li><strong>Bước 1 - Cách ly cá bệnh:</strong> Chuyển cá sang bể dưỡng (bể hospital) để tránh lây nhiễm cho các cá thể khỏe mạnh khác.</li>
        <li><strong>Bước 2 - Điều chỉnh sưởi & sủi oxy:</strong> Bật cây sưởi ở nhiệt độ 29°C - 30°C và đánh sủi oxy thật mạnh vì nước nóng chứa ít oxy hơn.</li>
        <li><strong>Bước 3 - Sử dụng thuốc chuyên dụng:</strong> Đánh thuốc theo đúng liều lượng chỉ định (Bio-Knock, Tetra Nhật, Muối hột hoặc Oxy già tùy theo loại bệnh).</li>
        <li><strong>Bước 4 - Phục hồi hệ vi sinh:</strong> Sau 3-5 ngày điều trị khi cá đã khỏe lại, tiến hành lọc bằng than hoạt tính và bổ sung men vi sinh tươi ExtraBio/Bio-Clean.</li>
      </ol>

      <blockquote>
        "Phòng bệnh luôn tốt hơn chữa bệnh. Việc duy trì hệ vi sinh ổn định và không cho cá ăn quá nhiều là chìa khóa giúp cá luôn có sức đề kháng cao nhất."
      </blockquote>
    `;
  }

  // 2. Nhóm Tép cảnh & Ốc
  if (lowerTitle.includes('tép') || lowerTitle.includes('óc') || lowerTag.includes('tép') || lowerTag.includes('óc')) {
    return `
      <h2>1. Giới thiệu dòng tép/ốc và đặc tính sinh học</h2>
      <p>Thú chơi tép cảnh và ốc cảnh đang trở thành xu hướng cực kỳ phổ biến nhờ màu sắc bắt mắt và khả năng dọn dẹp hệ sinh thái vô cùng tuyệt vời. <strong>${t.title}</strong> đòi hỏi người chơi hiểu rõ đặc tính độ cứng của nước cũng như khoáng chất để tép/ốc phát triển khỏe mạnh và sinh sản tốt.</p>

      <h2>2. Bảng thông số nước chuẩn cho tép & ốc cảnh</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <thead>
          <tr style="background-color: #10b981; color: white;">
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Chỉ số nước</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Ngưỡng an toàn</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Tác dụng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Độ pH</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>6.0 - 7.5</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Duy trì sự ổn định tế bào da vỏ.</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Độ cứng gH / kH</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>gH: 4 - 8 | kH: 1 - 4</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Cung cấp Ca/Mg giúp tép lột vỏ không bị hở cổ.</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Nhiệt độ tối ưu</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>22°C - 26°C</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Nhiệt độ mát mẻ giúp màu sắc tép lên căng nhất.</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Chỉ số TDS</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>120 - 180 ppm</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Đo lường hàm lượng tổng chất rắn hòa tan.</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Chế độ dinh dưỡng & Bí quyết lột vỏ an toàn</h2>
      <ul>
        <li><strong>Thức ăn chính:</strong> Cám tép chuyên dụng chứa tảo Spirulina, đạm thực vật và khoáng chất tổng hợp.</li>
        <li><strong>Bổ sung lá cây:</strong> Lá dâu tằm luộc sơ, lá bàng khô giúp tạo màng biofilm tự nhiên cho tép con ăn liên tục.</li>
        <li><strong>Châm khoáng định kỳ:</strong> Sử dụng khoáng nước Liquid GH+ khi thay nước RO để đảm bảo gH ổn định.</li>
      </ul>

      <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
        <strong style="color: #047857;">Mẹo nuôi thực chiến từ AquaHub:</strong>
        <p style="margin-top: 6px; margin-bottom: 0;">Tuyệt đối không sử dụng hóa chất diệt muỗi, nước xịt phòng hoặc thuốc chứa Đồng (Copper) gần khu vực hồ tép vì Đồng là chất cực độc làm tép chết hàng loạt chỉ trong vài phút!</p>
      </div>
    `;
  }

  // 3. Nhóm Thủy sinh, Rêu & Cây trồng
  if (lowerTitle.includes('thủy sinh') || lowerTitle.includes('cây') || lowerTitle.includes('rêu') || lowerTitle.includes('bố cục') || lowerTag.includes('thủy sinh') || lowerTag.includes('rêu')) {
    return `
      <h2>1. Tổng quan nghệ thuật & Phong cách setup</h2>
      <p>Thiết lập một bể thủy sinh hoàn chỉnh không chỉ đơn thuần là trồng cây vào phân nền mà là sự kết hợp nghệ thuật giữa ánh sáng, dưỡng chất, dòng chảy và khí CO2. <strong>${t.title}</strong> sẽ mang tới không gian xanh mát và hệ sinh thái thu nhỏ sống động ngay trong căn phòng của bạn.</p>

      <h2>2. Yếu tố cốt lõi giúp cây thủy sinh phát triển rực rỡ</h2>
      <ol style="line-height: 1.8;">
        <li><strong>Ánh sáng chuẩn quang hợp:</strong> Sử dụng đèn LED thủy sinh chuyên dụng (WRGB) mở từ 6 - 8 tiếng mỗi ngày (có thể chia làm 2 nhịp chiếu sáng để hạn chế rêu hại).</li>
        <li><strong>Hệ thống CO2 hòa tan:</strong> Cung cấp CO2 liên tục với mật độ 1 - 3 giọt/giây giúp cây nhả oxy lấp lánh và lên màu đậm đà.</li>
        <li><strong>Cốt nền & Đất nền:</strong> Sử dụng đất nền công nghiệp (Aqua Soil) kết hợp phân nước vi lượng (Fe, K) khi cây đã cắm rễ ổn định sau 2 tuần.</li>
        <li><strong>Dòng chảy nhẹ nhàng:</strong> Giúp luân chuyển dinh dưỡng và CO2 tới từng kẽ lá mà không làm tróc gốc cây mới cắm.</li>
      </ol>

      <h2>3. Quy trình cắt tỉa & Chăm sóc định kỳ</h2>
      <p>Sau 3-4 tuần setup, cây cắt cắm sẽ phát triển cao chạm mặt nước. Hãy dùng nhíp và kéo cong chuyên dụng để cắt tỉa ngang thân. Phần ngọn cắt ra có thể cắm lại xuống nền để nhân giống tạo thảm cây dày dặn hơn.</p>

      <blockquote>
        "Hồ thủy sinh đẹp nhất là hồ thủy sinh có sự cân bằng giữa Dinh dưỡng - Ánh sáng - CO2. Khi 3 yếu tố này đạt điểm cân bằng, rêu hại sẽ tự động biến mất."
      </blockquote>
    `;
  }

  // 4. Nhóm Nước, Hệ vi sinh & Thiết bị lọc
  if (lowerTitle.includes('nước') || lowerTitle.includes('lọc') || lowerTitle.includes('cycle') || lowerTitle.includes('ph') || lowerTitle.includes('co2') || lowerTitle.includes('đèn') || lowerTag.includes('chất lượng nước') || lowerTag.includes('thiết bị')) {
    return `
      <h2>1. Nguyên lý vận hành và tầm quan trọng của hệ vi sinh</h2>
      <p>Trái tim của bất kỳ hồ cá hay hồ thủy sinh nào chính là hệ thống lọc và chu trình Nitơ (Cycle). <strong>${t.title}</strong> hướng dẫn chi tiết cách thiết lập một môi trường nước trong vắt, sinh học ổn định giúp sinh vật sống lâu thọ.</p>

      <h2>2. Sơ đồ chu trình Nitơ trong bể cá (Nitrogen Cycle)</h2>
      <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #cbd5e1;">
        <p style="margin: 0; font-weight: 600; color: #1e293b;">Quy trình chuyển hóa khí độc tự nhiên:</p>
        <p style="margin-top: 8px; font-family: monospace; color: #0284c7;">
          Phân cá & Thức ăn thừa ➔ Khí độc NH3/NH4+ ➔ (Vi khuẩn Nitrosomonas) ➔ Khí độc NO2- ➔ (Vi khuẩn Nitrobacter) ➔ Nitrate NO3- (Cây hấp thụ / Thay nước xả ra)
        </p>
      </div>

      <h2>3. Đánh giá các loại vật liệu lọc phổ biến nhất hiện nay</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
        <thead>
          <tr style="background-color: #0284c7; color: white;">
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Vật liệu lọc</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Diện tích cư trú vi sinh</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Đánh giá thực tế</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Sứ lọc hoa mai / Sứ thanh</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Khá cao (~600 m²/lít)</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Giá rẻ, phù hợp lọc tràn, lọc vách.</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Đá nham thạch đỏ/đen</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Trung bình (~400 m²/lít)</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Bền bỉ, giặt rửa thoải mái không rã.</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Seachem Matrix / Substrat Pro</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Siêu cao (~700 - 800 m²/lít)</td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">Lựa chọn cao cấp hàng đầu cho lọc thùng.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Các bước duy trì nước hồ luôn trong như pha lê</h2>
      <ul>
        <li>Không thay quá 30% nước trong một lần để tránh làm vi sinh suy giảm đột ngột.</li>
        <li>Chỉ giặt rửa bông lọc thô bằng nước hút ra từ chính bể cá, tuyệt đối không dùng nước máy chứa Clo giặt vật liệu lọc.</li>
        <li>Bổ sung vi sinh định kỳ mỗi tuần 1 lần sau khi thay nước mới.</li>
      </ul>
    `;
  }

  // 5. Mặc định: Kỹ thuật nuôi dòng cá cụ thể (Betta, Guppy, Discus, Koi, Rồng, v.v.)
  return `
    <h2>1. Giới thiệu dòng cá và vẻ đẹp đặc trưng</h2>
    <p>Chăm sóc cá cảnh là một niềm vui nghệ thuật mang lại sự thư thái tuyệt vời cho không gian sống. Bài viết <strong>${t.title}</strong> tổng hợp toàn bộ kỹ thuật chuẩn xác giúp bạn nuôi dưỡng đàn cá khỏe mạnh, lên màu chuẩn và có tuổi thọ cao.</p>

    <h2>2. Bảng chỉ số môi trường & Chăm sóc cá chuẩn chuyên gia</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
      <thead>
        <tr style="background-color: #0b74e5; color: white;">
          <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Hạng mục</th>
          <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Thông số tối ưu</th>
          <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: left;">Hướng dẫn chi tiết</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Nhiệt độ nước</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>25°C - 28°C</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Giữ nhiệt độ ổn định, tránh gió lùa đột ngột.</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Độ pH phù hợp</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>6.5 - 7.5</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Mức pH trung tính phù hợp cho đa số loài cá cảnh.</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Chế độ khẩu phần ăn</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>1 - 2 lần / ngày</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Cho ăn vừa đủ trong 3 phút, hút bỏ thức ăn thừa.</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Tần suất thay nước</td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>1 - 2 lần / tuần</strong></td>
          <td style="padding: 8px; border: 1px solid #cbd5e1;">Thay 20% lượng nước và xịt khử Clo nước máy.</td>
        </tr>
      </tbody>
    </table>

    <h2>3. Bí quyết dinh dưỡng & Tăng cường sắc tố tự nhiên</h2>
    <p>Để cá luôn sung mãn và vây vảy rực rỡ, việc kết hợp giữa thức ăn hạt giàu đạm (cám Inve, cám Thái) với thức ăn tươi sống đã qua xử lý sạch sẽ (Trùn chỉ, Artemia ấp tươi, Tim bò) là điều vô cùng quan trọng.</p>

    <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
      <strong style="color: #0369a1;">Lời khuyên từ nghệ nhân AquaHub:</strong>
      <p style="margin-top: 6px; margin-bottom: 0;">Khi mới mua cá về, hãy thả cả bịch cá nổi trên mặt nước bể 15-20 phút để cân bằng nhiệt độ, sau đó múc từng ít nước bể vào bịch rồi mới cẩn thận vớt cá ra thả vào bể. Việc này giúp loại bỏ 100% nguy cơ cá bị sốc nước đột ngột!</p>
    </div>
  `;
}

