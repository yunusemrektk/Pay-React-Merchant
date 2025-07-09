```mermaid

flowchart TB
  subgraph "📱 Müşteri Uygulaması"
    Customer["React App(QR Menü → Sepet → Ödeme)"]
  end
  subgraph "🖥️ Restoran Dashboard"
    Admin["React App(Sipariş Takip & Menü Yönetimi)"]
  end

  subgraph "🌐 API Katmanı"
    APIGateway[API Gateway / Router Server]
  end

  subgraph "⚙️ Mikroservisler"
    AuthService[Auth Service<br/>– JWT, Rol Kontrolü]
    OrderService[Order Service<br/>– Sipariş CRUD]
    MenuService[Menu Service<br/>– Menü CRUD]
    PaymentService[Payment Service<br/>– Ödeme İşlemleri]
    NotificationService[Notification Service<br/>– Gerçek Zamanlı Bildirim]
  end

  subgraph "💾 Veri Katmanı"
    MySQL[(MySQL Database)]
    Redis[(Redis Cache)]
  end

  subgraph "📨 Mesajlaşma"
    Broker[(RabbitMQ / Kafka)]
  end

  %% İletişimler
  Customer -->|HTTPS / WebSocket| APIGateway
  Admin    -->|HTTPS / WebSocket| APIGateway

  APIGateway --> AuthService
  APIGateway --> OrderService
  APIGateway --> MenuService
  APIGateway --> PaymentService

  AuthService   -->|CRUD| MySQL
  OrderService  -->|CRUD| MySQL
  MenuService   -->|CRUD| MySQL
  PaymentService-->|CRUD| MySQL

  OrderService -->|Publish| Broker
  MenuService  -->|Publish| Broker

  Broker --> NotificationService
  NotificationService --> Customer
  NotificationService --> Admin

  OrderService -->|Cache Menü/Sipariş| Redis
  MenuService  -->|Cache Menü| Redis
