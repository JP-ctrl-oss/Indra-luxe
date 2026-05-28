import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "prod_01J8HZEARX1234567890ABCDEF",
    slug: "sari-banarasi-seda",
    base_price: 250.00,
    sizes: ["U"], // Unica
    stock: { "U": 5 },
    category: "Sarees",
    tags: ["Seda", "Boda", "Elegante", "Hecho a mano"],
    cover_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"
    ],
    origin: "india",
    material: "Seda Natural de Varanasi / Banarasi Silk",
    care: "Solo limpieza en seco / Dry clean only",
    is_active: true,
    is_featured: true,
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Sari de Seda Banarasi Real",
        description: "Sari real tejido a mano con la más fina seda Banarasi e hilos de oro de Varanasi, India. Una pieza de colección con intrincados motivos florales inspirados en el arte mogol.",
        material: "100% Seda Natural Banarasi con hilos dorados (Zari)",
        care: "Limpieza profesional en seco únicamente. Evitar exposición directa al sol."
      },
      en: {
        title: "Royal Banarasi Silk Saree",
        description: "Exquisite hand-woven saree made of premium Banarasi silk and gold-plated Zari threads from Varanasi, India. A collectors piece featuring intricate Mughal-inspired floral patterns.",
        material: "100% Pure Banarasi Silk with fine gold Zari threads",
        care: "Professional dry clean only. Store wrapped in soft cotton fabric."
      },
      fr: {
        title: "Sari de Soie Royale de Banarasi",
        description: "Sari tissé à la main avec la soie la plus fine de Banarasi et des fils d'or de Varanasi, en Inde. Une pièce de collection aux motifs floraux raffinés inspirés de l'art moghol.",
        material: "100% Soie de Banarasi Pure avec fils Zari dorés",
        care: "Nettoyage à sec uniquement."
      },
      de: {
        title: "Königlicher Banarasi Seidensari",
        description: "Exquisiter, handgewebter Sari aus feinster Banarasi-Seide und vergoldeten Zari-Fäden aus Varanasi, Indien. Ein Sammlerstück mit kunstvollen, von den Moguln inspirierten Mustern.",
        material: "100% Reine Banarasi Seide mit feinen Zari Goldfäden",
        care: "Nur professionelle chemische Reinigung."
      },
      hi: {
        title: "शाही बनारसी सिल्क साड़ी",
        description: "वाराणसी, भारत के बेहतरीन बनारसी रेशम और सोने के जरी धागों से बुनी गई उत्तम साड़ी। मुगल कला से प्रेरित जटिल डिजाइनों के साथ एक संग्रहणीय टुकड़ा।",
        material: "100% शुद्ध बनारसी सिल्क और सोने के जरी धागे",
        care: "केवल ड्राई क्लीन करें।"
      },
      th: {
        title: "ชุดส่าหรีผ้าไหมบานาราสีหลวง",
        description: "ชุดส่าหรีทอมือสุดประณีต ทำจากผ้าไหมบานาราสีระดับพรีเมียมและดิ้นทองแท้จากเมืองพาราณสี ประเทศอินเดีย งานสะสมล้ำค่าดีไซน์ลายดอกไม้ศิลปะโมกุลอันวิจิตร",
        material: "ผ้าไหมบานาราสีแท้ 100% พร้อมดิ้นทองคุณภาพสูง",
        care: "ซักแห้งโดยช่างผู้ชำนาญการเท่านั้น"
      }
    }
  },
  {
    id: "prod_02J8HZEARX1234567890ABCDEF",
    slug: "kurta-lino-chikankari",
    base_price: 120.00,
    sizes: ["S", "M", "L", "XL"],
    stock: { "S": 3, "M": 8, "L": 6, "XL": 2 },
    category: "Kurtas",
    tags: ["Lino", "Verano", "Bordado", "Tradicional"],
    cover_image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"],
    origin: "india",
    material: "Lino Orgánico Premium / Organic Linen",
    care: "Lavar a mano en agua fría / Hand wash cold",
    is_active: true,
    is_featured: true,
    created_at: "2026-05-02T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Kurta de Lino con Bordado Chikankari",
        description: "Kurta unisex confeccionada en lino orgánico de alta calidad con bordado a mano Chikankari, originario de Lucknow, India. Ligera, fresca y sumamente elegante para el verano.",
        material: "100% Lino Orgánico de cultivo sostenible",
        care: "Lavar a mano con agua fría y jabón neutro. Secar a la sombra."
      },
      en: {
        title: "Linen Chikankari Embroidered Kurta",
        description: "Unisex kurta crafted from organic linen with intricate hand-embroidered Chikankari motifs from Lucknow, India. Light, breathable, and highly elegant for summer.",
        material: "100% Sustainable Organic Linen",
        care: "Hand wash cold with mild detergent. Hang dry in shade."
      },
      fr: {
        title: "Kurta en Lin Brodé Chikankari",
        description: "Kurta unisexe confectionnée en lin biologique de haute qualité avec broderie artisanale Chikankari de Lucknow, Inde. Légère, fraîche et d'une grande élégance.",
        material: "100% Lin Biologique",
        care: "Lavage à la main à l'eau froide."
      },
      de: {
        title: "Leinenkurta mit Chikankari Stickerei",
        description: "Unisex-Kurta aus biologischem Leinen mit detailreichen, handgestickten Chikankari-Motiven aus Lucknow, Indien. Leicht, atmungsaktiv und sehr elegant für heiße Sommertage.",
        material: "100% Nachhaltiges Bio-Leinen",
        care: "Handwäsche mit kaltem Wasser und mildem Waschmittel."
      },
      hi: {
        title: "चिकनकारी कढ़ाई वाली सूती कुर्ता",
        description: "लखनऊ, भारत के जटिल हस्तनिर्मित चिकनकारी कढ़ाई के साथ जैविक लिनन से तैयार किया गया यूनिसेक्स कुर्ता। गर्मियों के लिए बेहद हल्का, हवादार और सुरुचिपूर्ण।",
        material: "100% जैविक लिनन",
        care: "ठंडे पानी में हाथ से धोएं।"
      },
      th: {
        title: "เสื้อกูรตะผ้าลินินปักลายชิคันคาริ",
        description: "เสื้อกูรตะสำหรับทุกเพศ ตัดเย็บจากผ้าลินินออร์แกนิกเนื้อนุ่ม ตกแต่งลายปักชิคันคาริด้วยมืออย่างวิจิตรบรรจงจากเมืองลัคเนา ประเทศอินเดีย โปร่งสบายและหรูหรา",
        material: "ผ้าลินินออร์แกนิกยั่งยืน 100%",
        care: "ซักมือด้วยน้ำเย็นและน้ำยาถนอมผ้า"
      }
    }
  },
  {
    id: "prod_03J8HZEARX1234567890ABCDEF",
    slug: "kaftan-seda-mulberry",
    base_price: 180.00,
    sizes: ["U"],
    stock: { "U": 12 },
    category: "Vestidos",
    tags: ["Seda", "Estampado", "Playero", "Casual Lujo"],
    cover_image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"],
    origin: "india",
    material: "Seda Mulberry / Mulberry Silk",
    care: "Solo limpieza en seco / Dry clean only",
    is_active: true,
    is_featured: false,
    created_at: "2026-05-03T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Kaftán de Seda Mulberry",
        description: "Exclusivo kaftán fluido elaborado con seda pura Mulberry. Presenta un estampado de block-print realizado a mano con pigmentos vegetales orgánicos. Caída espectacular.",
        material: "100% Seda Mulberry e hilos de tinte vegetal",
        care: "Limpieza en seco profesional. Planchar a baja temperatura por el revés."
      },
      en: {
        title: "Mulberry Silk Kaftan",
        description: "Exclusive flowing kaftan crafted in pure Mulberry silk. Embellished with hand block-printed floral patterns using organic vegetable dyes. Magnificent drape.",
        material: "100% Mulberry Silk with natural botanical dyes",
        care: "Professional dry clean only. Iron on low heat on the reverse side."
      },
      fr: {
        title: "Kaftan en Soie Mulberry",
        description: "Kaftan fluide haut de gamme en soie Mulberry pure. Orné d'impressions block-print artisanales faites avec des teintures végétales. Un drapé spectaculaire.",
        material: "100% Soie Mulberry avec teintures naturelles",
        care: "Nettoyage à sec uniquement."
      },
      de: {
        title: "Kaftan aus Mulberry-Seide",
        description: "Exklusiver, fließender Kaftan aus reiner Mulberry-Seide. Verziert mit handgefertigten Blockdruckmustern unter Verwendung biologischer Pflanzenfarben. Traumhafter Fall.",
        material: "100% Mulberry-Seide mit natürlichen Pflanzenfarben",
        care: "Nur professionelle chemische Reinigung."
      },
      hi: {
        title: "शहतूत रेशम काफ्तान",
        description: "शुद्ध शहतूत रेशम में तैयार किया गया विशेष काफ्तान। जैविक वनस्पति रंगों का उपयोग करके हाथ से ब्लॉक-प्रिंटेड पुष्प पैटर्न से अलंकृत।",
        material: "100% शहतूत रेशम (Mulberry Silk)",
        care: "केवल ड्राई क्लीन करें।"
      },
      th: {
        title: "เสื้อคลุมคาฟทานผ้าไหมมัลเบอร์รี่",
        description: "เสื้อคาฟทานพลิ้วไหวสุดหรูหรา ทอจากผ้าไหมมัลเบอร์รี่บริสุทธิ์ พิมพ์ลายดอกไม้บล็อกไม้ทอมือโดยใช้สีย้อมจากธรรมชาติสกัดจากพืชพรรณ ทิ้งตัวสวยงามมาก",
        material: "ผ้าไหมมัลเบอร์รี่ 100% ย้อมสีธรรมชาติ",
        care: "ซักแห้งเท่านั้น รีดด้วยความร้อนต่ำด้านใน"
      }
    }
  },
  {
    id: "prod_04J8HZEARX1234567890ABCDEF",
    slug: "vestido-seda-sangjan",
    base_price: 290.00,
    sizes: ["S", "M", "L"],
    stock: { "S": 4, "M": 6, "L": 3 },
    category: "Vestidos",
    tags: ["Seda tailandesa", "Elegante", "Edición Limitada"],
    cover_image: "https://images.unsplash.com/photo-1561369769-6c31e089414e?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1561369769-6c31e089414e?q=80&w=800&auto=format&fit=crop"],
    origin: "thailand",
    material: "Seda Tailandesa Sangjan / Thai Silk",
    care: "Solo limpieza en seco / Dry clean only",
    is_active: true,
    is_featured: true,
    created_at: "2026-05-04T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Vestido de Seda Tailandesa Sangjan",
        description: "Vestido midi estructurado, elaborado en la icónica seda brillante Sangjan de Tailandia. Confección tradicional con un sofisticado escote y forro de satén suave.",
        material: "100% Seda Tailandesa Sangjan (Loom-woven)",
        care: "Evitar contacto con perfumes. Limpieza en seco profesional. Guardar colgado."
      },
      en: {
        title: "Sangjan Thai Silk Dress",
        description: "Structured midi dress crafted from Thailand's iconic shiny Sangjan silk. Handloom woven featuring a sophisticated neckline and lined with premium soft satin.",
        material: "100% Handloom Thai Sangjan Silk",
        care: "Avoid contact with perfumes. Professional dry clean only."
      },
      fr: {
        title: "Robe en Soie Thaïlandaise Sangjan",
        description: "Robe midi structurée en soie brillante légendaire Sangjan de Thaïlande. Tissage traditionnel avec un décolleté élégant et une doublure en satin de soie.",
        material: "100% Soie Thaïlandaise Sangjan",
        care: "Nettoyage à sec uniquement."
      },
      de: {
        title: "Sangjan Kleid aus thailändischer Seide",
        description: "Strukturiertes Midikleid aus Thailands legendärer, glänzender Sangjan-Seide. Auf Handwebstühlen gefertigt, mit anspruchsvollem Halsausschnitt und weichem Satinfutter.",
        material: "100% Handgewebte thailändische Sangjan-Seide",
        care: "Kontakt mit Parfüm vermeiden. Nur professionelle chemische Reinigung."
      },
      hi: {
        title: "सांगजान थाई सिल्क पोशाक",
        description: "थाईलैंड के प्रसिद्ध चमकदार सांगजान रेशम से तैयार की गई मिडी पोशाक। एक परिष्कृत नेकलाइन और प्रीमियम साटन अस्तर के साथ एक उत्कृष्ट कृति।",
        material: "100% थाई सांगजान रेशम",
        care: "केवल ड्राई क्लीन करें।"
      },
      th: {
        title: "เดรสผ้าไหมไทยแสงจันทร์",
        description: "เดรสยาวระดับเข่าทรงเข้ารูปอย่างดี ตัดเย็บจากผ้าไหมแสงจันทร์ทอเงางามอันเป็นเอกลักษณ์ของไทย ทอด้วยกี่มือแบบดั้งเดิม คอเสื้อหรูหรา และซับในด้วยผ้าซาตินเนื้อนุ่มระดับพรีเมียม",
        material: "ผ้าไหมแสงจันทร์ทอมือ 100%",
        care: "หลีกเลี่ยงการฉีดน้ำหอมโดยตรง ซักแห้งเท่านั้น"
      }
    }
  },
  {
    id: "prod_05J8HZEARX1234567890ABCDEF",
    slug: "kimono-seda-chiangmai",
    base_price: 160.00,
    sizes: ["U"],
    stock: { "U": 15 },
    category: "Abrigos",
    tags: ["Seda Ikat", "Chaquetilla", "Chiang Mai", "Teñido Natural"],
    cover_image: "https://images.unsplash.com/photo-1539008885128-403213a06a7b?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1539008885128-403213a06a7b?q=80&w=800&auto=format&fit=crop"],
    origin: "thailand",
    material: "Seda Ikat Chiang Mai / Ikat Silk",
    care: "Solo limpieza en seco / Dry clean only",
    is_active: true,
    is_featured: false,
    created_at: "2026-05-05T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Chaqueta Kimono de Seda Chiang Mai",
        description: "Chaqueta holgada estilo kimono confeccionada en seda Ikat teñida de forma artesanal en Chiang Mai, Tailandia. Patrones geométricos que combinan azul índigo y crema natural.",
        material: "100% Seda Ikat Tailandesa teñida con índigo vegetal",
        care: "Lavar en seco únicamente para proteger los tintes orgánicos de índigo."
      },
      en: {
        title: "Chiang Mai Ikat Silk Kimono",
        description: "Loose-fitting kimono jacket crafted from hand-dyed Ikat silk in Chiang Mai, Thailand. Features striking geometric patterns in rich indigo and soft natural cream.",
        material: "100% Indigo-dyed Thai Ikat Silk",
        care: "Dry clean only to preserve the natural botanical indigo dyes."
      },
      fr: {
        title: "Veste Kimono en Soie Ikat Chiang Mai",
        description: "Veste ample style kimono en soie Ikat teinte à la main à Chiang Mai, Thaïlande. Motifs géométriques mêlant bleu indigo et crème naturelle.",
        material: "100% Soie Ikat Thaïlandaise avec indigo naturel",
        care: "Nettoyage à sec uniquement."
      },
      de: {
        title: "Chiang Mai Ikat-Seidenkimono",
        description: "Locker sitzende Kimonojacke aus handgefärbter Ikat-Seide aus Chiang Mai, Thailand. Mit auffälligen geometrischen Mustern in Indigo und cremigem Naturweiß.",
        material: "100% Handgefärbte thailändische Ikat-Seide",
        care: "Nur chemische Reinigung, um die natürlichen Indigofarben zu schützen."
      },
      hi: {
        title: "चियांग माई इकत सिल्क किमोनो",
        description: "चियांग माई, थाईलैंड में हाथ से रंगे इकत रेशम से तैयार ढीला-ढाला किमोनो जैकेट। समृद्ध इंडिगो और प्राकृतिक क्रीम में आकर्षक ज्यामितीय पैटर्न।",
        material: "100% इकत रेशम (Ikat Silk)",
        care: "केवल ड्राई क्लीन करें।"
      },
      th: {
        title: "เสื้อคลุมกิโมโนผ้าไหมมัดหมี่เชียงใหม่",
        description: "เสื้อคลุมทรงกิโมโนตัวหลวมดีไซน์ทันสมัย ตัดเย็บจากผ้าไหมมัดหมี่ย้อมสีธรรมชาติจากเชียงใหม่ โดดเด่นด้วยลวดลายเรขาคณิตโทนสีครามอินดิโก้และสีครีมธรรมชาติสุดคลาสสิก",
        material: "ผ้าไหมมัดหมี่เชียงใหม่ย้อมครามแท้ 100%",
        care: "ซักแห้งเท่านั้น เพื่อถนอมสีครามธรรมชาติไม่ให้ซีดจาง"
      }
    }
  },
  {
    id: "prod_06J8HZEARX1234567890ABCDEF",
    slug: "pantalon-lino-sukhothai",
    base_price: 95.00,
    sizes: ["S", "M", "L", "XL"],
    stock: { "S": 5, "M": 10, "L": 8, "XL": 4 },
    category: "Pantalones",
    tags: ["Lino", "Comodo", "Orgánico", "Minimalista"],
    cover_image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop"],
    origin: "thailand",
    material: "Lino de Algodón Sukhothai / Cotton Linen",
    care: "Lavar a máquina en ciclo delicado / Gentle machine wash",
    is_active: true,
    is_featured: false,
    created_at: "2026-05-06T00:00:00Z",
    updated_at: "2026-05-28T00:00:00Z",
    translations: {
      es: {
        title: "Pantalón de Lino Sukhothai",
        description: "Pantalón de lino orgánico ultra cómodo y relajado, tejido de forma tradicional en Sukhothai. Corte sastre elegante con cintura ajustable por cordón de algodón natural.",
        material: "70% Lino Orgánico, 30% Algodón puro",
        care: "Lavar a máquina a 30°C en ciclo delicado. No usar secadora."
      },
      en: {
        title: "Sukhothai Linen Lounge Pants",
        description: "Ultra-comfortable relaxed linen pants, woven in the historic town of Sukhothai, Thailand. Styled with clean tailoring and a adjustable natural cotton drawstring waist.",
        material: "70% Organic Linen, 30% Pure Cotton blend",
        care: "Machine wash at 30°C on delicate cycle. Do not tumble dry."
      },
      fr: {
        title: "Pantalon en Lin Sukhothai",
        description: "Pantalon en lin de coton biologique ultra confortable, tissé de manière traditionnelle à Sukhothai, Thaïlande. Coupe élégante avec cordon réglable.",
        material: "70% Lin Biologique, 30% Coton Pur",
        care: "Lavage en machine à 30°C en cycle délicat."
      },
      de: {
        title: "Sukhothai Leinen-Freizeithose",
        description: "Äußerst bequeme, lockere Freizeithose aus Bio-Leinen, gewebt in der historischen Stadt Sukhothai, Thailand. Elegant geschnitten mit verstellbarem Kordelzug.",
        material: "70% Bio-Leinen, 30% Reines Baumwollgemisch",
        care: "Maschinenwäsche bei 30°C im Schonwaschgang. Nicht im Trockner trocknen."
      },
      hi: {
        title: "सुखोथाई लिनन लाउंज पैंट",
        description: "थाईलैंड के ऐतिहासिक शहर सुखोथाई में बुने गए बेहद आरामदायक और ढीले लिनन पैंट। समायोज्य प्राकृतिक कपास ड्रॉस्ट्रिंग कमर के साथ डिज़ाइन किया गया।",
        material: "70% जैविक लino, 30% शुद्ध कपास",
        care: "नाजुक चक्र पर 30 डिग्री सेल्सियस पर मशीन धोएं।"
      },
      th: {
        title: "กางเกงผ้าลินินสุโขทัย",
        description: "กางเกงผ้าลินินผสมผ้าฝ้ายทอพื้นเมืองสุโขทัย สวมใส่สบายเป็นพิเศษ ทรงขากว้างทันสมัยเรียบหรู พร้อมเอวยางยืดปรับกระชับสายผูกฝ้ายธรรมชาติสไตล์มินิมอล",
        material: "ผ้าลินินออร์แกนิก 70% ผสมผ้าฝ้ายแท้ 30%",
        care: "ซักเครื่องได้ด้วยโหมดถนอมผ้าที่อุณหภูมิ 30°C ห้ามปั่นแห้ง"
      }
    }
  }
];
