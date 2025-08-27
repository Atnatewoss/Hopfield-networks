from torchvision import datasets, transforms
# torchvision.datasets → gives you pre-made datasets (MNIST, CIFAR, etc.).
# transforms → functions that change the images, e.g., ToTensor() converts images into tensors.

# 2️⃣ Why add a channel dimension (3D)?

# Original MNIST image is 2D: [28,28].
# PyTorch expects images in [channels, height, width] format: [C,H,W].
# Grayscale image → 1 channel. That’s why a single MNIST image becomes [1,28,28].
# Color images → usually 3 channels (RGB) → [3, height, width]

mnist = datasets.MNIST(
    root="./data", # Where to store the dataset locally
    train =True, # use the training set
    download=True, # download if not available
    transform=transforms.ToTensor() # convert image to tensor
)

# print(mnist)
# image0, label0 = mnist[0]
# print(image0)
# print(label0)
print("--- STEPS TO FOLLOW ---")
print("--- STEP-1 ---")
# Step-1: BY THIS POINT WE HAVE A MNSIT IMAGE AS TENSORS (3D NUMERIC ARRAYS): Shape: [channels, height, width] → for MNIST [1, 28, 28], WHICH IS THE FORMAT THAT THE PYTORCH LIBRARY EXPECTS.

# 1️⃣ What is mnist?

# After this:
# mnist = datasets.MNIST(
#     root="./data",
#     train=True,
#     download=True,
#     transform=transforms.ToTensor()
# )

# mnist is not a single image.
# mnist is a dataset object. Think of it like a list of tuples.

# Each element in the dataset is:
# (image_tensor, label_number)

# image_tensor → the actual MNIST image as a PyTorch tensor [1,28,28]
# label_number → the number that image represents, e.g., 0,1,2,...,9

# So you can access any image like this:
# image0, label0 = mnist[0]  # first image
# image1, label1 = mnist[1]  # second image

# This is why we say each element is a tuple.

# 1️⃣ MNIST tensor and “2D” assumption
# The MNIST tensor for one grayscale image: [1, 28, 28]

# 1 = channels (grayscale, so 1 channel)
# 28 = height
# 28 = width

# dataset = [(image0_tensor, label0), (image1_tensor, label1), ...] think of the dataset format like this

# For Hopfield, we don’t care about channels explicitly; it’s just a way to represent pixel values. You can think of the image as a 2D matrix [28×28] — the channel just tells us it’s grayscale.
# So yes, we can ignore the channel when flattening, treating the [28,28] portion as our “image matrix.”

print("--- STEP-2 ---")
# Step-2: Flatten to 1D (Flattening is necessary because the Hopfield algorithm doesn’t know about rows/columns — it only sees a 1D list of neurons. or pixels with memory (neuron) the state of on or off)

# 3️⃣ Store multiple patterns in memory
# Suppose you want multiple MNIST digits (0–9) as memories.
# Each digit gets flattened → 1D array → N neurons (here N=784).
# You combine them using the Hebbian rule: