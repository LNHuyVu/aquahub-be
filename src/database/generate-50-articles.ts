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

    const content = `
      <h2>1. Giới thiệu chung & Tầm quan trọng</h2>
      <p>Trong thú chơi cá cảnh, tép cảnh và thủy sinh, việc nắm vững <strong>${t.title}</strong> đóng vai trò vô cùng quyết định đến sức khỏe của sinh vật cũng như vẻ đẹp tổng thể của bể cá. Người nuôi cần chú ý theo dõi các yếu tố môi trường nước, nhiệt độ và dinh dưỡng hàng ngày.</p>
      
      <h2>2. Chi tiết kỹ thuật & Các bước thực hiện</h2>
      <p>Để đạt hiệu quả tối ưu cho vấn đề <em>${t.tag}</em>, các dân chơi cá kinh nghiệm khuyên bạn nên làm theo các bước chuẩn mực sau:</p>
      <ul>
        <li><strong>Bước 1:</strong> Kiểm tra chỉ số môi trường nước (độ pH từ 6.5 - 7.5, nhiệt độ ổn định 24°C - 28°C).</li>
        <li><strong>Bước 2:</strong> Đảm bảo hệ thống lọc hoạt động liên tục 24/7 để duy trì hệ vi sinh xử lý khí độc NH3/NO2.</li>
        <li><strong>Bước 3:</strong> Cung cấp chế độ dinh dưỡng cân bằng, chia nhỏ lượng thức ăn làm 2 lần/ngày, tránh để dư thừa.</li>
        <li><strong>Bước 4:</strong> Vệ sinh nhẹ nhàng bông lọc và thay 20-30% nước sạch định kỳ hàng tuần.</li>
      </ul>

      <blockquote>
        "Một hồ cá khỏe mạnh không chỉ phụ thuộc vào các thiết bị đắt tiền, mà cốt lõi nằm ở sự kiên nhẫn và quy trình chăm sóc tỉ mỉ từng ngày của người chơi."
      </blockquote>

      <h2>3. Lời khuyên từ chuyên gia AquaHub</h2>
      <p>Hãy luôn chuẩn bị sẵn các loại thuốc cơ bản như muối hột, sưởi bể cá và men vi sinh chất lượng cao. Nếu phát hiện các dấu hiệu bất thường như cá bỏ ăn, bơi lờ đờ hoặc cọ mình vào phụ kiện, hãy kiểm tra ngay nguồn nước trước khi tiến hành can thiệp.</p>
    `;

    return {
      title: t.title,
      slug,
      excerpt: `Hướng dẫn chi tiết về ${t.title.toLowerCase()}. Tổng hợp bí quyết chăm sóc, xử lý môi trường và kinh nghiệm thực tế từ các chuyên gia AquaHub.`,
      content,
      coverImage,
      tags: [t.tag, 'Cẩm nang nuôi cá', 'AquaHub Guide'],
      viewsCount: Math.floor(Math.random() * 1250) + 180,
    };
  });
}
