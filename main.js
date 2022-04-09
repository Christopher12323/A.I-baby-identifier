video=""
status=""
objects=[]
function preload(){
    video=createVideo('video.mp4')
    video.hide()
}
function setup(){
    canvas=createCanvas(480,380)
    canvas.center()
    canvas.position(480,200)
}
function draw(){
    image(video,0,0,480,380)
    if (status!=""){
        objectDetector.detect(video,gotResults)
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected.."
            document.getElementById("number_of_objects").innerHTML="Number of objects found:"+objects.length;
            fill("blue")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].text+15,objects[i].y)
            noFill()
            stroke("red")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById('status').innerHTML="Status: Detecting objects.."
}
function modelLoaded(){
    console.log("model Loaded")
    status=true;
    video.loop()
    video.speed(1);
    video.volume(0.1)
}
function gotResults(error,results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results
}