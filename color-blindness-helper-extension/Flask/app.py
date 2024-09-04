from flask import Flask, request, jsonify, send_file
import cv2
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.get_json()
    img_data = np.array(data['data'], dtype=np.uint8)
    width = data['width']
    height = data['height']
    
    # Convert flat array to 3-channel image
    img_np = img_data.reshape((height, width, 4))
    img_np = img_np[:, :, :3]  # Discard alpha channel if present

    # Convert image to grayscale
    gray_img_np = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
    _, buffer = cv2.imencode('.jpg', gray_img_np)
    
    return send_file(io.BytesIO(buffer), mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
