# GalerIA 🖼️✨

**GalerIA** es una aplicación web de galería de imágenes generadas por inteligencia artificial. Permite a los usuarios autenticados generar, explorar y gestionar imágenes generadas por IA en una experiencia visual atractiva y moderna.

## 🌐 Demo

🔗 [Ver demo](https://galer-ia.vercel.app)

📁 [Ver repo](https://github.com/Alexisxde/galer-ia)

## 📸 Capturas de pantalla

![GalerIA Home](./public/screenshots/home.png)
![GalerIA Galería](./public/screenshots/gallery.png)
![GalerIA Login](./public/screenshots/sign-in.png)

## 🛠️ Tecnologías utilizadas

- [Astro](https://astro.build/) – Framework web para contenido veloz
- [React](https://reactjs.org/) – Componentes interactivos
- [Tailwind CSS](https://tailwindcss.com/) – Estilos rápidos y responsivos
- [Clerk](https://clerk.dev/) – Autenticación de usuarios
- [Turso](https://turso.tech/) – Base de datos edge rápida
- [Drizzle ORM](https://orm.drizzle.team/) – ORM tipo-safe para consultas

## 🔐 Uso de Clerk

GalerIA utiliza **Clerk** como sistema de autenticación principal. Esto permite:

- Registro e inicio de sesión de usuarios con OAuth (GitHub y Google).
- Protección de rutas de usuario (solo usuarios logueados pueden subir imágenes).
- Integración sencilla con el estado de sesión y perfil del usuario.
- Middleware en Astro para proteger páginas específicas.
- Personalización del widget de autenticación.

🧪 ¿Cómo correr el proyecto localmente?

```bash
git clone https://github.com/Alexisxde/galer-ia.git
cd galer-ia
pnpm install
pnpm dev
```

Configura las variables de entorno en el .env.

🧑‍💻 Equipo

- Olivarez Alexis

Este proyecto fue creado para la Hackaton de **midudev - Clerk** 🚀
