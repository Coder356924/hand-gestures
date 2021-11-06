prediction_1="";
prediction_2="";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLloaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1=" the first perdiction is "+prediction_1;
    speak_data_2=" the second perdiction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);

    }else{
        console.log(results);
        document.getElementById("result_name").innerHTML=results[0].label;
        document.getElementById("result_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        
    }
}