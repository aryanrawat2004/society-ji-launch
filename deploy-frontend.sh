#!/bin/bash

# Society Manager Frontend Deployment Script
echo "🚀 Starting Society Manager Frontend deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ and npm
echo "🟢 Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Create application directory
echo "📁 Setting up frontend directory..."
sudo mkdir -p /opt/society-manager-web
sudo chown $USER:$USER /opt/society-manager-web
cd /opt/society-manager-web

# Copy your frontend code here (you'll need to upload it)
# For now, assuming code is already uploaded in society-ji-launch folder

cd society-ji-launch

# Install dependencies
echo "📋 Installing npm dependencies..."
npm install

# Create production environment file
echo "⚙️ Creating production environment..."
cat > .env.production << 'EOF'
VITE_API_BASE_URL=http://13.201.60.115:8000
EOF

# Build for production
echo "🔨 Building for production..."
npm run build

# Install serve globally for serving static files
echo "🌐 Installing serve..."
sudo npm install -g serve

# Create systemd service for frontend
echo "🔧 Creating systemd service for frontend..."
sudo tee /etc/systemd/system/society-manager-web.service > /dev/null << 'EOF'
[Unit]
Description=Society Manager Web Frontend
After=network.target

[Service]
Type=exec
User=ubuntu
Group=ubuntu
WorkingDirectory=/opt/society-manager-web/society-ji-launch
ExecStart=/usr/bin/serve -s dist -l 3000
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Update nginx configuration to serve frontend
echo "🌐 Updating nginx configuration for frontend..."
sudo tee /etc/nginx/sites-available/society-manager-web << 'EOF'
server {
    listen 8081;
    server_name 13.201.60.115;  # Replace with your domain
    root /opt/society-manager-web/society-ji-launch/dist;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}

# API Backend proxy (keep existing backend config)
server {
    listen 80;
    server_name 13.201.60.115;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS, PUT, DELETE';
        add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS, PUT, DELETE';
            add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header Access-Control-Max-Age 1728000;
            add_header Content-Type 'text/plain charset=UTF-8';
            add_header Content-Length 0;
            return 204;
        }
    }
}
EOF

# Enable nginx site
sudo ln -sf /etc/nginx/sites-available/society-manager-web /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# Start and enable frontend service
echo "🎯 Starting frontend service..."
sudo systemctl daemon-reload
sudo systemctl enable society-manager-web
sudo systemctl start society-manager-web

# Show status
echo "📊 Frontend service status:"
sudo systemctl status society-manager-web --no-pager -l

echo ""
echo "✅ Frontend deployment completed!"
echo "🔗 Your frontend should be running at: http://13.201.60.115:8081"
echo "🔗 Admin Panel: http://13.201.60.115:8081/admin"
echo "🔗 Login: http://13.201.60.115:8081/login"
echo "📋 Check logs with: sudo journalctl -u society-manager-web -f"
echo ""
echo "🎉 Full application URLs:"
echo "   Frontend: http://13.201.60.115:8081"
echo "   Backend API: http://13.201.60.115:8000"
echo "   API Documentation: http://13.201.60.115:8000/api-docs"