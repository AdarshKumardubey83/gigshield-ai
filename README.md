# GigShield AI – Parametric Insurance for Food Delivery Workers
AI-powered parametric insurance platform designed to protect food delivery workers from income loss caused by environmental and operational disruptions.

## Problem Overview

India’s gig economy relies heavily on delivery partners working for platforms such as Zomato and Swiggy. These workers depend on daily deliveries for income, but external disruptions such as heavy rain, extreme heat, severe pollution, or local restrictions can prevent them from working.

### 🌍 Geopolitical & Crisis-Based Disruptions

In addition to environmental factors, gig workers are also affected by **geopolitical events and crisis situations** such as wars, international conflicts, and supply chain disruptions.

#### ⚔️ War & Global Conflict Impact

During war or geopolitical tensions:

- Fuel prices increase due to global supply disruption  
- LPG (cooking gas) shortages may occur  
- Transportation and logistics become expensive  

#### 📉 Impact on Food Delivery Ecosystem

- Restaurants face higher operational costs  
- Many restaurants:
  - Increase food prices  
  - Reduce order acceptance  
  - Temporarily shut down  

- Customers order less due to higher prices

👉 Result:
- Delivery platforms receive fewer orders  
- Gig workers get fewer delivery opportunities  
- **Income loss occurs without any fault of the worker**

This shows that not only environmental but also global economic disruptions directly affect gig worker earnings.

During such events, gig workers may lose 20–30% of their weekly income. Currently, there is no system that compensates them for income loss caused by these uncontrollable disruptions.

GigShield AI is an AI-powered parametric insurance platform designed to protect delivery workers from income loss caused by environmental and operational disruptions. The system automatically detects disruption events and triggers payouts without requiring manual claim filing.

## Target Persona

This solution focuses on **Food Delivery Partners** working on platforms such as **Zomato and Swiggy**.

Food delivery workers are highly affected by environmental disruptions because their work is outdoor and time-sensitive. Their earnings depend on the number of deliveries completed during peak demand hours.

### Example Scenario

A delivery partner can earn up to ₹4500 per week depending on the number of deliveries completed.

If heavy rain or severe pollution prevents them from working for two days, they may lose a significant portion of their weekly income.

GigShield AI automatically detects such disruptions and compensates the worker through an automated payout.

## Application Workflow

1. Worker registers on the platform and verifies their delivery zone.
2. AI evaluates environmental risk associated with that location.
3. The worker selects and purchases a weekly insurance plan.
4. The system continuously monitors environmental data using external APIs.
5. When a disruption trigger occurs, the system identifies affected workers.
6. A claim is automatically generated.
7. The worker receives an instant payout through a digital payment system.

## Weekly Premium Model

Gig workers typically operate on a weekly earning cycle. Therefore, GigShield AI offers a weekly insurance subscription model.

### Insurance Plans

| Plan | Weekly Premium | Coverage |
|-----|-----|-----|
Basic | ₹25 | Up to ₹500 income protection |
Standard | ₹40 | Up to ₹1000 income protection |
Pro | ₹60 | Up to ₹1500 income protection |

If a worker purchases the Standard plan (₹40/week) and a disruption causes ₹900 income loss, the system automatically triggers a payout of ₹900.

## Platform Choice

The solution will be developed as a **Web Application that is enhanced into a Progressive Web App (PWA)**.

We first build a responsive web platform that works across all modern browsers. This web application will then be converted into a PWA using technologies such as **Service Workers** and a **Web App Manifest**, allowing it to behave like a mobile application.

This approach allows delivery partners to easily access the platform without needing to download an app from an app store.

### Benefits of PWA for Gig Workers

- **No App Installation Required**  
  Workers can access the platform directly from their browser and add it to their home screen.

- **Works Like a Mobile App**  
  The PWA provides an app-like interface optimized for smartphones used by delivery partners.

- **Offline Capability**  
  Service workers allow certain features to work even with unstable internet connections.

- **Faster Performance**  
  Cached resources make the platform load faster even on low-end devices.

- **Cross-Platform Compatibility**  
  Works on Android, iOS, and desktop devices without separate development.

This makes a PWA an ideal solution for gig workers who rely on smartphones and may have limited storage or inconsistent internet connectivity.

