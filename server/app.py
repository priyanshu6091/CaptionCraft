from flask import Flask, request, jsonify
import torch
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from flask_cors import CORS

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pre-trained BLIP model and processor once during startup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(device)

print("="*50)
print(f"BLIP model loaded on {device}")

@app.route('/after', methods=['POST'])
def after():
    file = request.files['file']
    file_path = 'static/file.jpg'
    
    file.save(file_path)
    
    # Load the image using PIL and convert to RGB
    image = Image.open(file_path).convert('RGB')
    
    # Preprocess the image for the BLIP model
    inputs = processor(images=image, return_tensors="pt").to(device)
    
    # Generate caption
    with torch.no_grad():
        outputs = model.generate(**inputs)
    
    caption = processor.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({'caption': caption})

if __name__ == "__main__":
    app.run(debug=True)
