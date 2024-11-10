import sys
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load the pre-trained BLIP model and processor
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Load the image provided as an argument
image_path = sys.argv[1]
image = Image.open(image_path)

# Preprocess the image for the model
inputs = processor(images=image, return_tensors="pt")

# Generate caption
outputs = model.generate(**inputs)
caption = processor.decode(outputs[0], skip_special_tokens=True)

# Print the caption to send it back to Node.js
print(caption)
