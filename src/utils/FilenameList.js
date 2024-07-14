export function getFilenamesInWords(startNumber, endNumber, isRandomise) {
    const numberWords = [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
  
    const tensWords = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
    const filenames = [];
  
    for (let number = startNumber; number <= endNumber; number++) {
      if (number >= 1 && number <= 19) {
        filenames.push(`${numberWords[number - 1]}.wav`);
      } else if (number >= 20 && number <= 99) {
        const tensDigit = Math.floor(number / 10);
        const onesDigit = number % 10;
  
        if (onesDigit === 0) {
          filenames.push(`${tensWords[tensDigit - 2]}.wav`);
        } else {
          filenames.push(`${tensWords[tensDigit - 2]}${numberWords[onesDigit - 1]}.wav`);
        }
      } else {
        filenames.push('Invalid number');
      }
    }
  
    console.log("Randomise", isRandomise)
    
    if(isRandomise)
    {      
      return shuffleArray(filenames);
    }else
    {
      return filenames;
    }
    

    
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
    
export function setFolderNames(pos, folderName, folderArray, updateFolderNames){      

      const data = [...folderArray];
      const newArray = [];

      // console.log("adding folder to array", pos, folderArray.length, folderName);
 
      if(data.length>0){      
        for(let i=0;i<pos;i++)          
        newArray.push(data[i])        
      }
      newArray.push(folderName.toLowerCase());     
      // console.log(pos, folderName, folderArray, newArray);
      updateFolderNames(newArray);
}

export function getFolderNames(folderArray){  
  const folderPath = folderArray.join('/');    
  return folderPath;
}