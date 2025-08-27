# Hopfield Networks MNIST Demo

A **frontend-demo-only** and Python-backed Hopfield network project that visualizes how a Hopfield network recalls handwritten digits from noisy inputs. Designed for **educational purposes**, this project allows interactive exploration of neuron-by-neuron convergence and network energy dynamics.

---

## 🚀 Features

* **Neuron-by-neuron update visualization:** Watch the network iteratively flip pixels from noisy input toward the stored pattern.
* **Sun-Earth orbit animation:** Represents network convergence; orbit stops when the output stabilizes.
* **Energy graph:** Dynamically updates as the network converges.
* **Interactive slider:** Control the number of iterations and explore network behavior.
* **Partial blending of noisy input:** Makes neuron updates look more realistic.
* **Automatic MNIST image generation:** Python script creates `original.png`, `noisy.png`, and `recalled.png` for the frontend.

---

## 📂 Repository Structure

```
Hopfield-networks/
├─ frontend/
│  ├─ public/
│  │  ├─ original.png
│  │  ├─ noisy.png
│  │  └─ recalled.png
│  └─ src/
│     └─ App.jsx
├─ backend/
│  └─ hopfield-network-mnist.py
├─ .gitignore
└─ README.md
```

---

## ⚡ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/atnatewoss/Hopfield-networks.git
cd Hopfield-networks
```

### 2. Backend: Generate MNIST patterns

Make sure you have Python and PyTorch installed.

```bash
cd backend
python hopfield-network-mnist.py
```

This will:

* Download MNIST (if not already downloaded)
* Generate example images:

  * `original.png`
  * `noisy.png`
  * `recalled.png`
* Save them to `frontend/public/`

> ⚠️ Each run **overwrites** previous images — this ensures the frontend always reflects the latest generated pattern.

### 3. Frontend: Run the React demo

```bash
cd ../frontend
npm install
npm start
```

* Open `http://localhost:3000` in your browser.
* Use the **slider** to simulate iterations.
* Observe **energy graph**, **orbit animation**, and **neuron-by-neuron updates**.

---

## 🧠 How It Works

1. **Input:** Distorted MNIST image (`noisy.png`).
2. **Hopfield Machine:** Neurons update iteratively (simulated block-by-block in frontend).
3. **Orbit Animation:** Represents convergence, stopping when output stabilizes.
4. **Output:** Network converges to the stored pattern (`recalled.png`).
5. **Energy Graph:** Shows decreasing energy as neurons stabilize.

> **Note:** The frontend demo approximates Hopfield behavior visually. Real Hopfield updates occur neuron-by-neuron with synchronous or asynchronous rules.

---

## 🎨 Visual Features

* **Input fades out** after initial steps to mimic real Hopfield behavior.
* **Neuron blocks gradually reveal** according to orbit position, partially blending with the noisy input.
* **Output gradually appears** as network stabilizes.
* **Rotating circle along the pipeline** shows iterative network activity.
* **Sun-Earth orbit animation** visually represents convergence, stopping at stabilization.

---

## 📌 Key Notes

* Slider represents iterations **for demo purposes only**.
* Rotating circle simulates iterative updates along the pipeline.
* Partial blending of noisy input makes neuron updates more realistic.
* Energy decreases as the network stabilizes.