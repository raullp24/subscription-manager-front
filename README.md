# 📊 Subscription Manager — Frontend

Aplicación web para visualizar y gestionar suscripciones personales con autenticación JWT, gráficos de gasto mensual y formularios reactivos.

Construido con **Angular 21** y **Bootstrap 5**.

---

## 🚀 Tech Stack

| Capa | Tecnología |
|------|------------|
| Framework | ![Angular](https://img.shields.io/badge/Angular-21.1-DD0031?logo=angular&logoColor=white) |
| Lenguaje | ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white) |
| UI | ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white) |
| Componentes | ![ng-bootstrap](https://img.shields.io/badge/ng--bootstrap-20-7952B3) |
| Gráficos | ![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?logo=chartdotjs&logoColor=white) |
| Estado | ![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white) |
| Testing | ![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white) |
| Package Manager | ![npm](https://img.shields.io/badge/npm-11.6-CB3837?logo=npm&logoColor=white) |

---

## ✨ Características

- 🔐 **Autenticación JWT** con login, registro y persistencia en `localStorage`
- 📦 **Gestión completa de suscripciones** (crear, listar, editar, cancelar)
- 📊 **Gráficos de barras** con el coste mensual de cada suscripción
- 💰 **Cálculo automático** del gasto mensual total (normaliza anuales a meses)
- 🎨 **UI con Bootstrap 5** y componentes de ng-bootstrap
- ⚡ **Signals de Angular** para reactividad moderna y de alto rendimiento
- 📝 **Formularios reactivos** con validaciones
- 🧭 **Routing protegido** y navegación con navbar dinámica
- 🏪 **State management** centralizado con `BehaviorSubject`

---

## 🖼️ Capturas de pantalla

> _Próximamente..._ Aquí puedes añadir screenshots de las vistas principales.

---

## 🏗️ Arquitectura

El proyecto usa la arquitectura moderna de Angular con **componentes standalone** y **signals**:

```
src/app/
├── 📁 home/                  # Página de inicio
├── 📁 login/                 # Formulario de login
├── 📁 register/              # Formulario de registro
├── 📁 navbar/                # Barra de navegación
├── 📁 subscriptions/         # Listado + gráfico de suscripciones
├── 📁 subscription-detail/   # Detalle + edición
├── 📁 services/              # Servicios HTTP (Auth, Subscriptions)
├── 📁 store/                 # Estado global (Auth)
├── app.config.ts             # Configuración de la app
├── app.routes.ts             # Rutas
├── app.ts                    # Componente raíz
└── app.html / app.css        # Template raíz
```

---

## 🛣️ Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Home` | Landing page |
| `/login` | `Login` | Iniciar sesión |
| `/register` | `Register` | Crear cuenta |
| `/subscriptions/:userId` | `Subscriptions` | Dashboard de suscripciones + gráfico |
| `/subscription/:subscriptionId` | `SubscriptionDetail` | Detalle y edición |

---

## 🧩 Componentes principales

### 🔑 AuthService (`services/auth.service.ts`)

Gestiona el ciclo de vida de la autenticación:
- `register(data)` — POST `/api/auth/register`
- `login(data)` — POST `/api/auth/login` + guarda token en `localStorage`
- `logout()` — Limpia estado y navega a `/login`
- `getToken()` / `isLoggedIn()`

### 🏪 Store (`store/store.ts`)

Estado global de autenticación basado en `BehaviorSubject`:

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### 📦 SubscriptionsService (`services/subscriptions.ts`)

CRUD de suscripciones con JWT en headers:
- `getSubscriptionsByUserId(userId)`
- `getSubscriptionById(id)`
- `saveSubscription(subscription)`
- `updateSubscription(id, subscription)`

### 📊 Subscriptions (`subscriptions/`)

Página principal con:
- **Gráfico de barras** (Chart.js) — coste mensual por suscripción
- **Coste mensual total** calculado con `computed()` de Signals
- **Formulario** para crear nuevas suscripciones
- Lista de suscripciones con acceso al detalle

---

## ⚙️ Configuración

### 📋 Requisitos previos

- 🟢 **Node.js 18+**
- 📦 **npm 11+** (o yarn / pnpm compatible)
- 🔗 **Backend** corriendo en `http://localhost:8080` (ver [subscription-manager-back](https://github.com/raullp24/subscription-manager-back))

### 🔌 Configuración del backend

Los servicios HTTP apuntan a `http://localhost:8080` por defecto. Si necesitas cambiarlo, edita:

- `src/app/services/auth.service.ts:9` — URL base de auth
- `src/app/services/subscriptions.ts:12, 21, 30, 39` — URLs de subscriptions

---

## ▶️ Ejecución

### 🏃 Modo desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/raullp24/subscription-manager-front.git
cd subscription-manager-front

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

> Alias de `ng serve`. La app se abrirá en `http://localhost:4200/`.

### 🏗️ Compilar para producción

```bash
npm run build
```

Los artefactos optimizados se generarán en `dist/`. Configuración por defecto:
- ⚠️ Bundle inicial máximo: **1 MB** (warning en 500kB)
- 🗜️ Hashing habilitado en producción

### 👀 Modo watch (rebuild automático)

```bash
npm run watch
```

### 🧪 Ejecutar tests

```bash
npm test
```

Usa [Vitest](https://vitest.dev/) como test runner.

---

## 🎨 Stack visual

| Componente | Librería |
|------------|----------|
| Layout | Bootstrap 5.3 |
| Componentes UI | ng-bootstrap 20 |
| Iconos / Popovers | @popperjs/core |
| Gráficos | Chart.js + ng2-charts |
| Formato de código | Prettier (`printWidth: 100`, single quotes) |

---

## 🔄 Flujo de la aplicación

```mermaid
graph LR
    A[Home /] --> B[Login /login]
    A --> C[Register /register]
    B -->|Login OK| D[Subscriptions /subscriptions/:userId]
    C -->|Registro OK| B
    D -->|Click suscripción| E[SubscriptionDetail /subscription/:id]
    E -->|Editar| E
    D -->|Logout| B
```

---

## 🔐 Autenticación

El token JWT se guarda en `localStorage` bajo la clave `token` y se envía en cada request HTTP protegido:

```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

El `Store` se hidrata al iniciar la app si detecta token + usuario en `localStorage`, manteniendo la sesión activa entre recargas.

---

## 🤝 Proyecto relacionado

> ⚙️ **Backend** de esta aplicación: [subscription-manager-back](https://github.com/raullp24/subscription-manager-back)
> API REST en Spring Boot 3.4 con MongoDB y JWT.

---

## 📄 Licencia

Este proyecto es de uso personal. Siéntete libre de revisarlo y aprender de él.

---

<p align="center">Hecho con 🅰️ y Angular</p>
