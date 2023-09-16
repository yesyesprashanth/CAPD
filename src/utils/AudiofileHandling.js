
import backendIP from './serverData';

export async function getAudio(filenameWithPath, callback){  
    try {        

        // console.log("ReactFilePath", filenameWithPath);
        
        const bdata = JSON.stringify({
            "filenameWithPath" : filenameWithPath
        });

        const response = await fetch(backendIP + "/audio/getaudio", {
            "method": "POST",
            "headers" :{"content-type":"application/json"},
            "responseType" : "blob",            
            "body" : bdata
        });

        const file = await response.blob();

        const data = URL.createObjectURL(file);     
        callback(data);
        
    } catch (error) {
        console.log(error);
        callback("");
    }
}

export async function getFileCount(folderPath, callback){

    try {        
        // console.log("AFH-GetFileList", backendIP + `/audio/filecount?folderPath=${folderPath}`);
        const response = await fetch(backendIP + `/audio/filecount?folderPath=${folderPath}`)
        const data = await response.json();
        // console.log(data);
    
        callback(data);
    } catch (error) {
        console.log(error);
        callback("");
    }
}

export async function getOptionList(module, callback){
    try{

        const response = await fetch(backendIP + `/audio/getOptions?module=${module}`);
        const data = await response.json();
        console.log("APIData", data);
        callback(data);
    }
    catch(error){
        console.log(error);
        callback("");
    }
}

export async function getImageOptionList(folderName, filename, callback){
    try{
        //get he filename without extension
        const fname = filename.split('.');
        
        //create an array of 3 in filename1, filename2, filename3 format
        const flist = [folderName + "/" + fname[0] + "1.jpg", folderName + "/" + fname[0] + "2.jpg", folderName + "/" + fname[0] + "3.jpg"];
        const options = [];
        
        for (let i = 0; i < flist.length; i++) {
            try {
              const filenameWithPath = flist[i];
                      
              await getImage(filenameWithPath, (data)=>{
                options.push(data);
              });              
            } catch (error) {
              console.error(`Error fetching data for d${i + 1}:`, error.message);
              // Handle the error as needed, such as showing a message to the user or taking alternative actions.
            }
          }        
        
        callback(options);
    }catch(error){
        console.log(error);
    }
}
async function getImage(filenameWithPath, callback){
    try {        

        const bdata = JSON.stringify({
            "filenameWithPath" : filenameWithPath
        });

        const response = await fetch(backendIP + "/audio/getPictures", {
            "method": "POST",
            "headers" :{"content-type":"application/json"},
            "responseType" : "blob",            
            "body" : bdata
        });

        const file = await response.blob();

        const data = URL.createObjectURL(file);     
        callback(data);
        
    } catch (error) {
        console.log(error);
        callback("");
    }
}

