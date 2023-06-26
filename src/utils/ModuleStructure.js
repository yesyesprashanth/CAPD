export const Modules = ["Auditory", "Cognitive"];

export const Auditory = ["Auditory Analysis", "Auditory Attention", "Auditory Association", "Auditory Closure", "Audiotry Discrimination", "Temporal Patterning", "Auditory synthesis", "Auditory Figure Ground"];

const moduleList = [
    {
        "title" : "Auditory",  
        "items": [
            {
                "title": "Auditory Analysis",
                "items" : [
                    {
                        "title" : "1.1 Vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }, 
                    {
                        "title" : "1.2 Number of sounds",
                        "subTitle" : "count me if you can",
                        "items" : []
                    }, 
                    {
                        "title" : "1.3 Syllable number",
                        "subTitle" : "",
                        "items" : []
                    }, 
                    {
                        "title" : "1.4 Syllable recognitiopn",
                        "subTitle" : "",
                        "items" : [
                            {
                                "title": "1.3.2 Initial",                                 
                                "subTitle": ""
                            },
                            {
                                "title": "1.3.2 Medial",                                 
                                "subTitle": ""
                            },
                            {
                                "title": "1.3.3 Final",
                                "subTitle": ""
                            }
                        ]
                    }, 
                    {
                        "title" : "1.5 Single step command",
                        "subTitle" : "",
                        "items" : ["Familiar", "Unfamiliar"]
                    },
                ]
            },
            {
                "title": "Auditory Attention",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Auditory Association",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Auditory Closure",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Auditory Discrimination",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Temporal Patterning",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Auditory Synthesis",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
            {
                "title": "Auditory figure ground",
                "items" : [
                    {
                        "title" : "1.1 vowels",
                        "subTitle" : "hunt the vowels",
                        "items" : []
                    }
                ]
            },
        ]
    }, 
    {
        "title" : "Cognitive", 
        "items" :[
            {
                "title" : "Listening Span",
                "items" : []
            },
            {
                "title" : "Reading Span",
                "items" : []
            },
            {
                "title" : "Math Span",
                "items" : []
            },
        ]
    }
]

export function getModuleList(){    
    return moduleList.map(module=>module.title);
}

export function getChapterList(moduleName){
    return moduleList.find(module=>module.title === moduleName)
}


export function getObject(moduleName, chapterName, subChapterName){

    console.log(moduleName, chapterName, subChapterName);

    //Get Chapter list
    if(chapterName===""){ 
        return moduleList.find(module=>module.title === moduleName)
    }else{
        if(subChapterName==="") //Get Sub Chapter Names
        {
            const chapterList =  moduleList.find(module=>module.title === moduleName);             
            return chapterList.items.find(item => item.title === chapterName);            
        }else // get Level list
        {
            const chapterList =  moduleList.find(module=>module.title === moduleName);            
            const subChapterList =  chapterList.items.find(item => item.title === chapterName);  
            console.log(subChapterList);
            return  subChapterList.items.find(item => item.title === subChapterName); 
        }
    }
}

// function getList(module, chapter, title){

//     const moduleRes = moduleList.find(module => module.name === module);
//     const chapterRes = moduleRes.chapters.find(chapter => chapter.name === chapter);
//     const subChapterRes = chapterRes.subChapter.find(subChapter => subChapter.title === title);
    
//     return subChapterRes;
// }




export const Cognitive = ["Listening Span", "Reading Span"];


