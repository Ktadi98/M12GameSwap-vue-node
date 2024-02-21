# GameSwap- Plataforma de Compraventa de Videojuegos y Consolas 🎮💰

![Logo del Proyecto](./games-swap-frontend/public/imgs/logo-app-2.png)

## Descripción del Proyecto 💼

GameSwap es una plataforma de compraventa de videojuegos de segunda mano para entusiastas de este tipo de producto. A diferencia de las plataformas genéricas, GameSwap se enfoca en proporcionar un catálogo diverso de videojuegos de diferentes plataformas, facilitando a los usuarios encontrar sus títulos favoritos.

La plataforma ofrece un sistema de publicación de anuncios que permite a los usuarios vender sus juegos que ya no utiliza, además, los usuarios pueden calificar a los vendedores de la plataforma poniendo reseñas de sus compras. A partir de estas valoraciones la plataforma recomienda un top 3 de los vendedores con mejor puntuación. 🌟🛍️

Está diseñado principalmente para adultos apasionados por los videojuegos, su catálogo abarca desde los clásicos retro hasta los últimos lanzamientos, satisfaciendo las necesidades de muchos coleccionistas. Nuestra web pretende ser el punto de encuentro definitivo para los amantes de los videojuegos que buscan expandir sus colecciones, ganar dinero con títulos no deseados y conectarse con una comunidad apasionada de los videojuegos. 🚀👾

## Abstract

GameSwap is a second-hand video game buying and selling platform that addresses the need for a specialized community for video game enthusiasts. Unlike generic platforms, GameSwap focuses on providing a diverse catalog of video games, making it easy for users to find their favorite titles.    
The platform offers an ad posting system that allows users to sell their products in a simple way, in addition, users are allowed to rate sellers. Based on these ratings, the platform recommends the vendors with the best ratings.
GameSwap is designed primarily for adults passionate about video games, its catalog ranges from retro classics to the latest releases, satisfying the needs of collectors.
Our website aims to be the ultimate meeting point for video game lovers looking to expand their collections, make money and connect with a passionate gaming community.

## Público Objetivo y Justificación 🎯

Nuestro público objetivo son los adultos apasionados por los videojuegos, desde coleccionistas de juegos retro hasta fanáticos de los últimos lanzamientos. El origen de este proyecto radica en la necesidad de una plataforma especializada que ofrezca una experiencia de compra y venta única para esta comunidad, brindando seguridad, confianza y diversidad de productos.

## Herramientas y Lenguajes 🔨

- Front-end: HTML5, CSS3, JavaScript
- Framework de desarrollo web: Vue (Composition API + Typescript)
- Back-end: Node.js, Express.js
- Base de datos: PostgreSQL
- Sistema de control de versiones: Git
- Hospedaje web: Oracle Cloud Free Tier
- ORM: Prisma

## Wireframes y mockups 🖌️

[Figma](https://www.figma.com/file/2Uh27hWqWt2t08470nvO2f/Wireframes%2FMockups---GameSwap?type=design&node-id=146-967&mode=design&t=gpLBZ7kPcXfZERVx-0)

## Modelo E-R 🌐

![Modelo E-R Final](./readme_assets/GAMESWAP_ER_5.drawio.png)

## Diagrama de Casos de Uso 🧑‍🤝‍🧑

![Diagrama de Casos de Uso Final](./readme_assets/Diagrama_Casos_Uso_SPRINT_4.drawio.png)

## Diagrama de Arquitectura de Producción 🏦

![Diagrama de Arquitectura de Producción](./readme_assets/Esquema_producción_GAMESWAP.png)

## Gif de Demos de la Aplicación 📷

- ### Inicio de sesión y registro en la plataforma
  Mediante el botón ‘Acceder’ podremos visualizar el formulario de inicio de sesión y registro que nos pedirá los datos correspondientes (nombre de usuario, correo electrónico, contraseña,...).
  Ambos formularios tienen un sistema de validación de campos, en caso de que no se introduzcan los datos correctamente, se mostrarán mensajes de error.

![Gif de Demos](./readme_assets/registroLoginUsuario.gif)

- ### Subir un anuncio
  Al iniciar sesión, en la barra de navegación, accedemos a la opción de subir un nuevo producto/anuncio (icono del '+') y rellenamos el formulario. Este formulario tiene reglas de validación. Una vez subido el    producto lo podemos visualizar en nuestra lista de anuncios en Perfil > Mis Anuncios.

![Gif de Demos](./readme_assets/subirProducto.gif)

- ### Reserva de un producto
  Al tener la sesión iniciada, dentro del detalle del anuncio que queramos, podemos realizar la reserva pulsando el botón de 'No Reservado' para realizar la comprar posteriormente. Nos aparecerá la reserva en 
  nuestra lista de reservas en Perfil > Ver Reservas y Compras > Reservas. Cabe destacar que si el producto ya está reservado, no se puede volver a reservar hasta que el usuario que haya hecho la reserva la 
  elimine.

![Gif de Demos](./readme_assets/reservaProducto.gif)

- ### Compra de un producto
  Mediante la lista de reservas en nuestro perfil de usuario accedemos a la página de compra correspondiente del producto seleccionado pulsando el botón de 'Tramitar compra'. En esta página podemos ver los 
  detalles de compra para añadir el producto a nuestra lista de productos comprados. La compra se puede visualizar en Perfil > Ver reservas y compras > Compras

![Gif de Demos](./readme_assets/compraJuego.gif)

- ### Poner queja de un anuncio

  Al tener la sesión iniciada, dentro del detalle del anuncio que consideremos, podemos poner una queja pulsando el icono de la bandera. Al rellenar el formulario de queja, se guarda en el sistema para que el 
  administrador pueda gestionarla.

![Gif de Demos](./readme_assets/queja.gif)

- ### Panel de control del administrador

  Como administrador de la plataforma, una vez se ha iniciado sesión, desde el panel de control podemos dar de alta/baja a los usuarios clientes de GameSwap. También podemos ver las denuncias que han enviado los 
  usuarios, si es el caso, y dar de baja el producto en cuestión si se considera.

![Gif de Demos](./readme_assets/bajaUsuario.gif)

![Gif de Demos](./readme_assets/bajaAnuncio.gif)

## Problemas Encontrados y Soluciones

Uno de los problemas a los que nos hemos enfrentado a lo largo del proyecto ha sido el hecho de subirlo a producción. El entorno de Oracle Cloud (la tier gratuita) permite la creación de una instancia/máquina bastante personalizable en comparación a otros servicios. Esto ha sido clave para la resolución de diversos problemas.

Por un lado, al servir la página en un Apache y implementando la rutas de navegación con el router de VueJS, a la hora de refrescar la página el servidor web nos devolvía un error 404. Para este caso hemos tenido que consultar documentación sobre cómo sobreescribir y personalizar la configuración general del servidor web y la sintaxis del archivo .htaccess para que las diferentes vistas se mostrasen correctamente al refrescar la página.

Por otro lado, como tenemos todos los servicios (frontend, backend y sistema gestor de base de datos) en la misma máquina de producción, hemos tenido que informarnos sobre cómo crear y actualizar las reglas de entrada al firewall (mediante las iptables) para que todos estos servicios estuvieran disponibles desde fuera.

Otro reto que hemos encontrado en el desarrollo es el del uso de Prisma ORM, ya que difiere de la sintaxis habitual de SQL. Hemos tenido que estar consultando constantemente la documentación tanto como para realizar las migraciones de las tablas como para hacer las diferentes consultas a la base de datos. Con el tiempo hemos podido ver las ventajas ofrece esta tecnología la cual nos ha permitido trabajar con estructuras nativas de JavaScript para interactuar con el modelo de datos.

Además estábamos indecisos sobre como afrontar la autenticación y autorización de los usuarios en nuestra plataforma ya que hay muchos métodos disponibles (Firebase, OAuth, sesiones, cookies, tokens,...). 
Al final nos decidimos por usar JSON Web Tokens (JWT) ya que es un sistema bastante fácil de implementar con una REST API y se adapta bien a una web SPA como la nuestra.

## Futuras Mejoras 🔧

Una de las funcionalidades que nos hubiera gustado implementar hubiera sido un sistema de foro formado por hilos, donde los usuarios pudieran subir consejos/guías y enlaces en un hilo para poder ayudar a aquellos que quieran profundizar más sobre el juego o estén atascados. De manera que en cada anuncio se pudiera ir a los hilos correspondientes para el juego que publicita. Como referencia se puede consultar la web de Steam (https://store.steampowered.com/?l=spanish) que tiene este sistema implementado.

Además, la aplicación se puede mejorar si se establece un sistema de chat para la interacción entre el comprador y el vendedor y poder tener una experiencia de compra más cercana. Esta funcionalidad la tiene implementada, por ejemplo, la web de Wallapop (https://es.wallapop.com/).

También hubiera sido interesante hacer una investigación de campo para encontrar métodos de envío por paquetería, para facilitar la transacción tanto por parte del vendedor como del comprador a la hora de comprar un producto. Esto se puede ver por ejemplo en la plataforma de compraventa de segunda mano Vinted (https://www.vinted.es/help/234-metodos-de-envio) .

## Comparación de Objetivos y Logros 🛒

Consideramos que las funcionalidades que nos propusimos al inicio del proyecto estaban bien medidas en cuanto a dificultad y duración, de forma que al finalizar el proyecto hemos podido
desarrollar todas las funcionalidades que teníamos en mente.

Cabe mencionar que hay funcionalidades a las que hemos dado prioridad ya que son clave para garantizar una experiencia óptima para nuestros usuarios. Por ejemplo, tanto el registro de usuarios como el panel de administración y la gestión de usuarios, fue de lo primero en lo que nos esforzamos para que funcionase sin problemas. Una vez asimilada la creación de los usuarios nos centramos en la publicación de anuncios y su gestión, ya que es el eje principal que mueve nuestra plataforma. Aún así, consideramos que la interacción entre los usuarios también era importante, ya que a falta de blog y chat, las calificaciones y reseñas aportan esa conexión entre los usuarios que da personalidad a la web. Ésto no sería posible sin la funcionalidad del carrito de la compra que permite la tramitación de la compra y su calificación.

Así pues, con todo lo anterior adquirido, nos pudimos centrar en funcionalidades secundarias, pero no menos importantes, como el filtro y la búsqueda de videojuegos en la estética de la página principal y el perfil de los usuarios, donde éstos pueden ver el listado de sus productos favoritos y su historial de compras/ventas.

## Conclusiones

Este proyecto nos ha ayudado a planificar y a tener en cuenta de manera realista el alcance de un proyecto web, ya que, a lo largo del proceso de desarrollo hemos tenido una disparidad de conocimientos técnicos que nos ha obligado a tener que organizar y planificar las funcionalidades que sabíamos que podíamos alcanzar/finalizar, y del mismo modo, a descartar aquellas que requerían demasiado tiempo o que era muy probable que dejásemos a medias. Y sobretodo, hemos aprendido a gestionar las responsabilidades y el tiempo que conllevan las tareas y funcionalidades que nos habíamos asignado en los diferentes sprint.

Es de las primeras veces que subíamos a producción un proyecto y hemos aprendido a familiarizarnos con la metodología de despliegue web en Oracle Cloud la cual nos ha parecido muy útil para poder aplicarla en futuros proyectos.

El desarrollo de la plataforma GameSwap ha sido un proceso desafiante pero gratificante. Hemos superado diversos obstáculos y hemos creado una plataforma que cumple con las expectativas y necesidades propuestas inicialmente. Esperamos seguir mejorando y expandiendo la plataforma en el futuro para proporcionar aún más valor a nuestra comunidad de jugadores. 🚀🎮

![Logo del Proyecto](./readme_assets/gameswap_logo_2.png)
