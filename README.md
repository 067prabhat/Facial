
# Models Documentation (models.md)

## Overview

![Dashboard Screenshot](images/Screenshot%202025-04-26%20at%208.38.29 PM.png)
![Dashboard Screenshot](images/Screenshot%202025-04-26%20at%208.38.39 PM.png)
![Dashboard Screenshot](images/Screenshot%202025-04-26%20at%208.38.57 PM.png)
![Dashboard Screenshot](images/Screenshot%202025-04-26%20at%208.41.31 PM.png)
![Dashboard Screenshot](images/Screenshot%202025-04-26%20at%208.42.32 PM.png)

This project uses **pre-trained models** from `face-api.js` (via `@vladmandic/face-api`) to perform **Real-Time Facial Expression Recognition**. These models are small, optimized, and easy to load into your frontend project.

In the `/models` directory, you must include these files for proper functionality:

---

## Required Model Files

### 1. Tiny Face Detector

**Files:**

- `tiny_face_detector_model-weights_manifest.json`
- `tiny_face_detector_model-shard1`

**Purpose:**

- Detects human faces in real-time using a lightweight neural network.
- Optimized for speed, making it perfect for browser-based applications.

**Usage in Code:**

```javascript
await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
```

---

### 2. Face Expression Recognition

**Files:**

- `face_expression_model-weights_manifest.json`
- `face_expression_model-shard1`

**Purpose:**

- Recognizes facial expressions (happy, sad, angry, fearful, disgusted, surprised, and neutral).
- Returns a probability distribution across emotions.

Additionally, the project features:

Dynamic Quotes: Based on detected facial expressions, different motivational or funny quotes are displayed in real-time.

Bootstrap Styling: The entire application UI is styled using Bootstrap 5 for responsiveness and modern design aesthetics.

**Usage in Code:**

```javascript
await faceapi.nets.faceExpressionNet.loadFromUri('/models');
```

---

## How to Get These Model Files?

- You can download them from the official [face-api.js GitHub repository](https://github.com/justadudewhohacks/face-api.js) or use `@vladmandic/face-api`'s pre-built weights.
- Place all model files inside the `/public/models/` directory of your React project.
- Ensure the path in your code is `/models`, because React will serve public assets directly.

**Example Structure:**

```
/public
  /models
    tiny_face_detector_model-weights_manifest.json
    tiny_face_detector_model-shard1
    face_expression_model-weights_manifest.json
    face_expression_model-shard1
```

---





=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
