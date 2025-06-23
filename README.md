# Merchant Dashboard

## Proje Özeti
Bu proje, işletme sahiplerinin aktif masa siparişlerini görüntüleyebilecekleri ve menülerini düzenleyebilecekleri basit bir React uygulamasıdır.

## Gereksinimler
- Node.js v16+ (LTS)  
- npm v8+

## Kurulum Adımları

1. **Depoları klonlayın veya zip'ten çıkarın**  
   ```bash
   git clone <repo-url> merchant-dashboard
   cd merchant-dashboard
   ```

2. **Bağımlılıkları yükleyin**  
   ```bash
   npm install
   ```

3. **TailwindCSS'i başlatın**  
   Eğer `postcss.config.js` ve `tailwind.config.js` yoksa, 
   ```bash
   npx tailwindcss init -p
   ```
   komutu ile ekleyin.

4. **Geliştirme Sunucusunu Başlatın**  
   ```bash
   npm start
   ```
   Tarayıcıda `http://localhost:3000` adresini açın.

5. **Production Derlemesi**  
   ```bash
   npm run build
   ```
   `build/` klasöründe optimize edilmiş dosyalar oluşturulur.

## Proje Yapısı

```
merchant-dashboard/
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── index.css
    ├── index.js
    └── components/
        ├── ActiveOrders.jsx
        └── MenuEditor.jsx
    └── App.jsx
```

## Bileşenler

- **App.jsx**: Ana geçiş ve durum yönetimi  
- **ActiveOrders.jsx**: Aktif masa siparişlerini listeleme ve durum güncelleme  
- **MenuEditor.jsx**: Menü öğelerini ekleme, silme ve düzenleme  

Kolay gelsin!