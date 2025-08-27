# Step-0: Set up memory
# Load all the 60,000 images provided by the MNIST library, be we can use some of it to save as a memory to train, else my pc will blow up, or not. But not taking the risk.
from torchvision import datasets, transforms

mnist = datasets.MNIST(
    root="./data",
    train=True,
    download=True,
    transform=transforms.ToTensor()
)

# Step-1: load a portion of the images from the dataset and flatten them one-by-one nd save them into memory(the neural network memory)
# Change each 2d image into 1d image (flattening) and then combine them

memories = []

for index in range(1000): # use the first 1000 images
    # this line is Python’s version of destructuring
    image, label = mnist[index]

    # Python: image, label = mnist[idx]
    # mnist[idx] returns a tuple: (image_tensor, label_number).

    # Example:
    # mnist[0] 
    # # might return (tensor([[[...]]]), 5)

    # image, label = mnist[idx] assigns:
    # image = tensor([[[...]]])   # the actual MNIST image
    # label = 5                   # the corresponding digit

    # The comma is just Python syntax to unpack tuples.
    flattened_image = image.view(-1)
    memories.append(flattened_image)
    # the .view() method is something defined on or works on torch.Tensor objects, and the image is a PyTorch tensor [1,28,28] it reshapes the tensor into a new shape without changing the underlying data, the -1 will automatically calculate the size or the rowsxcols of the image and assign the image to be given or have that new size. which pytorch automatically calculates

# print(flattened)


# Step-2: Step-2 is where we take all our “memory patterns” (MNIST digits flattened into 1D arrays) and store them in a single matrix that represents the Hopfield network.

def NxNMatrix(flattened_image):
    weight = 0
    for img in range(len(flattened_image)):
        weight += flattened_image[img]
    return weight





# and what will help me is to focus on one image and how it's processed and how it's done. an if i get that it's the same process that gets implemented into the rest of the images we're loading