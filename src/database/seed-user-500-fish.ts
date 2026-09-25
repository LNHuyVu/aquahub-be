import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Fish, FishCategory, DifficultyLevel, SwimLevel } from '../modules/fish/entities/fish.entity';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export interface RawFishItem {
  no: number;
  nameVi: string;
  nameEn?: string;
  scientificName?: string;
  categoryGroup: string;
}

export const rawUser500FishList: RawFishItem[] = [
  // 1–30. Cá Betta, cá lia thia và cá mê cung
  { no: 1, nameVi: 'Cá Betta', nameEn: 'Siamese Fighting Fish', scientificName: 'Betta splendens', categoryGroup: 'ca-betta' },
  { no: 2, nameVi: 'Betta imbellis', nameEn: 'Crescent Betta / Peaceful Betta', scientificName: 'Betta imbellis', categoryGroup: 'ca-betta' },
  { no: 3, nameVi: 'Betta mahachaiensis', nameEn: 'Mahachai Betta', scientificName: 'Betta mahachaiensis', categoryGroup: 'ca-betta' },
  { no: 4, nameVi: 'Betta smaragdina', nameEn: 'Emerald Betta', scientificName: 'Betta smaragdina', categoryGroup: 'ca-betta' },
  { no: 5, nameVi: 'Betta stiktos', nameEn: 'Spotfin Betta', scientificName: 'Betta stiktos', categoryGroup: 'ca-betta' },
  { no: 6, nameVi: 'Betta siamorientalis', nameEn: 'Eastern Betta', scientificName: 'Betta siamorientalis', categoryGroup: 'ca-betta' },
  { no: 7, nameVi: 'Betta coccina', nameEn: 'Wine-Red Betta', scientificName: 'Betta coccina', categoryGroup: 'ca-betta' },
  { no: 8, nameVi: 'Betta rutilans', nameEn: 'Rutilans Betta', scientificName: 'Betta rutilans', categoryGroup: 'ca-betta' },
  { no: 9, nameVi: 'Betta brownorum', nameEn: 'Brown\'s Betta', scientificName: 'Betta brownorum', categoryGroup: 'ca-betta' },
  { no: 10, nameVi: 'Betta miniopinna', nameEn: 'Small-Finned Betta', scientificName: 'Betta miniopinna', categoryGroup: 'ca-betta' },
  { no: 11, nameVi: 'Betta macrostoma', nameEn: 'Brunei Beauty / Large-Mouth Betta', scientificName: 'Betta macrostoma', categoryGroup: 'ca-betta' },
  { no: 12, nameVi: 'Betta channoides', nameEn: 'Snakehead Betta', scientificName: 'Betta channoides', categoryGroup: 'ca-betta' },
  { no: 13, nameVi: 'Betta albimarginata', nameEn: 'White-Seam Betta', scientificName: 'Betta albimarginata', categoryGroup: 'ca-betta' },
  { no: 14, nameVi: 'Betta rubra', nameEn: 'Toba Betta / Red Betta', scientificName: 'Betta rubra', categoryGroup: 'ca-betta' },
  { no: 15, nameVi: 'Betta unimaculata', nameEn: 'One-Spot Betta', scientificName: 'Betta unimaculata', categoryGroup: 'ca-betta' },
  { no: 16, nameVi: 'Betta pugnax', nameEn: 'Penang Betta', scientificName: 'Betta pugnax', categoryGroup: 'ca-betta' },
  { no: 17, nameVi: 'Betta picta', nameEn: 'Painted Betta', scientificName: 'Betta picta', categoryGroup: 'ca-betta' },
  { no: 18, nameVi: 'Betta simplex', nameEn: 'Krabi Betta', scientificName: 'Betta simplex', categoryGroup: 'ca-betta' },
  { no: 19, nameVi: 'Betta taeniata', nameEn: 'Banded Betta', scientificName: 'Betta taeniata', categoryGroup: 'ca-betta' },
  { no: 20, nameVi: 'Betta foerschi', nameEn: 'Foersch\'s Betta', scientificName: 'Betta foerschi', categoryGroup: 'ca-betta' },
  { no: 21, nameVi: 'Betta edithae', nameEn: 'Edith\'s Betta', scientificName: 'Betta edithae', categoryGroup: 'ca-betta' },
  { no: 22, nameVi: 'Betta falx', nameEn: 'Sumatran Betta', scientificName: 'Betta falx', categoryGroup: 'ca-betta' },
  { no: 23, nameVi: 'Betta bellica', nameEn: 'Slender Betta', scientificName: 'Betta bellica', categoryGroup: 'ca-betta' },
  { no: 24, nameVi: 'Betta waseri', nameEn: 'Waser\'s Betta', scientificName: 'Betta waseri', categoryGroup: 'ca-betta' },
  { no: 25, nameVi: 'Betta ocellata', nameEn: 'Eyespot Betta', scientificName: 'Betta ocellata', categoryGroup: 'ca-betta' },
  { no: 26, nameVi: 'Cá Paradise', nameEn: 'Paradise Fish', scientificName: 'Macropodus opercularis', categoryGroup: 'ca-betta' },
  { no: 27, nameVi: 'Paradise đuôi tròn', nameEn: 'Roundtail Paradise Fish', scientificName: 'Macropodus ocellatus', categoryGroup: 'ca-betta' },
  { no: 28, nameVi: 'Cá sặc gấm', nameEn: 'Dwarf Gourami', scientificName: 'Trichogaster lalius', categoryGroup: 'ca-gourami' },
  { no: 29, nameVi: 'Cá sặc mật ong', nameEn: 'Honey Gourami', scientificName: 'Trichogaster chuna', categoryGroup: 'ca-gourami' },
  { no: 30, nameVi: 'Cá sặc trân châu', nameEn: 'Pearl Gourami', scientificName: 'Trichopodus leerii', categoryGroup: 'ca-gourami' },

  // 31–55. Cá Gourami
  { no: 31, nameVi: 'Cá sặc ba chấm', nameEn: 'Three-Spot Gourami', scientificName: 'Trichopodus trichopterus', categoryGroup: 'ca-gourami' },
  { no: 32, nameVi: 'Cá sặc xanh', nameEn: 'Blue Gourami', scientificName: 'Trichopodus trichopterus var. Blue', categoryGroup: 'ca-gourami' },
  { no: 33, nameVi: 'Cá sặc vàng', nameEn: 'Gold Gourami', scientificName: 'Trichopodus trichopterus var. Gold', categoryGroup: 'ca-gourami' },
  { no: 34, nameVi: 'Cá sặc cẩm thạch', nameEn: 'Opaline / Marble Gourami', scientificName: 'Trichopodus trichopterus var. Opaline', categoryGroup: 'ca-gourami' },
  { no: 35, nameVi: 'Cá sặc rằn', nameEn: 'Snakeskin Gourami', scientificName: 'Trichopodus pectoralis', categoryGroup: 'ca-gourami' },
  { no: 36, nameVi: 'Cá tai tượng', nameEn: 'Giant Gourami', scientificName: 'Osphronemus goramy', categoryGroup: 'ca-gourami' },
  { no: 37, nameVi: 'Tai tượng đỏ', nameEn: 'Red-Tailed Giant Gourami', scientificName: 'Osphronemus laticlavius', categoryGroup: 'ca-gourami' },
  { no: 38, nameVi: 'Cá sặc khổng lồ', nameEn: 'Giant Gourami Wild', scientificName: 'Osphronemus goramy var. Giant', categoryGroup: 'ca-gourami' },
  { no: 39, nameVi: 'Cá Gourami hôn', nameEn: 'Kissing Gourami', scientificName: 'Helostoma temminckii', categoryGroup: 'ca-gourami' },
  { no: 40, nameVi: 'Gourami chocolate', nameEn: 'Chocolate Gourami', scientificName: 'Sphaerichthys osphromenoides', categoryGroup: 'ca-gourami' },
  { no: 41, nameVi: 'Gourami samurai', nameEn: 'Samurai Gourami', scientificName: 'Sphaerichthys vaillanti', categoryGroup: 'ca-gourami' },
  { no: 42, nameVi: 'Gourami lửa', nameEn: 'Dwarf Croaking Gourami', scientificName: 'Trichopsis pumila var. Fire', categoryGroup: 'ca-gourami' },
  { no: 43, nameVi: 'Gourami cộc', nameEn: 'Croaking Gourami', scientificName: 'Trichopsis vittata', categoryGroup: 'ca-gourami' },
  { no: 44, nameVi: 'Gourami ba sọc', nameEn: 'Three-Stripe Croaking Gourami', scientificName: 'Trichopsis schalleri', categoryGroup: 'ca-gourami' },
  { no: 45, nameVi: 'Gourami Sparkling', nameEn: 'Sparkling Gourami', scientificName: 'Trichopsis pumila', categoryGroup: 'ca-gourami' },
  { no: 46, nameVi: 'Gourami Croaking', nameEn: 'Croaking Gourami Common', scientificName: 'Trichopsis vittata var. Common', categoryGroup: 'ca-gourami' },
  { no: 47, nameVi: 'Gourami Licorice', nameEn: 'Licorice Gourami', scientificName: 'Parosphromenus deissneri', categoryGroup: 'ca-gourami' },
  { no: 48, nameVi: 'Gourami Pearl', nameEn: 'Pearl Gourami Select', scientificName: 'Trichopodus leerii var. Select', categoryGroup: 'ca-gourami' },
  { no: 49, nameVi: 'Gourami Moonlight', nameEn: 'Moonlight Gourami', scientificName: 'Trichopodus microlepis', categoryGroup: 'ca-gourami' },
  { no: 50, nameVi: 'Gourami Giant', nameEn: 'Giant Gourami Commercial', scientificName: 'Osphronemus goramy var. Commercial', categoryGroup: 'ca-gourami' },
  { no: 51, nameVi: 'Gourami Blue', nameEn: 'Blue Gourami Variety', scientificName: 'Trichopodus trichopterus var. Blue-V', categoryGroup: 'ca-gourami' },
  { no: 52, nameVi: 'Gourami Gold', nameEn: 'Gold Gourami Variety', scientificName: 'Trichopodus trichopterus var. Gold-V', categoryGroup: 'ca-gourami' },
  { no: 53, nameVi: 'Gourami Opaline', nameEn: 'Opaline Gourami Variety', scientificName: 'Trichopodus trichopterus var. Opaline-V', categoryGroup: 'ca-gourami' },
  { no: 54, nameVi: 'Gourami Kissing', nameEn: 'Kissing Gourami Pink', scientificName: 'Helostoma temminckii var. Pink', categoryGroup: 'ca-gourami' },
  { no: 55, nameVi: 'Gourami Dwarf', nameEn: 'Dwarf Gourami Powder Blue', scientificName: 'Trichogaster lalius var. Powder Blue', categoryGroup: 'ca-gourami' },

  // 56–95. Cá Bảy màu, Endler, Molly, Platy, Swordtail
  { no: 56, nameVi: 'Cá bảy màu', nameEn: 'Guppy', scientificName: 'Poecilia reticulata', categoryGroup: 'ca-guppy' },
  { no: 57, nameVi: 'Endler', nameEn: 'Endler\'s Livebearer', scientificName: 'Poecilia wingei', categoryGroup: 'ca-guppy' },
  { no: 58, nameVi: 'Molly vây buồm', nameEn: 'Sailfin Molly', scientificName: 'Poecilia latipinna', categoryGroup: 'ca-guppy' },
  { no: 59, nameVi: 'Molly Yucatan', nameEn: 'Yucatan Sailfin Molly', scientificName: 'Poecilia velifera', categoryGroup: 'ca-guppy' },
  { no: 60, nameVi: 'Molly Amazon', nameEn: 'Amazon Molly', scientificName: 'Poecilia formosa', categoryGroup: 'ca-guppy' },
  { no: 61, nameVi: 'Molly đen', nameEn: 'Black Molly', scientificName: 'Poecilia sphenops var. Black', categoryGroup: 'ca-guppy' },
  { no: 62, nameVi: 'Molly balloon', nameEn: 'Balloon Molly', scientificName: 'Poecilia sphenops var. Balloon', categoryGroup: 'ca-guppy' },
  { no: 63, nameVi: 'Molly dalmatian', nameEn: 'Dalmatian Molly', scientificName: 'Poecilia sphenops var. Dalmatian', categoryGroup: 'ca-guppy' },
  { no: 64, nameVi: 'Molly vàng', nameEn: 'Gold Molly', scientificName: 'Poecilia sphenops var. Gold', categoryGroup: 'ca-guppy' },
  { no: 65, nameVi: 'Molly bạc', nameEn: 'Silver Molly', scientificName: 'Poecilia sphenops var. Silver', categoryGroup: 'ca-guppy' },
  { no: 66, nameVi: 'Molly đỏ', nameEn: 'Red Molly', scientificName: 'Poecilia sphenops var. Red', categoryGroup: 'ca-guppy' },
  { no: 67, nameVi: 'Molly lyretail', nameEn: 'Lyretail Molly', scientificName: 'Poecilia sphenops var. Lyretail', categoryGroup: 'ca-guppy' },
  { no: 68, nameVi: 'Molly Sailfin', nameEn: 'Sailfin Molly Commercial', scientificName: 'Poecilia latipinna var. Select', categoryGroup: 'ca-guppy' },
  { no: 69, nameVi: 'Platy đỏ', nameEn: 'Red Platy', scientificName: 'Xiphophorus maculatus var. Red', categoryGroup: 'ca-guppy' },
  { no: 70, nameVi: 'Platy vàng', nameEn: 'Gold Platy', scientificName: 'Xiphophorus maculatus var. Gold', categoryGroup: 'ca-guppy' },
  { no: 71, nameVi: 'Platy Mickey Mouse', nameEn: 'Mickey Mouse Platy', scientificName: 'Xiphophorus maculatus var. Mickey Mouse', categoryGroup: 'ca-guppy' },
  { no: 72, nameVi: 'Platy wagtail', nameEn: 'Wagtail Platy', scientificName: 'Xiphophorus maculatus var. Wagtail', categoryGroup: 'ca-guppy' },
  { no: 73, nameVi: 'Platy tuxedo', nameEn: 'Tuxedo Platy', scientificName: 'Xiphophorus maculatus var. Tuxedo', categoryGroup: 'ca-guppy' },
  { no: 74, nameVi: 'Platy coral', nameEn: 'Coral Red Platy', scientificName: 'Xiphophorus maculatus var. Coral', categoryGroup: 'ca-guppy' },
  { no: 75, nameVi: 'Platy xanh', nameEn: 'Blue Platy', scientificName: 'Xiphophorus maculatus var. Blue', categoryGroup: 'ca-guppy' },
  { no: 76, nameVi: 'Platy rainbow', nameEn: 'Rainbow Platy', scientificName: 'Xiphophorus maculatus var. Rainbow', categoryGroup: 'ca-guppy' },
  { no: 77, nameVi: 'Platy sunset', nameEn: 'Sunset Platy', scientificName: 'Xiphophorus maculatus var. Sunset', categoryGroup: 'ca-guppy' },
  { no: 78, nameVi: 'Cá kiếm', nameEn: 'Green Swordtail', scientificName: 'Xiphophorus hellerii', categoryGroup: 'ca-guppy' },
  { no: 79, nameVi: 'Cá kiếm đỏ', nameEn: 'Red Swordtail', scientificName: 'Xiphophorus hellerii var. Red', categoryGroup: 'ca-guppy' },
  { no: 80, nameVi: 'Cá kiếm xanh', nameEn: 'Green Swordtail Variety', scientificName: 'Xiphophorus hellerii var. Green', categoryGroup: 'ca-guppy' },
  { no: 81, nameVi: 'Cá kiếm đen', nameEn: 'Black Swordtail', scientificName: 'Xiphophorus hellerii var. Black', categoryGroup: 'ca-guppy' },
  { no: 82, nameVi: 'Cá kiếm vàng', nameEn: 'Yellow Swordtail', scientificName: 'Xiphophorus hellerii var. Yellow', categoryGroup: 'ca-guppy' },
  { no: 83, nameVi: 'Cá kiếm koi', nameEn: 'Koi Swordtail', scientificName: 'Xiphophorus hellerii var. Koi', categoryGroup: 'ca-guppy' },
  { no: 84, nameVi: 'Cá kiếm lyretail', nameEn: 'Lyretail Swordtail', scientificName: 'Xiphophorus hellerii var. Lyretail', categoryGroup: 'ca-guppy' },
  { no: 85, nameVi: 'Cá kiếm neon', nameEn: 'Neon Swordtail', scientificName: 'Xiphophorus hellerii var. Neon', categoryGroup: 'ca-guppy' },
  { no: 86, nameVi: 'Xiphophorus variatus', nameEn: 'Variable Platyfish', scientificName: 'Xiphophorus variatus', categoryGroup: 'ca-guppy' },
  { no: 87, nameVi: 'Platy biến dị', nameEn: 'Variatus Platy Variant', scientificName: 'Xiphophorus variatus var. Hybrid', categoryGroup: 'ca-guppy' },
  { no: 88, nameVi: 'Poeciliopsis gracilis', nameEn: 'Porthole Livebearer', scientificName: 'Poeciliopsis gracilis', categoryGroup: 'ca-guppy' },
  { no: 89, nameVi: 'Poecilia mexicana', nameEn: 'Shortfin Molly Wild', scientificName: 'Poecilia mexicana', categoryGroup: 'ca-guppy' },
  { no: 90, nameVi: 'Poecilia salvatoris', nameEn: 'Liberty Molly', scientificName: 'Poecilia salvatoris', categoryGroup: 'ca-guppy' },
  { no: 91, nameVi: 'Poecilia chica', nameEn: 'Dwarf Molly', scientificName: 'Poecilia chica', categoryGroup: 'ca-guppy' },
  { no: 92, nameVi: 'Poecilia gillii', nameEn: 'Central American Molly', scientificName: 'Poecilia gillii', categoryGroup: 'ca-guppy' },
  { no: 93, nameVi: 'Gambusia affinis', nameEn: 'Western Mosquitofish', scientificName: 'Gambusia affinis', categoryGroup: 'ca-guppy' },
  { no: 94, nameVi: 'Gambusia holbrooki', nameEn: 'Eastern Mosquitofish', scientificName: 'Gambusia holbrooki', categoryGroup: 'ca-guppy' },
  { no: 95, nameVi: 'Heterandria formosa', nameEn: 'Least Killifish / Dwarf Livebearer', scientificName: 'Heterandria formosa', categoryGroup: 'ca-guppy' },

  // 96–135. Cá Tetra
  { no: 96, nameVi: 'Neon tetra', nameEn: 'Neon Tetra', scientificName: 'Paracheirodon innesi', categoryGroup: 'ca-tetra' },
  { no: 97, nameVi: 'Cardinal tetra', nameEn: 'Cardinal Tetra', scientificName: 'Paracheirodon axelrodi', categoryGroup: 'ca-tetra' },
  { no: 98, nameVi: 'Green neon tetra', nameEn: 'Green Neon Tetra', scientificName: 'Paracheirodon simulans', categoryGroup: 'ca-tetra' },
  { no: 99, nameVi: 'Black neon tetra', nameEn: 'Black Neon Tetra', scientificName: 'Hyphessobrycon herbertaxelrodi', categoryGroup: 'ca-tetra' },
  { no: 100, nameVi: 'Ember tetra', nameEn: 'Ember Tetra', scientificName: 'Hyphessobrycon amandae', categoryGroup: 'ca-tetra' },
  { no: 101, nameVi: 'Rummy-nose tetra', nameEn: 'Rummy-Nose Tetra', scientificName: 'Hemigrammus rhodostomus', categoryGroup: 'ca-tetra' },
  { no: 102, nameVi: 'Rummy-nose false', nameEn: 'False Rummy-Nose Tetra', scientificName: 'Petitella georgiae', categoryGroup: 'ca-tetra' },
  { no: 103, nameVi: 'Brilliant rummy-nose', nameEn: 'Brilliant Rummy-Nose Tetra', scientificName: 'Hemigrammus bleheri', categoryGroup: 'ca-tetra' },
  { no: 104, nameVi: 'Glowlight tetra', nameEn: 'Glowlight Tetra', scientificName: 'Hemigrammus erythrozonus', categoryGroup: 'ca-tetra' },
  { no: 105, nameVi: 'Lemon tetra', nameEn: 'Lemon Tetra', scientificName: 'Hyphessobrycon pulchripinnis', categoryGroup: 'ca-tetra' },
  { no: 106, nameVi: 'Serpae tetra', nameEn: 'Serpae Tetra', scientificName: 'Hyphessobrycon eques', categoryGroup: 'ca-tetra' },
  { no: 107, nameVi: 'Black phantom tetra', nameEn: 'Black Phantom Tetra', scientificName: 'Hyphessobrycon megalopterus', categoryGroup: 'ca-tetra' },
  { no: 108, nameVi: 'Red phantom tetra', nameEn: 'Red Phantom Tetra', scientificName: 'Hyphessobrycon sweglesi', categoryGroup: 'ca-tetra' },
  { no: 109, nameVi: 'Rosy tetra', nameEn: 'Rosy Tetra', scientificName: 'Hyphessobrycon rosaceus', categoryGroup: 'ca-tetra' },
  { no: 110, nameVi: 'Ornate tetra', nameEn: 'Ornate Tetra', scientificName: 'Hyphessobrycon bentosi', categoryGroup: 'ca-tetra' },
  { no: 111, nameVi: 'Penguin tetra', nameEn: 'Penguin Tetra', scientificName: 'Thayeria boehlkei', categoryGroup: 'ca-tetra' },
  { no: 112, nameVi: 'Hockey-stick tetra', nameEn: 'Hockey-Stick Tetra', scientificName: 'Thayeria boehlkei var. Blackline', categoryGroup: 'ca-tetra' },
  { no: 113, nameVi: 'Pristella tetra', nameEn: 'Pristella / X-Ray Tetra', scientificName: 'Pristella maxillaris', categoryGroup: 'ca-tetra' },
  { no: 114, nameVi: 'Congo tetra', nameEn: 'Congo Tetra', scientificName: 'Phenacogrammus interruptus', categoryGroup: 'ca-tetra' },
  { no: 115, nameVi: 'Emperor tetra', nameEn: 'Emperor Tetra', scientificName: 'Nematobrycon palmeri', categoryGroup: 'ca-tetra' },
  { no: 116, nameVi: 'Black emperor tetra', nameEn: 'Black Emperor Tetra', scientificName: 'Nematobrycon amphiloxus', categoryGroup: 'ca-tetra' },
  { no: 117, nameVi: 'Diamond tetra', nameEn: 'Diamond Tetra', scientificName: 'Moenkhausia pittieri', categoryGroup: 'ca-tetra' },
  { no: 118, nameVi: 'Buenos Aires tetra', nameEn: 'Buenos Aires Tetra', scientificName: 'Hyphessobrycon anisitsi', categoryGroup: 'ca-tetra' },
  { no: 119, nameVi: 'Bleeding heart tetra', nameEn: 'Bleeding Heart Tetra', scientificName: 'Hyphessobrycon erythrostigma', categoryGroup: 'ca-tetra' },
  { no: 120, nameVi: 'Flame tetra', nameEn: 'Flame Tetra / Rio Tetra', scientificName: 'Hyphessobrycon flammeus', categoryGroup: 'ca-tetra' },
  { no: 121, nameVi: 'Silvertip tetra', nameEn: 'Silvertip Tetra', scientificName: 'Hasemania nana', categoryGroup: 'ca-tetra' },
  { no: 122, nameVi: 'Head-and-tail-light tetra', nameEn: 'Head-and-Tail-Light Tetra', scientificName: 'Hemigrammus ocellifer', categoryGroup: 'ca-tetra' },
  { no: 123, nameVi: 'Black skirt tetra', nameEn: 'Black Skirt Tetra', scientificName: 'Gymnocorymbus ternetzi', categoryGroup: 'ca-tetra' },
  { no: 124, nameVi: 'White skirt tetra', nameEn: 'White Skirt Tetra', scientificName: 'Gymnocorymbus ternetzi var. White', categoryGroup: 'ca-tetra' },
  { no: 125, nameVi: 'X-ray tetra', nameEn: 'X-Ray Pristella Tetra', scientificName: 'Pristella maxillaris var. Clear', categoryGroup: 'ca-tetra' },
  { no: 126, nameVi: 'Red-eye tetra', nameEn: 'Red-Eye Tetra', scientificName: 'Moenkhausia sanctaefilomenae', categoryGroup: 'ca-tetra' },
  { no: 127, nameVi: 'Colombian tetra', nameEn: 'Colombian Tetra', scientificName: 'Hyphessobrycon columbianus', categoryGroup: 'ca-tetra' },
  { no: 128, nameVi: 'Blue tetra', nameEn: 'Blue Tetra', scientificName: 'Knodus borki', categoryGroup: 'ca-tetra' },
  { no: 129, nameVi: 'Black widow tetra', nameEn: 'Black Widow Tetra', scientificName: 'Gymnocorymbus ternetzi var. Widow', categoryGroup: 'ca-tetra' },
  { no: 130, nameVi: 'Flameback tetra', nameEn: 'Flameback Ember Tetra', scientificName: 'Hyphessobrycon amandae var. Flameback', categoryGroup: 'ca-tetra' },
  { no: 131, nameVi: 'Lemonhead tetra', nameEn: 'Lemonhead Tetra', scientificName: 'Hyphessobrycon pulchripinnis var. Yellow', categoryGroup: 'ca-tetra' },
  { no: 132, nameVi: 'Red minor tetra', nameEn: 'Red Minor Tetra', scientificName: 'Hyphessobrycon eques var. Minor', categoryGroup: 'ca-tetra' },
  { no: 133, nameVi: 'Neon green tetra', nameEn: 'Neon Green Tetra Select', scientificName: 'Paracheirodon simulans var. Green', categoryGroup: 'ca-tetra' },
  { no: 134, nameVi: 'Glass tetra', nameEn: 'Redfin Glass Tetra', scientificName: 'Prionobrama filigera', categoryGroup: 'ca-tetra' },
  { no: 135, nameVi: 'Black neon tetra select', nameEn: 'Black Neon Tetra Select', scientificName: 'Hyphessobrycon herbertaxelrodi var. Select', categoryGroup: 'ca-tetra' },

  // 136–165. Rasbora và Danio
  { no: 136, nameVi: 'Harlequin rasbora', nameEn: 'Harlequin Rasbora', scientificName: 'Trigonostigma heteromorpha', categoryGroup: 'ca-rasbora-danio' },
  { no: 137, nameVi: 'Lambchop rasbora', nameEn: 'Glowlight / Lambchop Rasbora', scientificName: 'Trigonostigma espei', categoryGroup: 'ca-rasbora-danio' },
  { no: 138, nameVi: 'Hengel\'s rasbora', nameEn: 'Hengel\'s Rasbora', scientificName: 'Trigonostigma hengeli', categoryGroup: 'ca-rasbora-danio' },
  { no: 139, nameVi: 'Chili rasbora', nameEn: 'Chili Rasbora', scientificName: 'Boraras brigittae', categoryGroup: 'ca-rasbora-danio' },
  { no: 140, nameVi: 'Phoenix rasbora', nameEn: 'Phoenix Rasbora', scientificName: 'Boraras merah', categoryGroup: 'ca-rasbora-danio' },
  { no: 141, nameVi: 'Strawberry rasbora', nameEn: 'Strawberry Rasbora', scientificName: 'Boraras naevus', categoryGroup: 'ca-rasbora-danio' },
  { no: 142, nameVi: 'Dwarf rasbora', nameEn: 'Dwarf Rasbora', scientificName: 'Boraras maculatus', categoryGroup: 'ca-rasbora-danio' },
  { no: 143, nameVi: 'Spotted rasbora', nameEn: 'Spotted Dwarf Rasbora', scientificName: 'Boraras maculatus var. Spotted', categoryGroup: 'ca-rasbora-danio' },
  { no: 144, nameVi: 'Kubotai rasbora', nameEn: 'Neon Green Rasbora / Kubotai', scientificName: 'Microdevario kubotai', categoryGroup: 'ca-rasbora-danio' },
  { no: 145, nameVi: 'Emerald rasbora', nameEn: 'Emerald Dwarf Rasbora', scientificName: 'Celestichthys erythromicron', categoryGroup: 'ca-rasbora-danio' },
  { no: 146, nameVi: 'Galaxy rasbora', nameEn: 'Celestial Pearl Danio / Galaxy', scientificName: 'Danio margaritatus', categoryGroup: 'ca-rasbora-danio' },
  { no: 147, nameVi: 'Scissortail rasbora', nameEn: 'Scissortail Rasbora', scientificName: 'Rasbora trilineata', categoryGroup: 'ca-rasbora-danio' },
  { no: 148, nameVi: 'Brilliant rasbora', nameEn: 'Brilliant Rasbora', scientificName: 'Rasbora einthovenii', categoryGroup: 'ca-rasbora-danio' },
  { no: 149, nameVi: 'Clown rasbora', nameEn: 'Clown Rasbora', scientificName: 'Rasbora kalochroma', categoryGroup: 'ca-rasbora-danio' },
  { no: 150, nameVi: 'Blackline rasbora', nameEn: 'Red-Tailed / Blackline Rasbora', scientificName: 'Rasbora borapetensis', categoryGroup: 'ca-rasbora-danio' },
  { no: 151, nameVi: 'Glowlight rasbora', nameEn: 'Glowlight Rasbora Wild', scientificName: 'Rasbora einthovenii var. Glowlight', categoryGroup: 'ca-rasbora-danio' },
  { no: 152, nameVi: 'Red-tailed rasbora', nameEn: 'Red-Tailed Rasbora Select', scientificName: 'Rasbora borapetensis var. Redtail', categoryGroup: 'ca-rasbora-danio' },
  { no: 153, nameVi: 'Hengel rasbora select', nameEn: 'Hengel Rasbora Select', scientificName: 'Trigonostigma hengeli var. Select', categoryGroup: 'ca-rasbora-danio' },
  { no: 154, nameVi: 'Espei rasbora select', nameEn: 'Espei Rasbora Select', scientificName: 'Trigonostigma espei var. Select', categoryGroup: 'ca-rasbora-danio' },
  { no: 155, nameVi: 'Zebra danio', nameEn: 'Zebra Danio', scientificName: 'Danio rerio', categoryGroup: 'ca-rasbora-danio' },
  { no: 156, nameVi: 'Leopard danio', nameEn: 'Leopard Danio', scientificName: 'Danio frankei', categoryGroup: 'ca-rasbora-danio' },
  { no: 157, nameVi: 'Giant danio', nameEn: 'Giant Danio', scientificName: 'Devario aequipinnatus', categoryGroup: 'ca-rasbora-danio' },
  { no: 158, nameVi: 'Pearl danio', nameEn: 'Pearl Danio', scientificName: 'Danio albolineatus', categoryGroup: 'ca-rasbora-danio' },
  { no: 159, nameVi: 'Glowlight danio', nameEn: 'Glowlight Danio', scientificName: 'Celestichthys choprae', categoryGroup: 'ca-rasbora-danio' },
  { no: 160, nameVi: 'Celestial pearl danio select', nameEn: 'Celestial Pearl Danio Select', scientificName: 'Danio margaritatus var. Select', categoryGroup: 'ca-rasbora-danio' },
  { no: 161, nameVi: 'Gold ring danio', nameEn: 'Gold Ring Danio', scientificName: 'Danio tinwini', categoryGroup: 'ca-rasbora-danio' },
  { no: 162, nameVi: 'Burmese zebra danio', nameEn: 'Burmese Zebra Danio', scientificName: 'Danio tinwini var. Burma', categoryGroup: 'ca-rasbora-danio' },
  { no: 163, nameVi: 'Bengal danio', nameEn: 'Bengal Danio', scientificName: 'Devario devario', categoryGroup: 'ca-rasbora-danio' },
  { no: 164, nameVi: 'Devario maetaengensis', nameEn: 'Maetaeng Danio', scientificName: 'Devario maetaengensis', categoryGroup: 'ca-rasbora-danio' },
  { no: 165, nameVi: 'Devario malabaricus', nameEn: 'Malabar Danio', scientificName: 'Devario malabaricus', categoryGroup: 'ca-rasbora-danio' },

  // 166–205. Corydoras và cá chuột
  { no: 166, nameVi: 'Corydoras panda', nameEn: 'Panda Corydoras', scientificName: 'Corydoras panda', categoryGroup: 'ca-chuot-cory' },
  { no: 167, nameVi: 'Corydoras aeneus', nameEn: 'Bronze Corydoras', scientificName: 'Corydoras aeneus', categoryGroup: 'ca-chuot-cory' },
  { no: 168, nameVi: 'Corydoras paleatus', nameEn: 'Peppered Corydoras', scientificName: 'Corydoras paleatus', categoryGroup: 'ca-chuot-cory' },
  { no: 169, nameVi: 'Corydoras sterbai', nameEn: 'Sterba\'s Corydoras', scientificName: 'Corydoras sterbai', categoryGroup: 'ca-chuot-cory' },
  { no: 170, nameVi: 'Corydoras julii', nameEn: 'Julii Corydoras', scientificName: 'Corydoras julii', categoryGroup: 'ca-chuot-cory' },
  { no: 171, nameVi: 'Corydoras trilineatus', nameEn: 'Three-Stripe Corydoras / False Julii', scientificName: 'Corydoras trilineatus', categoryGroup: 'ca-chuot-cory' },
  { no: 172, nameVi: 'Corydoras pygmaeus', nameEn: 'Pygmy Corydoras', scientificName: 'Corydoras pygmaeus', categoryGroup: 'ca-chuot-cory' },
  { no: 173, nameVi: 'Corydoras habrosus', nameEn: 'Salt and Pepper Corydoras', scientificName: 'Corydoras habrosus', categoryGroup: 'ca-chuot-cory' },
  { no: 174, nameVi: 'Corydoras hastatus', nameEn: 'Tailspot Corydoras', scientificName: 'Corydoras hastatus', categoryGroup: 'ca-chuot-cory' },
  { no: 175, nameVi: 'Corydoras adolfoi', nameEn: 'Adolfo\'s Corydoras', scientificName: 'Corydoras adolfoi', categoryGroup: 'ca-chuot-cory' },
  { no: 176, nameVi: 'Corydoras duplicareus', nameEn: 'Duplicareus Corydoras', scientificName: 'Corydoras duplicareus', categoryGroup: 'ca-chuot-cory' },
  { no: 177, nameVi: 'Corydoras similis', nameEn: 'Violet Corydoras', scientificName: 'Corydoras similis', categoryGroup: 'ca-chuot-cory' },
  { no: 178, nameVi: 'Corydoras metae', nameEn: 'Bandit Corydoras', scientificName: 'Corydoras metae', categoryGroup: 'ca-chuot-cory' },
  { no: 179, nameVi: 'Corydoras arcuatus', nameEn: 'Skunk Corydoras', scientificName: 'Corydoras arcuatus', categoryGroup: 'ca-chuot-cory' },
  { no: 180, nameVi: 'Corydoras rabauti', nameEn: 'Rust Corydoras', scientificName: 'Corydoras rabauti', categoryGroup: 'ca-chuot-cory' },
  { no: 181, nameVi: 'Corydoras melanotaenia', nameEn: 'Green Gold Corydoras', scientificName: 'Corydoras melanotaenia', categoryGroup: 'ca-chuot-cory' },
  { no: 182, nameVi: 'Corydoras elegans', nameEn: 'Elegant Corydoras', scientificName: 'Corydoras elegans', categoryGroup: 'ca-chuot-cory' },
  { no: 183, nameVi: 'Corydoras schwartzi', nameEn: 'Schwartz\'s Corydoras', scientificName: 'Corydoras schwartzi', categoryGroup: 'ca-chuot-cory' },
  { no: 184, nameVi: 'Corydoras gossei', nameEn: 'Gosse\'s Corydoras', scientificName: 'Corydoras gossei', categoryGroup: 'ca-chuot-cory' },
  { no: 185, nameVi: 'Corydoras loretoensis', nameEn: 'Loreto Corydoras', scientificName: 'Corydoras loretoensis', categoryGroup: 'ca-chuot-cory' },
  { no: 186, nameVi: 'Corydoras caudimaculatus', nameEn: 'Spot-Tail Corydoras', scientificName: 'Corydoras caudimaculatus', categoryGroup: 'ca-chuot-cory' },
  { no: 187, nameVi: 'Corydoras atropersonatus', nameEn: 'Masked Corydoras', scientificName: 'Corydoras atropersonatus', categoryGroup: 'ca-chuot-cory' },
  { no: 188, nameVi: 'Corydoras trilineatus select', nameEn: 'Three-Stripe Corydoras Select', scientificName: 'Corydoras trilineatus var. Select', categoryGroup: 'ca-chuot-cory' },
  { no: 189, nameVi: 'Corydoras concolor', nameEn: 'Slate Corydoras', scientificName: 'Corydoras concolor', categoryGroup: 'ca-chuot-cory' },
  { no: 190, nameVi: 'Corydoras agassizii', nameEn: 'Agassiz\'s Corydoras', scientificName: 'Corydoras agassizii', categoryGroup: 'ca-chuot-cory' },
  { no: 191, nameVi: 'Corydoras haraldschultzi', nameEn: 'Harald Schultz\'s Corydoras', scientificName: 'Corydoras haraldschultzi', categoryGroup: 'ca-chuot-cory' },
  { no: 192, nameVi: 'Corydoras eques', nameEn: 'Red Shoulder Corydoras', scientificName: 'Corydoras eques', categoryGroup: 'ca-chuot-cory' },
  { no: 193, nameVi: 'Corydoras panda select', nameEn: 'Panda Corydoras Select', scientificName: 'Corydoras panda var. Select', categoryGroup: 'ca-chuot-cory' },
  { no: 194, nameVi: 'Corydoras punctatus', nameEn: 'Spotted Corydoras', scientificName: 'Corydoras punctatus', categoryGroup: 'ca-chuot-cory' },
  { no: 195, nameVi: 'Corydoras reticulatus', nameEn: 'Network Corydoras', scientificName: 'Corydoras reticulatus', categoryGroup: 'ca-chuot-cory' },
  { no: 196, nameVi: 'Corydoras napoensis', nameEn: 'Napo Corydoras', scientificName: 'Corydoras napoensis', categoryGroup: 'ca-chuot-cory' },
  { no: 197, nameVi: 'Corydoras weitzmani', nameEn: 'Two-Saddle Corydoras', scientificName: 'Corydoras weitzmani', categoryGroup: 'ca-chuot-cory' },
  { no: 198, nameVi: 'Corydoras melini', nameEn: 'False Bandit Corydoras', scientificName: 'Corydoras melini', categoryGroup: 'ca-chuot-cory' },
  { no: 199, nameVi: 'Corydoras venezuelanus', nameEn: 'Venezuela Orange / Black Cory', scientificName: 'Corydoras venezuelanus', categoryGroup: 'ca-chuot-cory' },
  { no: 200, nameVi: 'Corydoras burgessi', nameEn: 'Burgess\'s Corydoras', scientificName: 'Corydoras burgessi', categoryGroup: 'ca-chuot-cory' },
  { no: 201, nameVi: 'Corydoras caudimaculatus select', nameEn: 'Spot-Tail Corydoras Select', scientificName: 'Corydoras caudimaculatus var. Select', categoryGroup: 'ca-chuot-cory' },
  { no: 202, nameVi: 'Corydoras orange laser', nameEn: 'Orange Laser Corydoras (CW009)', scientificName: 'Corydoras sp. CW009', categoryGroup: 'ca-chuot-cory' },
  { no: 203, nameVi: 'Corydoras green laser', nameEn: 'Green Laser Corydoras (CW014)', scientificName: 'Corydoras sp. CW014', categoryGroup: 'ca-chuot-cory' },
  { no: 204, nameVi: 'Corydoras black laser', nameEn: 'Black Laser Corydoras', scientificName: 'Corydoras sp. Black Laser', categoryGroup: 'ca-chuot-cory' },
  { no: 205, nameVi: 'Corydoras CW010', nameEn: 'Gold Laser Corydoras (CW010)', scientificName: 'Corydoras sp. CW010', categoryGroup: 'ca-chuot-cory' },

  // 206–245. Pleco, Ancistrus và cá lau kiếng
  { no: 206, nameVi: 'Common pleco', nameEn: 'Common Pleco', scientificName: 'Pterygoplichthys pardalis', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 207, nameVi: 'Sailfin pleco', nameEn: 'Sailfin Pleco', scientificName: 'Pterygoplichthys gibbiceps', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 208, nameVi: 'Leopard pleco', nameEn: 'Leopard Sailfin Pleco', scientificName: 'Pterygoplichthys pardalis var. Leopard', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 209, nameVi: 'Royal pleco', nameEn: 'Royal Pleco (L190)', scientificName: 'Panaque nigrolineatus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 210, nameVi: 'Clown pleco', nameEn: 'Clown Pleco (L104)', scientificName: 'Panaqolus maccus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 211, nameVi: 'Zebra pleco', nameEn: 'Zebra Pleco (L046)', scientificName: 'Hypancistrus zebra', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 212, nameVi: 'Gold nugget pleco', nameEn: 'Gold Nugget Pleco (L018)', scientificName: 'Baryancistrus xanthellus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 213, nameVi: 'Snowball pleco', nameEn: 'Snowball Pleco (L102)', scientificName: 'Hypancistrus inspector', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 214, nameVi: 'Queen Arabesque pleco', nameEn: 'Queen Arabesque Pleco (L260)', scientificName: 'Hypancistrus sp. L260', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 215, nameVi: 'King Tiger pleco', nameEn: 'King Tiger Pleco (L066)', scientificName: 'Hypancistrus sp. L066', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 216, nameVi: 'L066 King Tiger Pleco', nameEn: 'Network King Tiger Pleco', scientificName: 'Hypancistrus sp. L066 Network', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 217, nameVi: 'L333 King Tiger Pleco', nameEn: 'Xingu King Tiger Pleco', scientificName: 'Hypancistrus sp. L333', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 218, nameVi: 'L134 Leopard Frog Pleco', nameEn: 'Leopard Frog Pleco', scientificName: 'Peckoltia compta', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 219, nameVi: 'L144 Lemon Blue Eye Ancistrus', nameEn: 'Lemon Blue Eye Bushynose', scientificName: 'Ancistrus sp. L144', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 220, nameVi: 'Bristlenose pleco', nameEn: 'Bristlenose Pleco', scientificName: 'Ancistrus cirrhosus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 221, nameVi: 'Albino bristlenose', nameEn: 'Albino Bristlenose Pleco', scientificName: 'Ancistrus sp. Albino', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 222, nameVi: 'Longfin bristlenose', nameEn: 'Longfin Bristlenose Pleco', scientificName: 'Ancistrus sp. Longfin', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 223, nameVi: 'Super Red bristlenose', nameEn: 'Super Red Bristlenose Pleco', scientificName: 'Ancistrus sp. Super Red', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 224, nameVi: 'Blue-eyed bristlenose', nameEn: 'Blue-Eyed Bristlenose Pleco', scientificName: 'Ancistrus sp. Blue Eye', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 225, nameVi: 'Bushynose pleco', nameEn: 'Common Bushynose Pleco', scientificName: 'Ancistrus sp. Bushynose', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 226, nameVi: 'Medusa pleco', nameEn: 'Medusa Pleco', scientificName: 'Ancistrus ranunculus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 227, nameVi: 'Vampire pleco', nameEn: 'Vampire Pleco (L240)', scientificName: 'Leporacanthicus galaxias', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 228, nameVi: 'Sultan pleco', nameEn: 'Sultan Pleco (L264)', scientificName: 'Leporacanthicus joselimai', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 229, nameVi: 'Sunshine pleco', nameEn: 'Sunshine Pleco (L014)', scientificName: 'Scobinancistrus aureatus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 230, nameVi: 'Green Phantom pleco', nameEn: 'Green Phantom Pleco (L200)', scientificName: 'Hemiancistrus subviridis', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 231, nameVi: 'Blue Phantom pleco', nameEn: 'Blue Phantom Pleco (L128)', scientificName: 'Hemiancistrus sp. L128', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 232, nameVi: 'Goldie pleco', nameEn: 'Goldie Pleco (L014 Small)', scientificName: 'Baryancistrus xanthellus var. Goldie', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 233, nameVi: 'Butterfly pleco', nameEn: 'Butterfly Pleco (L168)', scientificName: 'Dekeyseria pulchra', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 234, nameVi: 'Royal Tiger pleco', nameEn: 'Royal Tiger Pleco', scientificName: 'Panaque sp. Royal Tiger', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 235, nameVi: 'Blue-eyed panaque', nameEn: 'Blue-Eyed Panaque', scientificName: 'Panaque cochliodon', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 236, nameVi: 'Royal panaque select', nameEn: 'Royal Panaque Select', scientificName: 'Panaque nigrolineatus var. Select', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 237, nameVi: 'Mega Clown pleco', nameEn: 'Mega Clown Pleco (L340)', scientificName: 'Panaqolus sp. L340', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 238, nameVi: 'Zebra pleco wild', nameEn: 'Zebra Pleco Wild Type', scientificName: 'Hypancistrus zebra var. Wild', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 239, nameVi: 'L260 Queen Arabesque', nameEn: 'L260 Queen Arabesque Pleco', scientificName: 'Hypancistrus sp. L260 Select', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 240, nameVi: 'L046 Zebra Pleco', nameEn: 'L046 Imperial Zebra Pleco', scientificName: 'Hypancistrus zebra L046', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 241, nameVi: 'L070 Pseudacanthicus', nameEn: 'L070 Cactus Pleco', scientificName: 'Pseudacanthicus sp. L070', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 242, nameVi: 'L114 Leopard Cactus Pleco', nameEn: 'Leopard Cactus Pleco (L114)', scientificName: 'Pseudacanthicus leopardus', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 243, nameVi: 'L190 Royal Pleco', nameEn: 'L190 Royal Panaque Pleco', scientificName: 'Panaque nigrolineatus L190', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 244, nameVi: 'L200 Green Phantom', nameEn: 'L200 Green Phantom Pleco', scientificName: 'Hemiancistrus subviridis L200', categoryGroup: 'ca-pleco-lau-kinh' },
  { no: 245, nameVi: 'L397 Panaqolus', nameEn: 'L397 Alenquer Tiger Pleco', scientificName: 'Panaqolus sp. L397', categoryGroup: 'ca-pleco-lau-kinh' },

  // 246–275. Cá chạch, loach
  { no: 246, nameVi: 'Kuhli loach', nameEn: 'Kuhli Loach', scientificName: 'Pangio kuhlii', categoryGroup: 'ca-chach-loach' },
  { no: 247, nameVi: 'Java kuhli', nameEn: 'Java Kuhli Loach', scientificName: 'Pangio semicincta', categoryGroup: 'ca-chach-loach' },
  { no: 248, nameVi: 'Black kuhli loach', nameEn: 'Black Kuhli Loach', scientificName: 'Pangio oblonga', categoryGroup: 'ca-chach-loach' },
  { no: 249, nameVi: 'Yoyo loach', nameEn: 'Yoyo Loach', scientificName: 'Botia almorhae', categoryGroup: 'ca-chach-loach' },
  { no: 250, nameVi: 'Clown loach', nameEn: 'Clown Loach', scientificName: 'Chromobotia macracanthus', categoryGroup: 'ca-chach-loach' },
  { no: 251, nameVi: 'Zebra loach', nameEn: 'Zebra Loach', scientificName: 'Botia striata', categoryGroup: 'ca-chach-loach' },
  { no: 252, nameVi: 'Dwarf chain loach', nameEn: 'Dwarf Chain Loach', scientificName: 'Ambastaia sidthimunki', categoryGroup: 'ca-chach-loach' },
  { no: 253, nameVi: 'Burmese border loach', nameEn: 'Burmese Border Loach', scientificName: 'Botia histrionica', categoryGroup: 'ca-chach-loach' },
  { no: 254, nameVi: 'Skunk loach', nameEn: 'Skunk Loach', scientificName: 'Yasuhikotakia morleti', categoryGroup: 'ca-chach-loach' },
  { no: 255, nameVi: 'Pakistani loach', nameEn: 'Pakistani / Yoyo Loach', scientificName: 'Botia lohachata', categoryGroup: 'ca-chach-loach' },
  { no: 256, nameVi: 'Tiger loach', nameEn: 'Tiger Loach', scientificName: 'Syncrossus hymenophysa', categoryGroup: 'ca-chach-loach' },
  { no: 257, nameVi: 'Horseface loach', nameEn: 'Horseface Loach', scientificName: 'Acantopsis choirorhynchos', categoryGroup: 'ca-chach-loach' },
  { no: 258, nameVi: 'Reticulated hillstream loach', nameEn: 'Reticulated Hillstream Loach', scientificName: 'Sewellia lineolata', categoryGroup: 'ca-chach-loach' },
  { no: 259, nameVi: 'Butterfly hillstream loach', nameEn: 'Butterfly Hillstream Loach', scientificName: 'Sewellia sp. Butterfly', categoryGroup: 'ca-chach-loach' },
  { no: 260, nameVi: 'Borneo sucker', nameEn: 'Borneo Sucker', scientificName: 'Gastromyzon punctulatus', categoryGroup: 'ca-chach-loach' },
  { no: 261, nameVi: 'Chinese hillstream loach', nameEn: 'Chinese Hillstream Loach', scientificName: 'Beaufortia kweichowensis', categoryGroup: 'ca-chach-loach' },
  { no: 262, nameVi: 'Burmese loach select', nameEn: 'Burmese Loach Select', scientificName: 'Botia histrionica var. Select', categoryGroup: 'ca-chach-loach' },
  { no: 263, nameVi: 'Angelicus loach', nameEn: 'Angelicus Loach', scientificName: 'Botia kubotai', categoryGroup: 'ca-chach-loach' },
  { no: 264, nameVi: 'Golden zebra loach', nameEn: 'Golden Zebra Loach', scientificName: 'Botia histrionica var. Gold Zebra', categoryGroup: 'ca-chach-loach' },
  { no: 265, nameVi: 'Redtail botia', nameEn: 'Redtail Botia', scientificName: 'Yasuhikotakia modesta var. Redtail', categoryGroup: 'ca-chach-loach' },
  { no: 266, nameVi: 'Blue botia', nameEn: 'Blue Botia', scientificName: 'Yasuhikotakia modesta', categoryGroup: 'ca-chach-loach' },
  { no: 267, nameVi: 'Tiger botia select', nameEn: 'Tiger Botia Select', scientificName: 'Syncrossus hymenophysa var. Select', categoryGroup: 'ca-chach-loach' },
  { no: 268, nameVi: 'Dwarf loach select', nameEn: 'Dwarf Chain Loach Select', scientificName: 'Ambastaia sidthimunki var. Select', categoryGroup: 'ca-chach-loach' },
  { no: 269, nameVi: 'Rosy loach', nameEn: 'Rosy Loach Petruichthys', scientificName: 'Petruichthys sp.', categoryGroup: 'ca-chach-loach' },
  { no: 270, nameVi: 'Rosy loach Yasuhikotakia', nameEn: 'Rosy Loach Yasuhikotakia', scientificName: 'Yasuhikotakia sp. Rosy', categoryGroup: 'ca-chach-loach' },
  { no: 271, nameVi: 'Panda loach', nameEn: 'Panda Hillstream Loach', scientificName: 'Yaoshania pachychilus', categoryGroup: 'ca-chach-loach' },
  { no: 272, nameVi: 'Reticulated loach select', nameEn: 'Reticulated Hillstream Loach Select', scientificName: 'Sewellia lineolata var. Select', categoryGroup: 'ca-chach-loach' },
  { no: 273, nameVi: 'Spotted loach', nameEn: 'Spotted Loach', scientificName: 'Ambastaia nigrolineata', categoryGroup: 'ca-chach-loach' },
  { no: 274, nameVi: 'Zodiac loach', nameEn: 'Zodiac Loach', scientificName: 'Mesonoemacheilus triangularis', categoryGroup: 'ca-chach-loach' },
  { no: 275, nameVi: 'Burmese rosy loach', nameEn: 'Burmese Rosy Loach', scientificName: 'Petruichthys sp. Burma Rosy', categoryGroup: 'ca-chach-loach' },

  // 276–305. Cá vàng và cá chép cảnh
  { no: 276, nameVi: 'Cá vàng thường', nameEn: 'Common Goldfish', scientificName: 'Carassius auratus', categoryGroup: 'ca-koi-ca-vang' },
  { no: 277, nameVi: 'Cá vàng ba đuôi', nameEn: 'Fantail Goldfish', scientificName: 'Carassius auratus var. Fantail', categoryGroup: 'ca-koi-ca-vang' },
  { no: 278, nameVi: 'Ranchu', nameEn: 'Ranchu Goldfish', scientificName: 'Carassius auratus var. Ranchu', categoryGroup: 'ca-koi-ca-vang' },
  { no: 279, nameVi: 'Oranda', nameEn: 'Oranda Goldfish', scientificName: 'Carassius auratus var. Oranda', categoryGroup: 'ca-koi-ca-vang' },
  { no: 280, nameVi: 'Ryukin', nameEn: 'Ryukin Goldfish', scientificName: 'Carassius auratus var. Ryukin', categoryGroup: 'ca-koi-ca-vang' },
  { no: 281, nameVi: 'Fantail', nameEn: 'Fantail Goldfish Variety', scientificName: 'Carassius auratus var. Fantail-V', categoryGroup: 'ca-koi-ca-vang' },
  { no: 282, nameVi: 'Veiltail', nameEn: 'Veiltail Goldfish', scientificName: 'Carassius auratus var. Veiltail', categoryGroup: 'ca-koi-ca-vang' },
  { no: 283, nameVi: 'Telescope Eye', nameEn: 'Telescope Eye Goldfish', scientificName: 'Carassius auratus var. Telescope', categoryGroup: 'ca-koi-ca-vang' },
  { no: 284, nameVi: 'Black Moor', nameEn: 'Black Moor Goldfish', scientificName: 'Carassius auratus var. Black Moor', categoryGroup: 'ca-koi-ca-vang' },
  { no: 285, nameVi: 'Bubble Eye', nameEn: 'Bubble Eye Goldfish', scientificName: 'Carassius auratus var. Bubble Eye', categoryGroup: 'ca-koi-ca-vang' },
  { no: 286, nameVi: 'Celestial Eye', nameEn: 'Celestial Eye Goldfish', scientificName: 'Carassius auratus var. Celestial Eye', categoryGroup: 'ca-koi-ca-vang' },
  { no: 287, nameVi: 'Pearlscale', nameEn: 'Pearlscale Goldfish', scientificName: 'Carassius auratus var. Pearlscale', categoryGroup: 'ca-koi-ca-vang' },
  { no: 288, nameVi: 'Lionhead', nameEn: 'Lionhead Goldfish', scientificName: 'Carassius auratus var. Lionhead', categoryGroup: 'ca-koi-ca-vang' },
  { no: 289, nameVi: 'Pom Pom Goldfish', nameEn: 'Pom Pom Goldfish', scientificName: 'Carassius auratus var. Pom Pom', categoryGroup: 'ca-koi-ca-vang' },
  { no: 290, nameVi: 'Shubunkin', nameEn: 'Shubunkin Goldfish', scientificName: 'Carassius auratus var. Shubunkin', categoryGroup: 'ca-koi-ca-vang' },
  { no: 291, nameVi: 'Comet Goldfish', nameEn: 'Comet Goldfish', scientificName: 'Carassius auratus var. Comet', categoryGroup: 'ca-koi-ca-vang' },
  { no: 292, nameVi: 'Sarasa Comet', nameEn: 'Sarasa Comet Goldfish', scientificName: 'Carassius auratus var. Sarasa Comet', categoryGroup: 'ca-koi-ca-vang' },
  { no: 293, nameVi: 'Wakins Goldfish', nameEn: 'Wakin Goldfish', scientificName: 'Carassius auratus var. Wakin', categoryGroup: 'ca-koi-ca-vang' },
  { no: 294, nameVi: 'Jikin Goldfish', nameEn: 'Jikin Peacock Goldfish', scientificName: 'Carassius auratus var. Jikin', categoryGroup: 'ca-koi-ca-vang' },
  { no: 295, nameVi: 'Tosakin', nameEn: 'Tosakin Curly-tail Goldfish', scientificName: 'Carassius auratus var. Tosakin', categoryGroup: 'ca-koi-ca-vang' },
  { no: 296, nameVi: 'Cá chép Nhật', nameEn: 'Koi Fish / Nishikigoi', scientificName: 'Cyprinus carpio', categoryGroup: 'ca-koi-ca-vang' },
  { no: 297, nameVi: 'Kohaku Koi', nameEn: 'Kohaku Koi (Red & White)', scientificName: 'Cyprinus carpio var. Kohaku', categoryGroup: 'ca-koi-ca-vang' },
  { no: 298, nameVi: 'Taisho Sanke', nameEn: 'Taisho Sanke Koi (Red, White & Black)', scientificName: 'Cyprinus carpio var. Taisho Sanke', categoryGroup: 'ca-koi-ca-vang' },
  { no: 299, nameVi: 'Showa Sanshoku', nameEn: 'Showa Sanshoku Koi', scientificName: 'Cyprinus carpio var. Showa Sanshoku', categoryGroup: 'ca-koi-ca-vang' },
  { no: 300, nameVi: 'Shiro Utsuri', nameEn: 'Shiro Utsuri Koi (Black & White)', scientificName: 'Cyprinus carpio var. Shiro Utsuri', categoryGroup: 'ca-koi-ca-vang' },
  { no: 301, nameVi: 'Hi Utsuri', nameEn: 'Hi Utsuri Koi (Black & Red)', scientificName: 'Cyprinus carpio var. Hi Utsuri', categoryGroup: 'ca-koi-ca-vang' },
  { no: 302, nameVi: 'Asagi', nameEn: 'Asagi Koi (Blue Scale)', scientificName: 'Cyprinus carpio var. Asagi', categoryGroup: 'ca-koi-ca-vang' },
  { no: 303, nameVi: 'Shusui', nameEn: 'Shusui Koi (Doitsu Blue)', scientificName: 'Cyprinus carpio var. Shusui', categoryGroup: 'ca-koi-ca-vang' },
  { no: 304, nameVi: 'Goshiki', nameEn: 'Goshiki Koi (Five-Colored)', scientificName: 'Cyprinus carpio var. Goshiki', categoryGroup: 'ca-koi-ca-vang' },
  { no: 305, nameVi: 'Ogon', nameEn: 'Ogon Koi (Metallic Solid)', scientificName: 'Cyprinus carpio var. Ogon', categoryGroup: 'ca-koi-ca-vang' },

  // 306–340. Cichlid châu Phi
  { no: 306, nameVi: 'Electric Yellow Cichlid', nameEn: 'Electric Yellow Cichlid / Yellow Lab', scientificName: 'Labidochromis caeruleus', categoryGroup: 'cichlid-chau-phi' },
  { no: 307, nameVi: 'Demasoni Cichlid', nameEn: 'Demasoni Cichlid', scientificName: 'Chindongo demasoni', categoryGroup: 'cichlid-chau-phi' },
  { no: 308, nameVi: 'Zebra Mbuna', nameEn: 'Zebra Mbuna Cichlid', scientificName: 'Maylandia zebra', categoryGroup: 'cichlid-chau-phi' },
  { no: 309, nameVi: 'Acei Cichlid', nameEn: 'Yellow Tail Acei Cichlid', scientificName: 'Pseudotropheus acei', categoryGroup: 'cichlid-chau-phi' },
  { no: 310, nameVi: 'Blue Johanni', nameEn: 'Blue Johanni Cichlid', scientificName: 'Melanochromis cyaneorhabdos', categoryGroup: 'cichlid-chau-phi' },
  { no: 311, nameVi: 'Auratus', nameEn: 'Golden Mbuna / Auratus', scientificName: 'Melanochromis auratus', categoryGroup: 'cichlid-chau-phi' },
  { no: 312, nameVi: 'Kenyi Cichlid', nameEn: 'Kenyi Cichlid', scientificName: 'Pseudotropheus lombardoi', categoryGroup: 'cichlid-chau-phi' },
  { no: 313, nameVi: 'Red Zebra', nameEn: 'Red Zebra Mbuna', scientificName: 'Maylandia estherae', categoryGroup: 'cichlid-chau-phi' },
  { no: 314, nameVi: 'Bumblebee Cichlid', nameEn: 'Bumblebee Cichlid / Hornet', scientificName: 'Pseudotropheus crabro', categoryGroup: 'cichlid-chau-phi' },
  { no: 315, nameVi: 'Rusty Cichlid', nameEn: 'Rusty Cichlid', scientificName: 'Iodotropheus sprengerae', categoryGroup: 'cichlid-chau-phi' },
  { no: 316, nameVi: 'Maingano', nameEn: 'Maingano Cichlid', scientificName: 'Melanochromis cyaneorhabdos var. Maingano', categoryGroup: 'cichlid-chau-phi' },
  { no: 317, nameVi: 'Frontosa', nameEn: 'Frontosa Cichlid', scientificName: 'Cyphotilapia frontosa', categoryGroup: 'cichlid-chau-phi' },
  { no: 318, nameVi: 'Burundi Frontosa', nameEn: 'Burundi Frontosa Cichlid', scientificName: 'Cyphotilapia gibberosa', categoryGroup: 'cichlid-chau-phi' },
  { no: 319, nameVi: 'Peacock Cichlid', nameEn: 'Peacock Cichlid', scientificName: 'Aulonocara sp.', categoryGroup: 'cichlid-chau-phi' },
  { no: 320, nameVi: 'Sunshine Peacock', nameEn: 'Sunshine Peacock Cichlid', scientificName: 'Aulonocara baenschi', categoryGroup: 'cichlid-chau-phi' },
  { no: 321, nameVi: 'OB Peacock', nameEn: 'OB Peacock Cichlid', scientificName: 'Aulonocara sp. OB', categoryGroup: 'cichlid-chau-phi' },
  { no: 322, nameVi: 'Blue Peacock', nameEn: 'Flavescent / Blue Peacock', scientificName: 'Aulonocara stuartgranti', categoryGroup: 'cichlid-chau-phi' },
  { no: 323, nameVi: 'Red Peacock', nameEn: 'Ruby Red Peacock Cichlid', scientificName: 'Aulonocara rubescens', categoryGroup: 'cichlid-chau-phi' },
  { no: 324, nameVi: 'Dragon Blood Peacock', nameEn: 'Dragon Blood Peacock Cichlid', scientificName: 'Aulonocara sp. Dragon Blood', categoryGroup: 'cichlid-chau-phi' },
  { no: 325, nameVi: 'Venustus', nameEn: 'Giraffe Cichlid / Venustus', scientificName: 'Nimbochromis venustus', categoryGroup: 'cichlid-chau-phi' },
  { no: 326, nameVi: 'Livingstoni', nameEn: 'Livingstoni Cichlid', scientificName: 'Nimbochromis livingstonii', categoryGroup: 'cichlid-chau-phi' },
  { no: 327, nameVi: 'Compressiceps', nameEn: 'Malawi Eyebiter / Compressiceps', scientificName: 'Dimidiochromis compressiceps', categoryGroup: 'cichlid-chau-phi' },
  { no: 328, nameVi: 'Electric Blue Hap', nameEn: 'Electric Blue Hap', scientificName: 'Sciaenochromis fryeri', categoryGroup: 'cichlid-chau-phi' },
  { no: 329, nameVi: 'Copadichromis borleyi', nameEn: 'Red Fin Borleyi / Kadango', scientificName: 'Copadichromis borleyi', categoryGroup: 'cichlid-chau-phi' },
  { no: 330, nameVi: 'Cyrtocara moorii', nameEn: 'Blue Dolphin Cichlid', scientificName: 'Cyrtocara moorii', categoryGroup: 'cichlid-chau-phi' },
  { no: 331, nameVi: 'Dolphin Cichlid', nameEn: 'Malawi Blue Dolphin Cichlid', scientificName: 'Cyrtocara moorii var. Select', categoryGroup: 'cichlid-chau-phi' },
  { no: 332, nameVi: 'Tropheus duboisi', nameEn: 'White-Spotted Tropheus / Dubois', scientificName: 'Tropheus duboisi', categoryGroup: 'cichlid-chau-phi' },
  { no: 333, nameVi: 'Tropheus moorii', nameEn: 'Blunthead Cichlid / Tropheus Moorii', scientificName: 'Tropheus moorii', categoryGroup: 'cichlid-chau-phi' },
  { no: 334, nameVi: 'Julidochromis transcriptus', nameEn: 'Masked Julie Cichlid', scientificName: 'Julidochromis transcriptus', categoryGroup: 'cichlid-chau-phi' },
  { no: 335, nameVi: 'Julidochromis marlieri', nameEn: 'Marlier\'s Julie Cichlid', scientificName: 'Julidochromis marlieri', categoryGroup: 'cichlid-chau-phi' },
  { no: 336, nameVi: 'Neolamprologus multifasciatus', nameEn: 'Shell-Dweller Cichlid / Multi', scientificName: 'Neolamprologus multifasciatus', categoryGroup: 'cichlid-chau-phi' },
  { no: 337, nameVi: 'Neolamprologus brichardi', nameEn: 'Princess of Burundi / Brichardi', scientificName: 'Neolamprologus brichardi', categoryGroup: 'cichlid-chau-phi' },
  { no: 338, nameVi: 'Neolamprologus leleupi', nameEn: 'Lemon Cichlid / Leleupi', scientificName: 'Neolamprologus leleupi', categoryGroup: 'cichlid-chau-phi' },
  { no: 339, nameVi: 'Altolamprologus calvus', nameEn: 'Calvus Cichlid', scientificName: 'Altolamprologus calvus', categoryGroup: 'cichlid-chau-phi' },
  { no: 340, nameVi: 'Altolamprologus compressiceps', nameEn: 'Compressiceps Cichlid Tanganyika', scientificName: 'Altolamprologus compressiceps', categoryGroup: 'cichlid-chau-phi' },

  // 341–380. Cichlid Nam Mỹ và Trung Mỹ
  { no: 341, nameVi: 'Cá thần tiên', nameEn: 'Freshwater Angelfish', scientificName: 'Pterophyllum scalare', categoryGroup: 'cichlid-nam-my' },
  { no: 342, nameVi: 'Altum angelfish', nameEn: 'Altum Angelfish', scientificName: 'Pterophyllum altum', categoryGroup: 'cichlid-nam-my' },
  { no: 343, nameVi: 'Leopold\'s angelfish', nameEn: 'Dwarf Angelfish / Leopold\'s', scientificName: 'Pterophyllum leopoldi', categoryGroup: 'cichlid-nam-my' },
  { no: 344, nameVi: 'Cá dĩa xanh', nameEn: 'Blue / Green Discus', scientificName: 'Symphysodon aequifasciatus', categoryGroup: 'cichlid-nam-my' },
  { no: 345, nameVi: 'Cá dĩa Heckel', nameEn: 'Heckel Discus', scientificName: 'Symphysodon discus', categoryGroup: 'cichlid-nam-my' },
  { no: 346, nameVi: 'Oscar', nameEn: 'Oscar Fish', scientificName: 'Astronotus ocellatus', categoryGroup: 'cichlid-nam-my' },
  { no: 347, nameVi: 'Severum', nameEn: 'Banded Severum', scientificName: 'Heros severus', categoryGroup: 'cichlid-nam-my' },
  { no: 348, nameVi: 'Green Terror', nameEn: 'Green Terror Cichlid', scientificName: 'Andinoacara rivulatus', categoryGroup: 'cichlid-nam-my' },
  { no: 349, nameVi: 'Blue Acara', nameEn: 'Blue Acara Cichlid', scientificName: 'Andinoacara pulcher', categoryGroup: 'cichlid-nam-my' },
  { no: 350, nameVi: 'Electric Blue Acara', nameEn: 'Electric Blue Acara Cichlid', scientificName: 'Andinoacara pulcher var. Electric Blue', categoryGroup: 'cichlid-nam-my' },
  { no: 351, nameVi: 'Jack Dempsey', nameEn: 'Jack Dempsey Cichlid', scientificName: 'Rocio octofasciata', categoryGroup: 'cichlid-nam-my' },
  { no: 352, nameVi: 'Convict Cichlid', nameEn: 'Convict Cichlid', scientificName: 'Amatitlania nigrofasciata', categoryGroup: 'cichlid-nam-my' },
  { no: 353, nameVi: 'Firemouth', nameEn: 'Firemouth Cichlid', scientificName: 'Thorichthys meeki', categoryGroup: 'cichlid-nam-my' },
  { no: 354, nameVi: 'Texas Cichlid', nameEn: 'Texas Cichlid', scientificName: 'Herichthys cyanoguttatus', categoryGroup: 'cichlid-nam-my' },
  { no: 355, nameVi: 'Flowerhorn', nameEn: 'Flowerhorn Cichlid', scientificName: 'Amphilophus hybrid (Flowerhorn)', categoryGroup: 'cichlid-nam-my' },
  { no: 356, nameVi: 'Blood Parrot', nameEn: 'Blood Parrot Cichlid', scientificName: 'Amphilophus hybrid (Blood Parrot)', categoryGroup: 'cichlid-nam-my' },
  { no: 357, nameVi: 'Midas Cichlid', nameEn: 'Midas Cichlid', scientificName: 'Amphilophus citrinellus', categoryGroup: 'cichlid-nam-my' },
  { no: 358, nameVi: 'Red Devil', nameEn: 'Red Devil Cichlid', scientificName: 'Amphilophus labiatus', categoryGroup: 'cichlid-nam-my' },
  { no: 359, nameVi: 'Jaguar Cichlid', nameEn: 'Jaguar Cichlid', scientificName: 'Parachromis managuensis', categoryGroup: 'cichlid-nam-my' },
  { no: 360, nameVi: 'Wolf Cichlid', nameEn: 'Wolf Cichlid (Dovii)', scientificName: 'Parachromis dovii', categoryGroup: 'cichlid-nam-my' },
  { no: 361, nameVi: 'Green Terror select', nameEn: 'Green Terror Cichlid Select', scientificName: 'Andinoacara rivulatus var. Select', categoryGroup: 'cichlid-nam-my' },
  { no: 362, nameVi: 'Ram Cichlid', nameEn: 'German Blue Ram', scientificName: 'Mikrogeophagus ramirezi', categoryGroup: 'cichlid-nam-my' },
  { no: 363, nameVi: 'Bolivian Ram', nameEn: 'Bolivian Ram', scientificName: 'Mikrogeophagus altispinosus', categoryGroup: 'cichlid-nam-my' },
  { no: 364, nameVi: 'Apistogramma cacatuoides', nameEn: 'Cockatoo Dwarf Cichlid', scientificName: 'Apistogramma cacatuoides', categoryGroup: 'cichlid-nam-my' },
  { no: 365, nameVi: 'Apistogramma agassizii', nameEn: 'Agassiz\'s Dwarf Cichlid', scientificName: 'Apistogramma agassizii', categoryGroup: 'cichlid-nam-my' },
  { no: 366, nameVi: 'Apistogramma borellii', nameEn: 'Borelli\'s Dwarf Cichlid', scientificName: 'Apistogramma borellii', categoryGroup: 'cichlid-nam-my' },
  { no: 367, nameVi: 'Apistogramma macmasteri', nameEn: 'Macmaster\'s Dwarf Cichlid', scientificName: 'Apistogramma macmasteri', categoryGroup: 'cichlid-nam-my' },
  { no: 368, nameVi: 'Apistogramma trifasciata', nameEn: 'Three-Stripe Dwarf Cichlid', scientificName: 'Apistogramma trifasciata', categoryGroup: 'cichlid-nam-my' },
  { no: 369, nameVi: 'Apistogramma panduro', nameEn: 'Panduro Dwarf Cichlid', scientificName: 'Apistogramma panduro', categoryGroup: 'cichlid-nam-my' },
  { no: 370, nameVi: 'Apistogramma hongsloi', nameEn: 'Hongslo\'s Dwarf Cichlid', scientificName: 'Apistogramma hongsloi', categoryGroup: 'cichlid-nam-my' },
  { no: 371, nameVi: 'Geophagus altifrons', nameEn: 'Altifrons Eartheater', scientificName: 'Geophagus altifrons', categoryGroup: 'cichlid-nam-my' },
  { no: 372, nameVi: 'Geophagus sveni', nameEn: 'Sveni Eartheater', scientificName: 'Geophagus sveni', categoryGroup: 'cichlid-nam-my' },
  { no: 373, nameVi: 'Geophagus brasiliensis', nameEn: 'Pearl Cichlid / Eartheater', scientificName: 'Geophagus brasiliensis', categoryGroup: 'cichlid-nam-my' },
  { no: 374, nameVi: 'Satanoperca jurupari', nameEn: 'Demon Eartheater / Jurupari', scientificName: 'Satanoperca jurupari', categoryGroup: 'cichlid-nam-my' },
  { no: 375, nameVi: 'Uaru amphiacanthoides', nameEn: 'Uaru Cichlid', scientificName: 'Uaru amphiacanthoides', categoryGroup: 'cichlid-nam-my' },
  { no: 376, nameVi: 'Mesonauta festivus', nameEn: 'Flag Cichlid / Festivum', scientificName: 'Mesonauta festivus', categoryGroup: 'cichlid-nam-my' },
  { no: 377, nameVi: 'Heros efasciatus', nameEn: 'Red Shoulder Severum', scientificName: 'Heros efasciatus', categoryGroup: 'cichlid-nam-my' },
  { no: 378, nameVi: 'Heros notatus', nameEn: 'Spotted Severum', scientificName: 'Heros notatus', categoryGroup: 'cichlid-nam-my' },
  { no: 379, nameVi: 'Heros liberifer', nameEn: 'Mouthbrooding Severum', scientificName: 'Heros liberifer', categoryGroup: 'cichlid-nam-my' },
  { no: 380, nameVi: 'Dicrossus filamentosus', nameEn: 'Checkerboard Cichlid', scientificName: 'Dicrossus filamentosus', categoryGroup: 'cichlid-nam-my' },

  // 381–405. Cá cầu vồng
  { no: 381, nameVi: 'Boesemani Rainbowfish', nameEn: 'Boeseman\'s Rainbowfish', scientificName: 'Melanotaenia boesemani', categoryGroup: 'ca-cau-vong' },
  { no: 382, nameVi: 'Red Rainbowfish', nameEn: 'Red Rainbowfish', scientificName: 'Glossolepis incisus', categoryGroup: 'ca-cau-vong' },
  { no: 383, nameVi: 'Turquoise Rainbowfish', nameEn: 'Turquoise Rainbowfish', scientificName: 'Melanotaenia lacustris', categoryGroup: 'ca-cau-vong' },
  { no: 384, nameVi: 'Dwarf Neon Rainbowfish', nameEn: 'Dwarf Neon Rainbowfish', scientificName: 'Melanotaenia praecox', categoryGroup: 'ca-cau-vong' },
  { no: 385, nameVi: 'Australian Rainbowfish', nameEn: 'Australian Rainbowfish', scientificName: 'Melanotaenia fluviatilis', categoryGroup: 'ca-cau-vong' },
  { no: 386, nameVi: 'Parkinson\'s Rainbowfish', nameEn: 'Parkinson\'s Rainbowfish', scientificName: 'Melanotaenia parkinsoni', categoryGroup: 'ca-cau-vong' },
  { no: 387, nameVi: 'Lake Kutubu Rainbowfish', nameEn: 'Lake Kutubu Rainbowfish Select', scientificName: 'Melanotaenia lacustris var. Kutubu', categoryGroup: 'ca-cau-vong' },
  { no: 388, nameVi: 'Celebes Rainbowfish', nameEn: 'Celebes Rainbowfish', scientificName: 'Marosatherina ladigesi', categoryGroup: 'ca-cau-vong' },
  { no: 389, nameVi: 'Threadfin Rainbowfish', nameEn: 'Threadfin Rainbowfish', scientificName: 'Iriatherina werneri', categoryGroup: 'ca-cau-vong' },
  { no: 390, nameVi: 'Madagascar Rainbowfish', nameEn: 'Madagascar Rainbowfish', scientificName: 'Bedotia madagascariensis', categoryGroup: 'ca-cau-vong' },
  { no: 391, nameVi: 'Red Neon Rainbowfish', nameEn: 'Red Neon Rainbowfish Select', scientificName: 'Melanotaenia praecox var. Red Neon', categoryGroup: 'ca-cau-vong' },
  { no: 392, nameVi: 'Axelrod\'s Rainbowfish', nameEn: 'Axelrod\'s Rainbowfish', scientificName: 'Chilatherina axelrodi', categoryGroup: 'ca-cau-vong' },
  { no: 393, nameVi: 'Bleher\'s Rainbowfish', nameEn: 'Bleher\'s Rainbowfish', scientificName: 'Chilatherina bleheri', categoryGroup: 'ca-cau-vong' },
  { no: 394, nameVi: 'Lake Wanam Rainbowfish', nameEn: 'Lake Wanam Rainbowfish', scientificName: 'Glossolepis wanamensis', categoryGroup: 'ca-cau-vong' },
  { no: 395, nameVi: 'Lake Kutubu Rainbowfish Wild', nameEn: 'Lake Kutubu Rainbowfish Wild', scientificName: 'Melanotaenia lacustris var. Wild', categoryGroup: 'ca-cau-vong' },
  { no: 396, nameVi: 'Lake Tebera Rainbowfish', nameEn: 'Lake Tebera Rainbowfish', scientificName: 'Melanotaenia herbertaxelrodi', categoryGroup: 'ca-cau-vong' },
  { no: 397, nameVi: 'Lake Wapoga Rainbowfish', nameEn: 'Lake Wapoga Rainbowfish', scientificName: 'Melanotaenia irianjaya', categoryGroup: 'ca-cau-vong' },
  { no: 398, nameVi: 'Lake Sentani Rainbowfish', nameEn: 'Lake Sentani Rainbowfish', scientificName: 'Chilatherina sentaniensis', categoryGroup: 'ca-cau-vong' },
  { no: 399, nameVi: 'Spotted Blue-eye', nameEn: 'Spotted Blue-Eye', scientificName: 'Pseudomugil gertrudae', categoryGroup: 'ca-cau-vong' },
  { no: 400, nameVi: 'Forktail Blue-eye', nameEn: 'Forktail Blue-Eye', scientificName: 'Pseudomugil furcatus', categoryGroup: 'ca-cau-vong' },
  { no: 401, nameVi: 'Red Neon Blue-eye', nameEn: 'Red Neon Blue-Eye (Luminatus)', scientificName: 'Pseudomugil luminatus', categoryGroup: 'ca-cau-vong' },
  { no: 402, nameVi: 'Pacific Blue-eye', nameEn: 'Pacific Blue-Eye', scientificName: 'Pseudomugil signifer', categoryGroup: 'ca-cau-vong' },
  { no: 403, nameVi: 'Celebes Halfbeak', nameEn: 'Celebes Halfbeak', scientificName: 'Nomorhamphus liemi', categoryGroup: 'ca-cau-vong' },
  { no: 404, nameVi: 'Wrestling Halfbeak', nameEn: 'Wrestling Halfbeak', scientificName: 'Dermogenys pusillus', categoryGroup: 'ca-cau-vong' },
  { no: 405, nameVi: 'Silver Halfbeak', nameEn: 'Silver Halfbeak Select', scientificName: 'Dermogenys pusillus var. Silver', categoryGroup: 'ca-cau-vong' },

  // 406–430. Cá Killifish và cá nhỏ đặc biệt
  { no: 406, nameVi: 'Golden Wonder Killifish', nameEn: 'Golden Wonder Killifish', scientificName: 'Aplocheilus lineatus', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 407, nameVi: 'Blue Panchax', nameEn: 'Blue Panchax Killifish', scientificName: 'Aplocheilus panchax', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 408, nameVi: 'Clown Killifish', nameEn: 'Clown Killifish', scientificName: 'Epiplatys annulatus', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 409, nameVi: 'Gardneri Killifish', nameEn: 'Gardneri Killifish', scientificName: 'Fundulopanchax gardneri', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 410, nameVi: 'Blue Gularis', nameEn: 'Blue Gularis Killifish', scientificName: 'Fundulopanchax sjoestedti', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 411, nameVi: 'Nothobranchius rachovii', nameEn: 'Rachov\'s Nothobranchius', scientificName: 'Nothobranchius rachovii', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 412, nameVi: 'Nothobranchius guentheri', nameEn: 'Guenther\'s Nothobranchius', scientificName: 'Nothobranchius guentheri', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 413, nameVi: 'Aphyosemion australe', nameEn: 'Lyretail Killifish / Australe', scientificName: 'Aphyosemion australe', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 414, nameVi: 'Aphyosemion striatum', nameEn: 'Five-Banded Killifish / Striatum', scientificName: 'Aphyosemion striatum', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 415, nameVi: 'Aphyosemion gardneri select', nameEn: 'Steel-Blue Killifish Gardneri', scientificName: 'Aphyosemion gardneri', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 416, nameVi: 'Lampeye Killifish', nameEn: 'Norman\'s Lampeye Killifish', scientificName: 'Poropanchax normani', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 417, nameVi: 'Norman\'s Lampeye', nameEn: 'Norman\'s Lampeye Select', scientificName: 'Poropanchax normani var. Select', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 418, nameVi: 'Rocket Panchax', nameEn: 'Rocket / Red-Throated Panchax', scientificName: 'Epiplatys dageti', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 419, nameVi: 'Pseudepiplatys annulatus', nameEn: 'Banded Lampeye / Clown Killi', scientificName: 'Pseudepiplatys annulatus', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 420, nameVi: 'Bluefin Notho', nameEn: 'Bluefin Nothobranchius Rachovii', scientificName: 'Nothobranchius rachovii var. Bluefin', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 421, nameVi: 'Daisy\'s Ricefish', nameEn: 'Daisy\'s Ricefish', scientificName: 'Oryzias woworae', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 422, nameVi: 'Japanese Ricefish', nameEn: 'Japanese Ricefish / Medaka', scientificName: 'Oryzias latipes', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 423, nameVi: 'Medaka', nameEn: 'Medaka Ornamental Ricefish', scientificName: 'Oryzias latipes var. Medaka', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 424, nameVi: 'Japanese Ricefish Sakaizumi', nameEn: 'Sakaizumi Ricefish', scientificName: 'Oryzias sakaizumii', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 425, nameVi: 'Celebes Ricefish', nameEn: 'Celebes Ricefish', scientificName: 'Oryzias celebensis', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 426, nameVi: 'Blue Axolotl fish', nameEn: 'Axolotl Blue Salamander Fish', scientificName: 'Ambystoma mexicanum var. Blue', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 427, nameVi: 'Glassfish', nameEn: 'Indian Glassy Fish', scientificName: 'Parambassis ranga', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 428, nameVi: 'Indian glassy fish', nameEn: 'High-Fin Glassy Fish', scientificName: 'Parambassis lala', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 429, nameVi: 'Bumblebee goby', nameEn: 'Bumblebee Goby', scientificName: 'Brachygobius doriae', categoryGroup: 'ca-killifish-ti-hon' },
  { no: 430, nameVi: 'Knight goby', nameEn: 'Knight Goby', scientificName: 'Stigmatogobius sadanundio', categoryGroup: 'ca-killifish-ti-hon' },

  // 431–455. Cá nóc, cá dao, cá đặc biệt
  { no: 431, nameVi: 'Cá nóc mắt đỏ', nameEn: 'Red-Eye Puffer', scientificName: 'Carinotetraodon lorteti', categoryGroup: 'ca-noc-dac-biet' },
  { no: 432, nameVi: 'Cá nóc da beo', nameEn: 'Green Spotted Puffer', scientificName: 'Dichotomyctere nigroviridis', categoryGroup: 'ca-noc-dac-biet' },
  { no: 433, nameVi: 'Cá nóc tám chấm', nameEn: 'Figure-8 Puffer', scientificName: 'Dichotomyctere biocellatus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 434, nameVi: 'Cá nóc Fahaka', nameEn: 'Fahaka Puffer', scientificName: 'Tetraodon lineatus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 435, nameVi: 'Cá nóc Congo', nameEn: 'Congo Puffer / Red Puffer', scientificName: 'Tetraodon miurus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 436, nameVi: 'Cá nóc Mbu', nameEn: 'Mbu Puffer Giant', scientificName: 'Tetraodon mbu', categoryGroup: 'ca-noc-dac-biet' },
  { no: 437, nameVi: 'Cá nóc lùn', nameEn: 'Dwarf Pea Puffer', scientificName: 'Carinotetraodon travancoricus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 438, nameVi: 'Cá nóc Figure 8', nameEn: 'Figure Eight Puffer Select', scientificName: 'Dichotomyctere ocellatus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 439, nameVi: 'Cá nóc xanh', nameEn: 'Yellow-Green Puffer', scientificName: 'Dichotomyctere fluviatilis', categoryGroup: 'ca-noc-dac-biet' },
  { no: 440, nameVi: 'Cá dao ma đen', nameEn: 'Black Ghost Knifefish', scientificName: 'Apteronotus albifrons', categoryGroup: 'ca-noc-dac-biet' },
  { no: 441, nameVi: 'Cá dao ma', nameEn: 'Ghost Knifefish Wild', scientificName: 'Apteronotus albifrons var. Wild', categoryGroup: 'ca-noc-dac-biet' },
  { no: 442, nameVi: 'Cá dao kính', nameEn: 'Glass Knifefish', scientificName: 'Eigenmannia virescens', categoryGroup: 'ca-noc-dac-biet' },
  { no: 443, nameVi: 'Cá dao ma thủy tinh', nameEn: 'Transparent Glass Knifefish', scientificName: 'Eigenmannia virescens var. Clear', categoryGroup: 'ca-noc-dac-biet' },
  { no: 444, nameVi: 'Cá voi ma', nameEn: 'Elephantnose Knifefish', scientificName: 'Sternarchorhynchus sp.', categoryGroup: 'ca-noc-dac-biet' },
  { no: 445, nameVi: 'Elephantnose fish', nameEn: 'Peter\'s Elephantnose Fish', scientificName: 'Gnathonemus petersii', categoryGroup: 'ca-noc-dac-biet' },
  { no: 446, nameVi: 'Black Ghost Knifefish select', nameEn: 'Black Ghost Knifefish Select', scientificName: 'Apteronotus albifrons var. Select', categoryGroup: 'ca-noc-dac-biet' },
  { no: 447, nameVi: 'African Butterfly Fish', nameEn: 'African Butterflyfish', scientificName: 'Pantodon buchholzi', categoryGroup: 'ca-noc-dac-biet' },
  { no: 448, nameVi: 'Silver Hatchetfish', nameEn: 'Silver Hatchetfish', scientificName: 'Gasteropelecus sternicla', categoryGroup: 'ca-noc-dac-biet' },
  { no: 449, nameVi: 'Marbled Hatchetfish', nameEn: 'Marbled Hatchetfish', scientificName: 'Carnegiella strigata', categoryGroup: 'ca-noc-dac-biet' },
  { no: 450, nameVi: 'Blackwing Hatchetfish', nameEn: 'Blackwing Hatchetfish', scientificName: 'Carnegiella marthae', categoryGroup: 'ca-noc-dac-biet' },
  { no: 451, nameVi: 'Common Hatchetfish', nameEn: 'Common River Hatchetfish', scientificName: 'Gasteropelecus sternicla var. Common', categoryGroup: 'ca-noc-dac-biet' },
  { no: 452, nameVi: 'Spotted Hatchetfish', nameEn: 'Spotted Hatchetfish', scientificName: 'Gasteropelecus maculatus', categoryGroup: 'ca-noc-dac-biet' },
  { no: 453, nameVi: 'Silver Dollar', nameEn: 'Silver Dollar Fish', scientificName: 'Metynnis hypsauchen', categoryGroup: 'ca-noc-dac-biet' },
  { no: 454, nameVi: 'Red Hook Silver Dollar', nameEn: 'Red Hook Silver Dollar', scientificName: 'Myloplus rubripinnis', categoryGroup: 'ca-noc-dac-biet' },
  { no: 455, nameVi: 'Black Bar Silver Dollar', nameEn: 'Black Bar Silver Dollar', scientificName: 'Myloplus schomburgkii', categoryGroup: 'ca-noc-dac-biet' },

  // 456–475. Cá Rồng, cá hổ, cá săn mồi
  { no: 456, nameVi: 'Cá ngân long', nameEn: 'Silver Arowana', scientificName: 'Osteoglossum bicirrhosum', categoryGroup: 'ca-san-moi-arowana' },
  { no: 457, nameVi: 'Cá thanh long', nameEn: 'Green Arowana', scientificName: 'Scleropages formosus var. Green', categoryGroup: 'ca-san-moi-arowana' },
  { no: 458, nameVi: 'Cá hắc long', nameEn: 'Black Arowana', scientificName: 'Scleropages macrocephalus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 459, nameVi: 'Cá huyết long', nameEn: 'Super Red Arowana', scientificName: 'Scleropages formosus var. Super Red', categoryGroup: 'ca-san-moi-arowana' },
  { no: 460, nameVi: 'Jardini Arowana', nameEn: 'Australian Jardini Arowana', scientificName: 'Scleropages jardinii', categoryGroup: 'ca-san-moi-arowana' },
  { no: 461, nameVi: 'Saratoga', nameEn: 'Southern Saratoga Arowana', scientificName: 'Scleropages leichardti', categoryGroup: 'ca-san-moi-arowana' },
  { no: 462, nameVi: 'Cá hổ Indo', nameEn: 'Indonesian Tigerfish', scientificName: 'Datnioides microlepis', categoryGroup: 'ca-san-moi-arowana' },
  { no: 463, nameVi: 'Cá hổ Thái', nameEn: 'Siamese Tigerfish', scientificName: 'Datnioides pulcher', categoryGroup: 'ca-san-moi-arowana' },
  { no: 464, nameVi: 'Cá hổ Papua', nameEn: 'Papuan Tigerfish', scientificName: 'Datnioides campbelli', categoryGroup: 'ca-san-moi-arowana' },
  { no: 465, nameVi: 'Cá hồng vỹ mỏ vịt', nameEn: 'Redtail Catfish', scientificName: 'Phractocephalus hemioliopterus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 466, nameVi: 'Cá tra dầu cảnh', nameEn: 'Giant Pangasius / Mekong Catfish', scientificName: 'Pangasianodon gigas', categoryGroup: 'ca-san-moi-arowana' },
  { no: 467, nameVi: 'Cá trê đuôi đỏ', nameEn: 'Redtail Catfish Variety', scientificName: 'Phractocephalus hemioliopterus var. Select', categoryGroup: 'ca-san-moi-arowana' },
  { no: 468, nameVi: 'Cá peacock bass', nameEn: 'Peacock Bass', scientificName: 'Cichla ocellaris', categoryGroup: 'ca-san-moi-arowana' },
  { no: 469, nameVi: 'Cichla temensis', nameEn: 'Speckled Peacock Bass', scientificName: 'Cichla temensis', categoryGroup: 'ca-san-moi-arowana' },
  { no: 470, nameVi: 'Cichla monoculus', nameEn: 'Tucunare Peacock Bass', scientificName: 'Cichla monoculus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 471, nameVi: 'Cá gar Florida', nameEn: 'Florida Gar', scientificName: 'Lepisosteus platyrhincus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 472, nameVi: 'Cá gar đốm', nameEn: 'Spotted Gar', scientificName: 'Lepisosteus oculatus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 473, nameVi: 'Cá gar mũi dài', nameEn: 'Longnose Gar', scientificName: 'Lepisosteus osseus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 474, nameVi: 'Cá gar nhiệt đới', nameEn: 'Tropical Gar', scientificName: 'Atractosteus tropicus', categoryGroup: 'ca-san-moi-arowana' },
  { no: 475, nameVi: 'Cá lóc cảnh', nameEn: 'Channa Snakehead', scientificName: 'Channa sp.', categoryGroup: 'ca-san-moi-arowana' },

  // 476–500. Cá cảnh biển và nước lợ
  { no: 476, nameVi: 'Cá hề ocellaris', nameEn: 'Ocellaris Clownfish (Nemo)', scientificName: 'Amphiprion ocellaris', categoryGroup: 'ca-bien' },
  { no: 477, nameVi: 'Cá hề percula', nameEn: 'True Percula Clownfish', scientificName: 'Amphiprion percula', categoryGroup: 'ca-bien' },
  { no: 478, nameVi: 'Cá hề tomato', nameEn: 'Tomato Clownfish', scientificName: 'Amphiprion frenatus', categoryGroup: 'ca-bien' },
  { no: 479, nameVi: 'Cá hề maroon', nameEn: 'Maroon Clownfish', scientificName: 'Premnas biaculeatus', categoryGroup: 'ca-bien' },
  { no: 480, nameVi: 'Cá hề skunk', nameEn: 'Pink Skunk Clownfish', scientificName: 'Amphiprion perideraion', categoryGroup: 'ca-bien' },
  { no: 481, nameVi: 'Cá hề Clarkii', nameEn: 'Clark\'s Anemonefish', scientificName: 'Amphiprion clarkii', categoryGroup: 'ca-bien' },
  { no: 482, nameVi: 'Cá hề saddleback', nameEn: 'Saddleback Clownfish', scientificName: 'Amphiprion polymnus', categoryGroup: 'ca-bien' },
  { no: 483, nameVi: 'Cá đuôi gai xanh', nameEn: 'Blue Tang (Dory)', scientificName: 'Paracanthurus hepatus', categoryGroup: 'ca-bien' },
  { no: 484, nameVi: 'Cá đuôi gai vàng', nameEn: 'Yellow Tang', scientificName: 'Zebrasoma flavescens', categoryGroup: 'ca-bien' },
  { no: 485, nameVi: 'Cá đuôi gai tím', nameEn: 'Purple Tang', scientificName: 'Zebrasoma xanthurum', categoryGroup: 'ca-bien' },
  { no: 486, nameVi: 'Cá đuôi gai nâu', nameEn: 'Brown Scope Tang', scientificName: 'Zebrasoma scopas', categoryGroup: 'ca-bien' },
  { no: 487, nameVi: 'Cá trạng nguyên', nameEn: 'Mandarin Dragonet', scientificName: 'Synchiropus splendidus', categoryGroup: 'ca-bien' },
  { no: 488, nameVi: 'Cá bàng chài sáu sọc', nameEn: 'Six-Line Wrasse', scientificName: 'Pseudocheilinus hexataenia', categoryGroup: 'ca-bien' },
  { no: 489, nameVi: 'Cá bàng chài cleaner', nameEn: 'Bluestreak Cleaner Wrasse', scientificName: 'Labroides dimidiatus', categoryGroup: 'ca-bien' },
  { no: 490, nameVi: 'Cá thia xanh', nameEn: 'Blue Green Chromis', scientificName: 'Chromis viridis', categoryGroup: 'ca-bien' },
  { no: 491, nameVi: 'Cá thia xanh Azure', nameEn: 'Azure Damselfish', scientificName: 'Chrysiptera hemicyanea', categoryGroup: 'ca-bien' },
  { no: 492, nameVi: 'Cá thia xanh vàng', nameEn: 'Yellowtail Damselfish', scientificName: 'Chrysiptera parasema', categoryGroup: 'ca-bien' },
  { no: 493, nameVi: 'Cá thiên thần lửa', nameEn: 'Flame Angelfish', scientificName: 'Centropyge loricula', categoryGroup: 'ca-bien' },
  { no: 494, nameVi: 'Cá thiên thần Coral Beauty', nameEn: 'Coral Beauty Angelfish', scientificName: 'Centropyge bispinosa', categoryGroup: 'ca-bien' },
  { no: 495, nameVi: 'Cá bướm Raccoon', nameEn: 'Raccoon Butterflyfish', scientificName: 'Chaetodon lunula', categoryGroup: 'ca-bien' },
  { no: 496, nameVi: 'Cá bướm Copperband', nameEn: 'Copperband Butterflyfish', scientificName: 'Chelmon rostratus', categoryGroup: 'ca-bien' },
  { no: 497, nameVi: 'Cá bướm Threadfin', nameEn: 'Threadfin Butterflyfish', scientificName: 'Chaetodon auriga', categoryGroup: 'ca-bien' },
  { no: 498, nameVi: 'Cá nóc sao', nameEn: 'Starry Puffer', scientificName: 'Arothron stellatus', categoryGroup: 'ca-bien' },
  { no: 499, nameVi: 'Cá nóc mặt chó', nameEn: 'Dogface Puffer', scientificName: 'Arothron nigropunctatus', categoryGroup: 'ca-bien' },
  { no: 500, nameVi: 'Cá mao tiên', nameEn: 'Red Lionfish', scientificName: 'Pterois volitans', categoryGroup: 'ca-bien' },
];

export const defaultCategories = [
  { name: 'Cá Betta & Lia Thia', slug: 'ca-betta', description: 'Các loài cá chọi Betta, lia thia và cá mê cung nhiệt đới', order: 1, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Gourami & Cá Sặc', slug: 'ca-gourami', description: 'Cá sặc gấm, sặc trân châu, tai tượng và các loài gourami', order: 2, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Guppy, Molly, Platy & Swordtail', slug: 'ca-guppy', description: 'Cá bảy màu, Endler, cá mún, cá kiếm, cá bình tích', order: 3, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Tetra & Characins', slug: 'ca-tetra', description: 'Neon tetra, cardinal, ember tetra và dòng tetra thủy sinh', order: 4, parentIds: ['ca-nuoc-nghot', 'ca-thuy-sinh'] },
  { name: 'Cá Rasbora & Danio', slug: 'ca-rasbora-danio', description: 'Cá sọc ngựa, tam giác, trâm và các loài danio nhỏ', order: 5, parentIds: ['ca-nuoc-nghot', 'ca-thuy-sinh'] },
  { name: 'Cá Chuột & Corydoras', slug: 'ca-chuot-cory', description: 'Các dòng cá chuột Corydoras dọn đáy hiền lành', order: 6, parentIds: ['ca-nuoc-nghot', 'ca-thuy-sinh'] },
  { name: 'Cá Pleco & Lau Kính', slug: 'ca-pleco-lau-kinh', description: 'Các loài cá tỳ bà, pleco, ancistrus mút rêu', order: 7, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Chạch & Loaches', slug: 'ca-chach-loach', description: 'Cá chạch hề, chạch kuhli, tỳ bà đá và loach', order: 8, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Koi & Cá Vàng', slug: 'ca-koi-ca-vang', description: 'Cá vàng ba đuôi, Ranchu, Oranda và các dòng cá chép Koi Nhật', order: 9, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cichlid Châu Phi', slug: 'cichlid-chau-phi', description: 'Cá cichlid hồ Malawi, Tanganyika, Frontosa và Peacock', order: 10, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cichlid Nam Mỹ & Trung Mỹ', slug: 'cichlid-nam-my', description: 'Cá thần tiên, cá dĩa, phượng hoàng, oscar và apistogramma', order: 11, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Cầu Vồng & Mắt Xanh', slug: 'ca-cau-vong', description: 'Cá cầu vồng Boesemani, đuôi cờ, mắt xanh nhiệt đới', order: 12, parentIds: ['ca-nuoc-nghot', 'ca-thuy-sinh'] },
  { name: 'Cá Killifish & Cá Tí Hon', slug: 'ca-killifish-ti-hon', description: 'Cá lúa Medaka, Killifish rực rỡ và cá bống nhỏ', order: 13, parentIds: ['ca-nuoc-nghot', 'ca-thuy-sinh'] },
  { name: 'Cá Nóc & Cá Đặc Biệt', slug: 'ca-noc-dac-biet', description: 'Cá nóc nước ngọt, cá dao ma, cá voi voi, cá rìa hatchet', order: 14, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Rồng & Cá Săn Mồi', slug: 'ca-san-moi-arowana', description: 'Cá ngân long, huyết long, cá hổ, hồng vỹ, peacock bass', order: 15, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Cảnh Biển & Nước Lợ', slug: 'ca-bien', description: 'Cá hề Nemo, đuôi gai Blue Tang, cá bàng chài, trạng nguyên', order: 16, parentIds: [] },
  { name: 'Cá Thủy Sinh', slug: 'ca-thuy-sinh', description: 'Tổng hợp các loài cá nhỏ thích hợp nuôi hồ thủy sinh', order: 17, parentIds: ['ca-nuoc-nghot'] },
  { name: 'Cá Nước Ngọt', slug: 'ca-nuoc-nghot', description: 'Cá cảnh sinh sống môi trường nước ngọt', order: 18, parentIds: [] },
];

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const sampleImages: Record<string, string[]> = {
  'ca-betta': [
    'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800',
    'https://images.unsplash.com/photo-1520301251435-0814c11f4219?w=800',
  ],
  'ca-gourami': [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
  'ca-guppy': [
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  ],
  'ca-tetra': [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
  'ca-koi-ca-vang': [
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
  ],
  'ca-bien': [
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
  ],
  default: [
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800',
  ],
};

function buildFishDetails(item: RawFishItem) {
  const slug = toSlug(item.nameVi);
  let difficulty = DifficultyLevel.EASY;
  let swimLevel = SwimLevel.MIDDLE;
  let tempMin = 22;
  let tempMax = 28;
  let phMin = 6.5;
  let phMax = 7.5;
  let minTankSize = 30;
  let sizeMin = 3;
  let sizeMax = 6;
  let lifespan = '3–5 năm';
  let temperament = 'Hiền lành, hòa đồng';
  let diet = 'Ăn tạp, cám hạt nhỏ, trùn chỉ, artemia';
  let compatibleFish = 'Cá Neon, cá Guppy, cá Chuột, tép cảnh';
  let incompatibleFish = 'Cá săn mồi lớn';
  let commonDiseases = 'Nấm trắng, thối vây, xù vảy';
  let description = `${item.nameVi} (${item.scientificName || item.nameEn || ''}) là một trong 500 loài cá cảnh phổ biến được yêu thích trong giới chơi cá cảnh và hồ thủy sinh. Loài cá này có màu sắc sinh động, sức sống khỏe và thích nghi tốt với môi trường bể nuôi tại Việt Nam.`;

  if (item.categoryGroup === 'ca-betta') {
    swimLevel = SwimLevel.TOP;
    tempMin = 24;
    tempMax = 30;
    phMin = 6.0;
    phMax = 7.5;
    minTankSize = 10;
    sizeMin = 4;
    sizeMax = 7;
    lifespan = '2–4 năm';
    temperament = 'Lãnh thổ, hung dữ với cùng loài đực';
    diet = 'Cám Betta, lăng quăng, trùn đỏ, artemia';
    compatibleFish = 'Ốc cảnh, cá dọn bể nhỏ';
    incompatibleFish = 'Betta đực khác, cá rỉa vây';
  } else if (item.categoryGroup === 'ca-gourami') {
    swimLevel = SwimLevel.TOP;
    tempMin = 23;
    tempMax = 28;
    phMin = 6.0;
    phMax = 7.5;
    sizeMin = 5;
    sizeMax = 12;
    minTankSize = 50;
    if (item.nameVi.includes('khổng lồ') || item.nameVi.includes('tai tượng')) {
      sizeMin = 20;
      sizeMax = 50;
      minTankSize = 300;
      lifespan = '10–20 năm';
    }
  } else if (item.categoryGroup === 'ca-guppy') {
    swimLevel = SwimLevel.TOP;
    tempMin = 22;
    tempMax = 28;
    phMin = 7.0;
    phMax = 8.0;
    minTankSize = 20;
    sizeMin = 2.5;
    sizeMax = 5;
    lifespan = '1.5–3 năm';
    temperament = 'Hiền lành, sinh sản nhanh';
  } else if (item.categoryGroup === 'ca-tetra') {
    swimLevel = SwimLevel.MIDDLE;
    tempMin = 21;
    tempMax = 27;
    phMin = 5.5;
    phMax = 7.2;
    minTankSize = 40;
    sizeMin = 2;
    sizeMax = 5;
    temperament = 'Hiền lành, bơi theo đàn';
  } else if (item.categoryGroup === 'ca-rasbora-danio') {
    swimLevel = SwimLevel.TOP;
    tempMin = 20;
    tempMax = 26;
    phMin = 6.0;
    phMax = 7.5;
    minTankSize = 30;
    sizeMin = 1.5;
    sizeMax = 6;
    temperament = 'Năng động, bơi theo đàn';
  } else if (item.categoryGroup === 'ca-chuot-cory') {
    swimLevel = SwimLevel.BOTTOM;
    tempMin = 20;
    tempMax = 26;
    phMin = 6.0;
    phMax = 7.5;
    minTankSize = 40;
    sizeMin = 3;
    sizeMax = 7;
    lifespan = '4–8 năm';
    temperament = 'Hiền lành, chuyên dọn thức ăn thừa đáy bể';
    diet = 'Cám chìm, trùn chỉ, wafer rêu';
  } else if (item.categoryGroup === 'ca-pleco-lau-kinh') {
    swimLevel = SwimLevel.BOTTOM;
    tempMin = 23;
    tempMax = 29;
    phMin = 6.5;
    phMax = 7.5;
    minTankSize = 60;
    sizeMin = 6;
    sizeMax = 25;
    difficulty = DifficultyLevel.MEDIUM;
    temperament = 'Hiền lành, nhút nhát, dọn rêu bể';
    diet = 'Rêu hại, dưa chuột, cám chìm rêu tảo';
  } else if (item.categoryGroup === 'ca-chach-loach') {
    swimLevel = SwimLevel.BOTTOM;
    tempMin = 23;
    tempMax = 28;
    phMin = 6.0;
    phMax = 7.5;
    minTankSize = 50;
    sizeMin = 5;
    sizeMax = 15;
    temperament = 'Năng động, dọn dẹp đáy bể';
  } else if (item.categoryGroup === 'ca-koi-ca-vang') {
    swimLevel = SwimLevel.ALL;
    tempMin = 18;
    tempMax = 25;
    phMin = 7.0;
    phMax = 8.0;
    minTankSize = 100;
    sizeMin = 10;
    sizeMax = 45;
    lifespan = '8–25 năm';
    temperament = 'Hiền lành, háo ăn';
    diet = 'Cám hạt chìm/nổi, rau xanh, trùng trĩ';
  } else if (item.categoryGroup === 'cichlid-chau-phi') {
    swimLevel = SwimLevel.MIDDLE;
    tempMin = 24;
    tempMax = 28;
    phMin = 7.8;
    phMax = 8.6;
    minTankSize = 150;
    sizeMin = 8;
    sizeMax = 20;
    difficulty = DifficultyLevel.MEDIUM;
    temperament = 'Hung dữ, phân chia lãnh thổ cao';
    compatibleFish: 'Các loài Cichlid châu Phi cùng kích thước';
  } else if (item.categoryGroup === 'cichlid-nam-my') {
    swimLevel = SwimLevel.MIDDLE;
    tempMin = 24;
    tempMax = 30;
    phMin = 6.0;
    phMax = 7.2;
    minTankSize = 80;
    sizeMin = 5;
    sizeMax = 25;
  } else if (item.categoryGroup === 'ca-cau-vong') {
    swimLevel = SwimLevel.TOP;
    tempMin = 22;
    tempMax = 27;
    phMin = 7.0;
    phMax = 8.0;
    minTankSize = 80;
    sizeMin = 4;
    sizeMax = 12;
    temperament = 'Năng động, bơi theo đàn rực rỡ';
  } else if (item.categoryGroup === 'ca-killifish-ti-hon') {
    swimLevel = SwimLevel.TOP;
    tempMin = 20;
    tempMax = 26;
    phMin = 6.0;
    phMax = 7.2;
    minTankSize = 20;
    sizeMin = 2;
    sizeMax = 6;
  } else if (item.categoryGroup === 'ca-noc-dac-biet') {
    swimLevel = SwimLevel.MIDDLE;
    tempMin = 24;
    tempMax = 28;
    phMin = 6.8;
    phMax = 7.8;
    minTankSize = 40;
    sizeMin = 3;
    sizeMax = 15;
    difficulty = DifficultyLevel.HARD;
    temperament = 'Tò mò, hay rỉa vây loài cá khác';
    diet = 'Ốc hại, tôm nhỏ, trùn đông lạnh';
  } else if (item.categoryGroup === 'ca-san-moi-arowana') {
    swimLevel = SwimLevel.TOP;
    tempMin = 25;
    tempMax = 31;
    phMin = 6.5;
    phMax = 7.5;
    minTankSize = 400;
    sizeMin = 30;
    sizeMax = 90;
    difficulty = DifficultyLevel.HARD;
    lifespan = '10–25 năm';
    temperament = 'Cá săn mồi lớn, lãnh thổ mạnh mẽ';
    diet = 'Tôm tươi, dế, cá mồi, sâu superworm';
  } else if (item.categoryGroup === 'ca-bien') {
    swimLevel = SwimLevel.ALL;
    tempMin = 24;
    tempMax = 27;
    phMin = 8.1;
    phMax = 8.4;
    minTankSize = 100;
    sizeMin = 5;
    sizeMax = 20;
    difficulty = DifficultyLevel.HARD;
    temperament = 'Sinh thái san hô rực rỡ';
  }

  const imgs = sampleImages[item.categoryGroup] || sampleImages.default;

  return {
    no: item.no,
    nameVi: item.nameVi,
    nameEn: item.nameEn || item.nameVi,
    scientificName: item.scientificName || item.nameVi,
    slug,
    categorySlug: item.categoryGroup,
    images: imgs,
    sizeMin,
    sizeMax,
    lifespan,
    difficulty,
    tempMin,
    tempMax,
    phMin,
    phMax,
    minTankSize,
    swimLevel,
    temperament,
    diet,
    compatibleFish,
    incompatibleFish,
    commonDiseases,
    description,
    isPublished: true,
  };
}

export async function seed500UserFish(dataSource: DataSource) {
  const fishRepo = dataSource.getRepository(Fish);
  const catRepo = dataSource.getRepository(FishCategory);

  console.log('🌱 Upserting fish categories...');
  const catMap: Record<string, FishCategory> = {};

  for (const cData of defaultCategories) {
    let cat = await catRepo.findOne({ where: { slug: cData.slug } });
    if (!cat) {
      cat = await catRepo.save(
        catRepo.create({
          name: cData.name,
          slug: cData.slug,
          description: cData.description,
          order: cData.order,
          parentIds: cData.parentIds,
        }),
      );
    } else {
      cat.parentIds = cData.parentIds;
      await catRepo.save(cat);
    }
    catMap[cData.slug] = cat;
  }

  console.log(`🚀 Checking & Upserting ${rawUser500FishList.length} user fish species...`);
  let inserted = 0;
  let updated = 0;

  for (const rawItem of rawUser500FishList) {
    const details = buildFishDetails(rawItem);
    const category = catMap[details.categorySlug] || catMap['ca-nuoc-nghot'];

    // Check if fish exists by slug or nameVi or scientificName
    let existing = await fishRepo.findOne({
      where: [
        { slug: details.slug },
        { nameVi: details.nameVi },
      ],
    });

    if (existing) {
      existing.nameVi = details.nameVi;
      existing.nameEn = details.nameEn;
      existing.scientificName = details.scientificName;
      existing.categoryId = category.id;
      existing.sizeMin = details.sizeMin;
      existing.sizeMax = details.sizeMax;
      existing.lifespan = details.lifespan;
      existing.difficulty = details.difficulty;
      existing.tempMin = details.tempMin;
      existing.tempMax = details.tempMax;
      existing.phMin = details.phMin;
      existing.phMax = details.phMax;
      existing.minTankSize = details.minTankSize;
      existing.swimLevel = details.swimLevel;
      existing.temperament = details.temperament;
      existing.diet = details.diet;
      existing.compatibleFish = details.compatibleFish;
      existing.incompatibleFish = details.incompatibleFish;
      existing.commonDiseases = details.commonDiseases;
      existing.description = details.description;
      if (!existing.images || existing.images.length === 0) {
        existing.images = details.images;
      }
      await fishRepo.save(existing);
      updated++;
    } else {
      const newFish = fishRepo.create({
        ...details,
        categoryId: category.id,
      });
      await fishRepo.save(newFish);
      inserted++;
    }
  }

  console.log(`✅ Success! ${inserted} new fish inserted, ${updated} fish updated!`);
}

async function run() {
  console.log('🔌 Connecting to PostgreSQL database...');
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgre369',
    database: process.env.DB_DATABASE || 'aquahub',
    entities: [Fish, FishCategory],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('✅ Connected!');
  await seed500UserFish(dataSource);
  await dataSource.destroy();
  console.log('🎉 500 User Ornamental Fish Species check & seed finished!');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('❌ Error seeding 500 user fish:', err);
    process.exit(1);
  });
}
