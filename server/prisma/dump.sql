
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS "MessageLog` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO MessageLog` VALUES(1,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*🌙✨ ±H-15 RAMADHAN | “Mari Puasa dengan Ikhlas, Ini Urusan Kita dengan Allah”*\n\n_🤝 Assalamu’alaikum, Bapak, Ibu, dan Sahabat Rahimakumullah._\n\n*⏳ Tak terasa, waktu kian mengerucut hingga tersisa 15 hari lagi menuju bulan yang suci.* Di titik tengah persiapan ini, mari sejenak menepi dari hiruk pikuk penilaian manusia. Seringkali kita lelah karena terlalu sibuk mencari pengakuan dunia, *padahal Ramadhan hadir untuk membawa kita kembali pada hakikat yang paling dalam: Hanya antara kita dan Allah.*\n\n*✨ Puasa adalah ibadah yang paling rahasia; tak ada yang tahu kita benar-benar menjalaninya kecuali Dia.* Inilah keistimewaan yang membuat Allah ﷻ berfirman dalam Hadits Qudsi:\n\n📖 Rasulullah ﷺ bersabda:\nالصِّيَامُ لِي وَأَنَا أَجْزِي بِهِ\n“Puasa itu untuk-Ku dan Aku sendiri yang akan membalasnya.” (HR. Bukhari) ✅\n\n*🍃 Begitu personalnya urusan ini, hingga Allah sendiri yang menjanjikan balasan tanpa perantara.* Maka, mari kita bangun keikhlasan itu mulai sekarang. Misal Datanglah ke masjid bukan karena ingin dilihat, tapi karena rindu akan dekapan rahmat-Nya.\n\n👨‍👩‍👧‍👦 Karena keikhlasan butuh dijaga dengan ilmu, mari kita siapkan juga bekal terbaik untuk keluarga. *Menuju H-5 acara besar kita,* pastikan Ayah dan Bunda sudah meluangkan waktu agar keikhlasan di bulan Ramadhan nanti bisa terpancar hingga ke dalam rumah.\n\n*📅 H-5 MENUJU MAJELIS ILMU:* _Membangun Atmosfer Taqwa! ✨_\n\nMari pererat keguyuban sekaligus memperdalam ilmu keluarga dalam:\n\n*🎤 Kajian Parenting Insan Taqwa*\nBersama: *Prof. Dr. K.H. Miftah Faridl (Ketua Umum MUI Kota Bandung)*\n\n📍 Agendakan & Ajak Keluarga:\n🗓 Ahad, 8 Februari 2026 | ⏰ 08.00 - 11.00 WIB\n🕌 Masjid Al-Nufais, Sharia Islamic Soreang\n\n🔗 Konfirmasi kehadiran: https://forms.gle/gBwMFSbRsCtXdins9\n📞 Info: Kang Hendar (0812-8513-9682)\n\n*❤️ Gunakan kesempatan setahun sekali ini.* Mari makmurkan masjid, pererat ukhuwah, dan satukan hati dalam keikhlasan yang tulus. Sampai bertemu di shaf-shaf Masjid Al-Nufais! 🙌\n\n*Masjid Al-Nufais Sharia Islamic Soreang*\n_Masjid Semakin Makmur • Jamaah Semakin Erat • Ukhuwah Semakin Kuat_\n\n#MenujuRamadhan #MasjidAlNufais #Ikhlas #KeluargaMuslim','\n',char(10)),'RECEIVED',1770086016826);
INSERT INTO MessageLog` VALUES(2,'homesislab','OUT','homesislab','6283819278102@s.whatsapp.net','Maaf, otak saya sedang lelah (API Error).','SENT',1770089250016);
INSERT INTO MessageLog` VALUES(3,'homesislab','OUT','homesislab','6283819278102@s.whatsapp.net','Maaf, otak saya sedang lelah (API Error).','SENT',1770089539148);
INSERT INTO MessageLog` VALUES(4,'homesislab','IN','39367804453016@lid','homesislab','get pet','RECEIVED',1770090055501);
INSERT INTO MessageLog` VALUES(5,'homesislab','IN','39367804453016@lid','homesislab','Ada hewan apa saja yang available?','RECEIVED',1770090203156);
INSERT INTO MessageLog` VALUES(6,'homesislab','IN','39367804453016@lid','homesislab','getPet Ada hewan apa saja yang available?','RECEIVED',1770090310272);
INSERT INTO MessageLog` VALUES(7,'homesislab','OUT','homesislab','39367804453016@lid',replace('Berikut adalah beberapa hewan yang tersedia di toko kami:\n\n1. **Dog**: Fluffy\n   - ![Photo](https://example.com/photo1.jpg)\n   - Tag: Friendly\n\n2. **Fish**: Nemo\n   - ![Photo](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pond-planet.co.uk%2Fblog%2Ftropical-fish-for-beginners%2F&psig=AOvVaw3ncYgEL1idw9tzja96EVr8&ust=1729448236083000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDkzfCGm4kDFQAAAAAdAAAAABAE)\n   - Tag: Fish\n\n3. **Cat**: Snowwhite\n   - ![]()\n   - Tag: Snowwhite\n\n4. **Snake**: Orochimaru\n   - ![]()\n   - Tag: Orochimaru\n\n5. **Dog**: Max-2024 @Pet!\n   - ![]()\n   - Tag: None\n\n6. **Dog**: BuddyDog\n   - ![Photo](https://example.com/dogs/buddydog.jpg)\n   - Tag: Friendly\n\n7. **Cat**: Tom\n   - ![Photo](CatURL)\n   - Tag: Angry\n\n8. **Fish**: Družok\n   - ![Photo](https://avatars.dzeninfra.ru/get-zen_doc/8269145/pub_642709f6b88cac5939fc1360_6427f173e123fb581f124ba1/scale_1200)\n\nJika Anda ingin informasi lebih lanjut tentang hewan lainnya atau spesifikasi tertentu, silakan tanyakan!','\n',char(10)),'SENT',1770090337993);
INSERT INTO MessageLog` VALUES(8,'homesislab','IN','39367804453016@lid','homesislab','petstore, ada hewan apa saja yang ready saat ini','RECEIVED',1770090528802);
INSERT INTO MessageLog` VALUES(9,'homesislab','OUT','homesislab','39367804453016@lid',replace('Saat ini, kami memiliki berbagai hewan yang siap untuk diadopsi, antara lain:\n\n1. **Fluffy** - Anjing yang ramah ![Fluffy](https://example.com/photo1.jpg)\n2. **Snowwhite** - Kucing lucu\n3. **Orochimaru** - Ular\n4. **BuddyDog** - Anjing bersahabat ![BuddyDog](https://example.com/dogs/buddydog.jpg)\n5. **Jerry** - Tikus\n6. **Nemo** - Ikan\n7. **Kesha** - Burung beo ![Kesha](https://clck.ru/3RbQ3c)\n8. **Firulais** - Anjing (Ada beberapa varian)\n\nJika Anda tertarik dengan salah satu hewan tersebut, jangan ragu untuk bertanya lebih lanjut! 🐾','\n',char(10)),'SENT',1770090542694);
INSERT INTO MessageLog` VALUES(10,'homesislab','IN','39367804453016@lid','homesislab','petstore, ada hewan apa saja yang ready saat ini','RECEIVED',1770090840177);
INSERT INTO MessageLog` VALUES(11,'homesislab','OUT','homesislab','39367804453016@lid',replace('Berikut adalah beberapa hewan yang saat ini tersedia di toko kami:\n\n1. **Fluffy**\n   - Kategori: Anjing\n   - [Lihat Foto](https://example.com/photo1.jpg)\n\n2. **Snowwhite**\n   - Kategori: Kucing\n   - Tidak ada foto tersedia\n\n3. **Orochimaru**\n   - Kategori: Ular\n   - Tidak ada foto tersedia\n\n4. **Nemo**\n   - Kategori: Ikan\n   - [Lihat Foto](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pond-planet.co.uk%2Fblog%2Ftropical-fish-for-beginners%2F&psig=AOvVaw3ncYgEL1idw9tzja96EVr8&ust=1729448236083000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDkzfCGm4kDFQAAAAAdAAAAABAE)\n\n5. **Dina**\n   - Kategori: Anjing\n   - Tidak ada foto tersedia\n\nJika Anda ingin informasi lebih lanjut tentang hewan tertentu, silakan beri tahu! 🐾','\n',char(10)),'SENT',1770090866643);
INSERT INTO MessageLog` VALUES(12,'homesislab','IN','39367804453016@lid','homesislab','petstore, ada hewan apa saja yang tidak ready saat ini','RECEIVED',1770090882195);
INSERT INTO MessageLog` VALUES(13,'homesislab','OUT','homesislab','39367804453016@lid',replace('Saat ini ada beberapa hewan yang statusnya "pending" atau belum tersedia. Beberapa di antaranya adalah:\n\n1. **Boba** (Kucing)\n2. **Doggie** (Anjing)\n3. **Nemo** (Ikan)\n4. **Matermelon** (Hewan kategori string)\n5. **Mango** (Kategori eu Ut dolore cupidatat reprehenderit)\n6. **TDD-Fox-87399064-form** (Pending)\n\nJika kamu butuh informasi lebih lanjut tentang salah satu hewan di atas, silakan beri tahu saya! 😊','\n',char(10)),'SENT',1770090892287);
INSERT INTO MessageLog` VALUES(14,'homesislab','IN','39367804453016@lid','homesislab','petstore berapa total hewan yang terjual','RECEIVED',1770091109169);
INSERT INTO MessageLog` VALUES(15,'homesislab','OUT','homesislab','39367804453016@lid','Total hewan yang terjual di petstore adalah 63 ekor. Jika ada yang ingin Anda tanyakan lebih lanjut, silakan!','SENT',1770091114919);
INSERT INTO MessageLog` VALUES(16,'homesislab','IN','39367804453016@lid','homesislab','petstore yang available berapa','RECEIVED',1770091140200);
INSERT INTO MessageLog` VALUES(17,'homesislab','OUT','homesislab','39367804453016@lid','Saat ini, kami memiliki 289 hewan yang tersedia untuk diadopsi. Jika Anda membutuhkan informasi lebih lanjut, jangan ragu untuk bertanya!','SENT',1770091144505);
INSERT INTO MessageLog` VALUES(18,'homesislab','IN','39367804453016@lid','homesislab','petstore, ada hewan apa saja yang tidak ready saat ini','RECEIVED',1770091217919);
INSERT INTO MessageLog` VALUES(19,'homesislab','OUT','homesislab','39367804453016@lid',replace('Saat ini, hewan-hewan yang tidak tersedia (pending dan sold) adalah:\n\n### Pending:\n1. `Boba` (Kucing)\n2. `doggie` (Beberapa jenis)\n3. `Nemo` (Ikan, serta berbagai jenis lainnya)\n4. `Matermelon` (Nama hewan tanpa kategori)\n5. `kitty` (Beberapa jenis)\n6. **Dan banyak lainnya...**\n\n### Sold:\n1. `Scott` (Ikan)\n2. `Boba` (Burung)\n3. `Timothy` (Ikan)\n4. `Doggie` (Beberapa jenis)\n5. `Nemo fish` (Ikan)\n6. **Dan banyak lainnya...**\n\nJika Anda memerlukan informasi lebih lanjut tentang hewan tertentu, jangan ragu untuk bertanya!','\n',char(10)),'SENT',1770091238143);
INSERT INTO MessageLog` VALUES(20,'homesislab','IN','39367804453016@lid','homesislab','petstore yang available berapa','RECEIVED',1770092839653);
INSERT INTO MessageLog` VALUES(21,'homesislab','OUT','homesislab','39367804453016@lid','Saat ini, terdapat 302 hewan yang tersedia di toko hewan kami. Jika Anda membutuhkan informasi lebih lanjut, silakan tanyakan!','SENT',1770092843469);
INSERT INTO MessageLog` VALUES(22,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Dhuhr berkumandang* 🕒 Pada Waktu: `12:03:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770094981772);
INSERT INTO MessageLog` VALUES(23,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Asar berkumandang* 🕒 Pada Waktu: `15:21:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770106861724);
INSERT INTO MessageLog` VALUES(24,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Maghrib berkumandang* 🕒 Pada Waktu: `18:15:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770117301991);
INSERT INTO MessageLog` VALUES(25,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*🌙✨ H-14 RAMADHAN | “Jangan Lewatkan Malam-Malam Pembebasan”*\n\n_🤝 Assalamu’alaikum, Bapak, Ibu, dan Sahabat Rahimakumullah._\n\n*⏳ Dua pekan lagi! Hanya tersisa 14 hari menuju gerbang Ramadhan.* Bayangkan, sebuah masa di mana pintu-pintu langit dibuka lebar dan setiap malamnya ada nama-nama yang dipilih untuk dibebaskan dari belenggu api neraka.\n\n *Pertanyaannya: Maukah kita jika nama kita ada di antaranya?*\n\n*✨ Inilah momen yang tidak boleh kita lewatkan.* Ramadhan bukan sekadar menahan lapar, melainkan tentang perburuan status "merdeka" di hadapan Allah ﷻ, sebagaimana janji Rasulullah ﷺ:\n\n📖 Rasulullah ﷺ bersabda:\nإِنَّ لِلَّهِ عُتَقَاءَ مِنَ النَّارِ فِي كُلِّ لَيْلَةٍ\n“Sesungguhnya Allah membebaskan hamba-hamba-Nya dari api neraka pada setiap malam (di bulan Ramadhan).” (HR. Ahmad) ✅\n\n🍃 Sebuah kesempatan besar yang datang setiap malam! Maka, mari kita "pemanasan" mulai sekarang. *Hidupkan Masjid Al-Nufais, rapatkan shaf, dan biasakan jiwa kita untuk rindu pada ampunan-Nya.* Karena pembebasan besar itu hanya akan diraih oleh mereka yang sudah bersiap sejak dini.\n\n👨‍👩‍👧‍👦 Agar pembebasan ini terasa hingga ke seluruh anggota rumah, mari kita bekali keluarga dengan ilmu. _Menuju H-4 acara spesial kita, pastikan Bapak dan Ibu sudah siap melangkah bersama untuk menjemput strategi membangun rumah tangga ahli surga._\n\n*📅 H-4 MENUJU MAJELIS ILMU: Bekal Keluarga Menjemput Ramadhan! ✨*\n\nMari pererat keguyuban sekaligus memperkuat ikatan keluarga dalam:\n\n*🎤 Kajian Parenting Insan Taqwa*\nBersama: *Prof. Dr. K.H. Miftah Faridl* _(Ketua Umum MUI Kota Bandung)_\n\n*📍 Catat & Ajak Tetangga:*\n🗓 Ahad, 8 Februari 2026 | ⏰ 08.00 - 11.00 WIB\n🕌 Masjid Al-Nufais, Sharia Islamic Soreang\n\n🔗 Konfirmasi kehadiran: https://forms.gle/gBwMFSbRsCtXdins9\n📞 Info: Kang Hendar (0812-8513-9682)\n\n*❤️ Gunakan kesempatan setahun sekali ini.* Mari makmurkan masjid, pererat ukhuwah, dan satukan hati untuk meraih predikat hamba yang dibebaskan. *Sampai bertemu di shaf-shaf Masjid Al-Nufais! 🙌*\n\n*Masjid Al-Nufais Sharia Islamic Soreang*\n_Masjid Semakin Makmur • Jamaah Semakin Erat • Ukhuwah Semakin Kuat_\n\n#MenujuRamadhan #MasjidAlNufais #PembebasanDosa #KajianParenting','\n',char(10)),'RECEIVED',1770164191767);
INSERT INTO MessageLog` VALUES(26,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Dhuhr berkumandang* 🕒 Pada Waktu: `12:03:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770181381403);
INSERT INTO MessageLog` VALUES(27,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Asar berkumandang* 🕒 Pada Waktu: `15:20:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770193202030);
INSERT INTO MessageLog` VALUES(28,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Maghrib berkumandang* 🕒 Pada Waktu: `18:15:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770203702287);
INSERT INTO MessageLog` VALUES(29,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Isya berkumandang* 🕒 Pada Waktu: `19:23:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770207782406);
INSERT INTO MessageLog` VALUES(30,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Fajr berkumandang* 🕒 Pada Waktu: `04:38:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770241083354);
INSERT INTO MessageLog` VALUES(31,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*🌙 Sudah Ada Rencana buat Ahad Pagi? Yuk, Amankan Jadwalnya! ✨*\n\n_😊 Assalamualaikum, Bapak, Ibu, dan Sahabat fillah..._ *Bagaimana kabarnya di hari Kamis yang penuh berkah ini?* Sambil menikmati aktivitas, yuk sejenak pasang alarm di ponsel. *Tinggal 3 hari lagi kita akan bersilaturahmi untuk membekali keluarga tercinta dengan ilmu terbaik sebelum bulan suci tiba.*\n\n👨‍👩‍👧‍👦 Acara *Parenting Insan Taqwa | "Keluarga Muslim Menyambut Ramadhan"* ini adalah ruang hangat bagi kita semua untuk mempererat keguyuban. _Mari kita penuhi Masjid Al Nufais, saling menyapa dengan senyum, dan bersama-sama memakmurkan rumah Allah dalam ikatan ukhuwah yang erat._\n\n🎤 Insyaa Allah, kita berkesempatan menimba ilmu langsung dari guru kita, *Prof. Dr. K.H. Miftah Faridl*_*(Anggota Dewan Penasehat MUI Pusat, Wakil Ketua Dewan Penasehat MUI Provinsi Jawa Barat, Ketua MUI Kota Bandung)*_\n\n*📍 Mari melangkah bersama keluarga dan orang-orang tercinta pada:*\n🗓 Ahad, 8 Februari 2026\n⏰ 08.00 - 11.00 WIB\n🕌 Masjid Al Nufais, Perumahan Sharia Islamic, Soreang\n\n*📢 Acara ini Terbuka Untuk Umum!* Jangan lupa ajak serta istri/suami, anak-anak, hingga saudara, tetangga, dan kerabat lainnya ya, agar keberkahannya semakin meluas. \n\n*Info lebih lanjut, silakan bisa sapa  di wa.me/6281285139682.*\n\n_Sampai bertemu di shaf ilmu, semoga Allah mudahkan segala urusan kita semua hari ini! 😇🙌_\n\n#KajianRamadhan #KeluargaGuyub #MasjidAlNufais','\n',char(10)),'RECEIVED',1770245200949);
INSERT INTO MessageLog` VALUES(32,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','jalan ciluncat adA Pengecoran,, sekilas info','RECEIVED',1770268764187);
INSERT INTO MessageLog` VALUES(33,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Hatur nuhun pa infona','RECEIVED',1770268804785);
INSERT INTO MessageLog` VALUES(34,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Hatur nuhun pak','RECEIVED',1770268982327);
INSERT INTO MessageLog` VALUES(35,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Mulai hari ini, Pa Deden?','RECEIVED',1770269351470);
INSERT INTO MessageLog` VALUES(36,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Alhamdulilah.pa Deden..loby nya mantaf.jd beres🤭','RECEIVED',1770269787601);
INSERT INTO MessageLog` VALUES(37,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770275153000);
INSERT INTO MessageLog` VALUES(38,'homesislab','OUT','homesislab','39367804453016@lid',replace('Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [400 Bad Request] * GenerateContentRequest.tools[0].function_declarations[0].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[1].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[2].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n','\n',char(10)),'SENT',1770275153564);
INSERT INTO MessageLog` VALUES(39,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*🌙 ✨ H-13 RAMADHAN | “Perbanyak Doa, Ramadhan Mendengar”*\n\n_Assalamu’alaikum, Bapak, Ibu, dan Sahabat Rahimakumullah._\n\n*⏳ Tak terasa, hitungan mundur kini menyentuh angka 13 hari lagi.* _Pernahkah kita merasa memiliki keinginan yang begitu besar, namun lidah terasa kelu untuk meminta?_ *Ketahuilah, Ramadhan adalah waktu di mana setiap bisikan hati didengar dan setiap tangan yang menengadah tak akan dibiarkan kembali hampa.*\n\n📖 Rasulullah ﷺ bersabda: “Doa orang yang berpuasa tidak akan ditolak.” (HR. Tirmidzi) ✅\n\nSambil membiasakan perbanyak doa menuju bulan suci, mari kita iringi dengan amalan nyata di hari yang penuh kemuliaan besok:\n\n🍱 JUMAT BERKAH: Sedekah sebagai Pembuka Doa \n\n*Menyambut Jumat, 06/02/2026 besok, Masjid Al-Nufais kembali mengajak Bapak/Ibu untuk meluaskan keberkahan.* Meja prasmanan persaudaraan akan kembali tersaji. \n\nMari titipkan kepedulian bapak/ibu melalui Tim Konsumsi dalam bentuk:\n* 💰 Infaq/Rupiah (Bisa melalui Scan QRIS di gambar atau Transfer)\n* 🍚 Nasi & Sayur | 🍳 Aneka Tumisan & Gorengan\n* 🥤 Mineral Gelas & Minuman Cup\n\n💳 Rekening Kontribusi: BCA 3790734148 a.n. Reni Dachraeni\n📌 Konfirmasi: 📞 0821-3064-2001 (Tim Konsumsi)\n\nAgar doa-doa kita di bulan Ramadhan nanti lebih berkualitas, mari bekali diri dengan ilmu. *Tinggal 3 hari lagi menuju momen spesial bersama keluarga di Masjid Al-Nufais:*\n\n*📅 H-3 MENUJU MAJELIS ILMU: Menjemput Keberkahan Keluarga!*\n\n🎤 Kajian Parenting Insan Taqwa\nBersama: Prof. Dr. K.H. Miftah Faridl (Ketua Umum MUI Kota Bandung)\n🗓 Ahad, 8 Februari 2026 | ⏰ 08.00 - 11.00 WIB\n\n🔗 Daftar Sekarang: https://forms.gle/gBwMFSbRsCtXdins9\n📞 Info: Kang Hendar (0812-8513-9682)\n\n❤️ Gunakan kesempatan setahun sekali ini. Mari makmurkan masjid, pererat ukhuwah, dan satukan hati dalam doa-doa yang tulus. Sampai bertemu di shaf-shaf perjuangan Masjid Al-Nufais! 🙌\n\n*Masjid Al-Nufais Sharia Islamic Soreang*\n_Masjid Semakin Makmur • Jamaah Semakin Erat • Ukhuwah Semakin Kuat_\n\n#MenujuRamadhan #JumatBerkah #MasjidAlNufais #DoaMustajab #KeluargaSakinah #KajianParenting','\n',char(10)),'RECEIVED',1770276855290);
INSERT INTO MessageLog` VALUES(40,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Insyaa Allah Untuk Berbagi Program Jumat Berkah, bisa langsung mudah ke QRIS ini 🙏🏻','RECEIVED',1770277026074);
INSERT INTO MessageLog` VALUES(41,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Pa Deden.jln ciluncat mlm ini sdh di tutup ya?','RECEIVED',1770279731689);
INSERT INTO MessageLog` VALUES(42,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Bisa di atur itu. Pa.','RECEIVED',1770279794762);
INSERT INTO MessageLog` VALUES(43,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Brarti ada coin bisa lewat?😁','RECEIVED',1770279880519);
INSERT INTO MessageLog` VALUES(44,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Klo coin kayaknya  putar balik  pa. Sudah tidak jaman itu 😁🙏','RECEIVED',1770279918384);
INSERT INTO MessageLog` VALUES(45,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Coin dinar ini mah pa😁','RECEIVED',1770279985281);
INSERT INTO MessageLog` VALUES(46,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*✨ Kolaborasi Syiar Al-Nufais & MQ FM ✨*\n\nAlhamdulillah, saat ini DKM Al-Nufais tengah berkolaborasi syiar bersama MQ FM, di mana *kajian kita bersama Prof. Dr. Kh. Miftah Faridl , Ahad 08/02/2026* juga dibagikan melalui kanal MQ FM _>>> https://www.instagram.com/p/DUXthVPifEY/?igsh=MWhzaDJ2ZDZ3OWJnNA== <<<_ untuk jangkauan dakwah yang lebih luas. _Sebagai bagian dari ikhtiar syiar ini, kami mengajak Bapak2 & mom SIS semua, untuk menyukseskan juga agenda spesial ini, barangkali info ini bermanfaat buat anak/saudaranya._ \n\nAcaranya:\n\nNgobrol soal jodoh ternyata nggak melulu tentang “kapan”, tapi juga tentang seberapa siap kita menjadi versi diri yang Allah ridhai. ✨\n\nDi obrolan ini, kita nggak cuma membahas jodoh dari sisi “nanti ketemu siapa”, tapi juga tentang menata hati, memperbaiki diri, ikhtiar yang tenang, dan percaya penuh pada takdir-Nya. Karena bisa jadi, yang sedang Allah siapkan bukan jodohnya dulu, melainkan diri kita sendiri.\n\nYuk, ikut Ngobrol Asyik Soal Jodoh bersama para narasumber yang berpengalaman dan insyaa Allah penuh hikmah:\n\n * 🗓 Sabtu, 7 Februari 2026\n * ⏰ 19.50 – 21.00 WIB\n * 📍 Via Zoom Meeting\n🎙 Line Up Narasumber:\n * Guest: Rizki Rainer & Mochamad Dava\n * Speaker: Ust. Arif Rahman Lubis\n * Host: Irfan Nurfalah\n\n📝 Segera Daftarkan!\nKlik link di bawah ini sekarang juga:\n🔗 bit.ly/pendaftaranclassseriesmqfm\nAtau hubungi via WhatsApp:\n📞 085795301370\n\n#mqfmbandung #alnufais #ngobrolasiksoaljodoh #jodoh #selfimprovement #kajianonline','\n',char(10)),'RECEIVED',1770294794833);
INSERT INTO MessageLog` VALUES(47,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','wah menarik nih temanya soal jodoh, kesukaan bapac2 sis 😬','RECEIVED',1770296349015);
INSERT INTO MessageLog` VALUES(48,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','MasyaAllah tabarakAllah','RECEIVED',1770298035954);
INSERT INTO MessageLog` VALUES(49,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Fajr berkumandang* 🕒 Pada Waktu: `04:39:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770327541937);
INSERT INTO MessageLog` VALUES(50,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Hatur Nuhun Warga SIS! 🌿\n​Lingkungan yang aman, nyaman, dan guyub adalah impian kita bersama. Semua itu bisa terwujud berkat kekompakan warga SIS dalam menunaikan Iuran Pemeliharaan Lingkungan (IPL) setiap bulannya. 🤝\n​Yuk, yang belum sempat bayar bulan ini, aksesnya sudah kami permudah:\n​📱 Via Transfer:\nBNI: 1850-7680-90 (a.n. Shandy Sulaeman)\nKonfirmasi bukti transfer ke 0838-2086-3440\n​🏠 Via Tunai:\nLangsung merapat ke Warung Bu Ita di Blok E 33 ya!\n​Terima kasih karena sudah peduli dengan lingkungan kita! 🏘️💙\n​#PaguyubanSIS #WargaSIS #InfoIPL #LingkunganAman #GuyubRukun #InfoWarga','\n',char(10)),'RECEIVED',1770330928557);
INSERT INTO MessageLog` VALUES(51,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Iuran tiap bulan brp kang','RECEIVED',1770332682554);
INSERT INTO MessageLog` VALUES(52,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','130 pa alun','RECEIVED',1770333010208);
INSERT INTO MessageLog` VALUES(53,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Nuhun insya Allah hari ini di bayar🙏🏻','RECEIVED',1770333149840);
INSERT INTO MessageLog` VALUES(54,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Bayar ke nyonya jenengan ya','RECEIVED',1770333188463);
INSERT INTO MessageLog` VALUES(55,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770348800958);
INSERT INTO MessageLog` VALUES(56,'homesislab','OUT','homesislab','39367804453016@lid',replace('Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [400 Bad Request] * GenerateContentRequest.tools[0].function_declarations[0].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[1].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[2].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n','\n',char(10)),'SENT',1770348801898);
INSERT INTO MessageLog` VALUES(57,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770349117522);
INSERT INTO MessageLog` VALUES(58,'homesislab','OUT','homesislab','39367804453016@lid',replace('Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [400 Bad Request] * GenerateContentRequest.tools[0].function_declarations[0].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[1].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[2].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n','\n',char(10)),'SENT',1770349118338);
INSERT INTO MessageLog` VALUES(59,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770349256732);
INSERT INTO MessageLog` VALUES(60,'homesislab','OUT','homesislab','39367804453016@lid','Error generating response: Cannot read properties of undefined (reading ''replace'')','SENT',1770349257276);
INSERT INTO MessageLog` VALUES(61,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770349261269);
INSERT INTO MessageLog` VALUES(62,'homesislab','OUT','homesislab','39367804453016@lid','Error generating response: Cannot read properties of undefined (reading ''replace'')','SENT',1770349261697);
INSERT INTO MessageLog` VALUES(63,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770350009060);
INSERT INTO MessageLog` VALUES(64,'homesislab','OUT','homesislab','39367804453016@lid','Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [404 Not Found] models/gemini-pro is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.','SENT',1770350010066);
INSERT INTO MessageLog` VALUES(65,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770350198564);
INSERT INTO MessageLog` VALUES(66,'homesislab','OUT','homesislab','39367804453016@lid','Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [404 Not Found] models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.','SENT',1770350199810);
INSERT INTO MessageLog` VALUES(67,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770350453152);
INSERT INTO MessageLog` VALUES(68,'homesislab','OUT','homesislab','39367804453016@lid','Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [404 Not Found] models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent. Call ListModels to see the list of available models and their supported methods.','SENT',1770350453778);
INSERT INTO MessageLog` VALUES(69,'homesislab','IN','39367804453016@lid','homesislab','petstore minta list rumah di sis','RECEIVED',1770350463423);
INSERT INTO MessageLog` VALUES(70,'homesislab','OUT','homesislab','39367804453016@lid','Maaf, saya adalah asisten toko hewan dan saya tidak bisa membantu untuk mencari daftar rumah.','SENT',1770350465569);
INSERT INTO MessageLog` VALUES(71,'homesislab','IN','39367804453016@lid','homesislab','agentsis minta list rumah di sis','RECEIVED',1770350547815);
INSERT INTO MessageLog` VALUES(72,'homesislab','OUT','homesislab','39367804453016@lid','Maaf, saya tidak bisa memberikan daftar rumah di SIS dengan tools yang tersedia saat ini. Saya hanya bisa mengecek status warga, rumah, dan unit. Apakah ada hal lain yang bisa saya bantu?','SENT',1770350549221);
INSERT INTO MessageLog` VALUES(73,'homesislab','IN','39367804453016@lid','homesislab','agentsis minta list rumah di sis','RECEIVED',1770350572453);
INSERT INTO MessageLog` VALUES(74,'homesislab','IN','39367804453016@lid','homesislab','agentsis minta list rumah di sis','RECEIVED',1770350613439);
INSERT INTO MessageLog` VALUES(75,'homesislab','OUT','homesislab','39367804453016@lid','Maaf, saya tidak bisa langsung menampilkan daftar rumah. Apakah ada informasi lain yang bisa saya bantu terkait perumahan?','SENT',1770350615499);
INSERT INTO MessageLog` VALUES(76,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Dhuhr berkumandang* 🕒 Pada Waktu: `12:03:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770354182912);
INSERT INTO MessageLog` VALUES(77,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Asar berkumandang* 🕒 Pada Waktu: `15:20:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770366001357);
INSERT INTO MessageLog` VALUES(78,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Bismillah ✨ Sejenak melipir setelah seharian berjuang, menemukan hangatnya ukhuwah di Masjid Al-Nufais malam ini.\n\n📖 Mari kembali menghaluskan lisan dan menenangkan hati dalam *Kajian Tahsin Metode Ummi bersama Ustadz Muchtar Nashier.* _Sambil duduk melingkar dan ngopi santai, kita jadikan malam Sabtu ini lebih bermakna dengan memperbaiki bacaan Al-Qur''an kita._\n\n*🌸 Inilah momen recharge energi yang kita butuhkan.* Bukan sekadar belajar tajwid, tapi merasakan indahnya kebersamaan antar warga yang membuat lingkungan Sharia Islamic Soreang terasa seperti keluarga besar.\n\n🕌 InsyaAllah sudah disiapkan fasilitas Free Kopi untuk menemani diskusi ilmu agar suasana semakin hangat.\n\n*☕ Sampai bertemu malam ini jam Ba''da Maghrib di Masjid Al-Nufais.* Mari kita tutup hari ini dengan keberkahan dan luruskan niat untuk terus belajar.\n\n#MasjidAlNufais #ShariaIslamicSoreang #KajianSunnah','\n',char(10)),'RECEIVED',1770370417260);
INSERT INTO MessageLog` VALUES(79,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Maghrib berkumandang* 🕒 Pada Waktu: `18:15:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770376501990);
INSERT INTO MessageLog` VALUES(80,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Isya berkumandang* 🕒 Pada Waktu: `19:23:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770380581372);
INSERT INTO MessageLog` VALUES(81,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Fajr berkumandang* 🕒 Pada Waktu: `04:39:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770413942803);
INSERT INTO MessageLog` VALUES(82,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('======================\n        I N F O  S E K I L A S \n                    DKM  \n           A L   N U F A I S\n======================\nBismillah,  Assalamualaikum pa bapak, \n\nInsyaAllah kajian Ustad Zulfan hari ini. Di mulai pukul 05.30\n\nDi mohon untuk kehadiran nya pa bapak.  . Bagi yg memiliki waktu luang, 🙏🙏😁','\n',char(10)),'RECEIVED',1770415892789);
INSERT INTO MessageLog` VALUES(83,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Bismillah Alhamdulillah ustadz Zulfan sedang otw menuju masjid Al Nufais, mari kepada Bapak2 yg memiliki keluangan waktu atau ingin menyempatkan waktu untuk terus menuntut ilmu bisa langsung menghadiri. 🙏🏻🙏🏻\n\nMohon izin  juga, bahwa hari ini masjid Al-Nufais memfasilitasi acara *Silaturahmi Antar Pondok Pesantren Se Kecamatan Cangkuang* yg mana acaranya mulai jam 9 pagi - Dzuhur.','\n',char(10)),'RECEIVED',1770416178410);
INSERT INTO MessageLog` VALUES(84,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Ayo ngaji  :  @60219803590782 , @183764638519361 , @172258437898244 , @24227977650369 , @61976411648104 , @223862318964821 , @116187690188934 , @69797580693719 , @36004811559037 , @270209915052067 , @145951645777992 , @8658737979468 , dan yg belum di sebut.  \n🙏🙏🙏😁','\n',char(10)),'RECEIVED',1770416625365);
INSERT INTO MessageLog` VALUES(85,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Kuy','RECEIVED',1770416645705);
INSERT INTO MessageLog` VALUES(86,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Otw','RECEIVED',1770416651585);
INSERT INTO MessageLog` VALUES(87,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Nggak ada dalam daftar','RECEIVED',1770416694633);
INSERT INTO MessageLog` VALUES(88,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','😁','RECEIVED',1770416859411);
INSERT INTO MessageLog` VALUES(89,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Ijin luar kota','RECEIVED',1770417113180);
INSERT INTO MessageLog` VALUES(90,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Kapan berangkatnya pa  ? 😁🙏','RECEIVED',1770417429237);
INSERT INTO MessageLog` VALUES(91,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','☺️','RECEIVED',1770417632441);
INSERT INTO MessageLog` VALUES(92,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Lanjutkan','RECEIVED',1770418532788);
INSERT INTO MessageLog` VALUES(93,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Idem pak','RECEIVED',1770418914939);
INSERT INTO MessageLog` VALUES(94,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Dhuhr berkumandang* 🕒 Pada Waktu: `12:03:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770440584761);
INSERT INTO MessageLog` VALUES(95,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Ijin lg di padalarang','RECEIVED',1770444067135);
INSERT INTO MessageLog` VALUES(96,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Ustad nya udah kemana.  Ijin nya baru sekarang 😁😁😁🙏','RECEIVED',1770444125669);
INSERT INTO MessageLog` VALUES(97,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Waduh, di tag kajian pa @224777180561643','RECEIVED',1770445900180);
INSERT INTO MessageLog` VALUES(98,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Baru pada bangun ini teh.  Baru pada respon 😁😁😁','RECEIVED',1770446342112);
INSERT INTO MessageLog` VALUES(99,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('iya pak, saya juga baru lihat maaf 🙏😃\nijin masuk kerja hari ini','\n',char(10)),'RECEIVED',1770446479328);
INSERT INTO MessageLog` VALUES(100,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('======================\n        I N F O  S E K I L A S \n                    DKM  \n           A L   N U F A I S\n======================\nBismillah,  Assalamualaikum pa bapak, \n\nAda berita gembira pa bapak warga sis.  InsyaAllah malam ini ba''da isya ada kunyah2 yg sudah di siapkan ibu2 konsumsi.\nUndangan untuk semua warga.  4 x 4 = 16. Jangan sampai tidak di balas. \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nNB  :. kunya2 nya setelah persiapan \n1. Pasang tenda bazar\n2. Pasang karpet di masjid dan aula\n3. Pemasangan soud sistem.','\n',char(10)),'RECEIVED',1770447099272);
INSERT INTO MessageLog` VALUES(101,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Waalaikumsalam wr wb \n\nSiap ketua 🫡','\n',char(10)),'RECEIVED',1770447353159);
INSERT INTO MessageLog` VALUES(102,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Wa''alaykumussalam warahmatullahi wabarakatuh siap insyaa Allah 🙏🏻','RECEIVED',1770447483701);
INSERT INTO MessageLog` VALUES(103,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Waduh lg kmana pak beliau?🤭😊','RECEIVED',1770449956824);
INSERT INTO MessageLog` VALUES(104,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Asar berkumandang* 🕒 Pada Waktu: `15:19:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770452343960);
INSERT INTO MessageLog` VALUES(105,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Maghrib berkumandang* 🕒 Pada Waktu: `18:15:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770462904496);
INSERT INTO MessageLog` VALUES(106,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Mangga warga yang ada keluasaan waktu untuk sama - sama persiapan untuk acara besok di  Masjid, Bada Isya diantos. Nuhun','RECEIVED',1770465639241);
INSERT INTO MessageLog` VALUES(107,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Siap insya Allah','RECEIVED',1770465661990);
INSERT INTO MessageLog` VALUES(108,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Isya berkumandang* 🕒 Pada Waktu: `19:23:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770466982770);
INSERT INTO MessageLog` VALUES(109,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Wah deket nih pa di gaharu 🤩','RECEIVED',1770469956756);
INSERT INTO MessageLog` VALUES(110,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Iya kang dani','RECEIVED',1770469991226);
INSERT INTO MessageLog` VALUES(111,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Pemasangan Tenda Bazar','RECEIVED',1770478760893);
INSERT INTO MessageLog` VALUES(112,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','🙏🙏🙏Maaf ga bisa gabung ( bantu bantu ).','RECEIVED',1770479017903);
INSERT INTO MessageLog` VALUES(113,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Siap pak laris berkah aamiin','RECEIVED',1770479358427);
INSERT INTO MessageLog` VALUES(114,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('*[SIAPKAN DIRI BESOK PAGI! Investasi Ilmu & Banjir Hadiah Menuju Ramadhan]*\n\n*Bismillah, Hanya tinggal hitungan jam!* Besok pagi adalah waktu kita berhenti sejenak dari rutinitas untuk menyiapkan "bekal langit" bagi keluarga. *Ramadhan tinggal 10 hari lagi, jangan biarkan ia datang tanpa persiapan jiwa yang matang.*\n\nHadirilah momen istimewa bersama ulama kebanggaan kita:\n\n*✨ Prof. Dr. K.H. Miftah Faridl ✨*\n(Ketua Umum MUI Kota Bandung, Anggota Dewan Penasehat MUI Pusat, dan Ketua Dewan Pertimbangan MUI Jawa Barat)\n\n*🎁 HADIR & DAPATKAN DOORPRIZE MENARIK!*\n_Selain limpahan ilmu, panitia bersama para sponsor telah menyiapkan berbagai Doorprize Spesial bagi para jamaah yang beruntung. Pastikan Anda hadir lebih awal untuk memperbesar kesempatan mendapatkannya!_\n\n*🤝 SINERGI BESAR UNTUK UMAT*\n_Acara ini terselenggara berkat kolaborasi erat dengan mitra-mitra hebat:_\n\n📢 Media Partner:\n * 102.7 MQFM Bandung (Manajemen Qolbu)\n * KDKB (Komunitas Dakwah Kota Bandung)\n\n🛍️ Brand Pendukung (Sponsors):\n#include | AF3 | Bolu Keju Sabilulungan | MyGrow | Delfi | Majelis Positif+ | Ruang Sanad | Pituin | Tanami | Raina Archery | Khayr Moswear\n\n📍 WAKTU & LOKASI (Hadir Tepat Waktu!):\n🗓️ BESOK: Ahad, 8 Februari 2026\n🕗 08.00 - 11.00 WIB\n🏠 Masjid Al Nufais, Perumahan Sharia Islamic Soreang\n(Jl. Panyaungan, Desa Jatisari, Kec. Cangkuang, Kab. Bandung)\n🗺️ Link Google Maps:\nhttps://maps.app.goo.gl/A6AnUWjtaC4RFUzD9\n\n*Acara ini Terbuka Untuk Umum!* Mari ajak pasangan, anak, dan tetangga. Kita penuhi masjid dengan semangat thalabul ilmi dan raih keberkahannya.\n\n📞 Info & Konfirmasi: wa.me/6281285139682 (Kang Hendar)\n\n*_Sampai bertemu besok pagi! Semoga Allah mudahkan langkah kita menuju majelis ilmu. ✨_*\n\nPenyelenggara: Yayasan Insan Taqwa\nFasilitator: Masjid Al-Nufais | Paguyuban SIS | Sharia Islamic Soreang Management \n\n\n#ParentingIslami #Ramadhan1447H #MasjidAlNufais #KHMiftahFaridl #SinergiDakwah #KajianBandung #DoorpriseRamadhan #MQFM #KDKB','\n',char(10)),'RECEIVED',1770480375812);
INSERT INTO MessageLog` VALUES(115,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Fajr berkumandang* 🕒 Pada Waktu: `04:39:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770500344609);
INSERT INTO MessageLog` VALUES(116,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('Bismillah izin Bapak2 nanti setelah acara Kajian Bersama Guru Kita, *Yayasan Sekolah Insan Taqwa* juga *mengundang pengurus masjid, pengurus paguyuban beserta warga SIS* untuk hadir dalam *peresmian sekolah/pondok.*\n\n_Insyaa allah agendannya gunting pita, doa dan sedikit sambutan🙏🏻😇_\n\nHatur nuhun.. semoga Allah mudahkan langkah kita dan melancarkan serta memberkahi segala urusan aamiin allahumma aamiin','\n',char(10)),'RECEIVED',1770503672416);
INSERT INTO MessageLog` VALUES(117,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Bismillah Alhamdulillah ustadz sudah hadir.. mari bapak2 kita rapatkan shaft 🙏🏻🙏🏻😇','RECEIVED',1770513799920);
INSERT INTO MessageLog` VALUES(118,'homesislab','IN','6289638333827-1626501649@g.us','homesislab',replace('''Afwan izin telat, Kang..\nMasih nyiapin anak2..','\n',char(10)),'RECEIVED',1770514018332);
INSERT INTO MessageLog` VALUES(119,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Barakallahu Fiykum','RECEIVED',1770514887149);
INSERT INTO MessageLog` VALUES(120,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Aamiin.. Wa fiik Baarakallaaj','RECEIVED',1770514907858);
INSERT INTO MessageLog` VALUES(121,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Ayo pa bapak warga sis. Yg masih di bawah. Untuk keatas. . Kita mengikuti kajian bersama.  🙏🙏🙏😁','RECEIVED',1770515553707);
INSERT INTO MessageLog` VALUES(122,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','ke Weh caritakeun','RECEIVED',1770516030671);
INSERT INTO MessageLog` VALUES(123,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Maaf itu saha Pak Yosep..','RECEIVED',1770516053825);
INSERT INTO MessageLog` VALUES(124,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Bapa ketua geng, pak haji','RECEIVED',1770516206487);
INSERT INTO MessageLog` VALUES(125,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Sambutan kedua udah berdiri euyy 😬👍🏼','RECEIVED',1770516260717);
INSERT INTO MessageLog` VALUES(126,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Mau ngomong apa sekarang.  Udah lega euy   😁😁😁','RECEIVED',1770516268876);
INSERT INTO MessageLog` VALUES(127,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Pantes kok seperti kenal.. Ya..','RECEIVED',1770516307917);
INSERT INTO MessageLog` VALUES(128,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Bener td mah pa salam nya, ga walikumsalam lagi 😁😁','RECEIVED',1770516309007);
INSERT INTO MessageLog` VALUES(129,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Emang aga beda hari ini, pa haji. Lebih kalem di depan 😊','RECEIVED',1770516538647);
INSERT INTO MessageLog` VALUES(130,'homesislab','IN','120363344727107749@g.us','homesislab','Campers lativi','RECEIVED',1770520655476);
INSERT INTO MessageLog` VALUES(131,'homesislab','IN','120363344727107749@g.us','homesislab','masih di banten?','RECEIVED',1770520895992);
INSERT INTO MessageLog` VALUES(132,'homesislab','IN','120363344727107749@g.us','homesislab','Masih, besok malem udah di sis InsyaAllah','RECEIVED',1770520924667);
INSERT INTO MessageLog` VALUES(133,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','👍','RECEIVED',1770520975050);
INSERT INTO MessageLog` VALUES(134,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Acara selanjutnya. Kunjungan bazar. Tidak usah bayar pakai uang,  ada Qris da ''  😁😁🙏','RECEIVED',1770521727206);
INSERT INTO MessageLog` VALUES(135,'homesislab','IN','120363344727107749@g.us','homesislab','Biar lebih terlihat pro nya','RECEIVED',1770521736423);
INSERT INTO MessageLog` VALUES(136,'homesislab','IN','120363344727107749@g.us','homesislab','Ttdj','RECEIVED',1770521744288);
INSERT INTO MessageLog` VALUES(137,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','😁😁😁','RECEIVED',1770523709007);
INSERT INTO MessageLog` VALUES(138,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Dhuhr berkumandang* 🕒 Pada Waktu: `12:03:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770526984237);
INSERT INTO MessageLog` VALUES(139,'homesislab','OUT','homesislab','6289638333827-1626501649@g.us','📣 *Hari ini Adzan Asar berkumandang* 🕒 Pada Waktu: `15:19:00` 🏠 Untuk daerah SIS dan sekitarnya','SENT',1770538745370);
INSERT INTO MessageLog` VALUES(140,'homesislab','IN','39367804453016@lid','homesislab','petstore yang available berapa','RECEIVED',1770539231465);
INSERT INTO MessageLog` VALUES(141,'homesislab','OUT','homesislab','39367804453016@lid',replace('Error generating response: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [400 Bad Request] * GenerateContentRequest.tools[0].function_declarations[0].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[1].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n* GenerateContentRequest.tools[0].function_declarations[2].name: Invalid function name. Must start with a letter or an underscore. Must be alphameric (a-z, A-Z, 0-9), underscores (_), dots (.), colons (:), or dashes (-), with a maximum length of 64.\n','\n',char(10)),'SENT',1770539232362);
INSERT INTO MessageLog` VALUES(142,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Diantos Depan masjid pak bapak🙏🏻😇','RECEIVED',1770544391459);
INSERT INTO MessageLog` VALUES(143,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Mantaap','RECEIVED',1770545044116);
INSERT INTO MessageLog` VALUES(144,'homesislab','IN','6289638333827-1626501649@g.us','homesislab','Otw','RECEIVED',1770546786745);
CREATE TABLE IF NOT EXISTS "Session` (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DISCONNECTED',
    "config" TEXT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Session` VALUES('homesislab','homesislab','CONNECTED',NULL,2,1770072986358,1770526385551);
CREATE TABLE IF NOT EXISTS "Contact` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tags" TEXT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "BroadcastLog` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "broadcastId" INTEGER NOT NULL,
    "contactName" TEXT,
    "contactPhone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BroadcastLog_broadcastId_fkey" FOREIGN KEY ("broadcastId") REFERENCES "Broadcast` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "User` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "credits" INTEGER NOT NULL DEFAULT 0,
    "planType" TEXT NOT NULL DEFAULT 'PAY_AS_YOU_GO',
    "planExpiresAt" DATETIME,
    "messageCost" INTEGER NOT NULL DEFAULT 1,
    "aiApiKey" TEXT,
    "aiProvider" TEXT NOT NULL DEFAULT 'openai',
    "aiBriefing" TEXT,
    "isAiEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO User` VALUES(1,'test_admin',NULL,NULL,'hashedpassword','ADMIN',0,'PAY_AS_YOU_GO',NULL,1,NULL,'gemini',NULL,1,1,1770072634696);
INSERT INTO User` VALUES(2,'admin','anggy.all@gmail.com','083819278102','$2b$10$2LFkAtYeNQ76x/IHn/1NveRckz5JVtlw27xP9get1ZhaUYowb4i3K','ADMIN',99999,'UNLIMITED',NULL,1,'AIzaSyDQTbIlQf_JC4zIeW2Drs5lKP40AcooQtE','gemini','',1,1,1770072696242);
CREATE TABLE IF NOT EXISTS "AiCredential` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'API_KEY',
    "key" TEXT,
    "value" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'HEADER',
    "refreshUrl" TEXT,
    "refreshPayload" TEXT,
    "tokenPath" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL, "lastRefreshed" DATETIME, "refreshInterval" INTEGER,
    CONSTRAINT "AiCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO AiCredential` VALUES(1,'sisharmoni','BEARER','','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwZXJzb25faWQiOm51bGwsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbImJpbGxpbmcucmVhZCIsImJpbGxpbmcubWFuYWdlIiwiZmluYW5jZS52ZXJpZnkiLCJjb250ZW50Lm1hbmFnZSIsInVuaXRzLm1hbmFnZSIsInBvbGwubWFuYWdlIiwicG9sbC52b3RlIiwiYXBwLmhvbWUuc3VtbWFyeSIsImFwcC5ob21lLnNob3J0Y3V0cyIsImFwcC5ob21lLmV2ZW50cyIsImFwcC5ob21lLnBvc3RzIiwiYXBwLmhvbWUubWFya2V0IiwiYXBwLmhvbWUucG9sbHMiLCJhcHAucHJvZmlsZS5tZSIsImFwcC5wcm9maWxlLm1lbWJlcnMiLCJhcHAucHJvZmlsZS52ZWhpY2xlcyIsImFwcC5wcm9maWxlLnVuaXRzIiwiYXBwLnByb2ZpbGUudW1rbSIsImFwcC5pbnZvaWNlcy52aWV3IiwiYXBwLmZ1bmRyYWlzZXJzLnZpZXciLCJhcHAuZ3Vlc3RfdmlzaXRzLnZpZXciLCJhcHAuZmVlZGJhY2tzLmNyZWF0ZSIsImFwcC5lbWVyZ2VuY2llcy5jcmVhdGUiLCJhcHAudW1rbS52aWV3IiwiYXBwLmNvbnRhY3RzLnZpZXciLCJhZG1pbi5yZWdpc3RyYXRpb25zLnJldmlldyIsImFkbWluLmhvdXNlX2NsYWltcy5yZXZpZXciLCJhZG1pbi5wYXltZW50cy52ZXJpZnkiLCJhZG1pbi5kb25hdGlvbnMudmVyaWZ5IiwiYWRtaW4uZ3Vlc3RfdmlzaXRzLm1hbmFnZSIsImFkbWluLmVtZXJnZW5jaWVzLm1hbmFnZSIsImFkbWluLmZlZWRiYWNrcy5tYW5hZ2UiLCJhZG1pbi5wb3N0cy5tYW5hZ2UiLCJhZG1pbi5ldmVudHMubWFuYWdlIiwiYWRtaW4ucG9sbHMubWFuYWdlIiwiYWRtaW4uZnVuZHJhaXNlcnMubWFuYWdlIiwiYWRtaW4uY2hhcmdlX3R5cGVzLm1hbmFnZSIsImFkbWluLmJpbGxpbmcuZ2VuZXJhdGUiLCJhZG1pbi5pbnZvaWNlcy5tYW5hZ2UiLCJhZG1pbi5sZWRnZXIuYWNjb3VudHMubWFuYWdlIiwiYWRtaW4ubGVkZ2VyLmVudHJpZXMubWFuYWdlIiwiYWRtaW4uaG91c2VzLm1hbmFnZSIsImFkbWluLnBlcnNvbnMubWFuYWdlIiwiYWRtaW4udmVoaWNsZXMubWFuYWdlIiwiYWRtaW4uaW52ZW50b3JpZXMubWFuYWdlIiwiYWRtaW4ubWVldGluZ19taW51dGVzLm1hbmFnZSIsImFkbWluLmNvbnRhY3RzLm1hbmFnZSIsImFkbWluLmJ1c2luZXNzZXMubWFuYWdlIiwiYWRtaW4udXNlcnMubWFuYWdlIiwiYWRtaW4ucmJhYy5tYW5hZ2UiLCJhZG1pbi5hcGlfY29uc29sZS51c2UiLCJhZG1pbi5hdWRpdF9sb2dzLnZpZXciXSwiaWF0IjoxNzcwMjE0MzMyLCJleHAiOjE3NzAzMDA3MzJ9.MRDVpkyj4f-OfJSWHNznFFixp-mZGGTonQSxvciOVtk','HEADER','https://warga.homesislab.my.id/api/v1/auth/login','{"username":"admin","password":"password"}','access_token',2,1770214415661,1770214415661,NULL,NULL);
CREATE TABLE IF NOT EXISTS "AiTool` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "baseUrl" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "headers" TEXT,
    "body" TEXT,
    "authType" TEXT NOT NULL DEFAULT 'NONE',
    "authRefreshUrl" TEXT,
    "authRefreshPayload" TEXT,
    "authTokenPath" TEXT,
    "credentialId" INTEGER,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "AiTool_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential` ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AiTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO AiTool` VALUES(1,'Test_Weather_API','Get weather for a city','GET','https://jsonplaceholder.typicode.com','/todos/{id}','{"type":"object","properties":{"id":{"type":"string","description":"Todo ID (simulating city)"}},"required":["id"]}',NULL,NULL,'NONE',NULL,NULL,NULL,NULL,1,1770072634710,1770072634710,1);
INSERT INTO AiTool` VALUES(2,'get_pet','untuk ambil data pet berdasarkan status','GET','https://petstore.swagger.io','/v2/pet/findByStatus','{"type":"object","properties":{"status":{"type":"string","enum":["available","pending","sold"],"description":"Status hewan yang ingin dicari (available/pending/sold)"}},"required":["status"]}','{}','{}','NONE',NULL,NULL,NULL,NULL,1,1770090034222,1770090753528,2);
INSERT INTO AiTool` VALUES(3,'get_inventory','tools ini untuk ambil data berapa yang sold, available, yang ter adopted','GET','https://petstore.swagger.io','/v2/store/inventory','{}','{}','{}','NONE',NULL,NULL,NULL,NULL,1,1770091090949,1770091090949,2);
INSERT INTO AiTool` VALUES(4,'list_unit','gunakan tools ini untuk get data rumah unit di sis','GET','https://warga.homesislab.my.id/api/v1','/onboarding/units','{}','{}','{}','NONE',NULL,NULL,NULL,1,1,1770216929932,1770350567803,2);
CREATE TABLE IF NOT EXISTS "Rule` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "triggerType" TEXT NOT NULL,
    "triggerValue" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'POST',
    "apiPayload" TEXT,
    "responseContent" TEXT,
    "responseMediaType" TEXT DEFAULT 'TEXT',
    "responseMediaUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT,
    "filterGroupId" TEXT,
    "credentialId" INTEGER,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rule_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential` ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Rule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO Rule` VALUES(2,'petstore','REGEX','petstore','AI_REPLY',NULL,'POST','{}','Kamu adalah asisten toko hewan. Gunakan tool yang tersedia untuk mengecek status hewan. Berikan jawaban singkat jelas, dengan bahasa yang ramah ','TEXT',NULL,1,NULL,NULL,NULL,2,1770090510083,1770090510083);
INSERT INTO Rule` VALUES(3,'agentsis','REGEX','agentsis','AI_REPLY',NULL,'POST','{}','Kamu adalah asisten perumahan sis. Gunakan tool yang tersedia untuk mengecek status warga, rumah, unit. Berikan jawaban singkat jelas, dengan bahasa yang ramah ','TEXT',NULL,1,NULL,NULL,NULL,2,1770350539826,1770350539826);
CREATE TABLE IF NOT EXISTS "Schedule` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "actionType" TEXT NOT NULL DEFAULT 'TEXT',
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'GET',
    "apiPayload" TEXT,
    "credentialId" INTEGER,
    "cronExpression" TEXT NOT NULL,
    "lastRun" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedule_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential` ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Broadcast` (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "name" TEXT,
    "tag" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "actionType" TEXT NOT NULL DEFAULT 'TEXT',
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'GET',
    "apiPayload" TEXT,
    "credentialId" INTEGER,
    "total" INTEGER NOT NULL DEFAULT 0,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PROCESSING',
    "userId" INTEGER NOT NULL,
    "cratedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Broadcast_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential` ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Broadcast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User` ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "AiTool_name_key" ON "AiTool"("name");
CREATE UNIQUE INDEX "AiCredential_userId_name_key" ON "AiCredential"("userId", "name");

