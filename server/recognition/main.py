import cv2
import os
import pickle
import numpy as np
import face_recognition
import time
import requests
import sys


adharNo = sys.argv[1]
d = {'adharNo': adharNo}
print("adhar"+" : "+adharNo)

post = requests.post('http://localhost:8001/faceRecoginiton/datapostCv',data=d)
data=post.json()
print("Response from server:", data)
img=data.get('photo')
print(img)


cap=cv2.VideoCapture(0,cv2.CAP_DSHOW)
cap.set(3,425) #Width
cap.set(4,320) #Height

#Added
cv2.namedWindow("Display",cv2.WINDOW_NORMAL)
#cv2.setWindowProperty("Display",cv2.WND_PROP_TOPMOST)
cv2.moveWindow("Display",850,200)



image_urls=[img]
imgList = []  # List containing image data
ID = []
known_face_detected = False


def posting():
    obj={"result":known_face_detected,'adharNo':adharNo}
    post = requests.post('http://localhost:8001/faceRecoginiton/datapostresultCv',data=obj )   
    print("Post")

for url in image_urls:
    # Download the image from the URL
    response = requests.get(url) #Getting images
    img_array = np.frombuffer(response.content, dtype=np.uint8) #Converting into numpy array
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR) #Changinh into image
    #cv2.imshow("Fetched",img)
    #cv2.waitKey(1)
    imgList.append(img)
    ID.append(os.path.splitext(os.path.basename(url))[0])

def Encoding(imagesList):
    encodeList=[]
    for img in imgList:
        img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB) #convering to RGB
        encode=face_recognition.face_encodings(img)[0] #Getting first element of encoding
        encodeList.append(encode)
    return encodeList

print("Encoding Started..")

encodeListKnown=Encoding(imgList)
encodeListKnownIds=[encodeListKnown,ID]

print("Encoding Ends")

encodeListKnown,ID=encodeListKnownIds
#print("Encoded file Loaded..")
initime=time.time()
while True:
    
    time_limit=False
    _,img=cap.read()

    imgS=cv2.resize(img,(0,0),None,0.25,0.25) #resizing to shorten computation
    imgS = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) #Converting to RGB

    faceCurrFrame=face_recognition.face_locations(imgS)  #
    encodedCurrFrame=face_recognition.face_encodings(imgS,faceCurrFrame)

    #Loop through each encodings

    for encodeFace, faceLoc in zip(encodedCurrFrame,faceCurrFrame):
        matches=face_recognition.compare_faces(encodeListKnown,encodeFace,tolerance=0.40)
        faceDistance=face_recognition.face_distance(encodeListKnown,encodeFace) #lower the face distance better the match
        print(faceDistance)

        matchIndex=np.argmin(faceDistance)

        if matches[matchIndex] and faceDistance<=0.40:
            print("Known Face Detected")
            known_face_detected = True
            
            print(ID[matchIndex])
            break


        fintime=time.time()
        if (fintime - initime >= 40):
            time_limit=True
            print("Time Limit Exceeded")
            break
    
    if len(faceCurrFrame)>0:
        face_locations=face_recognition.face_locations(img)
        for face_location in face_locations:
            (top, right , bottom, left)=face_location
            cv2.rectangle(img,(left,top),(right,bottom),(0,255,0),2)

    
    cv2.imshow("Display", img)
 
    cv2.waitKey(1)
    if known_face_detected or time_limit:
        time.sleep(5)
        cap.release()
        cv2.destroyAllWindows()  # Close all OpenCV windows
         
        break
posting()
