import torch
from torchvision import datasets, transforms
import matplotlib.pyplot as plt

# --- Step-0: Load MNIST ---
mnist = datasets.MNIST(
    root="./data",
    train=True,
    download=True,
    transform=transforms.ToTensor()
)

# --- Step-1: Flatten images ---
def load_some_data_and_flatten_them(mnist, num_images=5):
    one_d_array = []
    for idx in range(num_images):
        image, label = mnist[idx]
        flattened_image = image.view(-1)  # 1D tensor (784,)
        
        # Convert to bipolar {-1, +1} for Hopfield
        flattened_image = torch.where(flattened_image > 0.5, 1, -1).float()
        
        one_d_array.append(flattened_image)
    return one_d_array

one_d_array = load_some_data_and_flatten_them(mnist)

# by this point each NxN matrix is represented only by +1 and -1 instead of grayscale.

# --- Step-2: Compute Hopfield weight matrix ---
def find_weight(one_d_array):
    N = one_d_array[0].shape[0]       # number of neurons/pixels
    W = torch.zeros((N, N))           # NxN zero matrix

    # connectivity/symmetric weights with valid enery landscape computed, where the stored patterns are attractors
    for pattern in one_d_array:
        W += torch.ger(pattern, pattern)  # outer product

    # no self-connections
    W.fill_diagonal_(0)
    return W

W = find_weight(one_d_array)
print("Weight matrix shape:", W.shape)

# --- Step-3: Hopfield recall function ---
def recall(W, input_pattern, steps=5):
    x = input_pattern.clone()
    # Iteration and recall function
    for _ in range(steps):
        # synchronous update rule: x <- sign(Wx)
        x = torch.sign(W @ x)
        x[x == 0] = 1  # replace zeros with +1
    return x

# --- Step-4: Test with one image ---
original, _ = mnist[5]   # pick an image
# this line flattens the image b/c we're about to insert this 2D image into our hopfield network and hopfield only works with 1D neurons, not 2D matrices
original = original.view(-1)
original = torch.where(original > 0.5, 1, -1).float()

# distort it (flip some pixels randomly)
# Noisy one puts the system in a higher-enery state near a valley.
noisy = original.clone()
noise = torch.randint(0, 100, noisy.shape) < 10  # 10% noise
noisy[noise] *= -1

# recall from noisy input
recalled = recall(W, noisy, steps=5)

# --- Step-5: Show results ---
def show(img, title):
    plt.imshow(img.view(28, 28), cmap="gray")
    plt.title(title)
    plt.axis("off")

plt.figure(figsize=(9, 3))
plt.subplot(1, 3, 1); show(original, "Original")
plt.subplot(1, 3, 2); show(noisy, "Noisy Input")
plt.subplot(1, 3, 3); show(recalled, "Recalled")
plt.show()

# --- Step-6: Save images to disk for frontend ---
import os
os.makedirs("frontend/public", exist_ok=True)  # create folder if it doesn't exist

# convert from bipolar {-1,+1} to 0-1 for grayscale display
plt.imsave("../frontend/public/original.png", (original.view(28,28).numpy() + 1)/2, cmap="gray")
plt.imsave("../frontend/public/noisy.png", (noisy.view(28,28).numpy() + 1)/2, cmap="gray")
plt.imsave("../frontend/public/recalled.png", (recalled.view(28,28).numpy() + 1)/2, cmap="gray")