# OpenCV

OpenCV ist eine freie Programmbibliothek mit Algorithmen für die Bildverarbeitung und Computer Vision. Sie ist für die Programmiersprachen C, C++, [[ITP/Python|Python]] und Java geschrieben und steht als freie Software unter den Bedingungen der Apache 2 License.

Notwendige imports:
```python
import cv2 as cv
```

### Bilder anzeigen

```python 
img = cv.imread("Photos/cat_large.jpg")  
cv.imshow("Cat", img)    
cv.waitKey(0) #needed for picure to stop displaying on random keypress
```


### Videos frame bei frame anzeigen

```python
capture = cv.VideoCapture("Videos/dog.mp4")  
  
while True:  
    isTrue, frame = capture.read()  
    cv.imshow("Video", frame)  
    if cv.waitKey(20) & 0xFF == ord("d"):  
        break  
  
capture.release()  
cv.destroyAllWindows()
```


### Bilder/Videos skalieren

```python
# Bild skalieren -------------------------------------------------------------  
img = cv.imread("Photos/cat_large.jpg")  
  
def rescaleFrame(frame, scale=0.75):
	# Works for Images, Videos and Live Video
    width = int(frame.shape[1] * scale)  
    height = int(frame.shape[0] * scale)  
    dimensions = (width, height)  
    return cv.resize(frame, dimensions, interpolation=cv.INTER_AREA)  
  
resized_image = rescaleFrame(img, scale=0.25)  

cv.imshow("Cat", resized_image)  

# Video skalieren--------------------------------------------------------------
capture = cv.VideoCapture("Videos/dog.mp4")  
  
while True:  
    isTrue, frame = capture.read()  
  
    frame_resized = rescaleFrame(frame, scale=0.5)  
  
    cv.imshow("Video", frame)  
    cv.imshow("Video Resized", frame_resized)  
  
    if cv.waitKey(20) & 0xFF == ord("d"):  
        break  
  
capture.release()  
cv.destroyAllWindows()
```


### Auflösung ändern (Live Video)

```python 
def changeRez(width, heigth):
	# Works with Live Video only
    capture.set(3, width)  
    capture.set(4, height)
```

#ITP 