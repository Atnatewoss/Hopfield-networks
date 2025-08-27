from torchvision import datasets, transforms
import torch

mnist = datasets.MNIST(
    root="./data",
    train=True,
    download=True,
    transform=transforms.ToTensor()
)

def load_some_data_and_flatten_them(mnist):
    one_dimension_array = []
    for index in range(1000):
        image, label = mnist[index]
        flattened_image = image.view(-1)
        one_dimension_array.append(flattened_image)
    
    return one_dimension_array

one_d_array = load_some_data_and_flatten_them(mnist)

# Review: mnist is a dataset object with tuples (image_tensor, label).
# image.view(-1) converts a 2D image tensor [1,28,28] into a 1D tensor [784].
# You are storing multiple flattened images in one_d_array.
# Each element of one_d_array is a 1D tensor representing one MNIST digit.

def find_weight(one_d_array):
    # You have one_d_array → a list of flattened MNIST images (1D tensors, length 784).
    w = torch.zeros((-1))

    for i in one_d_array:
        for j in one_d_array:
            weight = -1
            if one_d_array[i] != one_d_array[j]:
                weight = weight[i] * weight[j]
                # weight.append(weight[i][j])
            elif i==j:
                weight=-1
            
            weight[i][j].append(weight)

    return weight

NxN_sized_holding_the_weight_of_each_neuron_w_another = find_weight(one_d_array)
print(NxN_sized_holding_the_weight_of_each_neuron_w_another)