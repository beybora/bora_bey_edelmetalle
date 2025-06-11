# Beylabs Edelmetall Shop

This is a portfolio and learning project to improve fullstack skills and get hands-on experience with DevOps.  
I focused on clean code, modular structure and reusability in all parts of the system.  
Built with Laravel, Vue 3, Nuxt 3, Pinia, Vite, PM2, NGINX and GitHub Actions.

It is a fullstack e-commerce system. It has a Laravel API backend, a Vue 3 admin panel and a Nuxt 3 shop frontend. All parts are deployed on a self-hosted Ubuntu VPS. The deployment is automated with GitHub Actions and runs over SSH using rsync.

## Monorepo structure

- / → Laravel 10 REST API  
- /admin → Vue 3 + Vite Admin Panel  
- /shop-frontend → Nuxt 3 + SSR Shop Frontend

Each app is deployed separately with its own GitHub Actions workflow.

Live:
- Shop: https://beylabs.de  
- Admin: https://admin.beylabs.de

## Laravel API (Backend)

This is the backend for both the shop and the admin interface.

- REST API for products, categories, users, orders, cart
- JWT auth system with user status check
- Middleware that logs out users if they get deactivated
- Admin and shop routes use different controllers
- Eloquent models, request validation, soft deletes

## Admin Panel (Vue 3)

Used to manage the content and the users of the shop.

- Add, edit and delete products
- View and manage categories (shown in shop)
- See orders and update their status (Pending, Cancelled, Shipped, Delivered, Confirmed)
- See order details including customer and product list
- Deactivate users so they cannot log in to the shop anymore
- Layout system used to structure views clearly

## Shop Frontend (Nuxt 3 + SSR)

Public shop frontend with SEO support and good user experience.

- Product list with filter, search and pagination
- Register and log in, checkout process, view past orders
- Cart is saved across sessions
- Notification system that shows status changes for user orders
- State management with Pinia
- Layout system used to keep views clean and structured

## Deployment and server setup

All apps are deployed to an Ubuntu VPS that I configured manually.

- NGINX serves API, admin and shop
- PHP and Node.js installed 
- GitHub Actions handle code checkout, build, upload with rsync
- PM2 is used to run Nuxt in SSR mode
- Secrets like SSH keys and passwords are stored in GitHub Secrets

GitHub Actions workflows:
- deploy-api.yml
- deploy-admin.yml
- deploy-shop.yml

## Summary

This project is fully built and deployed by myself.  
All systems work together and are live on my own server.  
Frontend, backend and deployment are all done with modern tools and a working CI/CD setup.
