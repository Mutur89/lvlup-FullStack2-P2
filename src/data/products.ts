// src/data/products.ts

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'JM1',
    nombre: 'Catan',
    categoria: 'Juegos de Mesa',
    imagen: 'https://media.falabella.com/falabellaCL/123069773_01/w=1500,h=1500,fit=pad',
    descripcion: '¡Prepárate para convertirte en un pionero! En Catan, explorarás la isla de Catán, recolectarás recursos como madera, ladrillos y ovejas, y construirás tus asentamientos y caminos. Pero ten cuidado con el ladrón, que puede arruinar tus planes. Es un juego de estrategia, negociación y un poco de suerte, perfecto para cualquiera que busque construir un nuevo mundo.',
    precio: 29990,
    stock: 10
  },
  {
    id: 'JM2',
    nombre: 'Carcassonne',
    categoria: 'Juegos de Mesa',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_721490-MLA79985405452_102024-O.webp',
    descripcion: 'Viaja al sur de Francia y construye tu propio paisaje medieval. En Carcassonne, colocarás losetas para crear campos, caminos, ciudades y monasterios, mientras despliegas estratégicamente a tus seguidores para ganar puntos. Cada partida es un nuevo rompecabezas, y el jugador que mejor gestione sus recursos y sea más astuto que sus oponentes será coronado como el ganador.',
    precio: 24990,
    stock: 10
  },
  {
    id: 'JM3',
    nombre: 'Dixit',
    categoria: 'Juegos de Mesa',
    imagen: 'https://media.falabella.com/falabellaCL/6384312_1/w=1500,h=1500,fit=pad',
    descripcion: '¡Deja volar tu imaginación! Dixit es un hermoso juego de narración donde usas una sola palabra o frase para describir una imagen encantadora. El truco es ser lo suficientemente creativo para dar una pista sin ser demasiado obvio. Es un juego de intuición y creatividad perfecto para todas las edades que garantiza risas.',
    precio: 21990,
    stock: 10
  },
  {
    id: 'JM4',
    nombre: 'Aventureros al Tren',
    categoria: 'Juegos de Mesa',
    imagen: 'https://media.falabella.com/falabellaCL/6490992_1/w=1500,h=1500,fit=pad',
    descripcion: '¡Sube a bordo y construye tu imperio ferroviario! Aventureros al Tren es un emocionante juego de estrategia donde los jugadores compiten para conectar ciudades y completar rutas. Con componentes de alta calidad y una jugabilidad adictiva, es perfecto para familias y grupos de amigos.',
    precio: 34990,
    stock: 10
  },
  {
    id: 'JM5',
    nombre: 'Azul',
    categoria: 'Juegos de Mesa',
    imagen: 'https://www.elpatiogeek.cl/cdn/shop/products/azul_1024x1024@2x.jpg?v=1637793973',
    descripcion: '¡Embárcate en una aventura de color y estrategia! Azul es un juego de mesa donde los jugadores compiten para crear el mosaico más hermoso utilizando azulejos de colores. Con mecánicas simples pero una profundidad táctica sorprendente, es perfecto para jugadores de todas las edades.',
    precio: 30990,
    stock: 10
  },
  {
    id: 'JM6',
    nombre: '7 Wonders',
    categoria: 'Juegos de Mesa',
    imagen: 'https://ansaldo.cl/cdn/shop/files/31306.jpg?v=1753365376&width=493',
    descripcion: '¡Construye una civilización que perdure en el tiempo! 7 Wonders es un juego de cartas donde los jugadores desarrollan su ciudad a lo largo de tres eras, recolectando recursos, comerciando y construyendo maravillas arquitectónicas. La estrategia y la planificación son clave para superar a tus oponentes y alcanzar la gloria.',
    precio: 27990,
    stock: 10
  },
  {
    id: 'JM7',
    nombre: 'Pandemic',
    categoria: 'Juegos de Mesa',
    imagen: 'https://media.falabella.com/falabellaCL/6853861_1/w=1500,h=1500,fit=pad',
    descripcion: '¡El mundo está en peligro! Pandemic es un juego cooperativo donde los jugadores asumen el papel de especialistas en enfermedades que deben trabajar juntos para detener brotes y encontrar curas. La comunicación y la estrategia son clave para salvar a la humanidad.',
    precio: 19990,
    stock: 10
  },
  {
    id: 'JM8',
    nombre: 'La resistencia',
    categoria: 'Juegos de Mesa',
    imagen: 'https://www.magicsur.cl/23807-large_default/la-resistencia.jpg',
    descripcion: '¡Únete a la lucha contra la opresión! La Resistencia es un juego de deducción social donde los jugadores asumen roles secretos y deben trabajar juntos para completar misiones mientras desconfían de los demás. La estrategia y la persuasión son clave para triunfar en este emocionante juego de engaño.',
    precio: 13990,
    stock: 10
  },
  {
    id: 'JM9',
    nombre: 'Colt Express',
    categoria: 'Juegos de Mesa',
    imagen: 'https://www.antartica.cl/media/catalog/product/3/7/3760269590304_1.png?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg',
    descripcion: 'Prepárate para un salvaje robo de tren! En Colt Express, subirás a un tren para robar a los pasajeros, disparar a tus oponentes y recoger todo el botín posible. Planifica tus acciones en secreto y luego observa cómo se desarrollan en una secuencia caótica y divertida. Es un juego divertido y de ritmo rápido que trae el salvaje oeste a tu mesa.',
    precio: 22990,
    stock: 10
  },
  {
    id: 'JM10',
    nombre: 'CodeNames',
    categoria: 'Juegos de Mesa',
    imagen: 'https://www.elpatiogeek.cl/cdn/shop/products/codigo_1_1024x1024@2x.jpg?v=1637794707',
    descripcion: '¡Pon a prueba tu ingenio y creatividad! CodeNames es un juego de palabras en el que los jugadores deben adivinar palabras clave a partir de pistas dadas por sus compañeros. La comunicación y la asociación de ideas son clave para ganar en este emocionante juego de equipo.',
    precio: 18990,
    stock: 10
  },
  {
    id: 'JM11',
    nombre: 'Stone Age',
    categoria: 'Juegos de Mesa',
    imagen: 'https://kaiojuegos.cl/1329-large_default/stone-age-juego-de-mesa.jpg',
    descripcion: '¡Viaja atrás en el tiempo y construye una civilización! Stone Age es un juego de mesa donde los jugadores deben recolectar recursos, construir herramientas y desarrollar su tribu en la era prehistórica. La estrategia y la gestión de recursos son clave para prosperar en este emocionante juego.',
    precio: 43990,
    stock: 10
  },
  {
    id: 'JM12',
    nombre: 'Terraforming Mars',
    categoria: 'Juegos de Mesa',
    imagen: 'https://www.cafe2d6.cl/cdn/shop/files/Terraforming_Mars_Caja_1024x1024.png?v=1754079631',
    descripcion: '¡Conviértete en el líder de la terraformación de Marte! Terraforming Mars es un juego de estrategia donde los jugadores asumen el papel de corporaciones que compiten por transformar el planeta rojo en un lugar habitable. A través de la gestión de recursos y la planificación a largo plazo, deberás aumentar la temperatura, crear océanos y desarrollar vegetación para ganar puntos de terraformación. La interacción entre jugadores y la toma de decisiones son clave en este emocionante juego de mesa.',
    precio: 55990,
    stock: 10
  },
  // ... (productos anteriores de Juegos de Mesa)
  
  {
    id: 'MS1',
    nombre: 'Logitech G502 HERO',
    categoria: 'Mouse',
    imagen: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    descripcion: 'Mouse gamer con sensor HERO de alta precisión, 11 botones programables y pesas ajustables para personalizar la experiencia.',
    precio: 39990,
    stock: 10
  },
  {
    id: 'MS2',
    nombre: 'Razer DeathAdder V2',
    categoria: 'Mouse',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_653924-MLC51868565175_102022-O-mouse-gamer-razer-deathadder-v2-mini-negro-8500-dpi.webp',
    descripcion: 'Ergonomía icónica, sensor óptico Focus+ de 20,000 DPI y switches ópticos para máxima velocidad.',
    precio: 44990,
    stock: 10
  },
  {
    id: 'MS3',
    nombre: 'HyperX Pulsefire FPS Pro',
    categoria: 'Mouse',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZb_HY4lC9Dwhg_hhIhodpfcsUrFreV8pQg&s',
    descripcion: 'Sensor Pixart 3389, RGB personalizable y memoria interna para guardar perfiles.',
    precio: 29990,
    stock: 10
  },
  {
    id: 'MS4',
    nombre: 'Corsair M65 RGB Elite',
    categoria: 'Mouse',
    imagen: 'https://m.media-amazon.com/images/I/81uKWXUP9sL._UF350,350_QL80_.jpg',
    descripcion: 'Carcasa de aluminio, sensor óptico de 18,000 DPI y sistema de pesas ajustable.',
    precio: 36990,
    stock: 10
  },
  {
    id: 'MS5',
    nombre: 'Cooler Master MM711',
    categoria: 'Mouse',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR0pUUCPM1c3xJl0wxzJWgrMu38MkKJDsL1w&s',
    descripcion: 'Diseño ultraligero tipo panal, cable flexible y sensor óptico de alta precisión.',
    precio: 32990,
    stock: 10
  },
  {
    id: 'MS6',
    nombre: 'Logitech G203 Lightsync',
    categoria: 'Mouse',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTycPkW9faklL4bseJewpiK596Lognzp-TGwg&s',
    descripcion: 'Iluminación RGB Lightsync, sensor de 8,000 DPI y diseño compacto y cómodo.',
    precio: 21990,
    stock: 10
  },
  {
    id: 'MS7',
    nombre: 'Razer Viper Ultimate',
    categoria: 'Mouse',
    imagen: 'https://img.asmedia.epimg.net/resizer/v2/7TX5H7LI2FL6NKETNGPDMVMUNE.jpg?auth=ad691caf80867c01c9db302f1f302176a59de3eaed5288d94c6b53856a5ffe83&width=1472&height=828&smart=true',
    descripcion: 'Mouse inalámbrico ultraligero, sensor Focus+ de 20,000 DPI y switches ópticos.',
    precio: 89990,
    stock: 10
  },
  {
    id: 'MS8',
    nombre: 'HyperX Pulsefire Dart',
    categoria: 'Mouse',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_709105-MLC42500581996_072020-O.webp',
    descripcion: 'Mouse inalámbrico con carga Qi, sensor Pixart 3389 y diseño ergonómico.',
    precio: 59990,
    stock: 10
  },
  {
    id: 'MS9',
    nombre: 'Corsair M65 RGB Elite',
    categoria: 'Mouse',
    imagen: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2019/01/M65_RGB_ELITE_BLK_39.jpg?width=1280&height=720&fit=bounds&format=jpg&auto=webp&quality=80',
    descripcion: 'Carcasa de aluminio, sensor óptico de 18,000 DPI y sistema de pesas ajustable.',
    precio: 36990,
    stock: 10
  },
  {
    id: 'MS10',
    nombre: 'Cooler Master MM711',
    categoria: 'Mouse',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqb6PMgYEqBdU-1-WCYP5ZY_Gdh5US30PO_Q&s',
    descripcion: 'Diseño ultraligero tipo panal, cable flexible y sensor óptico de alta precisión.',
    precio: 32990,
    stock: 10
  },
  {
    id: 'MS11',
    nombre: 'Logitech G203 Lightsync',
    categoria: 'Mouse',
    imagen: 'https://miportal.entel.cl/static/marketing/images/mouse-g203-lightsync-02.jpg',
    descripcion: 'Iluminación RGB Lightsync, sensor de 8,000 DPI y diseño compacto y cómodo.',
    precio: 21990,
    stock: 10
  },
  {
    id: 'MS12',
    nombre: 'Razer Viper Ultimate V2 PRO',
    categoria: 'Mouse',
    imagen: 'https://thegamingsetup.com/wp-content/uploads/viper-v2-box-1024x781.jpeg',
    descripcion: 'Versión mejorada del Viper Ultimate, aún más ligero y con mejor batería para eSports.',
    precio: 89990,
    stock: 10
  },
  
  {
    id: 'MP1',
    nombre: 'SteelSeries QcK',
    categoria: 'Mousepad',
    imagen: 'https://microless.com/cdn/products/2d48b044a4f60226f8fa02b8208c0a9e-hi.jpg',
    descripcion: 'Superficie de tela microtejida para precisión y control en cada movimiento.',
    precio: 12990,
    stock: 10
  },
  {
    id: 'MP2',
    nombre: 'Razer Goliathus Speed',
    categoria: 'Mousepad',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflH2KkDJPRkLVsM_yFSgm4iB32WEaAndZaQ&s',
    descripcion: 'Mousepad optimizado para velocidad, ideal para movimientos rápidos y precisos.',
    precio: 15990,
    stock: 10
  },
  {
    id: 'MP3',
    nombre: 'HyperX Fury S Pro',
    categoria: 'Mousepad',
    imagen: 'https://cdn.panacompu.com/cdn-img/pv/hyperx-fury-s-pro-l.jpg?width=780&height=780&fixedwidthheight=false',
    descripcion: 'Bordes cosidos y superficie uniforme para máxima durabilidad y precisión.',
    precio: 13990,
    stock: 10
  },
  {
    id: 'MP4',
    nombre: 'SteelSeries QcK Heavy',
    categoria: 'Mousepad',
    imagen: 'https://img.overclockers.co.uk/images/GS-008-ST/61580d58229f3d54052d3994fb022304.jpg',
    descripcion: 'Versión más gruesa del clásico QcK, ideal para mayor comodidad y estabilidad.',
    precio: 16990,
    stock: 10
  },
  {
    id: 'MP5',
    nombre: 'Razer Goliathus Extended',
    categoria: 'Mousepad',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCllgqqEcK8o3ZEjg8PoDuiEEfLpgDwX4zaQ&s',
    descripcion: 'Mousepad extendido para teclado y mouse, superficie optimizada para velocidad.',
    precio: 19990,
    stock: 10
  },
  {
    id: 'MP6',
    nombre: 'HyperX Fury S Speed',
    categoria: 'Mousepad',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_653365-CBT80095733781_102024-O.webp',
    descripcion: 'Superficie suave y bordes cosidos para movimientos rápidos y precisos.',
    precio: 14990,
    stock: 10
  },
  {
    id: 'MP7',
    nombre: 'SteelSeries QcK Mini',
    categoria: 'Mousepad',
    imagen: 'https://i.ytimg.com/vi/8pjgup9nmRc/maxresdefault.jpg',
    descripcion: 'Versión compacta del QcK, perfecta para escritorios pequeños o portabilidad.',
    precio: 9990,
    stock: 10
  },
  {
    id: 'MP8',
    nombre: 'Razer Goliathus Control',
    categoria: 'Mousepad',
    imagen: 'https://tpucdn.com/review/razer-goliathus-control-speed/images/title2.jpg',
    descripcion: 'Superficie texturizada para máximo control del mouse en juegos de precisión.',
    precio: 15990,
    stock: 10
  },
  
  {
    id: 'PC1',
    nombre: 'Asus ROG Strix G15',
    categoria: 'Computador Gamer',
    imagen: 'https://ztech.cl/cdn/shop/files/2000398012331-1_1.jpg?v=1757020934&width=600',
    descripcion: 'Notebook gamer de alto rendimiento con diseño ROG, ideal para juegos exigentes y multitarea.',
    precio: 1299900,
    stock: 10
  },
  {
    id: 'PC2',
    nombre: 'MSI Katana GF66',
    categoria: 'Computador Gamer',
    imagen: 'https://home.ripley.cl/store/Attachment/WOP/D113/2000387723095/2000387723095_2.jpg',
    descripcion: 'Notebook gamer con potente gráfica y procesador Intel, perfecto para gaming y productividad.',
    precio: 1099990,
    stock: 10
  },
  {
    id: 'PC3',
    nombre: 'Acer Nitro 5',
    categoria: 'Computador Gamer',
    imagen: 'https://m.media-amazon.com/images/I/81C15ODSyNL._AC_SL1500_.jpg',
    descripcion: 'Notebook gamer con excelente relación precio/rendimiento y refrigeración avanzada.',
    precio: 899990,
    stock: 10
  },
  {
    id: 'PC4',
    nombre: 'Razer Blade 16',
    categoria: 'Computador Gamer',
    imagen: 'https://www.lowyat.net/wp-content/uploads/2023/05/Razer-Blade-16-6.jpg',
    descripcion: 'Portátil gamer premium con pantalla de alta tasa de refresco y diseño ultradelgado.',
    precio: 2199990,
    stock: 10
  },
  {
    id: 'PC5',
    nombre: 'Razer Blade 15',
    categoria: 'Computador Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_662663-MLC44190178292_112020-O-notebook-gamer-razer-blade-i7-16gb-512ssd-rtx2060-144hz-156.webp',
    descripcion: 'Notebook gamer con hardware de última generación y chasis de aluminio.',
    precio: 1899990,
    stock: 10
  },
  {
    id: 'PC6',
    nombre: 'Acer Predator Helios 300',
    categoria: 'Computador Gamer',
    imagen: 'https://m.media-amazon.com/images/I/619YYjpHVVL._AC_SL1500_.jpg',
    descripcion: 'Notebook gamer con potente GPU y sistema de refrigeración avanzado.',
    precio: 1399990,
    stock: 10
  },
  {
    id: 'PC7',
    nombre: 'Asus TUF Gaming F15',
    categoria: 'Computador Gamer',
    imagen: 'https://media.falabella.com/falabellaCL/17021977_01/w=1500,h=1500,fit=pad',
    descripcion: 'Portátil gamer resistente, ideal para largas sesiones de juego y trabajo.',
    precio: 999990,
    stock: 10
  },
  {
    id: 'PC8',
    nombre: 'Dell G15 5520',
    categoria: 'Computador Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_935324-MLU78968932900_092024-O.webp',
    descripcion: 'Notebook gamer con diseño robusto y componentes de alto rendimiento.',
    precio: 1099990,
    stock: 10
  },
  {
    id: 'PC9',
    nombre: 'Acer Nitro 5 AN515',
    categoria: 'Computador Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_678314-MLC47387622867_092021-O-acer-aspire-nitro-5-an515-55-56p2-2-nhq7mal00w2-i5-12gb.webp',
    descripcion: 'Versión avanzada del Nitro 5, ideal para gaming y tareas multimedia.',
    precio: 949990,
    stock: 10
  },
  {
    id: 'PC10',
    nombre: 'Razer Blade 16',
    categoria: 'Computador Gamer',
    imagen: 'https://gsmpro.cl/cdn/shop/files/preventa-razer-blade-16-2025.webp?v=1747339915',
    descripcion: 'Edición especial del Blade 16, con hardware de última generación y diseño elegante.',
    precio: 2199990,
    stock: 10
  },
  {
    id: 'PC11',
    nombre: 'Acer Predator Helios',
    categoria: 'Computador Gamer',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKoJ2prV1mLuJiqWBsql3QnANB5W_M5KUPGA&s',
    descripcion: 'Notebook gamer con gran potencia gráfica y pantalla de alta tasa de refresco.',
    precio: 1399990,
    stock: 10
  },
  {
    id: 'PC12',
    nombre: 'Razer Blade 17',
    categoria: 'Computador Gamer',
    imagen: 'https://www.ubuy.cl/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODErbDdoU0ZMWUwuX0FDX1NMMTUwMF8uanBn.jpg',
    descripcion: 'Portátil gamer de gran tamaño, ideal para creadores de contenido y gamers exigentes.',
    precio: 1899990,
    stock: 10
  },
  // ... (productos anteriores)
  
  {
    id: 'RP1',
    nombre: 'Polera Gamer Joystick',
    categoria: 'Ropa',
    imagen: 'https://www.gustore.cl/img/estampados/202/202_1.png',
    descripcion: 'Polera de algodón con diseño de joystick gamer, ideal para fanáticos de los videojuegos.',
    precio: 12990,
    stock: 10
  },
  {
    id: 'RP2',
    nombre: 'Polera Gamer Retro',
    categoria: 'Ropa',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_673063-MLC71331190451_082023-O-plantillas-sublimacion-poleras-retro-gamer-videojuegos.webp',
    descripcion: 'Polera con diseño retro gamer, perfecta para los nostálgicos de los videojuegos clásicos.',
    precio: 13990,
    stock: 10
  },
  {
    id: 'RP3',
    nombre: 'Polera Gamer Pixel',
    categoria: 'Ropa',
    imagen: 'https://images.vexels.com/media/users/3/312937/raw/b2e299f4fbf49ee72285bc71298cafe6-videojuego-en-diseno-de-camiseta-pixel-art.jpg',
    descripcion: 'Polera con arte pixelado gamer, cómoda y con estilo único para gamers.',
    precio: 12990,
    stock: 10
  },
  {
    id: 'RP4',
    nombre: 'Polerón Gamer Joystick',
    categoria: 'Ropa',
    imagen: 'https://cdnx.jumpseller.com/ters/image/44340505/POLERON_Gamer_Mando_Costillas_3.png?1705101952',
    descripcion: 'Polerón abrigado con diseño de joystick gamer, ideal para el invierno y largas sesiones de juego.',
    precio: 19990,
    stock: 10
  },
  {
    id: 'RP5',
    nombre: 'Polerón Gamer Retro',
    categoria: 'Ropa',
    imagen: 'https://cdnx.jumpseller.com/wiwilatienda/image/40577574/resize/810/810?1696963374',
    descripcion: 'Polerón con diseño retro gamer, suave y cómodo para todos los días.',
    precio: 21990,
    stock: 10
  },
  {
    id: 'RP6',
    nombre: 'Polerón Gamer Pixel',
    categoria: 'Ropa',
    imagen: 'https://titanstore.cl/cdn/shop/files/8C7B67CA-4A11-4678-8AD6-17D90AEDE3EB.jpg?v=1717179647&width=1445',
    descripcion: 'Polerón con arte pixel gamer, perfecto para destacar tu pasión por los videojuegos.',
    precio: 19990,
    stock: 10
  },
  // ... (productos anteriores)
  
  {
    id: 'SG1',
    nombre: 'Secretlab Titan Evo',
    categoria: 'Silla Gamer',
    imagen: 'https://images.secretlab.co/theme/common/home-featured-ml.jpg',
    descripcion: 'Silla gamer premium con ergonomía avanzada y materiales de alta calidad para largas sesiones de juego.',
    precio: 399990,
    stock: 10
  },
  {
    id: 'SG2',
    nombre: 'Racer Roja',
    categoria: 'Silla Gamer',
    imagen: 'https://fernapetcl.vtexassets.com/arquivos/ids/159298-800-auto?v=637671628731900000&width=800&height=auto&aspect=true',
    descripcion: 'Silla gamer con diseño deportivo en color rojo, cómoda y resistente.',
    precio: 159990,
    stock: 10
  },
  {
    id: 'SG3',
    nombre: 'Cougar Armor One',
    categoria: 'Silla Gamer',
    imagen: 'https://www.elcontainer.cl/33668-big_default/silla-gamer-cougar-armor-one-v2-negro-con-naranjo.jpg',
    descripcion: 'Silla gamer ergonómica con soporte lumbar y diseño robusto.',
    precio: 189990,
    stock: 10
  },
  {
    id: 'SG4',
    nombre: 'Thermaltake X Comfort',
    categoria: 'Silla Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_697077-MLC83784301148_042025-O-silla-gaming-ergonomica-reclinable-de-cuero-con-reposapies.webp',
    descripcion: 'Silla ergonómica reclinable de cuero con reposapiés, ideal para gamers exigentes.',
    precio: 249990,
    stock: 10
  },
  {
    id: 'SG5',
    nombre: 'Racer Azul',
    categoria: 'Silla Gamer',
    imagen: 'https://thunderx3.com/wp-content/uploads/2023/06/Core-Racer-b-photo-gallery-8.jpg',
    descripcion: 'Silla gamer con diseño azul, estructura resistente y gran comodidad.',
    precio: 159990,
    stock: 10
  },
  {
    id: 'SG6',
    nombre: 'Cougar Armor Titan',
    categoria: 'Silla Gamer',
    imagen: 'https://media.solotodo.com/media/products/1307473_picture_1611270324.png',
    descripcion: 'Silla gamer de gran tamaño y soporte, ideal para usuarios que buscan máxima robustez.',
    precio: 239990,
    stock: 10
  },
  {
    id: 'SG7',
    nombre: 'Thermaltake X Comfort Azul',
    categoria: 'Silla Gamer',
    imagen: 'https://elchapuzasinformatico.com/wp-content/uploads/2016/10/Tt-eSPORTS-GT-FIT-GT-COMFORT.jpg',
    descripcion: 'Silla ergonómica azul con materiales premium y soporte ajustable.',
    precio: 249990,
    stock: 10
  },
  {
    id: 'SG8',
    nombre: 'Racer Verde',
    categoria: 'Silla Gamer',
    imagen: 'https://cdn1.jysk.com/getimage/wd3.large/256750',
    descripcion: 'Silla gamer con diseño verde, cómoda y perfecta para largas jornadas.',
    precio: 159990,
    stock: 10
  },
  {
    id: 'SG9',
    nombre: 'Cougar Armor S',
    categoria: 'Silla Gamer',
    imagen: 'https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2018/09/product-section-01_02.jpg',
    descripcion: 'Silla gamer con soporte lumbar y diseño ergonómico para mayor confort.',
    precio: 199990,
    stock: 10
  },
  {
    id: 'SG10',
    nombre: 'Thermaltake X Comfort Roja',
    categoria: 'Silla Gamer',
    imagen: 'https://pl.thermaltake.com/pub/media/wysiwyg/key3/img/product/XCOMFORTRealLeatherBurgundyRed/bg1.jpg',
    descripcion: 'Silla gamer roja de cuero real, reclinable y con soporte premium.',
    precio: 249990,
    stock: 10
  },
  {
    id: 'SG11',
    nombre: 'Racer Negra',
    categoria: 'Silla Gamer',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_858651-MLA52222404032_102022-O.webp',
    descripcion: 'Silla gamer negra con diseño deportivo y gran comodidad.',
    precio: 159990,
    stock: 10
  },
  {
    id: 'SG12',
    nombre: 'Cougar Armor Pro',
    categoria: 'Silla Gamer',
    imagen: 'https://infosep.cl/wp-content/uploads/2023/10/COUGAR-GAMER-ARMOR-PRO-REPOSABRAZOS-3D-BLACK.png',
    descripcion: 'Silla gamer profesional con reposabrazos 3D y materiales de alta calidad.',
    precio: 219990,
    stock: 10
  },

  {
    id: 'CS1',
    nombre: 'PlayStation 5',
    categoria: 'Consola',
    imagen: 'https://media.falabella.com/falabellaCL/126614736_01/w=800,h=800,fit=pad',
    descripcion: 'La consola de nueva generación de Sony, con gráficos ultra realistas y SSD de alta velocidad.',
    precio: 699990,
    stock: 10
  },
  {
    id: 'CS2',
    nombre: 'Xbox Series X',
    categoria: 'Consola',
    imagen: 'https://cms-assets.xboxservices.com/assets/d1/2c/d12cd3b8-3880-4dd4-8fe5-dc072a7904f0.png?n=642227_Hero-Gallery-0_C4_857x676.png',
    descripcion: 'La consola más potente de Microsoft, con soporte para 4K y juegos de última generación.',
    precio: 649990,
    stock: 10
  },
  {
    id: 'CS3',
    nombre: 'Nintendo Switch OLED',
    categoria: 'Consola',
    imagen: 'https://i.blogs.es/cf5de6/switch/1366_2000.jpg',
    descripcion: 'Versión mejorada de la Switch con pantalla OLED de 7", ideal para jugar en casa o en movimiento.',
    precio: 399990,
    stock: 10
  },
  {
    id: 'CS4',
    nombre: 'PlayStation 4 Slim',
    categoria: 'Consola',
    imagen: 'https://media.falabella.com/falabellaPE/118608367_01/w=1500,h=1500,fit=pad',
    descripcion: 'La versión compacta y eficiente de la PS4, compatible con una gran biblioteca de juegos.',
    precio: 349990,
    stock: 10
  },
  {
    id: 'CS5',
    nombre: 'Xbox Series S',
    categoria: 'Consola',
    imagen: 'https://i5.walmartimages.com/seo/Microsoft-Xbox-Series-S-Digital-Gaming-Console-512GB-Solid-State-Drive-White-Xbox-Console-Wireless-Controller-Mytrix-USB-3-0-1TB-External-HDD-Storage_99a70d7d-8850-4315-b3ae-b99a5d09de7a.669e5a14fccd0b5178c5be6460d93e27.jpeg',
    descripcion: 'Consola digital compacta de Microsoft, ideal para juegos en alta definición y Game Pass.',
    precio: 349990,
    stock: 10
  },
  {
    id: 'CS6',
    nombre: 'Nintendo Switch Lite',
    categoria: 'Consola',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_898853-MLU77944869940_082024-O.webp',
    descripcion: 'Versión portátil de la Switch, ligera y perfecta para jugar en cualquier lugar.',
    precio: 249990,
    stock: 10
  },
  {
    id: 'CS7',
    nombre: 'PlayStation 3',
    categoria: 'Consola',
    imagen: 'https://i5.walmartimages.cl/asr/1afdd7b3-e785-4975-95e5-93ef6f014649.40778b6de5229effc258cfa7d736af0b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    descripcion: 'Clásica consola de Sony, con gran catálogo de juegos exclusivos y multimedia.',
    precio: 199990,
    stock: 10
  },
  {
    id: 'CS8',
    nombre: 'Xbox One',
    categoria: 'Consola',
    imagen: 'https://minisitios.ripley.cl/minisitios/icdinamica/2022/08-agosto/17-xbox/assets/images/icd-xbox-1-mb.jpg',
    descripcion: 'Consola de octava generación de Microsoft, ideal para juegos, streaming y entretenimiento.',
    precio: 229990,
    stock: 10
  },
  {
    id: 'CS9',
    nombre: 'Nintendo Wii U',
    categoria: 'Consola',
    imagen: 'https://i.blogs.es/14a29c/2012_11_19_wiiu3/650_1200.jpg',
    descripcion: 'Consola híbrida de Nintendo con control-tableta y juegos exclusivos.',
    precio: 179990,
    stock: 10
  },
  {
    id: 'CS10',
    nombre: 'PlayStation Vita',
    categoria: 'Consola',
    imagen: 'https://i0.wp.com/www.madboxpc.com/wp-content/uploads/2012/03/424345_342094652500617_120258508017567_983694_231029698_n.jpg?fit=900%2C600&ssl=1',
    descripcion: 'Consola portátil de Sony con pantalla OLED y gran catálogo de juegos indie y AAA.',
    precio: 149990,
    stock: 10
  },
  {
    id: 'CS11',
    nombre: 'Xbox 360',
    categoria: 'Consola',
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_875196-MLA45732002465_042021-O.webp',
    descripcion: 'Consola clásica de Microsoft, famosa por su catálogo de juegos y Xbox Live.',
    precio: 139990,
    stock: 10
  },
  {
    id: 'CS12',
    nombre: 'Nintendo 3DS',
    categoria: 'Consola',
    imagen: 'https://home.ripley.cl/store/Attachment/WOP/D172/2000364612671/2000364612671_2.jpg',
    descripcion: 'Portátil de Nintendo con pantalla 3D sin gafas y cientos de juegos exclusivos.',
    precio: 129990,
    stock: 10
  },
  // ... (productos anteriores)
  
  {
    id: 'AC1',
    nombre: 'Control PS5 DualSense',
    categoria: 'Accesorios',
    imagen: 'https://i.blogs.es/c93606/mando-ps5-en-oferta-descuentos-amazon/500_333.jpeg',
    descripcion: 'Control inalámbrico DualSense para PlayStation 5, con retroalimentación háptica y gatillos adaptativos.',
    precio: 69990,
    stock: 10
  },
  {
    id: 'AC2',
    nombre: 'Control Xbox Series X/S',
    categoria: 'Accesorios',
    imagen: 'https://cms-assets.xboxservices.com/assets/27/e5/27e54205-f444-42b8-886c-7a7f5069d02a.jpg?n=Xbox-Wireless-Controller_Image-Hero-768_957848-1_1920x831_01.jpg',
    descripcion: 'Control inalámbrico para Xbox Series X/S, compatible también con PC y dispositivos móviles.',
    precio: 64990,
    stock: 10
  },
  {
    id: 'AC3',
    nombre: 'Control Nintendo Switch Pro',
    categoria: 'Accesorios',
    imagen: 'https://assets.nintendo.com/image/upload/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/accessories/nintendo-switch/controllers/pro-controllers/nintendo-switch-pro-controller/104888-nintendo-switch-pro-controller-black-lifestyle-1200x675',
    descripcion: 'Control Pro para Nintendo Switch, ergonómico y con batería de larga duración.',
    precio: 59990,
    stock: 10
  },
  {
    id: 'AC4',
    nombre: 'HyperX Cloud Stinger',
    categoria: 'Accesorios',
    imagen: 'https://www.ebest.cl/media/catalog/product/cache/47abc4af9d81a631bd44d97ba9797770/h/y/hyperx-cloud-stinger-2.jpg',
    descripcion: 'Auriculares gamer ligeros y cómodos, con micrófono ajustable y sonido envolvente.',
    precio: 39990,
    stock: 10
  },
  {
    id: 'AC5',
    nombre: 'Sony Pulse 3D Wireless',
    categoria: 'Accesorios',
    imagen: 'https://i.rtings.com/assets/products/J2pWwUNh/sony-pulse-3d-wireless/design-medium.jpg?format=auto',
    descripcion: 'Auriculares inalámbricos oficiales para PlayStation 5, con audio 3D y micrófono dual.',
    precio: 79990,
    stock: 10
  },
  {
    id: 'AC6',
    nombre: 'Xbox Wireless Headset',
    categoria: 'Accesorios',
    imagen: 'https://xboxwire.thesourcemediaassets.com/sites/2/2021/02/XboxWire_WirelessHeadset_HeroVideo_Thumbnail_1920x1080.jpg',
    descripcion: 'Auriculares inalámbricos para Xbox y PC, con sonido espacial y micrófono retráctil.',
    precio: 89990,
    stock: 10
  },
  {
    id: 'AC7',
    nombre: 'WD_BLACK SN850X NVMe SSD PS5',
    categoria: 'Accesorios',
    imagen: 'https://images.pushsquare.com/85f3e76da486c/large.jpg',
    descripcion: 'SSD NVMe de alto rendimiento para PlayStation 5, aumenta la capacidad y velocidad de carga.',
    precio: 119990,
    stock: 10
  },
  {
    id: 'AC8',
    nombre: 'Seagate Storage Expansion Card Xbox',
    categoria: 'Accesorios',
    imagen: 'https://cdn.mos.cms.futurecdn.net/dUkqSvbmEwAW3G8sn6nDnL.jpg',
    descripcion: 'Tarjeta de expansión oficial para Xbox Series X/S, añade almacenamiento instantáneo.',
    precio: 139990,
    stock: 10
  },
  {
    id: 'AC9',
    nombre: 'Samsung T7 Portable SSD Switch/PS5/Xbox',
    categoria: 'Accesorios',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFJlAU_Pp7JAkVPiaJsoOv1Wzt46lDFbIG-A&s',
    descripcion: 'SSD portátil compatible con Switch, PS5 y Xbox, ideal para llevar tus juegos a todas partes.',
    precio: 99990,
    stock: 10
  }
];

// Funciones auxiliares
export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoria: string): Product[] => {
  return products.filter(p => p.categoria === categoria);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.nombre.toLowerCase().includes(lowerQuery) ||
    p.descripcion.toLowerCase().includes(lowerQuery) ||
    p.categoria.toLowerCase().includes(lowerQuery)
  );
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map(p => p.categoria)));
};

// CRUD para Admin
export const createProduct = (product: Omit<Product, 'id'>): Product => {
  const lastId = products[products.length - 1]?.id || 'AC9';
  const numericPart = parseInt(lastId.substring(2)) || 0;
  const newId = `${lastId.substring(0, 2)}${numericPart + 1}`;
  const newProduct = { ...product, id: newId };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  products.splice(index, 1);
  return true;
};


 
